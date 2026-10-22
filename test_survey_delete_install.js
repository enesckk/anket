import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { isSharedSurveyPage } from './pwa-policy.js';

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const { store } = await import('./store.js');
const { renderAdminView, renderCustomModals } = await import('./components.js');
const baseline = structuredClone(store.state);
function reset() {
  store.state = { ...structuredClone(baseline), auth: { isLoggedIn: true, user: { role: 'ADMIN' } }, currentRole: 'admin', adminTab: 'surveys', surveyStatusFilter: 'ALL',
    allSurveys: [{ id: 'delete', title: '<Anket>', status: 'ACTIVE' }, { id: 'keep', title: 'Diğer anket', status: 'CLOSED' }],
    submissions: [{ id: 'delete-sub', surveyId: 'delete' }, { id: 'keep-sub', surveyId: 'keep' }],
    allAssignments: [{ id: 'delete-assignment', surveyId: 'delete' }, { id: 'keep-assignment', surveyId: 'keep' }],
    assignedSurveys: [{ id: 'delete-assignment', surveyId: 'delete' }], reports: [{ id: 'delete-report', surveyId: 'delete' }],
    selectedReportSurveyId: 'delete', selectedReportDetailId: 'delete-report', selectedTaskId: 'delete-assignment' };
  store._deletingSurveyId = null;
  store.setToast = (message, type) => { store.lastToast = { message, type }; };
}
reset();
for (const mode of ['list','card']) {
  store.state.surveyViewMode = mode;
  assert.equal((renderAdminView().match(/class="btn-open-delete-survey /g) || []).length, 2, 'Both active and closed surveys need exactly one delete action.');
}
store.state.activeModal = { type: 'confirm_delete_survey', survey: store.state.allSurveys[0] };
const modal = renderCustomModals(store.state);
assert(modal.includes('geri alınamaz'));
assert(modal.includes('&lt;Anket&gt;'));
assert(modal.includes('toplanan tüm yanıtları'));
store.state.activeModal.deleting = true;
assert(renderCustomModals(store.state).includes('disabled'));
let requestCount = 0;
store.apiFetch = async (endpoint, options) => { requestCount++; assert.equal(endpoint, '/surveys/delete/permanent'); assert.equal(options.method, 'DELETE'); return { deleted: true, surveyId: 'delete' }; };
assert.equal(await store.deleteSurvey('delete'), true);
assert.equal(requestCount, 1);
assert.deepEqual(store.state.allSurveys.map(s => s.id), ['keep']);
assert.deepEqual(store.state.submissions.map(s => s.id), ['keep-sub']);
assert.deepEqual(store.state.allAssignments.map(s => s.id), ['keep-assignment']);
assert.equal(store.state.selectedReportSurveyId, null);
assert.equal(store.state.selectedReportDetailId, null);
assert.equal(store.state.selectedTaskId, null);
assert.equal(store.state.activeModal, null);
reset();
store.apiFetch = async () => { throw new Error('offline'); };
assert.equal(await store.deleteSurvey('delete'), false);
assert.equal(store.state.allSurveys.length, 2);
assert.equal(store.state.submissions.length, 2);
assert.equal(store.lastToast.type, 'error');
store.apiFetch = async () => new Blob([]); // Old server only closes surveys.
assert.equal(await store.deleteSurvey('delete'), false);
assert.equal(store.state.allSurveys.length, 2);
assert(store.lastToast.message.includes('Sunucu kalıcı silmeyi doğrulamadı'));
reset();
let release;
store.apiFetch = () => new Promise(resolve => { release = resolve; });
const pending = store.deleteSurvey('delete');
assert.equal(await store.deleteSurvey('delete'), false, 'Double click must not send a second delete.');
release({ deleted: true, surveyId: 'delete' });
assert.equal(await pending, true);
reset();
store.state.auth.user.role = 'FIELD_USER';
store.apiFetch = () => { throw new Error('API must not be called for field users'); };
assert.equal(await store.deleteSurvey('delete'), false);
store.state.activeModal = { type: 'confirm_delete_survey', survey: store.state.allSurveys[0] };
assert.equal(renderCustomModals(store.state), '');

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const source = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const pwa = source.slice(source.indexOf('let _pwaInstallPrompt = null;'), source.indexOf('// ─── Boot'));
const manifest = html.match(/<!-- PWA Manifest -->\s*<script>([\s\S]*?)<\/script>/)[1];
assert(!html.includes('id="pwa-install-btn"'), 'The duplicate static install button must be removed.');
for (const search of ['', '?foo=bar', '?survey=one', '?survey=two&x=1', '?survey=', '?%73urvey=encoded']) {
  const shared = isSharedSurveyPage(search);
  const elements = new Map(), listeners = new Map(), headElements = [];
  const document = { head: { appendChild: e => headElements.push(e) },
    getElementById: id => elements.get(id) || null,
    createElement: () => ({ style: {}, addEventListener() {}, remove() { elements.delete(this.id); } }),
    body: { appendChild: e => elements.set(e.id || 'toast', e) } };
  let prevented = 0;
  const context = { document, location: { search }, URLSearchParams, isSharedSurveyPage,
    window: { location: { search }, addEventListener: (name, callback) => listeners.set(name, callback) },
    store: { getState: () => ({ publicSession: { active: shared } }) }, console: { log() {} }, setTimeout() {}, localStorage: globalThis.localStorage };
  vm.runInNewContext(manifest, context);
  assert.equal(headElements.length, shared ? 0 : 1, 'Shared URLs must not advertise an app manifest.');
  vm.runInNewContext(pwa, context);
  listeners.get('beforeinstallprompt')({ preventDefault() { prevented++; } });
  assert.equal(prevented, 1);
  assert.equal(elements.has('pwa-install-banner'), !shared);
  listeners.get('appinstalled')();
  assert.equal(elements.has('toast'), !shared, 'Shared forms must not show installation success notices either.');
}
console.log('Survey deletion and installation policy tests passed: roles, confirmation, failures, cleanup, double clicks, both layouts and shared link isolation.');
