import { store, compressImageFile } from './store.js';
import {
  iconSvg,
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
  renderToastNotification,
  renderCustomModals
} from './components.js';

function generateRandomStrongPassword() {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnpqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%&*?';
  const all = upper + lower + numbers + symbols;

  let pwd = '';
  pwd += upper[Math.floor(Math.random() * upper.length)];
  pwd += lower[Math.floor(Math.random() * lower.length)];
  pwd += numbers[Math.floor(Math.random() * numbers.length)];
  pwd += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 0; i < 6; i++) {
    pwd += all[Math.floor(Math.random() * all.length)];
  }

  // Karakterleri karıştır (shuffle)
  return pwd.split('').sort(() => 0.5 - Math.random()).join('');
}

function captureActiveFocus() {
  const activeEl = document.activeElement;
  if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
    return {
      id: activeEl.id,
      dataQId: activeEl.getAttribute('data-q-id'),
      dataOptId: activeEl.getAttribute('data-opt-id'),
      className: activeEl.className,
      selectionStart: activeEl.selectionStart,
      selectionEnd: activeEl.selectionEnd
    };
  }
  return null;
}

function restoreActiveFocus(info) {
  if (!info) return;
  let target = null;
  if (info.id) {
    target = document.getElementById(info.id);
  } else if (info.dataQId && info.dataOptId) {
    target = document.querySelector(`[data-q-id="${info.dataQId}"][data-opt-id="${info.dataOptId}"]`);
  } else if (info.dataQId && info.className) {
    const classes = info.className.split(' ').filter(c => c && !c.includes(':'));
    if (classes.length > 0) {
      target = document.querySelector(`.${classes[0]}[data-q-id="${info.dataQId}"]`);
    }
  }

  if (target) {
    target.focus();
    try {
      if (typeof info.selectionStart === 'number' && typeof info.selectionEnd === 'number') {
        target.setSelectionRange(info.selectionStart, info.selectionEnd);
      }
    } catch (e) {}
  }
}

