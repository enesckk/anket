import { strict as assert } from 'assert';

const storage = new Map();
globalThis.localStorage = {
  getItem: k => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: k => storage.delete(k),
  clear: () => storage.clear()
};

const { store } = await import('./store.js');
const { renderPwaHome, renderSurveyRunner } = await import('./components.js');

// Atama yoksa aktif anket hiçbir şekilde saha ekranına sızmamalı.
store.state.auth = { isLoggedIn: true, token: 'real-token', user: { id: 'u1', fullName: 'Test', role: 'FIELD_USER' } };
store.state.currentRole = 'pwa';
store.state.assignedSurveys = [];
store.state.allSurveys = [{ id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Atanmamış Gizli Anket', status: 'ACTIVE' }];
let html = renderPwaHome();
assert(!html.includes('Atanmamış Gizli Anket'));
assert(html.includes('Görevlerim'));

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

console.log('Security/regression tests passed: assignment isolation, dynamic questions, answer IDs, no ghost personnel.');
