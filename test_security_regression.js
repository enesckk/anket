import { strict as assert } from 'assert';
import { readFileSync } from 'node:fs';

const storage = new Map();
globalThis.localStorage = {
  getItem: k => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: k => storage.delete(k),
  clear: () => storage.clear()
};

const { store } = await import('./store.js');
const { renderPwaHome, renderSurveyRunner, renderProfile, renderAdminView } = await import('./components.js');

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

// Atama yoksa aktif anket hiçbir şekilde saha ekranına sızmamalı.
store.state.auth = { isLoggedIn: true, token: 'real-token', user: { id: 'u1', fullName: 'Test', role: 'FIELD_USER' } };
store.state.currentRole = 'pwa';
store.state.assignedSurveys = [];
store.state.allSurveys = [{ id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Atanmamış Gizli Anket', status: 'ACTIVE' }];
let html = renderPwaHome();
assert(!html.includes('Atanmamış Gizli Anket'));
assert(html.includes('Görevlerim'));

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
