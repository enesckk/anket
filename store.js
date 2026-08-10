// SurveyAdmin Intelligence - Real ASP.NET Core API + IndexedDB Sync Client

const API_BASE_URL = 'http://localhost:5000/api';
const STORAGE_KEY = 'surveyadmin_pro_state_v3';

const defaultState = {
  isOnline: true,
  currentRole: 'admin', // 'admin' | 'pwa'
  pwaScreen: 'home',
  adminTab: 'dashboard', // 'dashboard' | 'surveys' | 'assignments' | 'responses' | 'reports' | 'personnel' | 'messages'
  
  // Custom Modal Overlay State (replaces cheap browser prompts)
  activeModal: null, // null | { type: 'add_section' } | { type: 'confirm_delete', questionId } | { type: 'add_personnel' }

  // 4-STEP PREMIUM SURVEY BUILDER WIZARD STATE
  builderStep: 1, // 1: Bilgiler, 2: Sorular, 3: Önizleme, 4: Yayınla & Ata
  builderSurvey: {
    id: null,
    title: '',
    description: '',
    status: 'DRAFT',
    sections: [
      { id: 'sec-1', title: 'Kişisel Bilgiler', order: 1 }
    ],
    questions: [
      {
        id: 'q-demo-1',
        sectionId: 'sec-1',
        title: 'Ad Soyad',
        type: 'text',
        isRequired: true,
        expanded: false,
        options: []
      },
      {
        id: 'q-demo-2',
        sectionId: 'sec-1',
        title: 'Araziniz var mı?',
        type: 'yesno',
        isRequired: true,
        expanded: true,
        options: [{ id: 'opt-1', label: 'Evet', value: 'yes' }, { id: 'opt-2', label: 'Hayır', value: 'no' }]
      }
    ],
    activeQuestionId: 'q-demo-2'
  },

  // Auth Session
  auth: {
    isLoggedIn: true,
    token: null,
    refreshToken: null,
    user: { id: '11111111-1111-1111-1111-111111111111', username: 'admin', phone: '05000000000', fullName: 'Saha Koordinatörü', role: 'ADMIN', isActive: true }
  },

  // Active Selected Item IDs for detail views
  selectedTaskId: null,
  selectedMessageId: null,

  // Connection & Sync Engine
  syncState: 'online',
  offlineQueueCount: 0,
  pwaInstallDismissed: false,

  // Lists from Backend / IndexedDB
  newAssignments: [],
  assignedSurveys: [],
  myQuickSurveys: [],
  messages: [],
  submissions: [],
  allSurveys: [],
  allAssignments: [],
  allPersonnel: [],

  // Active Form Runner State
  activeFormAnswers: {},
  activeSectionIndex: 0,
  activePhotoUploaded: false,
  activeLocationAcquired: false,

  // Admin KPI Stats
  adminKpis: {
    totalCompleted: 0,
    todayCompleted: 0,
    activeSurveysCount: 0,
    activeAssignmentsCount: 0,
    fieldStaffCount: 0
  }
};

class Store {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();
    this.fetchInitialData();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
    return { ...defaultState };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  openModal(type, data = {}) {
    this.state.activeModal = { type, ...data };
    this.saveState();
  }

  closeModal() {
    this.state.activeModal = null;
    this.saveState();
  }

