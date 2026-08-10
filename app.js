// SurveyAdmin Intelligence - Main PWA & Admin Application Controller

import { store } from './store.js';
import {
  renderSystemBar,
  renderLoginScreen,
  renderPwaHome,
  renderTaskDetail,
  renderSurveyRunner,
  renderSurveySuccess,
  renderMySurveys,
  renderQuickBuilder,
  renderMessages,
  renderMessageDetail,
  renderProfile,
  renderAdminView
} from './components.js';

function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  const state = store.getState();

  // If not logged in, render Login Screen
  if (!state.auth.isLoggedIn && state.currentRole === 'pwa') {
    root.innerHTML = `
      ${renderSystemBar()}
      ${renderLoginScreen()}
    `;
    attachLoginListeners();
    return;
  }

  // Admin vs PWA view
  if (state.currentRole === 'admin') {
    root.innerHTML = `
      ${renderSystemBar()}
      ${renderAdminView()}
    `;
    attachAdminListeners();
    return;
  }

  // Clean full screen for survey runner
  if (state.pwaScreen === 'survey_runner') {
    root.innerHTML = renderSurveyRunner();
    attachPwaListeners();
    return;
  }

  // PWA Router based on state.pwaScreen
  let screenContent = '';
  switch (state.pwaScreen) {
    case 'home':
      screenContent = renderPwaHome();
      break;
    case 'task_detail':
      screenContent = renderTaskDetail();
      break;
    case 'survey_success':
      screenContent = renderSurveySuccess();
      break;
    case 'my_surveys':
      screenContent = renderMySurveys();
      break;
    case 'quick_builder':
      screenContent = renderQuickBuilder();
      break;
    case 'messages':
      screenContent = renderMessages();
      break;
    case 'message_detail':
      screenContent = renderMessageDetail();
      break;
    case 'profile':
      screenContent = renderProfile();
      break;
    default:
      screenContent = renderPwaHome();
  }

  root.innerHTML = `
    ${renderSystemBar()}
    ${screenContent}
  `;

  attachGlobalSystemListeners();
  attachPwaListeners();
}

function attachGlobalSystemListeners() {
  const btnRoleAdmin = document.getElementById('btn-role-admin');
  const btnRolePwa = document.getElementById('btn-role-pwa');

  if (btnRoleAdmin) {
    btnRoleAdmin.addEventListener('click', () => store.setRole('admin'));
  }
  if (btnRolePwa) {
    btnRolePwa.addEventListener('click', () => store.setRole('pwa'));
  }

  const btnToggleNet = document.getElementById('btn-toggle-network');
  if (btnToggleNet) {
    btnToggleNet.addEventListener('click', () => {
      const isOnline = store.getState().isOnline;
      store.setNetworkStatus(!isOnline);
    });
  }

  const btnReset = document.getElementById('btn-reset-demo');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      store.resetAll();
    });
  }
}

function attachLoginListeners() {
  attachGlobalSystemListeners();
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const phone = document.getElementById('login-phone')?.value;
      const pwd = document.getElementById('login-password')?.value;
      await store.login(phone, pwd);
    });
  }
}