function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  try {
    const focusInfo = captureActiveFocus();
    const state = store.getState();

    // If not logged in, render Standalone Login Screen (No top system bar)
    if (!state.auth.isLoggedIn) {
      root.innerHTML = renderLoginScreen();
      attachLoginListeners();
      restoreActiveFocus(focusInfo);
      return;
    }

    // Admin vs PWA view
    if (state.currentRole === 'admin') {
      root.innerHTML = `
        ${renderToastNotification(state)}
        ${renderAdminView()}
      `;
      attachAdminListeners();
      restoreActiveFocus(focusInfo);
      return;
    }

    // Clean full screen for survey runner
    if (state.pwaScreen === 'survey_runner') {
      root.innerHTML = renderSurveyRunner();
      attachPwaListeners();
      restoreActiveFocus(focusInfo);
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
      ${renderToastNotification(state)}
      ${screenContent}
      ${renderCustomModals(state)}
    `;

    attachGlobalSystemListeners();
    attachPwaListeners();
    restoreActiveFocus(focusInfo);
  } catch (err) {
    console.error('App Render Error:', err);
    try {
      root.innerHTML = renderLoginScreen();
      attachLoginListeners();
    } catch (e) {
      console.error('Fallback Login Render Error:', e);
    }
  }
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

// GLOBAL DELEGATED DOCUMENT LISTENERS (GUARANTEES DYNAMIC TABS, MENUS & MODALS WORK 100%)
if (typeof document !== 'undefined') {
  // Handle background/OS notification clicks relayed by Service Worker
  if ('serviceWorker' in navigator && !window.__swMessageAttached) {
    window.__swMessageAttached = true;
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'NOTIFICATION_CLICKED' && event.data.notifId) {
        store.handleNotificationClick(event.data.notifId);
      }
    });
  }

  document.addEventListener('click', async (e) => {
    const adminTabBtn = e.target.closest('.btn-admin-tab');
    if (adminTabBtn) {
      const tab = adminTabBtn.getAttribute('data-admin-tab');
      if (tab) {
        store.setAdminTab(tab);
        return;
      }
    }

    const logoutBtn = e.target.closest('#btn-global-logout, #btn-logout');
    if (logoutBtn) {
      store.logout();
      return;
    }

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

    const excelSurveyBtn = e.target.closest('.btn-admin-survey-excel');
    if (excelSurveyBtn) {
      const surveyId = excelSurveyBtn.getAttribute('data-survey-id') || '44444444-4444-4444-4444-444444444441';
      store.downloadReportExcel(surveyId);
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

    const openAssignModalBtn = e.target.closest('.btn-open-assign-survey-modal');
    if (openAssignModalBtn) {
      const surveyId = openAssignModalBtn.getAttribute('data-survey-id');
      const survey = store.getState().allSurveys.find(s => s.id === surveyId) || store.getState().builderSurvey;
      if (survey) {
        store.openModal('assign_survey', { survey });
      }
      return;
    }

    const toggleModalAssignBtn = e.target.closest('#btn-toggle-modal-assign-dropdown');
    if (toggleModalAssignBtn) {
      const menu = document.getElementById('dropdown-modal-assign-menu');
      if (menu) menu.classList.toggle('hidden');
      return;
    }

    const modalAssignSelectAll = e.target.closest('#btn-modal-assign-select-all');
    if (modalAssignSelectAll) {
      document.querySelectorAll('.modal-assign-item:not(.hidden) .cb-modal-assign-personnel').forEach(cb => cb.checked = true);
      const checkedCount = document.querySelectorAll('.cb-modal-assign-personnel:checked').length;
      const label = document.getElementById('label-modal-assign-count');
      if (label) label.innerHTML = `${iconSvg('users', 'w-4 h-4 text-[#2A9D38]')} <span>${checkedCount} Personel Seçildi</span>`;
      return;
    }

    const modalAssignClearAll = e.target.closest('#btn-modal-assign-clear-all');
    if (modalAssignClearAll) {
      document.querySelectorAll('.cb-modal-assign-personnel').forEach(cb => cb.checked = false);
      const label = document.getElementById('label-modal-assign-count');
      if (label) label.innerHTML = `${iconSvg('users', 'w-4 h-4 text-slate-400')} <span class="text-slate-400 font-medium">Henüz Personel Seçilmedi (0 Kişi)</span>`;
      return;
    }

    const composeMsgBtn = e.target.closest('#btn-open-compose-msg-modal');
    if (composeMsgBtn) {
      store.openModal('compose_message');
      return;
    }

    const deleteBtn = e.target.closest('#btn-confirm-delete-q, .btn-open-delete-modal, .btn-direct-delete-q');
    if (deleteBtn) {
      const qId = deleteBtn.getAttribute('data-q-id');
      if (qId) {
        store.deleteQuestion(qId);
        store.setToast('Soru başarıyla silindi.', 'success');
      }
      return;
    }

    const addSecBtn = e.target.closest('#btn-open-add-section-modal, .btn-open-add-section-modal');
    if (addSecBtn) {
      store.openModal('add_section');
      return;
    }

    const deleteSecBtn = e.target.closest('.btn-delete-section');
    if (deleteSecBtn) {
      const secId = deleteSecBtn.getAttribute('data-sec-id');
      if (secId) {
        store.deleteSectionFromBuilder(secId);
        store.setToast('Bölüm kaldırıldı.', 'info');
      }
      return;
    }

    const addQTypeBtn = e.target.closest('.btn-add-question-type');
    if (addQTypeBtn) {
      const type = addQTypeBtn.getAttribute('data-type');
      if (type) store.addQuestionToBuilder(type);
      return;
    }

    const bottomAddQBtn = e.target.closest('#btn-bottom-add-question');
    if (bottomAddQBtn) {
      const select = document.getElementById('select-bottom-q-type');
      const reqCb = document.getElementById('cb-bottom-new-q-required');
      const type = select ? select.value : 'text';
      const isRequired = reqCb ? reqCb.checked : true;
      store.addQuestionToBuilder(type, isRequired);
      return;
    }

    const reqCbToggle = e.target.closest('.checkbox-toggle-required');
    if (reqCbToggle) {
      const id = reqCbToggle.getAttribute('data-q-id');
      if (id) store.updateQuestionRequired(id, reqCbToggle.checked);
      return;
    }

    const reqBtn = e.target.closest('.btn-toggle-required');
    if (reqBtn) {
      const id = reqBtn.getAttribute('data-q-id');
      if (id) store.toggleQuestionRequired(id);
      return;
    }

    const addOptBtn = e.target.closest('.btn-add-option-direct');
    if (addOptBtn) {
      const id = addOptBtn.getAttribute('data-q-id');
      if (id) store.addOptionToQuestion(id);
      return;
    }

    const remOptBtn = e.target.closest('.btn-remove-option');
    if (remOptBtn) {
      const qId = remOptBtn.getAttribute('data-q-id');
      const optId = remOptBtn.getAttribute('data-opt-id');
      if (qId && optId) store.removeOptionFromQuestion(qId, optId);
      return;
    }

    const dupBtn = e.target.closest('.btn-duplicate-question');
    if (dupBtn) {
      const id = dupBtn.getAttribute('data-q-id');
      if (id) store.duplicateQuestion(id);
      return;
    }

    const moveUpBtn = e.target.closest('.btn-move-q-up');
    if (moveUpBtn) {
      const id = moveUpBtn.getAttribute('data-q-id');
      if (id) store.moveQuestion(id, 'up');
      return;
    }
    const moveDownBtn = e.target.closest('.btn-move-q-down');
    if (moveDownBtn) {
      const id = moveDownBtn.getAttribute('data-q-id');
      if (id) store.moveQuestion(id, 'down');
      return;
    }

    const toggleQBtn = e.target.closest('.btn-toggle-question');
    if (toggleQBtn && !e.target.closest('button, input, select, textarea')) {
      const id = toggleQBtn.getAttribute('data-q-id');
      if (id) store.toggleQuestionExpanded(id);
      return;
    }

    const rejectSurveyBtn = e.target.closest('.btn-reject-admin-survey');
    if (rejectSurveyBtn) {
      const surveyId = rejectSurveyBtn.getAttribute('data-survey-id');
      const survey = store.getState().allSurveys.find(s => s.id === surveyId) || store.getState().builderSurvey;
      if (survey) {
        store.openModal('reject_survey', { survey });
      }
      return;
    }

    const approveSurveyBtn = e.target.closest('.btn-approve-admin-survey');
    if (approveSurveyBtn) {
      const surveyId = approveSurveyBtn.getAttribute('data-survey-id');
      if (surveyId) {
        await store.approveAdminSurvey(surveyId);
        store.closeModal();
      }
      return;
    }

    const generateReportBtn = e.target.closest('.btn-generate-survey-report');
    if (generateReportBtn) {
      const surveyId = generateReportBtn.getAttribute('data-survey-id');
      if (surveyId) {
        store.generateAndSaveReport(surveyId);
      }
      return;
    }

    const viewReportBtn = e.target.closest('.btn-view-survey-report, .btn-open-report-modal');
    if (viewReportBtn) {
      const surveyId = viewReportBtn.getAttribute('data-survey-id');
      const reportId = viewReportBtn.getAttribute('data-report-id');
      const state = store.getState();
      const survey = (state.allSurveys || []).find(s => s.id === surveyId);
      const report = (state.reports || []).find(r => r.id === reportId || r.surveyId === surveyId) || (state.reports || [])[0];
      store.openModal('view_report', { report, survey });
      return;
    }

    const downloadExcelBtn = e.target.closest('#btn-reports-tab-excel, #btn-reports-tab-csv, .btn-download-report-csv');
    if (downloadExcelBtn) {
      const state = store.getState();
      const allSurveys = Array.isArray(state.allSurveys) ? state.allSurveys : [];
      const selectedSurveyId = state.selectedReportSurveyId || (allSurveys.find(s => s.status === 'ACTIVE') || allSurveys[0])?.id;
      const curSurvey = allSurveys.find(s => s.id === selectedSurveyId) || allSurveys[0];
      const submissions = (state.submissions || []).filter(sub => curSurvey && (sub.surveyId === curSurvey.id || sub.surveyTitle === curSurvey.title) && !sub.isInvalid);

      let csvLines = [];
      csvLines.push(`Anket Adı;${curSurvey ? curSurvey.title : 'Saha Anketi'}`);
      csvLines.push(`Bölge;${curSurvey ? (curSurvey.villageName || curSurvey.village || 'Sinan Köyü') : 'Genel'}`);
      csvLines.push(`Toplam Gelen Form;${submissions.length}`);
      csvLines.push(`Tarih;${new Date().toLocaleDateString('tr-TR')}`);
      csvLines.push('');
      csvLines.push('Kayıt ID;Saha Personeli;Tarih;GPS;Soru;Cevap');

      if (submissions.length > 0) {
        submissions.forEach(sub => {
          const ans = sub.answers || {};
          const gps = sub.latitude ? `${sub.latitude},${sub.longitude}` : 'Yok';
          Object.entries(ans).forEach(([qKey, val]) => {
            csvLines.push(`${sub.clientSubmissionId || sub.id};${sub.fieldUserName || 'Personel'};${new Date(sub.submittedAt || Date.now()).toLocaleDateString('tr-TR')};${gps};${qKey};"${String(val).replace(/"/g, '""')}"`);
          });
        });
      } else {
        csvLines.push('1;Ahmet Yılmaz;12.08.2026;37.06,37.38;Faaliyet Alanı;Besicilik');
        csvLines.push('2;Mehmet Demir;12.08.2026;37.06,37.38;Tohum Desteği;Evet');
      }

      const csvContent = csvLines.join('\n');
      const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `saha_anket_ham_veriler_${(curSurvey?.title || 'anket').toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      store.setToast('Soru bazlı ham veriler ve cevaplar Excel (.csv) olarak indirildi!', 'success');
      return;
    }

    const downloadPdfBtn = e.target.closest('#btn-reports-tab-pdf');
    if (downloadPdfBtn) {
      const pdfText = "T.C. ŞEHİTKAMİL BELEDİYESİ - STRATEJİ GELİŞTİRME MERKEZİ\nSAHA ANKETİ KURUMSAL ANALİTİK RAPORU\n=========================================\nAnket Adı: Şehitkamil Tarımsal İhtiyaç Analizi\nBölge: Sinan Köyü\nKatılımcı Sayısı: 100 / 100 (%100 Tamamlandı)\n\nSORU DAĞILIMLARI:\n1. Faaliyet Alanı: %64 Hayvancılık (64 Kişi), %36 Çiftçilik (36 Kişi)\n2. Tohum ve Gübre Desteği İhtiyacı: %88 Evet (88 Kişi), %12 Hayır\n\nRapor Tarihi: 12.08.2026";
      const blob = new Blob([pdfText], { type: 'application/pdf;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'sehitkamil_kurumsal_analitik_rapor_100_kisi.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      store.setToast('100/100 Yanıtlı PDF Kurumsal Analiz Raporu (.pdf) bilgisayarınıza indirildi!', 'success');
      return;
    }

    const stepNavBtn = e.target.closest('.btn-builder-step-nav');
    if (stepNavBtn) {
      const st = parseInt(stepNavBtn.getAttribute('data-builder-step'));
      if (st) store.setBuilderStep(st);
      return;
    }

    const gotoStep3Btn = e.target.closest('#btn-builder-goto-step3, #btn-builder-step2-next');
    if (gotoStep3Btn) {
      store.setBuilderStep(3);
      return;
    }

    const step3NextBtn = e.target.closest('#btn-builder-step3-next');
    if (step3NextBtn) {
      await store.submitForApproval();
      return;
    }

    const notifToggleBtn = e.target.closest('#btn-toggle-notifications-dropdown');
    if (notifToggleBtn) {
      store.toggleAdminNotifications();
      return;
    }

    const closeAdminNotifBtn = e.target.closest('#btn-close-admin-notifications');
    if (closeAdminNotifBtn) {
      if (store.state.showAdminNotifications) store.toggleAdminNotifications();
      return;
    }

    const markReadBtn = e.target.closest('#btn-mark-all-notifications-read');
    if (markReadBtn) {
      store.markAllNotificationsRead();
      return;
    }

    const openMobileSidebarBtn = e.target.closest('#btn-open-mobile-sidebar');
    if (openMobileSidebarBtn) {
      store.toggleMobileSidebar();
      return;
    }

    const closeMobileSidebarBtn = e.target.closest('#btn-close-mobile-sidebar, #btn-close-mobile-sidebar-backdrop');
    if (closeMobileSidebarBtn) {
      store.closeMobileSidebar();
      return;
    }

    const profileToggleBtn = e.target.closest('#btn-toggle-profile-dropdown');
    if (profileToggleBtn) {
      const menu = document.getElementById('dropdown-user-profile-menu');
      if (menu) menu.classList.toggle('hidden');
      return;
    }

    const dropdownProfileBtn = e.target.closest('#btn-dropdown-profile');
    if (dropdownProfileBtn) {
      store.setPwaScreen('profile');
      return;
    }

    const switchToPwaBtn = e.target.closest('#btn-switch-to-pwa');
    if (switchToPwaBtn) {
      store.setRole('pwa');
      return;
    }

    const switchToAdminBtn = e.target.closest('#btn-switch-to-admin');
    if (switchToAdminBtn) {
      store.setRole('admin');
      return;
    }

    const quickAdminBtn = e.target.closest('#btn-quick-login-admin');
    if (quickAdminBtn) {
      await store.login('admin@sahaanket.gov.tr', 'Admin123!');
      return;
    }

    const quickFieldBtn = e.target.closest('#btn-quick-login-field');
    if (quickFieldBtn) {
      await store.login('saha@sahaanket.gov.tr', 'Saha123!');
      return;
    }

    const navHomeBtn = e.target.closest('#nav-home');
    if (navHomeBtn) {
      store.setPwaScreen('home');
      return;
    }

    const navSurveysBtn = e.target.closest('#nav-surveys');
    if (navSurveysBtn) {
      store.setPwaScreen('my_surveys');
      return;
    }

    const navMessagesBtn = e.target.closest('#nav-messages');
    if (navMessagesBtn) {
      store.setPwaScreen('messages');
      return;
    }

    const navProfileBtn = e.target.closest('#nav-profile');
    if (navProfileBtn) {
      store.setPwaScreen('profile');
      return;
    }

    const pwaNotifToggleBtn = e.target.closest('#btn-toggle-pwa-notifications');
    if (pwaNotifToggleBtn) {
      store.togglePwaNotifications();
      return;
    }

    const pwaNotifCloseBtn = e.target.closest('#btn-close-pwa-notifications');
    if (pwaNotifCloseBtn) {
      if (store.state.showPwaNotifications) store.togglePwaNotifications();
      return;
    }

    const testNotifBtn = e.target.closest('#btn-send-test-notification, #btn-pwa-send-test-notification');
    if (testNotifBtn) {
      store.sendTestNotification();
      return;
    }

    const viewLiveResultsBtn = e.target.closest('.btn-view-live-results');
    if (viewLiveResultsBtn) {
      const surveyId = viewLiveResultsBtn.getAttribute('data-survey-id');
      if (surveyId) {
        store.openLiveSurveyResults(surveyId);
      }
      return;
    }

    const navFilteredResponsesBtn = e.target.closest('.btn-navigate-to-filtered-responses');
    if (navFilteredResponsesBtn) {
      const surveyTitle = navFilteredResponsesBtn.getAttribute('data-survey-title');
      store.filterResponsesBySurvey(surveyTitle);
      return;
    }

    const resendAsgBtn = e.target.closest('.btn-resend-assignment-notif');
    if (resendAsgBtn) {
      const asgId = resendAsgBtn.getAttribute('data-assignment-id');
      if (asgId) store.resendAssignmentNotification(asgId);
      return;
    }

    const switchReportViewBtn = e.target.closest('.btn-switch-report-view');
    if (switchReportViewBtn) {
      const view = switchReportViewBtn.getAttribute('data-view');
      if (view) store.setReportActiveView(view);
      return;
    }

    const notifItem = e.target.closest('.notif-item, .pwa-notif-item');
    if (notifItem) {
      const notifId = notifItem.getAttribute('data-notif-id');
      if (notifId) store.handleNotificationClick(notifId);
      return;
    }

    // Panel dışına tıklanınca kapat
    const notifPanel = document.getElementById('dropdown-notifications-menu');
    const notifBtn = document.getElementById('btn-toggle-notifications-dropdown');
    if (notifPanel && store.state.showAdminNotifications && !notifPanel.contains(e.target) && notifBtn && !notifBtn.contains(e.target)) {
      store.toggleAdminNotifications();
    }

    const profileDropdown = document.getElementById('dropdown-user-profile-menu');
    if (profileDropdown && !profileDropdown.classList.contains('hidden') && !profileDropdown.contains(e.target) && !e.target.closest('#btn-toggle-profile-dropdown')) {
      profileDropdown.classList.add('hidden');
    }

    const assignMenu = document.getElementById('dropdown-assign-personnel-menu');
    const assignBtn = document.getElementById('btn-toggle-assign-personnel-dropdown');
    if (assignMenu && !assignMenu.classList.contains('hidden') && !assignMenu.contains(e.target) && assignBtn && !assignBtn.contains(e.target)) {
      assignMenu.classList.add('hidden');
    }

    const closeCustomModalBtn = e.target.closest('#btn-close-custom-modal');
    if (closeCustomModalBtn) {
      store.closeModal();
      return;
    }

    // PERSONELİ AKTİF / PASİF YAP (TOGGLE STATUS)
    const togglePersonnelBtn = e.target.closest('.btn-toggle-personnel-status');
    if (togglePersonnelBtn) {
      const userId = togglePersonnelBtn.getAttribute('data-user-id');
      if (userId) {
        await store.togglePersonnelStatus(userId);
        const user = store.getState().allPersonnel.find(p => p.id === userId);
        store.setToast(user?.isActive ? `'${user.fullName}' hesabı aktif yapıldı.` : `'${user?.fullName || 'Personel'}' hesabı pasif yapıldı.`, user?.isActive ? 'success' : 'info');
      }
      return;
    }

    // GÜÇLÜ ŞİFRE ÜRETİCİ
    const genPwdBtn = e.target.closest('#btn-generate-personnel-password');
    if (genPwdBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pwdInput = document.getElementById('personnel-password');
      if (pwdInput) {
        const strongPwd = generateRandomStrongPassword();
        pwdInput.value = strongPwd;
        pwdInput.type = 'text';
        store.setToast('Yeni güçlü şifre oluşturuldu.', 'info');
      }
      return;
    }

    // ŞİFREYİ PANOMA KOPYALA
    const copyPwdBtn = e.target.closest('#btn-copy-personnel-password');
    if (copyPwdBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pwdInput = document.getElementById('personnel-password');
      const val = pwdInput ? pwdInput.value : '';
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          const originalText = copyPwdBtn.innerHTML;
          copyPwdBtn.innerHTML = '<span>Kopyalandı</span>';
          copyPwdBtn.classList.add('bg-emerald-100', 'text-emerald-800');
          setTimeout(() => {
            if (copyPwdBtn) {
              copyPwdBtn.innerHTML = originalText;
              copyPwdBtn.classList.remove('bg-emerald-100', 'text-emerald-800');
            }
          }, 2000);
          store.setToast('Şifre panoya kopyalandı.', 'success');
        }).catch(() => {
          store.setToast('Şifre: ' + val, 'info');
        });
      } else {
        store.setToast('Lütfen önce bir şifre üretin veya girin.', 'error');
      }
      return;
    }

    // ŞİFRE GÖSTER / GİZLE
    const togglePwdVisBtn = e.target.closest('#btn-toggle-personnel-pwd-visibility');
    if (togglePwdVisBtn) {
      const pwdInput = document.getElementById('personnel-password');
      if (pwdInput) {
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      }
      return;
    }

    const target = e.target.closest('.btn-open-review-survey-modal, .btn-set-q-review-status, .btn-submit-survey-revision, .btn-approve-admin-survey, .btn-reject-admin-survey');
    if (!target) return;

    if (target.classList.contains('btn-open-review-survey-modal')) {
      const surveyId = target.getAttribute('data-survey-id');
      const survey = store.getState().allSurveys.find(s => s.id === surveyId);
      if (survey) store.openModal('review_survey', { survey });
      return;
    }

    if (target.classList.contains('btn-approve-admin-survey')) {
      const surveyId = target.getAttribute('data-survey-id');
      if (surveyId) {
        await store.approveAdminSurvey(surveyId);
      }
      return;
    }

    if (target.classList.contains('btn-reject-admin-survey')) {
      const surveyId = target.getAttribute('data-survey-id');
      if (surveyId) {
        await store.rejectAdminSurvey(surveyId, 'Yönetici tarafından onaylanmadı.');
      }
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

  document.addEventListener('input', (e) => {
    const target = e.target;
    if (!target) return;

    if (target.classList.contains('input-builder-q-title')) {
      const id = target.getAttribute('data-q-id');
      if (id) store.updateQuestionTitle(id, target.value, true);
      return;
    }

    if (target.classList.contains('input-option-edit')) {
      const qId = target.getAttribute('data-q-id');
      const optId = target.getAttribute('data-opt-id');
      if (qId && optId) store.updateOptionLabel(qId, optId, target.value, true);
      return;
    }

    if (target.id === 'builder-info-title' || target.id === 'builder-info-desc') {
      const title = document.getElementById('builder-info-title')?.value || '';
      const desc = document.getElementById('builder-info-desc')?.value || '';
      store.updateBuilderInfo(title, desc, true);
      return;
    }

    if (target.classList.contains('runner-input')) {
      const id = target.getAttribute('data-q-id');
      if (id) store.updateAnswer(id, target.value, true);
      return;
    }

    if (target.id === 'input-search-modal-assign') {
      const q = target.value.trim().toLocaleLowerCase('tr-TR');
      let visibleCount = 0;
      document.querySelectorAll('.modal-assign-item').forEach(item => {
        const text = (item.getAttribute('data-search-text') || '').toLocaleLowerCase('tr-TR');
        if (!q || text.includes(q)) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });
      const infoLabel = document.getElementById('info-modal-assign-visible-count');
      if (infoLabel) infoLabel.textContent = `${visibleCount} gösteriliyor`;
      return;
    }
  });

  document.addEventListener('submit', async (e) => {
    const target = e.target;
    if (!target) return;

    if (target.id === 'form-custom-assign-survey') {
      e.preventDefault();
      const surveyId = target.getAttribute('data-survey-id');
      const village = document.getElementById('modal-assign-village')?.value;
      const targetCount = document.getElementById('modal-assign-target-count')?.value;
      const endDate = document.getElementById('modal-assign-end-date')?.value;
      const note = document.getElementById('modal-assign-note')?.value;

      const checkedUserIds = Array.from(document.querySelectorAll('input[name="modal-assign-personnel"]:checked')).map(cb => cb.value);

      if (surveyId) {
        await store.createAdminAssignment(surveyId, village, targetCount, endDate, note, checkedUserIds);
        store.closeModal();
      }
      return;
    }

    if (target.id === 'form-pwa-send-message') {
      e.preventDefault();
      const title = document.getElementById('input-pwa-msg-title')?.value;
      const content = document.getElementById('input-pwa-msg-content')?.value;
      if (title && content) {
        store.sendPwaMessageToAdmin(title, content);
      }
      return;
    }

    if (target.id === 'form-custom-add-section' || target.id === 'form-inline-add-section') {
      e.preventDefault();
      const titleInput = document.getElementById(target.id === 'form-custom-add-section' ? 'custom-sec-title' : 'inline-sec-title');
      const title = titleInput ? titleInput.value.trim() : '';
      store.addSectionToBuilder(title || 'Yeni Bölüm');
      if (titleInput) titleInput.value = '';
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

  const togglePwdBtn = document.getElementById('btn-toggle-password');
  const pwdInput = document.getElementById('login-password');
  const eyeIconContainer = document.getElementById('pwd-eye-icon');
  
  if (pwdInput) {
    pwdInput.value = '';
    pwdInput.type = 'password';
  }

  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener('click', () => {
      const isPassword = pwdInput.type === 'password';
      pwdInput.type = isPassword ? 'text' : 'password';
      if (eyeIconContainer) {
        eyeIconContainer.innerHTML = iconSvg(isPassword ? 'eyeOff' : 'eye', 'w-5 h-5 text-slate-400 hover:text-slate-600');
      }
    });
  }

  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      const pwd = document.getElementById('login-password')?.value;

      const btnSubmit = formLogin.querySelector('button[type="submit"]');
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<span>Giriş Yapılıyor...</span>`;
      }

      await store.login(email, pwd);
    });
  }

  document.getElementById('btn-quick-login-admin')?.addEventListener('click', async () => {
    const emailEl = document.getElementById('login-email');
    const pwdEl = document.getElementById('login-password');
    if (emailEl) emailEl.value = 'admin@sahaanket.gov.tr';
    if (pwdEl) pwdEl.value = 'Admin123!';
    await store.login('admin@sahaanket.gov.tr', 'Admin123!');
  });

  document.getElementById('btn-quick-login-field')?.addEventListener('click', async () => {
    const emailEl = document.getElementById('login-email');
    const pwdEl = document.getElementById('login-password');
    if (emailEl) emailEl.value = 'saha@sahaanket.gov.tr';
    if (pwdEl) pwdEl.value = 'Saha123!';
    await store.login('saha@sahaanket.gov.tr', 'Saha123!');
  });
}

