import { strict as assert } from 'assert';

if (typeof globalThis.localStorage === 'undefined') {
  const storage = new Map();
  globalThis.localStorage = {
    getItem: (k) => storage.get(k) || null,
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: (k) => storage.delete(k),
    clear: () => storage.clear()
  };
}

const storeModule = await import('./store.js');
const componentsModule = await import('./components.js');
const store = storeModule.store;

console.log('Testing all render functions...');

// 1. Login Screen
console.log('Testing renderLoginScreen...');
const loginHtml = componentsModule.renderLoginScreen();
assert(typeof loginHtml === 'string' && loginHtml.length > 0);

// 2. Admin Views for all tabs
const adminTabs = ['dashboard', 'surveys', 'assignments', 'responses', 'reports', 'personnel', 'messages'];
for (const tab of adminTabs) {
  console.log(`Testing renderAdminView with tab: ${tab}...`);
  store.state.adminTab = tab;
  store.state.auth.isLoggedIn = true;
  store.state.currentRole = 'admin';
  const adminHtml = componentsModule.renderAdminView();
  assert(typeof adminHtml === 'string' && adminHtml.length > 0);
}

// 3. Reports Tab subviews
const reportViews = ['questions', 'submissions', 'saved_reports'];
for (const rView of reportViews) {
  console.log(`Testing reports tab with view: ${rView}...`);
  store.state.adminTab = 'reports';
  store.state.reportActiveView = rView;
  const repHtml = componentsModule.renderAdminView();
  assert(typeof repHtml === 'string' && repHtml.length > 0);
}

// 4. Modals
const modalTypes = ['add_section', 'view_report', 'assign_survey', 'logout_confirm', 'view_live_survey_results', 'add_personnel'];
for (const mType of modalTypes) {
  console.log(`Testing renderCustomModals with modal: ${mType}...`);
  store.state.activeModal = { type: mType, survey: store.state.allSurveys[0], report: store.state.reports[0] };
  const modalHtml = componentsModule.renderCustomModals(store.state);
  assert(typeof modalHtml === 'string');
}
store.state.activeModal = null;

// 5. PWA Screens
const pwaScreens = ['home', 'task_detail', 'survey_success', 'my_surveys', 'builder', 'quick_builder', 'messages', 'message_detail', 'profile', 'survey_runner'];
for (const scr of pwaScreens) {
  console.log(`Testing PWA screen: ${scr}...`);
  store.state.pwaScreen = scr;
  store.state.currentRole = 'pwa';
  
  if (scr === 'home') componentsModule.renderPwaHome();
  if (scr === 'task_detail') componentsModule.renderTaskDetail();
  if (scr === 'survey_success') componentsModule.renderSurveySuccess();
  if (scr === 'my_surveys') componentsModule.renderMySurveys();
  if (scr === 'builder' || scr === 'quick_builder') componentsModule.renderPwaSurveyBuilderContainer(store.state);
  if (scr === 'messages') componentsModule.renderMessages();
  if (scr === 'message_detail') componentsModule.renderMessageDetail();
  if (scr === 'profile') componentsModule.renderProfile();
  if (scr === 'survey_runner') componentsModule.renderSurveyRunner();
}

console.log('ALL RENDER FUNCTIONS TESTED SUCCESSFULLY WITH ZERO ERRORS!');