function attachAdminListeners() {
  attachGlobalSystemListeners();

  // Sidebar 7 Tab Switches
  document.querySelectorAll('.btn-admin-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.currentTarget.getAttribute('data-admin-tab');
      store.setAdminTab(tab);
    });
  });

  // Excel & PDF Report Download Actions
  document.getElementById('btn-admin-download-excel')?.addEventListener('click', () => {
    store.downloadReportExcel('44444444-4444-4444-4444-444444444441');
  });
  document.getElementById('btn-admin-download-pdf')?.addEventListener('click', () => {
    store.downloadReportPdf('44444444-4444-4444-4444-444444444441');
  });
  document.getElementById('btn-reports-tab-excel')?.addEventListener('click', () => {
    store.downloadReportExcel('44444444-4444-4444-4444-444444444441');
  });
  document.getElementById('btn-reports-tab-pdf')?.addEventListener('click', () => {
    store.downloadReportPdf('44444444-4444-4444-4444-444444444441');
  });

  // Open Builder Buttons
  const openBuilderHandler = () => {
    store.startNewBuilder();
  };
  document.getElementById('btn-admin-create-survey-modal')?.addEventListener('click', openBuilderHandler);
  document.getElementById('btn-admin-create-survey-dashboard')?.addEventListener('click', openBuilderHandler);

  // CUSTOM MODALS LISTENERS (NO BROWSER PROMPTS)
  document.getElementById('btn-close-custom-modal')?.addEventListener('click', () => store.closeModal());
  
  const formAddSection = document.getElementById('form-custom-add-section');
  if (formAddSection) {
    formAddSection.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('custom-sec-title')?.value;
      if (title) store.addSectionToBuilder(title);
    });
  }

  // PERSONNEL CREATION MODAL & SUBMIT
  document.getElementById('btn-open-add-personnel-modal')?.addEventListener('click', () => {
    store.openModal('add_personnel');
  });

  const formAddPersonnel = document.getElementById('form-custom-add-personnel');
  if (formAddPersonnel) {
    formAddPersonnel.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('personnel-fullname')?.value;
      const username = document.getElementById('personnel-username')?.value;
      const email = document.getElementById('personnel-email')?.value;
      const phone = document.getElementById('personnel-phone')?.value;
      const password = document.getElementById('personnel-password')?.value;
      const role = document.getElementById('personnel-role')?.value;

      if (fullName && username && email && phone && password) {
        await store.createAdminPersonnel(fullName, username, email, phone, password, role);
      }
    });
  }

  // TOGGLE PERSONNEL ACTIVE STATUS BUTTONS
  document.querySelectorAll('.btn-toggle-personnel-status').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const userId = e.currentTarget.getAttribute('data-user-id');
      await store.togglePersonnelStatus(userId);
    });
  });

  document.getElementById('btn-confirm-delete-q')?.addEventListener('click', (e) => {
    const qId = e.currentTarget.getAttribute('data-q-id');
    if (qId) store.deleteQuestion(qId);
  });

  // 4-STEP WIZARD EVENT LISTENERS
  document.querySelectorAll('.btn-builder-step-nav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const st = parseInt(e.currentTarget.getAttribute('data-builder-step'));
      store.setBuilderStep(st);
    });
  });

  // Step 1 Form Submit
  const formStep1 = document.getElementById('form-builder-step1');
  if (formStep1) {
    formStep1.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('builder-info-title')?.value;
      const desc = document.getElementById('builder-info-desc')?.value;
      store.updateBuilderInfo(title, desc);
      store.setBuilderStep(2);
    });
  }

  // Step 2 Question Type Add Cards
  document.querySelectorAll('.btn-add-question-type').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.getAttribute('data-type');
      store.addQuestionToBuilder(type);
    });
  });

  // Question Card Toggle Expand
  document.querySelectorAll('.btn-toggle-question').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.toggleQuestionExpanded(id);
    });
  });

  // Question Title Edit
  document.querySelectorAll('.input-builder-q-title').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-q-id');
      store.updateQuestionTitle(id, e.target.value);
    });
  });

  // Toggle Mandatory
  document.querySelectorAll('.btn-toggle-required').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.toggleQuestionRequired(id);
    });
  });

  // REAL-TIME EDITABLE OPTIONS LISTENERS (NO PROMPT)
  document.querySelectorAll('.input-option-edit').forEach(input => {
    input.addEventListener('input', (e) => {
      const qId = e.target.getAttribute('data-q-id');
      const optId = e.target.getAttribute('data-opt-id');
      store.updateOptionLabel(qId, optId, e.target.value);
    });
  });

  document.querySelectorAll('.btn-add-option-direct').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.addOptionToQuestion(id);
    });
  });

  document.querySelectorAll('.btn-remove-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qId = e.currentTarget.getAttribute('data-q-id');
      const optId = e.currentTarget.getAttribute('data-opt-id');
      store.removeOptionFromQuestion(qId, optId);
    });
  });

  // Duplicate & Open Delete Custom Modal
  document.querySelectorAll('.btn-duplicate-question').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.duplicateQuestion(id);
    });
  });

  document.querySelectorAll('.btn-open-delete-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.openModal('confirm_delete', { questionId: id });
    });
  });

  // Move Question Up/Down
  document.querySelectorAll('.btn-move-q-up').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.moveQuestion(id, 'up');
    });
  });
  document.querySelectorAll('.btn-move-q-down').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.moveQuestion(id, 'down');
    });
  });

  // Open Add Section Custom Glassmorphism Modal
  document.getElementById('btn-open-add-section-modal')?.addEventListener('click', () => {
    store.openModal('add_section');
  });

  // Condition Selectors
  document.querySelectorAll('.select-condition-source').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const qId = e.target.getAttribute('data-q-id');
      const srcId = e.target.value;
      const valInput = document.querySelector(`.input-condition-val[data-q-id="${qId}"]`);
      store.setQuestionCondition(qId, srcId, 'equals', valInput?.value || 'yes');
    });
  });

  document.querySelectorAll('.input-condition-val').forEach(input => {
    input.addEventListener('change', (e) => {
      const qId = e.target.getAttribute('data-q-id');
      const srcSel = document.querySelector(`.select-condition-source[data-q-id="${qId}"]`);
      if (srcSel?.value) {
        store.setQuestionCondition(qId, srcSel.value, 'equals', e.target.value);
      }
    });
  });

  // Step 2 & Step 3 Next Buttons
  document.getElementById('btn-builder-step2-next')?.addEventListener('click', () => store.setBuilderStep(3));
  document.getElementById('btn-builder-goto-step3')?.addEventListener('click', () => store.setBuilderStep(3));
  document.getElementById('btn-builder-step3-next')?.addEventListener('click', async () => {
    await store.publishBuilderSurvey();
  });

  // Step 4 Finish CTAs
  document.getElementById('btn-builder-goto-assign')?.addEventListener('click', () => store.setAdminTab('assignments'));
  document.getElementById('btn-builder-goto-surveys')?.addEventListener('click', () => store.setAdminTab('surveys'));

  // Clone Survey Buttons
  document.querySelectorAll('.btn-admin-clone-survey').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-survey-id');
      await store.cloneAdminSurvey(id);
    });
  });

  // Create Assignment Form
  const formAssign = document.getElementById('form-admin-create-assignment');
  if (formAssign) {
    formAssign.addEventListener('submit', async (e) => {
      e.preventDefault();
      const surveyId = document.getElementById('assign-survey-id')?.value;
      const villageName = document.getElementById('assign-village-name')?.value;
      const targetCount = document.getElementById('assign-target-count')?.value;
      const endDate = document.getElementById('assign-end-date')?.value;
      const note = document.getElementById('assign-note')?.value;

      const checkedUserIds = Array.from(document.querySelectorAll('input[name="assign-personnel"]:checked')).map(cb => cb.value);

      await store.createAdminAssignment(surveyId, villageName, targetCount, endDate, note, checkedUserIds);
    });
  }

  // Toggle Invalid Submission Buttons
  document.querySelectorAll('.btn-toggle-invalid-sub').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-sub-id');
      await store.toggleInvalidSubmission(id);
    });
  });

  // Message Target Mode Radio Listener
  document.querySelectorAll('input[name="msg-target-mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const wrapper = document.getElementById('msg-personnel-selector-wrapper');
      if (wrapper) {
        if (e.target.value === 'specific') {
          wrapper.classList.remove('hidden');
        } else {
          wrapper.classList.add('hidden');
        }
      }
    });
  });

  // Send Message Form
  const formMsg = document.getElementById('form-admin-send-message');
  if (formMsg) {
    formMsg.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('admin-msg-title')?.value;
      const content = document.getElementById('admin-msg-content')?.value;
      const targetMode = document.querySelector('input[name="msg-target-mode"]:checked')?.value;

      let recipientUserIds = null;
      if (targetMode === 'specific') {
        recipientUserIds = Array.from(document.querySelectorAll('input[name="msg-selected-personnel"]:checked')).map(cb => cb.value);
        if (recipientUserIds.length === 0) {
          return;
        }
      }

      if (title && content) {
        await store.createAdminMessage(title, content, recipientUserIds);
      }
    });
  }
}