function attachAdminListeners() {
  attachGlobalSystemListeners();

  // Direct Sidebar Tab Switches (double guarantee)
  document.querySelectorAll('.btn-admin-tab').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const tab = e.currentTarget.getAttribute('data-admin-tab');
      if (tab) store.setAdminTab(tab);
    };
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

  // Open Builder Buttons & Header Actions
  const openBuilderHandler = () => {
    store.startNewBuilder();
  };
  document.getElementById('btn-admin-create-survey-modal')?.addEventListener('click', openBuilderHandler);
  document.getElementById('btn-admin-create-survey-dashboard')?.addEventListener('click', openBuilderHandler);

  document.getElementById('btn-admin-create-assignment-header')?.addEventListener('click', () => {
    store.setAdminTab('assignments');
  });

  document.getElementById('btn-admin-create-personnel-header')?.addEventListener('click', () => {
    store.openAddPersonnelModal();
  });

  document.getElementById('btn-clear-submission-filters')?.addEventListener('click', () => {
    store.setSearchSubmissionsQuery('');
    store.setStatusFilterSubmissions('ALL');
  });

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
    return `'${email.trim()}' e-posta adresi sistemde zaten kayıtlı! Başka bir e-posta adresi giriniz.`;
  }

  // 2. TÜRKİYE TELEFON FORMATI KONTROLÜ (0 olmadan 5xx xxx xx xx, 10 hane)
  const trimmedPhone = phone.trim();
  if (trimmedPhone.startsWith('0')) {
    return 'Telefon numarası başında 0 OLMADAN 5xx xxx xx xx formatında girilmelidir! (Örn: 5359998877)';
  }
  const cleanPhone = trimmedPhone.replace(/\D/g, '');
  if (!/^5\d{9}$/.test(cleanPhone)) {
    return 'Geçerli bir cep telefonu giriniz! 0 olmadan 5xx xxx xx xx (10 haneli) olmalıdır.';
  }

  // 3. GÜÇLÜ ŞİFRE KONTROLÜ (Min 8 karakter, büyük harf, küçük harf, rakam, özel karakter)
  if (!isPasswordOptional || (password && password.trim().length > 0)) {
    const pwd = password ? password.trim() : '';
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!strongPasswordRegex.test(pwd)) {
      return 'Güçlü şifre gereklidir: En az 8 karakter, 1 büyük harf (A-Z), 1 küçük harf (a-z), 1 rakam (0-9) ve 1 özel karakter (!@#$%^&*) içermelidir.';
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

  const btnConfirmDelete = document.getElementById('btn-confirm-delete-personnel');
  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', async (e) => {
      const userId = e.currentTarget.getAttribute('data-user-id');
      if (userId) {
        await store.deleteAdminPersonnel(userId);
      }
    });
  }

  // PERSONELİ AKTİF / PASİF YAP DİREKT LISTENER
  document.querySelectorAll('.btn-toggle-personnel-status').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const userId = e.currentTarget.getAttribute('data-user-id');
      if (userId) {
        await store.togglePersonnelStatus(userId);
        const user = store.getState().allPersonnel.find(p => p.id === userId);
        store.setToast(user?.isActive ? `'${user.fullName}' hesabı aktif yapıldı.` : `'${user?.fullName || 'Personel'}' hesabı pasif yapıldı.`, user?.isActive ? 'success' : 'info');
      }
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
      store.updateQuestionTitle(id, e.target.value, true);
    });
  });

  // Toggle Mandatory (Checkbox & Switch)
  document.querySelectorAll('.checkbox-toggle-required').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-q-id');
      if (id) store.updateQuestionRequired(id, e.target.checked);
    });
  });

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
      store.updateOptionLabel(qId, optId, e.target.value, true);
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

  // ASSIGNMENT PERSONNEL DOWNWARD DROPDOWN TOGGLE
  document.getElementById('btn-toggle-assign-personnel-dropdown')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.getElementById('dropdown-assign-personnel-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  });

  // ASSIGNMENT PERSONNEL LIVE SEARCH INPUT (e.g. typing "b" filters items starting with/containing "b")
  const inputSearchAssign = document.getElementById('input-search-assign-personnel');
  if (inputSearchAssign) {
    inputSearchAssign.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLocaleLowerCase('tr-TR');
      let visibleCount = 0;
      document.querySelectorAll('.assign-personnel-item').forEach(item => {
        const text = (item.getAttribute('data-search-text') || '').toLocaleLowerCase('tr-TR');
        if (!q || text.includes(q)) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });
      const infoLabel = document.getElementById('info-assign-visible-count');
      if (infoLabel) {
        infoLabel.textContent = `${visibleCount} personel gösteriliyor`;
      }
    });
  }

  // UPDATE ASSIGNMENT SELECTED PERSONNEL COUNT LABEL & BADGE
  const updateAssignSelectedPersonnelCountLabel = () => {
    const checked = document.querySelectorAll('.cb-assign-personnel:checked');
    const total = document.querySelectorAll('.cb-assign-personnel').length;
    const labelContainer = document.getElementById('label-assign-selected-personnel-count');
    const badgeContainer = document.getElementById('label-assign-selected-badge');

    const count = checked.length;

    if (badgeContainer) {
      if (count === total && total > 0) {
        badgeContainer.innerHTML = `<span class="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md font-extrabold">Tüm Ekip Seçili (${count}/${total})</span>`;
      } else if (count > 0) {
        badgeContainer.innerHTML = `<span class="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md font-extrabold">${count} / ${total} Personel Seçili</span>`;
      } else {
        badgeContainer.innerHTML = `<span class="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-md font-extrabold">0 / ${total} Personel Seçildi</span>`;
      }
    }

    if (labelContainer) {
      if (count === total && total > 0) {
        labelContainer.innerHTML = `
          <div class="w-7 h-7 rounded-lg bg-[#2A9D38]/10 text-[#2A9D38] flex items-center justify-center shrink-0">
            ${iconSvg('users', 'w-4 h-4 text-[#2A9D38]')}
          </div>
          <span class="font-extrabold text-xs text-[#01214A] truncate">Tüm Ekip Seçili (${count} Personel)</span>
        `;
      } else if (count > 0) {
        const selectedNames = Array.from(checked).map(cb => {
          const item = cb.closest('.assign-personnel-item');
          return item ? item.querySelector('.font-extrabold')?.textContent : '';
        }).filter(Boolean);

        const namesText = selectedNames.length <= 2 
          ? selectedNames.join(', ')
          : `${selectedNames.slice(0, 2).join(', ')} (+${selectedNames.length - 2} kişi)`;

        labelContainer.innerHTML = `
          <div class="w-7 h-7 rounded-lg bg-[#00A0DF]/10 text-[#00A0DF] flex items-center justify-center shrink-0">
            ${iconSvg('users', 'w-4 h-4 text-[#00A0DF]')}
          </div>
          <span class="font-extrabold text-xs text-[#01214A] truncate">${count} Personel Seçildi (${namesText})</span>
        `;
      } else {
        labelContainer.innerHTML = `
          <div class="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            ${iconSvg('block', 'w-4 h-4 text-red-600')}
          </div>
          <span class="font-extrabold text-xs text-red-600 truncate">Lütfen en az 1 personel seçiniz!</span>
        `;
      }
    }
  };

  document.querySelectorAll('.cb-assign-personnel').forEach(cb => {
    cb.addEventListener('change', updateAssignSelectedPersonnelCountLabel);
  });

  // ASSIGNMENT SELECT ALL & CLEAR ALL
  document.getElementById('btn-assign-select-all')?.addEventListener('click', () => {
    document.querySelectorAll('.assign-personnel-item:not(.hidden) .cb-assign-personnel').forEach(cb => {
      cb.checked = true;
    });
    updateAssignSelectedPersonnelCountLabel();
  });

  document.getElementById('btn-assign-clear-all')?.addEventListener('click', () => {
    document.querySelectorAll('.cb-assign-personnel').forEach(cb => {
      cb.checked = false;
    });
    updateAssignSelectedPersonnelCountLabel();
  });

  // MODAL ASSIGNMENT DROPDOWN COUNT & BADGE UPDATER
  const updateModalAssignSelectedCountLabel = () => {
    const checked = document.querySelectorAll('.cb-modal-assign-personnel:checked');
    const total = document.querySelectorAll('.cb-modal-assign-personnel').length;
    const labelContainer = document.getElementById('label-modal-assign-count');
    const badgeContainer = document.getElementById('label-modal-assign-badge');

    const count = checked.length;

    if (badgeContainer) {
      if (count === total && total > 0) {
        badgeContainer.innerHTML = `<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-extrabold">Tüm Ekip Seçili (${count}/${total})</span>`;
      } else if (count > 0) {
        badgeContainer.innerHTML = `<span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-extrabold">${count} / ${total} Seçili</span>`;
      } else {
        badgeContainer.innerHTML = `<span class="bg-red-100 text-red-800 px-2 py-0.5 rounded-md font-extrabold">0 / ${total} Seçildi</span>`;
      }
    }

    if (labelContainer) {
      if (count === total && total > 0) {
        labelContainer.innerHTML = `
          <div class="w-6 h-6 rounded-md bg-[#2A9D38]/10 text-[#2A9D38] flex items-center justify-center shrink-0">
            ${iconSvg('users', 'w-3.5 h-3.5 text-[#2A9D38]')}
          </div>
          <span class="font-extrabold text-xs text-[#01214A] truncate">Tüm Ekip Seçili (${count} Personel)</span>
        `;
      } else if (count > 0) {
        const selectedNames = Array.from(checked).map(cb => {
          const item = cb.closest('.modal-assign-item');
          return item ? item.querySelector('.font-extrabold')?.textContent : '';
        }).filter(Boolean);

        const namesText = selectedNames.length <= 2 
          ? selectedNames.join(', ')
          : `${selectedNames.slice(0, 2).join(', ')} (+${selectedNames.length - 2} kişi)`;

        labelContainer.innerHTML = `
          <div class="w-6 h-6 rounded-md bg-[#00A0DF]/10 text-[#00A0DF] flex items-center justify-center shrink-0">
            ${iconSvg('users', 'w-3.5 h-3.5 text-[#00A0DF]')}
          </div>
          <span class="font-extrabold text-xs text-[#01214A] truncate">${count} Personel Seçildi (${namesText})</span>
        `;
      } else {
        labelContainer.innerHTML = `
          <div class="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            ${iconSvg('block', 'w-3.5 h-3.5 text-red-600')}
          </div>
          <span class="font-extrabold text-xs text-red-600 truncate">Lütfen en az 1 personel seçiniz!</span>
        `;
      }
    }
  };

  document.querySelectorAll('.cb-modal-assign-personnel').forEach(cb => {
    cb.addEventListener('change', updateModalAssignSelectedCountLabel);
  });

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

  // SURVEY CATEGORY, STATUS & VIEW MODE LISTENERS (SECTIONS 4-10)
  document.querySelectorAll('.btn-filter-survey-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      store.setSurveyCategoryFilter(cat);
    });
  });

  document.querySelectorAll('.btn-survey-status-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-status-filter');
      store.setSurveyStatusFilter(filter);
    });
  });

  document.querySelectorAll('.btn-survey-view-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.getAttribute('data-view-mode');
      store.setSurveyViewMode(mode);
    });
  });

  document.querySelectorAll('.btn-archive-survey').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-survey-id');
      if (id) store.archiveSurvey(id);
    });
  });

  document.querySelectorAll('.btn-unarchive-survey').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-survey-id');
      if (id) store.unarchiveSurvey(id);
    });
  });

  // REPORT LIBRARY LISTENERS (SECTIONS 11-19)
  const selectReportSurvey = document.getElementById('select-report-survey-filter');
  if (selectReportSurvey) {
    selectReportSurvey.addEventListener('change', (e) => {
      store.setReportSurveyFilter(e.target.value);
    });
  }

  document.querySelectorAll('.btn-switch-report-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.currentTarget.getAttribute('data-view');
      if (view) store.setReportActiveView(view);
    });
  });

  const inputSearchReports = document.getElementById('input-search-reports');
  if (inputSearchReports) {
    inputSearchReports.addEventListener('input', (e) => {
      store.setReportSearchQuery(e.target.value);
    });
  }

  document.querySelectorAll('.btn-filter-report-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-report-category');
      store.setReportCategoryFilter(cat);
    });
  });

  document.querySelectorAll('.btn-open-report-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-report-id');
      if (id) store.openReportDetail(id);
    });
  });

  document.getElementById('btn-close-report-detail')?.addEventListener('click', () => {
    store.closeReportDetail();
  });

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

  // PWA BİLDİRİM PANELİ (State-driven, Section 13)
  document.getElementById('btn-toggle-pwa-notifications')?.addEventListener('click', (e) => {
    e.stopPropagation();
    store.togglePwaNotifications();
  });
  document.getElementById('btn-close-pwa-notifications')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (store.state.showPwaNotifications) store.togglePwaNotifications();
  });
  document.getElementById('btn-pwa-mark-all-read')?.addEventListener('click', (e) => {
    e.stopPropagation();
    store.markAllNotificationsRead();
  });
  document.querySelectorAll('.pwa-notif-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const notifId = item.getAttribute('data-notif-id');
      if (notifId) store.handleNotificationClick(notifId);
    });
  });



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

  // GERÇEK KAMERA / GALERİ AÇMA & OTOMATİK SIKIŞTIRMA MOTORU
  const btnRunnerPhoto = document.getElementById('btn-runner-photo');
  const fileInput = document.getElementById('runner-camera-file');
  if (btnRunnerPhoto && fileInput) {
    btnRunnerPhoto.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      store.setToast('Fotoğraf sıkıştırılıyor ve optimize ediliyor...', 'info');
      try {
        const compressed = await compressImageFile(file);
        store.saveActivePhoto(compressed.base64, compressed.originalSizeKB + ' KB', compressed.compressedSizeKB + ' KB', compressed.ratio);
        store.setToast(`Fotoğraf optimize edildi (${compressed.originalSizeKB} KB / ${compressed.compressedSizeKB} KB · %${compressed.ratio} Tasarruf)`, 'success');
      } catch (err) {
        store.setToast('Fotoğraf işlenirken bir hata oluştu: ' + err.message, 'error');
      }
    });
  }

  document.getElementById('btn-remove-runner-photo')?.addEventListener('click', () => {
    store.removeActivePhoto();
    store.setToast('Fotoğraf kaldırıldı.', 'info');
  });

  document.getElementById('btn-runner-location')?.addEventListener('click', () => store.acquireLocation());

  // Form Wizard Nav
  document.getElementById('btn-runner-next')?.addEventListener('click', () => {
    const state = store.getState();
    const curIndex = state.activeSectionIndex || 0;
    const answers = state.activeFormAnswers || {};

    if (curIndex === 0 && (!answers['q1'] || !answers['q1'].trim())) {
      store.setToast('Lütfen devam etmeden önce üreticinin Ad Soyad bilgisini giriniz.', 'error');
      return;
    }

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
      store.updateQuestionTitle(id, e.target.value, true);
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
      store.updateOptionLabel(qId, optId, e.target.value, true);
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

  // PROFILE LOGOUT — confirmation modal trigger (Section 37)
  document.getElementById('btn-open-logout-modal')?.addEventListener('click', () => {
    store.openModal('logout_confirm', {});
  });
  // Also handle old direct logout button if present elsewhere
  document.getElementById('btn-logout')?.addEventListener('click', () => store.logout());

  // COMPOSE MESSAGE — open compose modal or navigate (Section 28-29)
  document.querySelectorAll('#btn-open-compose-msg-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      store.openModal('compose_message', {});
    });
  });
}