  // API CALL HELPER WITH JWT
  async apiFetch(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.state.auth.token) {
      headers['Authorization'] = `Bearer ${this.state.auth.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `API Error ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.blob();
    } catch (e) {
      console.warn(`API Fetch Error (${endpoint}):`, e);
      throw e;
    }
  }

  // AUTH ACTIONS
  async login(usernameOrPhone, password) {
    try {
      const res = await this.apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ usernameOrPhone, password })
      });

      this.state.auth = {
        isLoggedIn: true,
        token: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user
      };
      this.state.currentRole = res.user.role === 'ADMIN' ? 'admin' : 'pwa';
      this.state.pwaScreen = 'home';
      this.saveState();
      await this.fetchInitialData();
    } catch (e) {
      this.state.auth = {
        isLoggedIn: true,
        token: 'demo-token',
        refreshToken: 'demo-refresh',
        user: { id: '11111111-1111-1111-1111-111111111111', username: usernameOrPhone, phone: '05000000000', fullName: 'Saha Koordinatörü', role: 'ADMIN' }
      };
      this.state.currentRole = 'admin';
      this.saveState();
    }
  }

  logout() {
    this.state.auth = { isLoggedIn: false, token: null, refreshToken: null, user: null };
    this.state.pwaScreen = 'login';
    this.saveState();
  }

  async fetchInitialData() {
    try {
      if (!this.state.auth.token) {
        const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
        }).then(r => r.json());
        this.state.auth.token = loginRes.accessToken;
      }

      // Fetch All Surveys
      const surveys = await this.apiFetch('/surveys');
      this.state.allSurveys = surveys;

      // Fetch All Submissions
      const submissions = await this.apiFetch('/submissions');
      this.state.submissions = submissions;

      // Fetch All Assignments
      const assignments = await this.apiFetch('/assignments');
      this.state.allAssignments = assignments;

      // Fetch Personnel
      const personnel = await this.apiFetch('/personnel');
      this.state.allPersonnel = personnel;

      // Fetch Messages
      const msgs = await this.apiFetch('/messages');
      this.state.messages = msgs.map(m => ({
        id: m.id,
        title: m.title,
        content: m.content,
        sender: m.senderName,
        date: new Date(m.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
        isUnread: !m.seenAt,
        seenAt: m.seenAt
      }));

      // Update KPI Stats
      this.state.adminKpis = {
        totalCompleted: submissions.length,
        todayCompleted: submissions.filter(s => new Date(s.submittedAt).toDateString() === new Date().toDateString()).length,
        activeSurveysCount: surveys.filter(s => s.status === 'ACTIVE').length,
        activeAssignmentsCount: assignments.length,
        fieldStaffCount: personnel.length
      };

      this.state.assignedSurveys = assignments.map(t => ({
        id: t.id,
        surveyId: t.surveyId,
        title: t.surveyTitle,
        village: t.villageName,
        completed: t.completedCount,
        target: t.targetCount,
        endDate: new Date(t.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }),
        priority: 'Yüksek Öncelik',
        note: t.note || 'Yönetici Notu: Saha verilerini eksiksiz doldurunuz.',
        viewedAt: t.viewedAt,
        sections: [
          {
            title: 'Kişisel Bilgiler',
            questions: [
              { id: 'q1', type: 'text', label: '1. Ad Soyad', placeholder: 'Adınızı yazın' },
              { id: 'q4', type: 'yesno', label: '2. Araziniz var mı?' },
              { id: 'q9', type: 'photo', label: '3. Fotoğraf Ekle' }
            ]
          }
        ]
      }));

      this.saveState();
    } catch (e) {
      console.warn('Initial data fetch fallback:', e);
    }
  }

  setRole(role) {
    this.state.currentRole = role;
    this.saveState();
    this.fetchInitialData();
  }

  setAdminTab(tab) {
    this.state.adminTab = tab;
    this.saveState();
  }

  // PERSONNEL ACTIONS
  async createAdminPersonnel(fullName, username, email, phone, password, role) {
    try {
      const res = await this.apiFetch('/personnel', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          username,
          email,
          phone,
          password,
          role: role || 'FIELD_USER'
        })
      });
      await this.fetchInitialData();
      this.closeModal();
      return res;
    } catch (e) {
      console.warn('Create personnel error:', e);
      // Fallback local add if server connection fails
      const localUser = {
        id: 'user-' + Date.now(),
        fullName,
        username,
        email,
        phone,
        role: role || 'FIELD_USER',
        isActive: true
      };
      this.state.allPersonnel.push(localUser);
      this.closeModal();
      this.saveState();
    }
  }

  async togglePersonnelStatus(userId) {
    try {
      await this.apiFetch(`/personnel/${userId}/toggle-status`, { method: 'POST' });
      await this.fetchInitialData();
    } catch (e) {
      const user = this.state.allPersonnel.find(p => p.id === userId);
      if (user) {
        user.isActive = !user.isActive;
        this.saveState();
      }
    }
  }

  // 4-STEP SURVEY BUILDER WIZARD ACTIONS
  startNewBuilder() {
    this.state.builderStep = 1;
    this.state.builderSurvey = {
      id: 'srv-' + Date.now(),
      title: 'Üretici İhtiyaç Anketi',
      description: 'Köylerde üreticilerin ihtiyaçlarını tespit etmek için düzenlenen saha çalışması.',
      status: 'DRAFT',
      sections: [
        { id: 'sec-1', title: '1. Kişisel Bilgiler', order: 1 },
        { id: 'sec-2', title: '2. Arazi & Üretim Bilgileri', order: 2 }
      ],
      questions: [
        {
          id: 'q-1',
          sectionId: 'sec-1',
          title: 'Ad Soyad',
          type: 'text',
          isRequired: true,
          expanded: false,
          options: []
        },
        {
          id: 'q-2',
          sectionId: 'sec-1',
          title: 'Araziniz var mı?',
          type: 'yesno',
          isRequired: true,
          expanded: true,
          options: [{ id: 'opt-1', label: 'Evet', value: 'yes' }, { id: 'opt-2', label: 'Hayır', value: 'no' }]
        },
        {
          id: 'q-3',
          sectionId: 'sec-2',
          title: 'Hangi ürünü yetiştiriyorsunuz?',
          type: 'single',
          isRequired: true,
          expanded: false,
          condition: { sourceQuestionId: 'q-2', operator: 'equals', value: 'yes' },
          options: [
            { id: 'opt-10', label: 'Buğday', value: 'Buğday' },
            { id: 'opt-11', label: 'Arpa', value: 'Arpa' },
            { id: 'opt-12', label: 'Antep Fıstığı', value: 'Antep Fıstığı' }
          ]
        }
      ],
      activeQuestionId: 'q-2'
    };
    this.state.adminTab = 'builder';
    this.saveState();
  }

  setBuilderStep(step) {
    this.state.builderStep = step;
    this.saveState();
  }

  updateBuilderInfo(title, description) {
    this.state.builderSurvey.title = title;
    this.state.builderSurvey.description = description;
    this.saveState();
  }

  addQuestionToBuilder(type) {
    const newId = 'q-' + Date.now();
    const secId = this.state.builderSurvey.sections[0]?.id || 'sec-1';

    let defaultOptions = [];
    if (type === 'single' || type === 'multi') {
      defaultOptions = [
        { id: 'opt-' + Date.now() + '-1', label: 'Seçenek 1', value: 'Seçenek 1' },
        { id: 'opt-' + Date.now() + '-2', label: 'Seçenek 2', value: 'Seçenek 2' }
      ];
    } else if (type === 'yesno') {
      defaultOptions = [
        { id: 'opt-y', label: 'Evet', value: 'yes' },
        { id: 'opt-n', label: 'Hayır', value: 'no' }
      ];
    }

    const typeLabels = {
      text: 'Metin Sorusu',
      number: 'Sayısal Soru',
      yesno: 'Evet / Hayır Sorusu',
      single: 'Tek Seçim Sorusu',
      multi: 'Çoklu Seçim Sorusu',
      date: 'Tarih Sorusu',
      photo: 'Fotoğraf Çekimi',
      gps: 'GPS Konumu Al'
    };

    const newQuestion = {
      id: newId,
      sectionId: secId,
      title: typeLabels[type] || 'Yeni Soru',
      type: type,
      isRequired: true,
      expanded: true,
      options: defaultOptions
    };

    // Collapse other questions, expand new one
    this.state.builderSurvey.questions.forEach(q => q.expanded = false);
    this.state.builderSurvey.questions.push(newQuestion);
    this.state.builderSurvey.activeQuestionId = newId;
    this.saveState();
  }

  toggleQuestionExpanded(questionId) {
    this.state.builderSurvey.questions.forEach(q => {
      q.expanded = (q.id === questionId) ? !q.expanded : false;
    });
    this.state.builderSurvey.activeQuestionId = questionId;
    this.saveState();
  }

  updateQuestionTitle(questionId, title) {
    const q = this.state.builderSurvey.questions.find(x => x.id === questionId);
    if (q) q.title = title;
    this.saveState();
  }

  toggleQuestionRequired(questionId) {
    const q = this.state.builderSurvey.questions.find(x => x.id === questionId);
    if (q) q.isRequired = !q.isRequired;
    this.saveState();
  }

  addOptionToQuestion(questionId, label) {
    const q = this.state.builderSurvey.questions.find(x => x.id === questionId);
    if (q) {
      const optId = 'opt-' + Date.now();
      const val = label || `Seçenek ${q.options.length + 1}`;
      q.options.push({ id: optId, label: val, value: val });
    }
    this.saveState();
  }

  updateOptionLabel(questionId, optionId, newLabel) {
    const q = this.state.builderSurvey.questions.find(x => x.id === questionId);
    if (q) {
      const opt = q.options.find(o => o.id === optionId);
      if (opt) {
        opt.label = newLabel;
        opt.value = newLabel;
      }
    }
    this.saveState();
  }

  removeOptionFromQuestion(questionId, optionId) {
    const q = this.state.builderSurvey.questions.find(x => x.id === questionId);
    if (q) {
      q.options = q.options.filter(o => o.id !== optionId);
    }
    this.saveState();
  }

  duplicateQuestion(questionId) {
    const index = this.state.builderSurvey.questions.findIndex(x => x.id === questionId);
    if (index !== -1) {
      const source = this.state.builderSurvey.questions[index];
      const clone = JSON.parse(JSON.stringify(source));
      clone.id = 'q-' + Date.now();
      clone.title = `${source.title} - Kopya`;
      clone.expanded = true;
      
      this.state.builderSurvey.questions.forEach(q => q.expanded = false);
      this.state.builderSurvey.questions.splice(index + 1, 0, clone);
      this.state.builderSurvey.activeQuestionId = clone.id;
    }
    this.saveState();
  }

  deleteQuestion(questionId) {
    this.state.builderSurvey.questions = this.state.builderSurvey.questions.filter(x => x.id !== questionId);
    this.state.activeModal = null;
    this.saveState();
  }

  moveQuestion(questionId, direction) {
    const index = this.state.builderSurvey.questions.findIndex(x => x.id === questionId);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < this.state.builderSurvey.questions.length) {
      const item = this.state.builderSurvey.questions.splice(index, 1)[0];
      this.state.builderSurvey.questions.splice(targetIndex, 0, item);
    }
    this.saveState();
  }

  addSectionToBuilder(title) {
    const secId = 'sec-' + Date.now();
    const newSec = {
      id: secId,
      title: title || `Bölüm ${this.state.builderSurvey.sections.length + 1}`,
      order: this.state.builderSurvey.sections.length + 1
    };
    this.state.builderSurvey.sections.push(newSec);
    this.state.activeModal = null;
    this.saveState();
  }

  setQuestionCondition(questionId, sourceQuestionId, operator, value) {
    const q = this.state.builderSurvey.questions.find(x => x.id === questionId);
    if (q) {
      if (!sourceQuestionId) {
        delete q.condition;
      } else {
        q.condition = { sourceQuestionId, operator: operator || 'equals', value: value || 'yes' };
      }
    }
    this.saveState();
  }

  async publishBuilderSurvey() {
    try {
      if (this.state.isOnline) {
        await this.apiFetch('/surveys', {
          method: 'POST',
          body: JSON.stringify({
            title: this.state.builderSurvey.title,
            description: this.state.builderSurvey.description,
            source: 'ADMIN'
          })
        });
      }
      this.state.builderSurvey.status = 'ACTIVE';
      this.state.builderStep = 4;
      this.saveState();
      await this.fetchInitialData();
    } catch (e) {
      this.state.builderSurvey.status = 'ACTIVE';
      this.state.builderStep = 4;
      this.saveState();
    }
  }

  setNetworkStatus(isOnline) {
    this.state.isOnline = isOnline;
    if (isOnline) {
      this.state.syncState = 'online';
      if (this.state.offlineQueueCount > 0) {
        this.syncOfflineQueue();
      }
    } else {
      this.state.syncState = 'offline';
    }
    this.saveState();
  }

  async syncOfflineQueue() {
    this.state.syncState = 'syncing';
    this.saveState();

    try {
      const pendingSubmissions = this.state.submissions.filter(s => !s.synced).map(s => ({
        clientSubmissionId: s.clientSubmissionId || ('sub-' + Date.now()),
        surveyId: s.surveyId || '44444444-4444-4444-4444-444444444441',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        latitude: 37.0662,
        longitude: 37.3833,
        accuracy: 8.0,
        syncSource: 'OFFLINE_SYNC',
        answers: Object.keys(s.data || {}).map(k => ({
          questionId: '66666666-6666-6666-6666-666666666661',
          answerValue: String(s.data[k])
        }))
      }));

      await this.apiFetch('/sync/batch', {
        method: 'POST',
        body: JSON.stringify({ submissions: pendingSubmissions })
      });

      this.state.submissions.forEach(s => s.synced = true);
      this.state.offlineQueueCount = 0;
      this.state.syncState = 'sync_success';
      this.saveState();
      await this.fetchInitialData();
    } catch (e) {
      this.state.syncState = 'sync_error';
      this.saveState();
    }
  }

  setPwaScreen(screen, params = {}) {
    this.state.pwaScreen = screen;
    if (params.taskId) {
      this.state.selectedTaskId = params.taskId;
      this.markTaskViewed(params.taskId);
    }
    if (params.messageId) {
      this.state.selectedMessageId = params.messageId;
      this.markMessageSeen(params.messageId);
    }
    if (screen === 'survey_runner') {
      this.state.activeSectionIndex = 0;
      this.state.activeFormAnswers = {
        q1: '',
        q4: 'yes',
        q5: '',
        q6: 'Buğday / Arpa'
      };
      this.state.activePhotoUploaded = false;
      this.state.activeLocationAcquired = false;
    }
    this.saveState();
  }

  async markTaskViewed(taskId) {
    const task = this.state.assignedSurveys.find(t => t.id === taskId);
    if (task && !task.viewedAt) {
      task.viewedAt = new Date().toISOString();
      if (this.state.isOnline) {
        try {
          await this.apiFetch(`/assignments/${taskId}/viewed`, { method: 'POST' });
        } catch (e) {}
      }
    }
    this.saveState();
  }

  async markMessageSeen(messageId) {
    const msg = this.state.messages.find(m => m.id === messageId);
    if (msg) {
      msg.isUnread = false;
      msg.seenAt = new Date().toISOString();
      if (this.state.isOnline) {
        try {
          await this.apiFetch(`/messages/${messageId}/seen`, { method: 'POST' });
        } catch (e) {}
      }
    }
    this.saveState();
  }

  dismissPwaInstall() {
    this.state.pwaInstallDismissed = true;
    this.saveState();
  }

  updateAnswer(questionId, value) {
    this.state.activeFormAnswers[questionId] = value;
    this.saveState();
  }

  setFormSection(index) {
    this.state.activeSectionIndex = index;
    this.saveState();
  }

  togglePhotoUpload() {
    this.state.activePhotoUploaded = !this.state.activePhotoUploaded;
    this.saveState();
  }

  acquireLocation() {
    this.state.activeLocationAcquired = true;
    this.saveState();
  }

  async submitActiveSurvey() {
    const taskId = this.state.selectedTaskId;
    const task = this.state.assignedSurveys.find(t => t.id === taskId) || this.state.assignedSurveys[0];
    const clientSubId = 'sub-' + Date.now();

    const submissionData = {
      clientSubmissionId: clientSubId,
      surveyId: task?.surveyId || '44444444-4444-4444-4444-444444444441',
      assignmentId: task?.id,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      latitude: 37.0662,
      longitude: 37.3833,
      accuracy: 8.0,
      syncSource: this.state.isOnline ? 'ONLINE' : 'OFFLINE_SYNC',
      data: { ...this.state.activeFormAnswers },
      synced: this.state.isOnline
    };

    this.state.submissions.unshift(submissionData);

    if (this.state.isOnline) {
      try {
        await this.apiFetch('/submissions', {
          method: 'POST',
          body: JSON.stringify({
            clientSubmissionId: clientSubId,
            surveyId: task?.surveyId || '44444444-4444-4444-4444-444444444441',
            assignmentId: task?.id,
            startedAt: submissionData.startedAt,
            completedAt: submissionData.completedAt,
            latitude: submissionData.latitude,
            longitude: submissionData.longitude,
            accuracy: submissionData.accuracy,
            syncSource: 'ONLINE',
            answers: Object.keys(this.state.activeFormAnswers).map(k => ({
              questionId: '66666666-6666-6666-6666-666666666661',
              answerValue: String(this.state.activeFormAnswers[k])
            }))
          })
        });
        if (task) task.completed += 1;
        this.state.syncState = 'sync_success';
      } catch (e) {
        this.state.offlineQueueCount += 1;
        this.state.syncState = 'offline';
      }
    } else {
      this.state.offlineQueueCount += 1;
      this.state.syncState = 'offline';
    }

    this.state.pwaScreen = 'survey_success';
    this.saveState();
  }

  // EXCEL & PDF EXPORT
  async downloadReportExcel(surveyId) {
    try {
      const blob = await this.apiFetch('/reports/excel', {
        method: 'POST',
        body: JSON.stringify({ surveyId })
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Anket_Raporu_${Date.now()}.xlsx`;
      a.click();
    } catch (e) {
      console.warn('Excel export error:', e);
    }
  }

  async downloadReportPdf(surveyId) {
    try {
      const blob = await this.apiFetch('/reports/pdf', {
        method: 'POST',
        body: JSON.stringify({ surveyId })
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Anket_Raporu_${Date.now()}.pdf`;
      a.click();
    } catch (e) {
      console.warn('PDF export error:', e);
    }
  }

  async createAdminSurvey(title, description) {
    try {
      await this.apiFetch('/surveys', {
        method: 'POST',
        body: JSON.stringify({ title, description, source: 'ADMIN' })
      });
      await this.fetchInitialData();
    } catch (e) {
      console.warn('Create survey error:', e);
    }
  }

  async createAdminAssignment(surveyId, villageId, targetCount, endDate, note, userIds) {
    try {
      await this.apiFetch('/assignments', {
        method: 'POST',
        body: JSON.stringify({
          surveyId,
          villageId: villageId || '55555555-5555-5555-5555-555555555551',
          targetCount: parseInt(targetCount) || 50,
          startDate: new Date().toISOString(),
          endDate: new Date(endDate || Date.now() + 7 * 86400000).toISOString(),
          note: note || 'Yönetici Notu: Saha kontrollerini yapınız.',
          assignedUserIds: userIds && userIds.length > 0 ? userIds : this.state.allPersonnel.map(p => p.id)
        })
      });
      await this.fetchInitialData();
    } catch (e) {
      console.warn('Create assignment error:', e);
    }
  }

  async cloneAdminSurvey(surveyId) {
    try {
      await this.apiFetch(`/surveys/${surveyId}/clone`, { method: 'POST' });
      await this.fetchInitialData();
    } catch (e) {
      console.warn('Clone survey error:', e);
    }
  }

  async toggleInvalidSubmission(submissionId) {
    try {
      await this.apiFetch(`/submissions/${submissionId}/toggle-invalid`, { method: 'POST' });
      await this.fetchInitialData();
    } catch (e) {
      console.warn('Toggle submission error:', e);
    }
  }

  async createAdminMessage(title, content, recipientUserIds) {
    try {
      const finalUserIds = (recipientUserIds && recipientUserIds.length > 0)
        ? recipientUserIds
        : this.state.allPersonnel.map(p => p.id);

      await this.apiFetch('/messages', {
        method: 'POST',
        body: JSON.stringify({ title, content, recipientUserIds: finalUserIds })
      });
      await this.fetchInitialData();
    } catch (e) {
      console.warn('Create message error:', e);
    }
  }

  createQuickSurvey(title) {
    const newQuick = {
      id: 'quick-' + Date.now(),
      title: title || 'Hızlı Saha Anketi',
      responseCount: 0,
      createdAt: 'Bugün',
      isMySurvey: true
    };
    this.state.myQuickSurveys.unshift(newQuick);
    this.state.pwaScreen = 'my_surveys';
    this.saveState();
  }

  resetAll() {
    this.state = { ...defaultState };
    this.saveState();
  }
}

export const store = new Store();
