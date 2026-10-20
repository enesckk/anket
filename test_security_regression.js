import { strict as assert } from 'assert';
import { readFileSync } from 'node:fs';

const storage = new Map();
globalThis.localStorage = {
  getItem: k => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: k => storage.delete(k),
  clear: () => storage.clear()
};

const { store, isSurveyQuestionVisible, normalizeSubmission } = await import('./store.js');
const { renderLoginScreen, renderPwaHome, renderSurveyRunner, renderProfile, renderAdminView, renderCustomModals } = await import('./components.js');

// Giriş ekranı gerçek yönetici hesabını veya adresini örnek olarak ifşa etmemeli.
let html = renderLoginScreen();
assert(html.includes('placeholder="Kullanıcı adı, e-posta veya telefon"'));
assert(!html.includes('placeholder="admin veya'));

// Soru ekleme metodu, hızlı tür kartlarından ve alt panelden gelen zorunluluk
// seçimini ReferenceError üretmeden builder durumuna yansıtmalı.
store.state.builderSurvey = {
  id: null,
  title: 'Soru Ekleme Testi',
  description: '',
  status: 'DRAFT',
  sections: [{ id: 'sec-1', title: 'Genel Bilgiler', order: 1 }],
  questions: [],
  activeQuestionId: null
};
store.addQuestionToBuilder('multi', false);
assert.equal(store.state.builderSurvey.questions.length, 1);
assert.equal(store.state.builderSurvey.questions[0].type, 'multi');
assert.equal(store.state.builderSurvey.questions[0].isRequired, false);
assert.equal(store.state.builderSurvey.questions[0].options.length, 2);
store.addQuestionToBuilder('text');
assert.equal(store.state.builderSurvey.questions.length, 2);
assert.equal(store.state.builderSurvey.questions[1].isRequired, true);

// Soru türü kartları yalnızca merkezi delegated listener tarafından
// işlenmeli; doğrudan ikinci listener aynı tıklamada çift soru eklerdi.
const appSource = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
assert(!appSource.includes("document.querySelectorAll('.btn-add-question-type')"));
assert(!appSource.includes("document.getElementById('btn-builder-step3-next')?.addEventListener"));

