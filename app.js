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
  renderPwaSurveyBuilderContainer,
  renderMessages,
  renderMessageDetail,
  renderProfile,
  renderAdminView,
  renderToastNotification
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
      ${renderToastNotification(state)}
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
    case 'builder':
    case 'quick_builder':
      screenContent = renderPwaSurveyBuilderContainer(state);
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

// GLOBAL DELEGATED DOCUMENT LISTENERS (GUARANTEES DYNAMIC MODALS WORK 100%)
if (!window.__globalListenersAttached) {
  window.__globalListenersAttached = true;

  document.addEventListener('click', async (e) => {
    const builderTarget = e.target.closest('#btn-home-quick-builder, #btn-surveys-quick-builder, .btn-open-quick-builder, #btn-cancel-builder');
    if (builderTarget) {
      if (builderTarget.id === 'btn-cancel-builder') {
        if (store.state.currentRole === 'pwa') {
          store.setPwaScreen('home');
        } else {
          store.setAdminTab('surveys');
        }
      } else {
        store.startNewBuilder();
      }
      return;
    }

    const templateBtn = e.target.closest('.btn-preset-template');
    if (templateBtn) {
      const title = templateBtn.getAttribute('data-title');
      const desc = templateBtn.getAttribute('data-desc');
      store.updateBuilderInfo(title, desc);
      store.setBuilderStep(2);
      return;
    }

    const composeMsgBtn = e.target.closest('#btn-open-compose-msg-modal');
    if (composeMsgBtn) {
      store.openModal('compose_message');
      return;
    }

    const target = e.target.closest('.btn-open-add-section-modal, #btn-close-custom-modal, .btn-open-review-survey-modal, .btn-set-q-review-status, .btn-submit-survey-revision');
    if (!target) return;

    if (target.classList.contains('btn-open-add-section-modal')) {
      store.openModal('add_section');
      return;
    }

    if (target.id === 'btn-close-custom-modal') {
      store.closeModal();
      return;
    }

    if (target.classList.contains('btn-open-review-survey-modal')) {
      const surveyId = target.getAttribute('data-survey-id');
      const survey = store.getState().allSurveys.find(s => s.id === surveyId);
      if (survey) store.openModal('review_survey', { survey });
      return;
    }

    if (target.classList.contains('btn-set-q-review-status')) {
      const surveyId = target.getAttribute('data-survey-id');
      const qId = target.getAttribute('data-q-id');
      const status = target.getAttribute('data-status');
      
      const noteInput = document.querySelector(`.input-q-review-note[data-survey-id="${surveyId}"][data-q-id="${qId}"]`);
      const note = noteInput ? noteInput.value.trim() : '';

      if (surveyId && qId && status) {
        store.updateQuestionReviewStatus(surveyId, qId, status, note);
        const currentSurvey = store.getState().allSurveys.find(s => s.id === surveyId);
        if (currentSurvey) store.openModal('review_survey', { survey: currentSurvey });
      }
      return;
    }

    if (target.classList.contains('btn-submit-survey-revision')) {
      const surveyId = target.getAttribute('data-survey-id');
      const reasonInput = document.getElementById('input-general-revision-reason');
      
      if (!reasonInput) {
        store.state.showRevisionBox = true;
        const currentSurvey = store.getState().allSurveys.find(s => s.id === surveyId);
        if (currentSurvey) store.openModal('review_survey', { survey: currentSurvey });
        setTimeout(() => {
          document.getElementById('input-general-revision-reason')?.focus();
        }, 100);
        store.setToast('Lütfen saha ekibine iletilecek revizyon talimatını yazınız.', 'info');
        return;
      }

      const reason = reasonInput.value.trim();
      if (!reason) {
        store.setToast('Lütfen saha ekibine iletilecek revizyon talimatını yazınız!', 'error');
        reasonInput.focus();
        return;
      }

      if (surveyId) {
        store.state.showRevisionBox = false;
        await store.requestSurveyRevision(surveyId, reason);
      }
      return;
    }
  });

  document.addEventListener('submit', async (e) => {
    const target = e.target;
    if (!target) return;

    if (target.id === 'form-pwa-send-message') {
      e.preventDefault();
      const title = document.getElementById('input-pwa-msg-title')?.value;
      const content = document.getElementById('input-pwa-msg-content')?.value;
      if (title && content) {
        store.sendPwaMessageToAdmin(title, content);
      }
      return;
    }

    if (target.id === 'form-custom-add-section') {
      e.preventDefault();
      const titleInput = document.getElementById('custom-sec-title');
      const title = titleInput ? titleInput.value.trim() : '';
      if (title) {
        store.addSectionToBuilder(title);
      }
      return;
    }

    if (target.id === 'form-custom-reject-survey') {
      e.preventDefault();
      const surveyId = target.getAttribute('data-survey-id');
      const reason = document.getElementById('reject-survey-reason')?.value;
      if (surveyId && reason) {
        await store.rejectAdminSurvey(surveyId, reason.trim());
      }
      return;
    }
  });
}