function attachPwaListeners() {
  // Bottom Nav
  document.getElementById('nav-home')?.addEventListener('click', () => store.setPwaScreen('home'));
  document.getElementById('nav-surveys')?.addEventListener('click', () => store.setPwaScreen('my_surveys'));
  document.getElementById('nav-messages')?.addEventListener('click', () => store.setPwaScreen('messages'));
  document.getElementById('nav-profile')?.addEventListener('click', () => store.setPwaScreen('profile'));

  // PWA Install Banner Actions
  document.getElementById('btn-install-pwa')?.addEventListener('click', () => {
    store.dismissPwaInstall();
  });
  document.getElementById('btn-dismiss-pwa-banner')?.addEventListener('click', () => store.dismissPwaInstall());

  // New Unread Task Notification on Home
  document.getElementById('btn-view-new-task')?.addEventListener('click', () => {
    const unread = store.getState().newAssignments[0];
    if (unread) {
      store.setPwaScreen('task_detail', { taskId: unread.id });
    }
  });

  // Task Cards buttons
  document.querySelectorAll('.btn-open-task-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-task-id');
      store.setPwaScreen('task_detail', { taskId: id });
    });
  });

  document.querySelectorAll('.btn-start-survey-direct').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-task-id');
      store.setPwaScreen('survey_runner', { taskId: id });
    });
  });

  // Quick Builder buttons
  document.getElementById('btn-home-quick-builder')?.addEventListener('click', () => store.setPwaScreen('quick_builder'));
  document.getElementById('btn-surveys-quick-builder')?.addEventListener('click', () => store.setPwaScreen('quick_builder'));

  // Messages Preview on Home
  document.getElementById('btn-home-msg-preview')?.addEventListener('click', () => {
    const msg = store.getState().messages.find(m => m.isUnread) || store.getState().messages[0];
    if (msg) store.setPwaScreen('message_detail', { messageId: msg.id });
  });

  // Messages List items
  document.querySelectorAll('.btn-open-msg-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-msg-id');
      store.setPwaScreen('message_detail', { messageId: id });
    });
  });

  // Back Buttons
  document.getElementById('btn-back-to-home')?.addEventListener('click', () => store.setPwaScreen('home'));
  document.getElementById('btn-back-to-messages')?.addEventListener('click', () => store.setPwaScreen('messages'));
  document.getElementById('btn-cancel-runner')?.addEventListener('click', () => store.setPwaScreen('home'));
  document.getElementById('btn-cancel-builder')?.addEventListener('click', () => store.setPwaScreen('home'));

  // Detail View CTA
  document.getElementById('btn-detail-start-survey')?.addEventListener('click', () => {
    const taskId = store.getState().selectedTaskId;
    store.setPwaScreen('survey_runner', { taskId });
  });

  // FORM RUNNER INPUT LISTENERS
  document.querySelectorAll('.runner-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const id = e.target.getAttribute('data-q-id');
      const val = e.target.value;
      store.updateAnswer(id, val);
    });
  });

  document.querySelectorAll('.btn-runner-yesno').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      const val = e.currentTarget.getAttribute('data-val');
      store.updateAnswer(id, val);
    });
  });

  document.querySelectorAll('.runner-radio-row').forEach(row => {
    row.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      const opt = e.currentTarget.getAttribute('data-opt');
      store.updateAnswer(id, opt);
    });
  });

  document.getElementById('btn-runner-photo')?.addEventListener('click', () => store.togglePhotoUpload());
  document.getElementById('btn-runner-location')?.addEventListener('click', () => store.acquireLocation());

  // Form Wizard Nav
  document.getElementById('btn-runner-next')?.addEventListener('click', () => {
    const curIndex = store.getState().activeSectionIndex || 0;
    store.setFormSection(curIndex + 1);
  });
  document.getElementById('btn-runner-prev')?.addEventListener('click', () => {
    const curIndex = store.getState().activeSectionIndex || 0;
    if (curIndex > 0) {
      store.setFormSection(curIndex - 1);
    } else {
      store.setPwaScreen('home');
    }
  });
  document.getElementById('btn-runner-prev-disabled')?.addEventListener('click', () => {
    store.setPwaScreen('home');
  });
  document.getElementById('btn-runner-submit')?.addEventListener('click', async () => {
    await store.submitActiveSurvey();
  });

  // SUCCESS SCREEN
  document.getElementById('btn-success-new-survey')?.addEventListener('click', () => store.setPwaScreen('survey_runner'));
  document.getElementById('btn-success-back-home')?.addEventListener('click', () => store.setPwaScreen('home'));

  // SEGMENTED TABS IN ANKETLERİM
  document.getElementById('tab-assigned')?.addEventListener('click', () => {
    store.state.surveysTab = 'assigned';
    store.notify();
  });
  document.getElementById('tab-my-quick')?.addEventListener('click', () => {
    store.state.surveysTab = 'my_quick';
    store.notify();
  });

  // QUICK BUILDER SUBMIT
  const formQB = document.getElementById('form-quick-builder');
  if (formQB) {
    formQB.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('qb-title')?.value;
      store.createQuickSurvey(title);
    });
  }

  // PROFILE LOGOUT
  document.getElementById('btn-logout')?.addEventListener('click', () => store.logout());
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  store.subscribe(() => renderApp());
});