// Yayınlama sırasında sorular yalnızca tarayıcı state'inde kalmamalı;
// anket, sorular ve yönetici durumu sırasıyla API'ye kaydedilmeli.
store.state.auth = { isLoggedIn: true, token: 'admin-token', user: { id: 'a1', fullName: 'Admin', role: 'ADMIN' } };
store.state.currentRole = 'admin';
store.state.isOnline = true;
store.state.allSurveys = [];
const persistenceCalls = [];
store.apiFetch = async (endpoint, options = {}) => {
  persistenceCalls.push({ endpoint, body: options.body ? JSON.parse(options.body) : null });
  if (endpoint === '/surveys') return { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Soru Ekleme Testi', description: '', status: 'DRAFT', source: 'ADMIN' };
  if (endpoint.endsWith('/questions')) return { id: `question-${persistenceCalls.length}`, ...JSON.parse(options.body), options: JSON.parse(options.body).options || [] };
  if (endpoint.endsWith('/status')) return { status: 'ACTIVE' };
  throw new Error(`Unexpected endpoint: ${endpoint}`);
};
await store.submitForApproval();
assert.equal(persistenceCalls.filter(call => call.endpoint.endsWith('/questions')).length, 2);
assert.equal(persistenceCalls[1].body.type, 'MULTIPLE_CHOICE');
assert.equal(persistenceCalls[1].body.isRequired, false);
assert.equal(persistenceCalls.at(-1).endpoint, '/surveys/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/status');

// Atama modalı yalnızca aktif saha personellerini göstermeli, zorunlu bölge
// alanı görünür/default dolu olmalı ve açılır liste diğer alanları kapatmamalı.
store.state.allPersonnel = [
  { id: 'field-1', fullName: 'Aykut Bilici', email: 'aykut@example.com', role: 'FIELD_USER', isActive: true },
  { id: 'admin-1', fullName: 'Sistem Yöneticisi', email: 'admin@example.com', role: 'ADMIN', isActive: true }
];
store.state.activeModal = { type: 'assign_survey', survey: { id: 'survey-1', title: 'Atama Testi' } };
html = renderCustomModals(store.state);
assert(html.includes('Aykut Bilici'));
assert(!html.includes('Sistem Yöneticisi'));
assert(html.includes('value="Genel Saha"'));
assert(!html.includes('absolute bottom-full'));

// Aynı anket daha önce personele atandıysa hızlı atama modalı o personeli
// tekrar seçilebilir göstermemeli.
store.state.allAssignments = [{ surveyId: 'survey-1', assignedUsers: [{ id: 'field-1' }] }];
html = renderCustomModals(store.state);
assert(!html.includes('Aykut Bilici'));

// API başarısızsa hayalet atama oluşmamalı; başarılı istekte bölge adı ve
// yayınlama talebi backend'e açıkça gönderilmeli.
store.state.allSurveys = [{ id: 'survey-1', title: 'Atama Testi', status: 'DRAFT' }];
store.state.allAssignments = [];
store.state.assignedSurveys = [];
store.apiFetch = async () => { throw new Error(JSON.stringify({ message: 'test failure' })); };
await assert.rejects(() => store.createAdminAssignment('survey-1', 'Gazikent Mahallesi', 25, new Date(Date.now() + 86400000).toISOString(), '', ['field-1']));
assert.equal(store.state.allAssignments.length, 0);
assert.equal(store.state.assignedSurveys.length, 0);
let assignmentPayload = null;
store.apiFetch = async (endpoint, options) => {
  assert.equal(endpoint, '/assignments');
  assignmentPayload = JSON.parse(options.body);
  return { id: 'assignment-1', surveyId: 'survey-1', villageName: 'Gazikent Mahallesi' };
};
store.fetchInitialData = async () => {};
await store.createAdminAssignment('survey-1', 'Gazikent Mahallesi', 25, new Date(Date.now() + 86400000).toISOString(), '', ['field-1']);
assert.equal(assignmentPayload.villageId, null);
assert.equal(assignmentPayload.villageName, 'Gazikent Mahallesi');
assert.equal(assignmentPayload.publishSurvey, true);
assert.deepEqual(assignmentPayload.assignedUserIds, ['field-1']);

// Tarayıcı tarafındaki erken kontrol de aynı anket-personel çiftini API'ye
// ikinci kez göndermemeli; esas güvence backend'de ayrıca uygulanır.
store.state.allAssignments = [{ surveyId: 'survey-1', assignedUsers: [{ id: 'field-1' }] }];
let duplicateAssignmentApiCalled = false;
store.apiFetch = async () => { duplicateAssignmentApiCalled = true; };
await assert.rejects(() => store.createAdminAssignment('survey-1', 'Gazikent Mahallesi', 25, new Date(Date.now() + 86400000).toISOString(), '', ['field-1']));
assert.equal(duplicateAssignmentApiCalled, false);

// Atama yoksa aktif anket hiçbir şekilde saha ekranına sızmamalı.
store.state.auth = { isLoggedIn: true, token: 'real-token', user: { id: 'u1', fullName: 'Test', role: 'FIELD_USER' } };
store.state.currentRole = 'pwa';
store.state.assignedSurveys = [];
store.state.allSurveys = [{ id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Atanmamış Gizli Anket', status: 'ACTIVE' }];
html = renderPwaHome();
assert(!html.includes('Atanmamış Gizli Anket'));
assert(html.includes('Görevlerim'));

// Ana sayfa yalnızca son görevi değil, kullanıcıya atanmış tüm aktif görevleri göstermeli.
store.state.assignedSurveys = [
  { id: 'task-1', surveyId: 'survey-1', title: 'Birinci Aktif Anket', target: 10, completed: 1 },
  { id: 'task-2', surveyId: 'survey-2', title: 'İkinci Aktif Anket', target: 20, completed: 2 }
];
html = renderPwaHome();
assert(html.includes('Birinci Aktif Anket'));
assert(html.includes('İkinci Aktif Anket'));
assert(html.includes('Şehitkamil Strateji Geliştirme Merkezi'));

// Koşullu sorular yalnızca kaynak cevap eşleştiğinde görünmeli. Çoklu seçim
// cevaplarında EQUALS, beklenen seçeneğin cevap dizisinde bulunmasını ifade eder.
const conditionalQuestion = {
  id: 'conditional-1',
  conditionSourceQuestionId: 'source-1',
  conditionOperator: 'EQUALS',
  conditionValue: 'Diğer'
};
assert.equal(isSurveyQuestionVisible(conditionalQuestion, { 'source-1': ['Gıda', 'Diğer'] }), true);
assert.equal(isSurveyQuestionVisible(conditionalQuestion, { 'source-1': ['Gıda'] }), false);
assert.equal(isSurveyQuestionVisible({ ...conditionalQuestion, conditionOperator: 'NOT_EQUALS', conditionValue: 'Yok' }, { 'source-1': 'Var' }), true);
assert.equal(isSurveyQuestionVisible({ ...conditionalQuestion, conditionOperator: 'NOT_EQUALS', conditionValue: 'Yok' }, {}), false);

// Çıkış onay modalı oturum kapandıktan sonra state'te kalmamalı; aksi halde
// bir sonraki girişte yeni ana sayfanın üstünde tekrar görünür.
store.state.activeModal = { type: 'logout_confirm' };
store.logout();
assert.equal(store.state.activeModal, null);

// Backend cevapları AnswerDto dizisi olarak döndürür. Yönetici raporları için
// soru kimliğine göre düz bir cevap haritasına dönüştürülmelidir.
const normalizedSubmission = normalizeSubmission({
  id: 'submission-1',
  answers: [
    { id: 'answer-1', questionId: 'question-1', answerValue: 'TEST-KATILIMCI-001' },
    { id: 'answer-2', questionId: 'question-2', answerValue: 'Memnun' }
  ]
});
assert.equal(normalizedSubmission.answers['question-1'], 'TEST-KATILIMCI-001');
assert.equal(normalizedSubmission.answers['question-2'], 'Memnun');
assert.equal(normalizedSubmission.answerItems.length, 2);

store.state.allAssignments = [{
  id: 'assignment-report-1',
  surveyId: 'survey-report-1',
  villageId: 'village-1',
  targetCount: 1,
  assignedUsers: [{ id: 'field-1' }]
}];
store.state.submissions = [{
  ...normalizedSubmission,
  surveyId: 'survey-report-1',
  fieldUserName: 'Test Personeli',
  submittedAt: new Date().toISOString(),
  isInvalid: false
}];
store.state.activeModal = {
  type: 'view_live_survey_results',
  survey: {
    id: 'survey-report-1',
    title: 'Raporlama Testi',
    status: 'ACTIVE',
    questions: [
      { id: 'question-1', title: 'Katılımcı kodu', type: 'TEXT', isRequired: true, options: [] },
      { id: 'question-2', title: 'Memnuniyet', type: 'SINGLE_CHOICE', isRequired: true, options: [{ label: 'Memnun', value: 'Memnun' }] }
    ]
  }
};
html = renderCustomModals(store.state);
assert(html.includes('1 / 1'));
assert(html.includes('TEST-KATILIMCI-001'));
assert.match(html, /Memnun[\s\S]*1 Kişi[\s\S]*%100/);
assert(!html.includes('[object Object]'));

// Saha kullanıcısı yönetici geçişini görmemeli ve state manipülasyonu ile
// yönetici paneline geçememeli.
store.state.pwaScreen = 'profile';
html = renderProfile();
assert(!html.includes('btn-switch-to-admin'));
assert(!html.includes('Yönetici Paneline Geç'));
assert.equal(store.setRole('admin'), false);
assert.equal(store.state.currentRole, 'pwa');
assert.equal(store.setAdminTab('personnel'), false);
assert.equal(store.state.currentRole, 'pwa');
store.state.currentRole = 'admin';
html = renderAdminView();
assert(html.includes('Erişim Yetkiniz Yok'));
assert(!html.includes('Saha operasyonlarının güncel durumu'));

// Gerçek yönetici iki görünüm arasında geçiş yapabilmeli.
store.fetchInitialData = async () => {};
store.requestNotificationPermission = () => {};
store.state.auth = { isLoggedIn: true, token: 'admin-token', user: { id: 'a1', fullName: 'Admin', role: 'ADMIN' } };
store.state.currentRole = 'pwa';
html = renderProfile();
assert(html.includes('btn-switch-to-admin'));
assert.equal(store.setRole('admin'), true);
assert.equal(store.state.currentRole, 'admin');
assert.equal(store.setAdminTab('personnel'), true);
assert.equal(store.state.adminTab, 'personnel');

// Anketler sayfasının üst başlığında yinelenen "Yeni Anket" CTA'sı
// gösterilmemeli; sayfa içindeki asıl oluşturma düğmesi kalmalı.
store.state.adminTab = 'surveys';
html = renderAdminView();
assert(!html.includes('btn-admin-create-survey-dashboard'));
assert(html.includes('btn-admin-create-survey-modal'));

// Cevap içerdiği için backend tarafından CLOSED yapılan anketler aktif listede
// görünmemeli; denetim kaydı olarak yalnızca arşiv görünümünde kalmalıdır.
store.state.allSurveys = [
  { id: 'survey-active', title: 'Aktif Anket', status: 'ACTIVE' },
  { id: 'survey-closed', title: 'Kapalı Test Anketi', status: 'CLOSED' }
];
store.state.surveyStatusFilter = 'ACTIVE_ONLY';
assert.deepEqual(store.getFilteredSurveys().map(s => s.id), ['survey-active']);
store.state.surveyStatusFilter = 'ARCHIVED_ONLY';
assert.deepEqual(store.getFilteredSurveys().map(s => s.id), ['survey-closed']);
html = renderAdminView();
assert(html.includes('Kapalı Test Anketi'));
assert(html.includes('Kapalı'));
assert(!html.includes('btn-unarchive-survey'));
store.state.surveyStatusFilter = 'ACTIVE_ONLY';

store.state.adminTab = 'dashboard';
html = renderAdminView();
assert(html.includes('btn-admin-create-survey-dashboard'));

// Takip eden saha testleri saha rolüyle çalışmalı.
store.state.auth = { isLoggedIn: true, token: 'real-token', user: { id: 'u1', fullName: 'Test', role: 'FIELD_USER' } };
store.state.currentRole = 'pwa';

// Form, sabit demo soruları yerine atanan anketin gerçek sorularını kullanmalı.
const surveyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const assignmentId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
const questionId = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
store.state.assignedSurveys = [{ id: assignmentId, surveyId, title: 'Gerçek Anket', villageId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', target: 10, completed: 0 }];
store.state.selectedTaskId = assignmentId;
store.state.allSurveys = [{ id: surveyId, title: 'Gerçek Anket', status: 'ACTIVE', questions: [{ id: questionId, title: 'Gerçek Soru', type: 'TEXT', isRequired: true, order: 1 }], sections: [] }];
store.state.activeFormAnswers = { [questionId]: 'Gerçek Cevap' };
html = renderSurveyRunner();
assert(html.includes('Gerçek Soru'));
assert(!html.includes('Tarımsal Arazi Sahibisiniz mi?'));

// Gönderilen cevap doğru anket/görev/soru kimlikleriyle gitmeli.
let sentPayload = null;
store.state.isOnline = true;
store.apiFetch = async (endpoint, options) => {
  if (endpoint === '/submissions') sentPayload = JSON.parse(options.body);
  return { id: 'submission-ok' };
};
await store.submitActiveSurvey();
assert.equal(sentPayload.surveyId, surveyId);
assert.equal(sentPayload.assignmentId, assignmentId);
assert.equal(sentPayload.answers[0].questionId, questionId);
assert.equal(sentPayload.answers[0].answerValue, 'Gerçek Cevap');

// Personel, API başarı vermeden yerel listeye eklenmemeli.
store.state.allPersonnel = [];
store.apiFetch = async () => { throw new Error('server unavailable'); };
await assert.rejects(() => store.createAdminPersonnel('Hayalet', 'hayalet@example.com', '555', 'Strong#123', 'FIELD_USER'));
assert.equal(store.state.allPersonnel.length, 0);

// Geçerli ataması olmayan eski çevrimdışı sayaçlar takılı kalmamalı.
store.state.assignedSurveys = [];
store.state.submissions = [{ clientSubmissionId: 'legacy-1', synced: false }];
store.state.offlineQueueCount = 1;
await store.syncOfflineQueue();
assert.equal(store.state.offlineQueueCount, 0);
assert.equal(store.state.submissions.length, 0);

console.log('Security/regression tests passed: assignment isolation, dynamic questions, answer IDs, no ghost personnel, queue cleanup.');