function attachLoginListeners() {
  attachGlobalSystemListeners();
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      const pwd = document.getElementById('login-password')?.value;
      await store.login(email, pwd);
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

function showPersonnelModalError(msg) {
  const alertBox = document.getElementById('personnel-modal-error-alert');
  const alertText = document.getElementById('personnel-modal-error-text');
  if (alertBox && alertText) {
    alertText.textContent = msg;
    alertBox.classList.remove('hidden');
  }
}

function validatePersonnelInput(email, phone, password, isPasswordOptional = false, userIdToExclude = null) {
  const allPersonnel = store.getState().allPersonnel || [];

  // 1. BENZERSİZ E-POSTA KONTROLÜ
  const emailExists = allPersonnel.some(p => p.email && p.email.trim().toLowerCase() === email.trim().toLowerCase() && p.id !== userIdToExclude);
  if (emailExists) {
    return `⚠️ '${email.trim()}' e-posta adresi sistemde zaten kayıtlı! Başka bir e-posta adresi giriniz.`;
  }

  // 2. TÜRKİYE TELEFON FORMATI KONTROLÜ (0 olmadan 5xx xxx xx xx, 10 hane)
  const trimmedPhone = phone.trim();
  if (trimmedPhone.startsWith('0')) {
    return '⚠️ Telefon numarası başında 0 OLMADAN 5xx xxx xx xx formatında girilmelidir! (Örn: 5359998877)';
  }
  const cleanPhone = trimmedPhone.replace(/\D/g, '');
  if (!/^5\d{9}$/.test(cleanPhone)) {
    return '⚠️ Geçerli bir cep telefonu giriniz! 0 olmadan 5xx xxx xx xx (10 haneli) olmalıdır.';
  }

  // 3. GÜÇLÜ ŞİFRE KONTROLÜ (Min 8 karakter, büyük harf, küçük harf, rakam, özel karakter)
  if (!isPasswordOptional || (password && password.trim().length > 0)) {
    const pwd = password ? password.trim() : '';
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!strongPasswordRegex.test(pwd)) {
      return '⚠️ Güçlü şifre gereklidir: En az 8 karakter, 1 büyük harf (A-Z), 1 küçük harf (a-z), 1 rakam (0-9) ve 1 özel karakter (!@#$%^&*) içermelidir.';
    }
  }

  return null;
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
      const email = document.getElementById('personnel-email')?.value;
      const phone = document.getElementById('personnel-phone')?.value;
      const password = document.getElementById('personnel-password')?.value;
      const role = document.getElementById('personnel-role')?.value;

      if (!fullName || !email || !phone || !password) return;

      const validationError = validatePersonnelInput(email, phone, password, false, null);
      if (validationError) {
        showPersonnelModalError(validationError);
        return;
      }

      await store.createAdminPersonnel(fullName.trim(), email.trim(), phone.trim(), password.trim(), role);
    });
  }

  // EDIT PERSONNEL MODAL & SUBMIT
  document.querySelectorAll('.btn-open-edit-personnel-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.getAttribute('data-user-id');
      const user = store.getState().allPersonnel.find(p => p.id === userId);
      if (user) {
        store.openModal('edit_personnel', { user });
      }
    });
  });

  const formEditPersonnel = document.getElementById('form-custom-edit-personnel');
  if (formEditPersonnel) {
    formEditPersonnel.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = e.target.getAttribute('data-user-id');
      const fullName = document.getElementById('edit-personnel-fullname')?.value;
      const email = document.getElementById('edit-personnel-email')?.value;
      const phone = document.getElementById('edit-personnel-phone')?.value;
      const role = document.getElementById('edit-personnel-role')?.value;
      const password = document.getElementById('edit-personnel-password')?.value;

      if (!userId || !fullName || !email || !phone) return;

      const validationError = validatePersonnelInput(email, phone, password, true, userId);
      if (validationError) {
        showPersonnelModalError(validationError);
        return;
      }

      await store.updateAdminPersonnel(userId, fullName.trim(), email.trim(), phone.trim(), role, password ? password.trim() : undefined);
    });
  }

  // DELETE PERSONNEL MODAL & CONFIRM
  document.querySelectorAll('.btn-open-delete-personnel-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const userId = e.currentTarget.getAttribute('data-user-id');
      const user = store.getState().allPersonnel.find(p => p.id === userId);
      if (user) {
        store.openModal('confirm_delete_personnel', { user });
      }
    });
  });

  document.getElementById('btn-confirm-delete-personnel')?.addEventListener('click', async (e) => {
    const userId = e.currentTarget.getAttribute('data-user-id');
    if (userId) {
      await store.deleteAdminPersonnel(userId);
    }
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
      store.setQuestionCondition(qId, srcId, 'equals', valInput?.value || 'evet');
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
    await store.submitForApproval();
  });

  // Approve & Reject Survey Listeners for Admin
  document.querySelectorAll('.btn-approve-admin-survey').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-survey-id');
      if (id) await store.approveAdminSurvey(id);
    });
  });

  document.querySelectorAll('.btn-reject-admin-survey').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-survey-id');
      const survey = store.getState().allSurveys.find(s => s.id === id);
      if (survey) store.openModal('reject_survey', { survey });
    });
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

  // TOGGLE DOWNWARD DROPDOWN MENU
  document.getElementById('btn-toggle-msg-personnel-dropdown')?.addEventListener('click', () => {
    const menu = document.getElementById('dropdown-msg-personnel-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  });

  // UPDATE SELECTED COUNT LABEL ON CHECKBOX CHANGE
  const updateSelectedPersonnelCountLabel = () => {
    const checked = document.querySelectorAll('.cb-msg-personnel:checked');
    const label = document.getElementById('label-selected-personnel-count');
    if (label) {
      label.textContent = checked.length > 0 ? `Personeller Seçildi (${checked.length} kişi seçildi)` : `Personelleri Seçin (0 kişi seçildi)`;
    }
  };

  document.querySelectorAll('.cb-msg-personnel').forEach(cb => {
    cb.addEventListener('change', updateSelectedPersonnelCountLabel);
  });

  // SELECT ALL & CLEAR ALL BUTTONS
  document.getElementById('btn-msg-select-all-personnel')?.addEventListener('click', () => {
    document.querySelectorAll('.msg-personnel-item:not(.hidden) .cb-msg-personnel').forEach(cb => {
      cb.checked = true;
    });
    updateSelectedPersonnelCountLabel();
  });

  document.getElementById('btn-msg-clear-all-personnel')?.addEventListener('click', () => {
    document.querySelectorAll('.cb-msg-personnel').forEach(cb => {
      cb.checked = false;
    });
    updateSelectedPersonnelCountLabel();
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

  // LIVE SEARCH & FILTER EVENT LISTENERS
  const inputSearchSub = document.getElementById('input-search-submissions');
  if (inputSearchSub) {
    inputSearchSub.addEventListener('input', (e) => {
      store.setSearchSubmissionsQuery(e.target.value);
    });
  }

  document.querySelectorAll('.btn-filter-status-sub').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-filter');
      store.setStatusFilterSubmissions(filter);
    });
  });

  const inputSearchPers = document.getElementById('input-search-personnel');
  if (inputSearchPers) {
    inputSearchPers.addEventListener('input', (e) => {
      store.setSearchPersonnelQuery(e.target.value);
    });
  }

  document.querySelectorAll('.btn-filter-role-personnel').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-filter');
      store.setRoleFilterPersonnel(filter);
    });
  });

  const inputSearchSurveys = document.getElementById('input-search-surveys');
  if (inputSearchSurveys) {
    inputSearchSurveys.addEventListener('input', (e) => {
      store.setSearchSurveysQuery(e.target.value);
    });
  }

  // BUILDER STEP 3 LIVE PREVIEW INTERACTION LISTENERS
  document.querySelectorAll('.btn-preview-yesno').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qId = e.currentTarget.getAttribute('data-q-id');
      const val = e.currentTarget.getAttribute('data-val');
      store.setBuilderPreviewAnswer(qId, val);
    });
  });

  document.querySelectorAll('.btn-preview-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qId = e.currentTarget.getAttribute('data-q-id');
      const val = e.currentTarget.getAttribute('data-val');
      store.setBuilderPreviewAnswer(qId, val);
    });
  });

  document.querySelectorAll('.input-preview-answer').forEach(input => {
    input.addEventListener('input', (e) => {
      const qId = e.target.getAttribute('data-q-id');
      store.setBuilderPreviewAnswer(qId, e.target.value);
    });
  });
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
  document.getElementById('btn-home-quick-builder')?.addEventListener('click', () => store.startNewBuilder());
  document.getElementById('btn-surveys-quick-builder')?.addEventListener('click', () => store.startNewBuilder());

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

  // 4-STEP BUILDER EVENT LISTENERS FOR PWA / FIELD USERS
  document.querySelectorAll('.btn-builder-step-nav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const st = parseInt(e.currentTarget.getAttribute('data-builder-step'));
      store.setBuilderStep(st);
    });
  });

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

  document.querySelectorAll('.btn-add-question-type').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.getAttribute('data-type');
      store.addQuestionToBuilder(type);
    });
  });

  document.querySelectorAll('.btn-toggle-question').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.toggleQuestionExpanded(id);
    });
  });

  document.querySelectorAll('.input-builder-q-title').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-q-id');
      store.updateQuestionTitle(id, e.target.value);
    });
  });

  document.querySelectorAll('.btn-toggle-required').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-q-id');
      store.toggleQuestionRequired(id);
    });
  });

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

  document.getElementById('btn-builder-step2-next')?.addEventListener('click', () => store.setBuilderStep(3));
  document.getElementById('btn-builder-goto-step3')?.addEventListener('click', () => store.setBuilderStep(3));
  document.getElementById('btn-builder-step3-next')?.addEventListener('click', async () => {
    await store.submitForApproval();
  });

  // PROFILE LOGOUT
  document.getElementById('btn-logout')?.addEventListener('click', () => store.logout());
}

// Initial Boot (Safe for ES Modules & instant rendering)
function boot() {
  try {
    renderApp();
  } catch (err) {
    console.error('App initial render error:', err);
  }
  store.subscribe(() => {
    try {
      renderApp();
    } catch (err) {
      console.error('App re-render error:', err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