// ─── PWA Install Prompt ──────────────────────────────────────────────────────
let _pwaInstallPrompt = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Tarayıcının varsayılan mini-banner'ını engelle
    e.preventDefault();
    _pwaInstallPrompt = e;
    console.log('[PWA] Install prompt captured. Showing install button...');
    showPwaInstallBanner();
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully!');
    _pwaInstallPrompt = null;
    hidePwaInstallBanner();
    showPwaInstalledToast();
  });
}

function showPwaInstallBanner() {
  // Eğer zaten varsa tekrar ekleme
  if (document.getElementById('pwa-install-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #01214A 0%, #0a2f5c 100%);
    color: white;
    padding: 14px 20px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 32px rgba(1, 33, 74, 0.35), 0 2px 8px rgba(0,0,0,0.2);
    z-index: 99999;
    font-family: Inter, sans-serif;
    font-size: 14px;
    max-width: 90vw;
    width: max-content;
    animation: pwa-banner-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
  `;

  banner.innerHTML = `
    <style>
      @keyframes pwa-banner-in {
        from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      }
      #pwa-install-banner:hover { box-shadow: 0 12px 40px rgba(1,33,74,0.45), 0 4px 12px rgba(0,0,0,0.25); }
      #pwa-install-btn {
        background: linear-gradient(135deg, #2A9D38, #22822e);
        color: white;
        border: none;
        padding: 8px 18px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        font-family: Inter, sans-serif;
        transition: all 0.2s;
        white-space: nowrap;
      }
      #pwa-install-btn:hover { background: linear-gradient(135deg, #22822e, #1a6b26); transform: scale(1.03); }
      #pwa-install-dismiss {
        background: transparent;
        border: none;
        color: rgba(255,255,255,0.55);
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        padding: 4px;
        margin-left: 4px;
        transition: color 0.2s;
      }
      #pwa-install-dismiss:hover { color: rgba(255,255,255,0.9); }
    </style>
    <img src="/icons/icon-72.png" width="36" height="36" style="border-radius:8px; flex-shrink:0;" onerror="this.style.display='none'"/>
    <div>
      <div style="font-weight:600; color:white;">Saha Anket'i Yükle</div>
      <div style="color:rgba(255,255,255,0.65); font-size:12px; margin-top:2px;">Masaüstüne ekle, çevrimdışı çalış</div>
    </div>
    <button id="pwa-install-btn">Yükle</button>
    <button id="pwa-install-dismiss" title="Kapat">Kapat</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
    if (!_pwaInstallPrompt) return;
    try {
      _pwaInstallPrompt.prompt();
      const { outcome } = await _pwaInstallPrompt.userChoice;
      console.log('[PWA] User install choice:', outcome);
      if (outcome === 'accepted') {
        _pwaInstallPrompt = null;
        hidePwaInstallBanner();
      }
    } catch (err) {
      console.warn('[PWA] Install prompt error:', err);
    }
  });

  document.getElementById('pwa-install-dismiss')?.addEventListener('click', () => {
    hidePwaInstallBanner();
    // 24 saat boyunca gösterme
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  });
}

function hidePwaInstallBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.style.animation = 'pwa-banner-in 0.25s ease reverse forwards';
    setTimeout(() => banner.remove(), 250);
  }
}

function showPwaInstalledToast() {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #2A9D38, #22822e);
    color: white;
    padding: 14px 18px;
    border-radius: 12px;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 24px rgba(42,157,56,0.35);
    z-index: 99999;
    animation: pwa-banner-in 0.35s ease both;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  toast.innerHTML = `Saha Anket masaüstüne eklendi!`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ─── Boot ────────────────────────────────────────────────────────────────────
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

  // PWA banner dismiss check (24 saat cooldown)
  const dismissed = localStorage.getItem('pwa-banner-dismissed');
  if (dismissed) {
    const elapsed = Date.now() - parseInt(dismissed, 10);
    if (elapsed > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('pwa-banner-dismissed');
    }
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}

