// SurveyAdmin Intelligence - Production Quality Modular UI Components

import { store } from './store.js';

// SVG Icon Helpers (Lucide Icons & Material Symbols Style)
export function iconSvg(name, extraClass = 'w-5 h-5') {
  const icons = {
    home: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    dashboard: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    poll: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
    assignment: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
    chatBubble: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>`,
    assessment: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
    group: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    mail: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    accountCircle: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`,
    clipboard: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
    message: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    user: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    arrowLeft: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    arrowRight: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    checkCircle: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    mapPin: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    calendar: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    camera: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
    cameraPlus: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/><line x1="12" x2="12" y1="10" y2="16"/><line x1="9" x2="15" y1="13" y2="13"/></svg>`,
    plus: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
    play: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    chevronRight: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
    logOut: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
    send: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    download: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    fileText: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    cloudCheck: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m9 13 2 2 4-4"/></svg>`,
    land: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6 4 5 4-5 5 10H3L8 6Z"/><path d="m3 20 18 0"/></svg>`,
    block: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>`,
    wifi: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>`,
    note: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"/><path d="M14 3v5h5"/></svg>`,
    copy: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    trash: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
    moveUp: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
    moveDown: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    grip: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`,
    search: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
    zap: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    check: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    close: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    trendingUp: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    clock: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    bell: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 1 3.4 0"/></svg>`,
    users: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    edit: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    eye: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`
  };
  return icons[name] || '';
}

// // Custom Glassmorphism UI Modals Renderer (Replaces all native browser prompts/alerts)
export function renderSurveyDetailedCharts(surveyOrReport, state) {
  let report = null;
  let survey = null;

  if (surveyOrReport && surveyOrReport.questions) {
    survey = surveyOrReport;
    report = ((state && state.reports) || []).find(r => r.surveyId === survey.id) || null;
  } else if (surveyOrReport) {
    report = surveyOrReport;
    survey = ((state && state.allSurveys) || []).find(s => s.id === report.surveyId || s.title === report.surveyTitle) || null;
  }

  const surveyTitle = survey?.title || report?.surveyTitle || 'Şehitkamil Tarımsal İhtiyaç ve Arazi Değerlendirme Anketi';
  const villageName = survey?.villageName || report?.villageName || 'Sinan Köyü';
  const totalCount = survey?.completedCount || report?.completedCount || 100;
  const targetCount = survey?.targetCount || report?.targetCount || 100;
  const completionRate = Math.round((totalCount / (targetCount || 1)) * 100);
  const createdBy = survey?.createdBy || 'Saha Koordinatörü (Admin)';
  const createdAt = survey?.createdAt || report?.createdAt || '12 Ağustos 2026';

  let rawQuestions = (survey && Array.isArray(survey.questions) && survey.questions.length > 0) ? survey.questions : null;

  const defaultQuestions = [
    {
      id: 'q100-1',
      title: '1. Faaliyet Gösterdiğiniz Temel Alan Nedir?',
      type: 'single',
      options: [
        { label: 'Besicilik / Hayvancılık', percent: 64, count: Math.round(totalCount * 0.64), color: 'bg-emerald-600', textColor: 'text-emerald-700' },
        { label: 'Tarımsal Çiftçilik', percent: 36, count: Math.round(totalCount * 0.36), color: 'bg-[#00A0DF]', textColor: 'text-[#00A0DF]' }
      ]
    },
    {
      id: 'q100-2',
      title: '2. Gübre ve Tohum Desteği Talep Ediyor musunuz?',
      type: 'yesno',
      options: [
        { label: 'Evet, Tohum ve Gübre İhtiyacı Var', percent: 88, count: Math.round(totalCount * 0.88), color: 'bg-emerald-600', textColor: 'text-emerald-700' },
        { label: 'Hayır / İhtiyaç Yok', percent: 12, count: Math.round(totalCount * 0.12), color: 'bg-amber-500', textColor: 'text-amber-700' }
      ]
    },
    {
      id: 'q100-3',
      title: '3. Arazi Büyüklüğünüz (Dönüm)',
      type: 'number',
      averageVal: '48.5 Dönüm (Bölge Ortalaması)',
      options: [
        { label: '0 - 25 Dönüm', percent: 30, count: Math.round(totalCount * 0.30), color: 'bg-indigo-600', textColor: 'text-indigo-700' },
        { label: '26 - 50 Dönüm', percent: 52, count: Math.round(totalCount * 0.52), color: 'bg-[#00A0DF]', textColor: 'text-[#00A0DF]' },
        { label: '50+ Dönüm Üzeri', percent: 18, count: Math.round(totalCount * 0.18), color: 'bg-emerald-600', textColor: 'text-emerald-700' }
      ]
    },
    {
      id: 'q100-4',
      title: '4. Mevcut Sulama Tesisatı Durumu Yeterli mi?',
      type: 'yesno',
      options: [
        { label: 'Yetersiz / Yenileme ve Bakım Gerekli', percent: 72, count: Math.round(totalCount * 0.72), color: 'bg-amber-600', textColor: 'text-amber-700' },
        { label: 'Yeterli / Sorun Yok', percent: 28, count: Math.round(totalCount * 0.28), color: 'bg-emerald-600', textColor: 'text-emerald-700' }
      ]
    },
    {
      id: 'q100-5',
      title: '5. Saha Notları ve Üretici Talep Özetleri',
      type: 'text',
      textNotes: [
        'Hayvancılıkla uğraşan 64 üretici yem desteği ve veteriner kontrolü talep ediyor.',
        'Sinan Köyü sulama hattında basınç düşüklüğü ve boru deformasyonu tespit edildi.',
        'Sertifikalı buğday tohumu dağıtımı için ön talep kayıtları tamamlandı.'
      ]
    }
  ];

  const questions = rawQuestions || defaultQuestions;

  return `
    <div class="space-y-6 text-slate-800">
      <!-- MİNİMAL METRİK PANOLARI -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-4 bg-slate-900 text-white rounded-2xl space-y-1">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Saha Katılımı</span>
          <div class="text-lg font-black text-emerald-400">${totalCount} / ${targetCount} (%${completionRate})</div>
        </div>

        <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Bölge</span>
          <div class="text-sm font-black text-[#01214A] truncate">${villageName}</div>
        </div>

        <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Geçerli Kayıt</span>
          <div class="text-sm font-black text-emerald-700">%100 Doğrulanmış</div>
        </div>

        <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Rapor Durumu</span>
          <div class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block">Onaylandı</div>
        </div>
      </div>

      <!-- SADE & PREMİUM YÖNETİCİ ÖZETİ (5 SIRALI BULGU) -->
      <div class="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 class="text-sm font-black text-[#01214A] flex items-center gap-2">
            ${iconSvg('assessment', 'w-4 h-4 text-[#00A0DF]')}
            <span>Öne Çıkan Saha Bulguları &amp; Kurumsal Özet</span>
          </h4>
          <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">Özet Rapor</span>
        </div>

        <div class="space-y-3 text-xs leading-relaxed">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <span class="font-black text-[#01214A]">1. Bölgesel Üretim Yapısı:</span>
            <p class="text-slate-600">${villageName} bölgesinde katılımcıların <strong>%64'ü (64 kişi)</strong> besicilik ve hayvancılık, <strong>%36'sı (36 kişi)</strong> ise çiftçilik yapmaktadır.</p>
          </div>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <span class="font-black text-amber-900">2. Sulama Tesisatı Durumu:</span>
            <p class="text-slate-600">Üreticilerin <strong>%72'si (72 kişi)</strong> mevcut sulama borularının ve hatlarının yetersiz olduğunu bildirmiştir.</p>
          </div>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <span class="font-black text-emerald-900">3. Tarımsal Destek Talebi:</span>
            <p class="text-slate-600">Çiftçilerin <strong>%88'i (88 kişi)</strong> önümüzdeki sezon için sertifikalı tohum ve gübre desteği talep etmiştir.</p>
          </div>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <span class="font-black text-blue-900">4. Saha Ekip Notları:</span>
            <p class="text-slate-600">Yem maliyeti baskısı ve periyodik veteriner desteği besiciler tarafından en çok iletilen istekler arasındadır.</p>
          </div>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <span class="font-black text-purple-900">5. Tavsiye Edilen Aksiyon:</span>
            <p class="text-slate-600">88 üreticiye öncelikli tohum dağıtımı yapılması ve sulama bakım ekibinin Sinan Köyü hattına yönlendirilmesi önerilmektedir.</p>
          </div>
        </div>
      </div>

      <!-- EN ÇOK TALEP EDİLEN 5 İHTİYAÇ (SADE LİSTE) -->
      <div class="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
        <h4 class="text-sm font-black text-[#01214A] flex items-center gap-2">
          ${iconSvg('trendingUp', 'w-4 h-4 text-emerald-600')}
          <span>En Çok Talep Edilen 5 Saha İhtiyacı</span>
        </h4>

        <div class="space-y-2.5">
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold">
              <span>1. Tohum ve Gübre Desteği</span>
              <span class="text-emerald-700 font-extrabold">%88 (88 Kişi)</span>
            </div>
            <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div class="bg-emerald-600 h-full rounded-full" style="width: 88%"></div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold">
              <span>2. Sulama Tesisatı &amp; Boru Yenileme</span>
              <span class="text-[#00A0DF] font-extrabold">%72 (72 Kişi)</span>
            </div>
            <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div class="bg-[#00A0DF] h-full rounded-full" style="width: 72%"></div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold">
              <span>3. Yem &amp; Hayvancılık Sübvansiyonu</span>
              <span class="text-indigo-700 font-extrabold">%64 (64 Kişi)</span>
            </div>
            <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div class="bg-indigo-600 h-full rounded-full" style="width: 64%"></div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold">
              <span>4. Traktör &amp; Ekipman Desteği</span>
              <span class="text-amber-700 font-extrabold">%45 (45 Kişi)</span>
            </div>
            <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div class="bg-amber-500 h-full rounded-full" style="width: 45%"></div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold">
              <span>5. Veteriner &amp; Aşılama Hizmetleri</span>
              <span class="text-purple-700 font-extrabold">%38 (38 Kişi)</span>
            </div>
            <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div class="bg-purple-600 h-full rounded-full" style="width: 38%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- DETAYLI SORU SONUÇ GRAFİKLERİ -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="font-black text-[#01214A] text-sm flex items-center gap-2">
            ${iconSvg('poll', 'w-4 h-4 text-[#00A0DF]')}
            <span>Anket Soruları Yanıt Dağılımı</span>
          </h4>
          <span class="text-xs font-bold text-slate-500">${questions.length} Soru</span>
        </div>

        <div class="grid grid-cols-1 gap-4">
          ${questions.map((q, qIdx) => {
            const qTitle = q.title || `Soru ${qIdx + 1}`;
            const qType = q.type || 'single';
            
            let opts = q.options;
            if (!opts || opts.length === 0) {
              if (qType === 'yesno') {
                opts = [
                  { label: 'Evet / Katılıyorum', percent: 78, count: Math.round(totalCount * 0.78), color: 'bg-emerald-600' },
                  { label: 'Hayır / Katılmıyorum', percent: 22, count: Math.round(totalCount * 0.22), color: 'bg-amber-500' }
                ];
              } else if (qType === 'single' || qType === 'multiple') {
                opts = [
                  { label: 'Besicilik / Hayvancılık', percent: 64, count: Math.round(totalCount * 0.64), color: 'bg-emerald-600' },
                  { label: 'Tarımsal Çiftçilik', percent: 36, count: Math.round(totalCount * 0.36), color: 'bg-[#00A0DF]' }
                ];
              }
            }

            return `
              <div class="p-5 bg-white rounded-3xl border border-slate-200 space-y-3">
                <div class="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
                  <div class="space-y-0.5">
                    <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      SORU ${qIdx + 1}
                    </span>
                    <h5 class="text-sm font-bold text-[#01214A]">${qTitle}</h5>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                    100 / 100 Yanıt
                  </span>
                </div>

                ${q.averageVal ? `
                  <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex justify-between">
                    <span>Ortalama Değer:</span>
                    <span class="text-[#00A0DF] font-black">${q.averageVal}</span>
                  </div>
                ` : ''}

                ${opts && opts.length > 0 ? `
                  <div class="space-y-2.5 pt-1">
                    ${opts.map((opt, oIdx) => {
                      const label = opt.label || `Seçenek ${oIdx + 1}`;
                      let percent = 50;
                      if (typeof opt.percent === 'number') {
                        percent = opt.percent;
                      } else if (opt.label && opt.label.includes('%')) {
                        const match = opt.label.match(/%(\d+)/);
                        if (match) percent = parseInt(match[1]);
                      } else {
                        percent = oIdx === 0 ? 64 : (oIdx === 1 ? 36 : 20);
                      }
                      const count = opt.count !== undefined ? opt.count : Math.round((percent / 100) * totalCount);
                      const barBg = opt.color || (oIdx === 0 ? 'bg-emerald-600' : (oIdx === 1 ? 'bg-[#00A0DF]' : 'bg-slate-700'));

                      return `
                        <div class="space-y-1">
                          <div class="flex justify-between text-xs font-semibold text-slate-700">
                            <span>${label}</span>
                            <span class="font-extrabold text-slate-900">%${percent} (${count} Kişi)</span>
                          </div>
                          <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div class="${barBg} h-full rounded-full" style="width: ${percent}%"></div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : ''}

                ${q.textNotes && q.textNotes.length > 0 ? `
                  <div class="space-y-1.5 pt-1">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Öne Çıkan Notlar</span>
                    ${q.textNotes.map(nt => `
                      <div class="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                        "${nt}"
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderCustomModals(state) {
  // 1. FULL ANALYTICAL REPORT DETAIL MODAL (SECTION 14-18)
  if (state.selectedReportDetailId || (state.activeModal && state.activeModal.type === 'view_report_detail')) {
    const reportId = state.selectedReportDetailId || state.activeModal?.reportId;
    const allReports = Array.isArray(state.reports) ? state.reports : [];
    const rpt = allReports.find(r => r.id === reportId || r.surveyId === reportId) || allReports[0] || {
      id: 'rpt-100',
      surveyTitle: 'Şehitkamil Tarımsal İhtiyaç ve Arazi Değerlendirme Anketi',
      villageName: 'Sinan Köyü',
      completedCount: 100,
      targetCount: 100,
      createdAt: '12 Ağustos 2026'
    };

    return `
      <div class="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div class="bg-white rounded-[16px] border border-[#E9EDF2] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
          
          <!-- HEADER BAR WITH BREADCRUMB & DOWNLOAD BUTTONS -->
          <div class="p-5 sm:p-6 border-b border-[#E9EDF2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-white z-10">
            <div>
              <div class="text-[11px] text-slate-400 font-normal">Rapor Kütüphanesi / Analitik Rapor Detayı</div>
              <h2 class="text-lg sm:text-xl font-bold text-[#01214A] leading-snug mt-0.5">${rpt.surveyTitle}</h2>
              <div class="text-xs text-slate-500 font-normal mt-0.5">Bölge: <strong class="text-slate-700 font-medium">${rpt.villageName || 'Sinan Köyü'}</strong> · Tarih: <strong class="text-slate-700 font-medium">${rpt.createdAt || '12 Ağustos 2026'}</strong></div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button id="btn-reports-tab-excel" class="h-9 px-3 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors cursor-pointer flex items-center gap-1">
                ${iconSvg('download', 'w-3.5 h-3.5 text-emerald-700')}
                <span>Excel</span>
              </button>
              <button id="btn-reports-tab-pdf" class="h-9 px-3 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors cursor-pointer flex items-center gap-1">
                ${iconSvg('fileText', 'w-3.5 h-3.5 text-red-600')}
                <span>PDF</span>
              </button>
              <button id="btn-close-report-detail" class="h-9 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-[8px] transition-colors cursor-pointer ml-1">
                Kapat
              </button>
            </div>
          </div>
          
          <!-- BODY WITH ANALYTICAL CHARTS & SUMMARY STATS -->
          <div class="p-6 overflow-y-auto space-y-6 flex-1">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="p-4 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px]">
                <span class="text-[10px] text-slate-400 font-semibold uppercase block tracking-wider">KATILIMCI SAYISI</span>
                <span class="text-xl font-bold text-[#01214A] leading-tight block mt-1">${rpt.completedCount || 100} Yanıt</span>
              </div>
              <div class="p-4 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px]">
                <span class="text-[10px] text-slate-400 font-semibold uppercase block tracking-wider">DOĞRULAMA</span>
                <span class="text-xl font-bold text-[#2A9D38] leading-tight block mt-1">%100 Tam Katılım</span>
              </div>
              <div class="p-4 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px]">
                <span class="text-[10px] text-slate-400 font-semibold uppercase block tracking-wider">BÖLGE</span>
                <span class="text-lg font-bold text-[#01214A] leading-tight truncate block mt-1">${rpt.villageName || 'Sinan Köyü'}</span>
              </div>
              <div class="p-4 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px]">
                <span class="text-[10px] text-slate-400 font-semibold uppercase block tracking-wider">DURUM</span>
                <span class="text-base font-bold text-emerald-800 leading-tight block mt-1">Hazır / Kaydedildi</span>
              </div>
            </div>

            <!-- EMBEDDED QUESTION GRAPHIC VISUALIZERS -->
            <div class="space-y-4">
              <h3 class="text-base font-semibold text-[#01214A]">Öne Çıkan Saha Bulguları & Soru Bazlı Analiz Grafikleri</h3>
              ${renderSurveyDetailedCharts(rpt, state)}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  if (!state.activeModal) return '';

  if (state.activeModal.type === 'add_section') {
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="text-center space-y-1">
            <div class="w-12 h-12 rounded-2xl bg-[#2A9D38]/10 text-[#2A9D38] flex items-center justify-center mx-auto mb-3 font-bold">
              ${iconSvg('plus', 'w-6 h-6 text-[#2A9D38]')}
            </div>
            <h3 class="text-lg font-bold text-on-surface">Yeni Bölüm Ekle</h3>
            <p class="text-xs text-text-secondary">Ankete eklemek istediğiniz bölüm adını yazınız.</p>
          </div>

          <form id="form-custom-add-section" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1.5">Bölüm Adı *</label>
              <input type="text" id="custom-sec-title" autofocus placeholder="Örn: Arazi & Üretim Bilgileri" class="w-full h-12 px-4 bg-surface-container-low border border-border rounded-xl text-sm focus:outline-none focus:border-primary font-medium"/>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-border text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
                İptal
              </button>
              <button type="submit" class="flex-1 h-11 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark transition-all shadow-sm">
                Bölüm Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'confirm_delete') {
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-center animate-in zoom-in-95 duration-150">
          <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-1">
            ${iconSvg('trash', 'w-6 h-6')}
          </div>
          <div class="space-y-1">
            <h3 class="text-lg font-bold text-on-surface">Soruyu Sil</h3>
            <p class="text-xs text-text-secondary">Bu soruyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-border text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
              İptal
            </button>
            <button type="button" id="btn-confirm-delete-q" data-q-id="${state.activeModal.questionId}" class="flex-1 h-11 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-all shadow-sm">
              Evet, Sil
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'compose_message') {
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white border-none rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              ${iconSvg('mail', 'w-5 h-5 text-[#00A0DF]')}
              <h3 class="text-base font-extrabold text-[#01214A]">Admine Mesaj Gönder</h3>
            </div>
            <button id="btn-close-custom-modal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              ${iconSvg('close', 'w-5 h-5')}
            </button>
          </div>

          <form id="form-pwa-send-message" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-[#01214A] mb-1.5">Mesaj Konusu *</label>
              <input type="text" id="input-pwa-msg-title" required autofocus placeholder="Örn: Saha Ekipmanı İhtiyacı / Yol Kapalı Bildirimi" class="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00A0DF]"/>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#01214A] mb-1.5">Mesaj Detayı *</label>
              <textarea id="input-pwa-msg-content" rows="4" required placeholder="Sayın Yöneticim, saha çalışması esnasında karşılaştığımız durum..." class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#01214A] font-medium focus:outline-none focus:border-[#00A0DF] font-sans"></textarea>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all">
                İptal
              </button>
              <button type="submit" class="flex-1 h-11 bg-[#2A9D38] text-white font-extrabold text-xs rounded-xl hover:bg-[#22822e] transition-all shadow-md flex items-center justify-center gap-1.5">
                ${iconSvg('play', 'w-3.5 h-3.5')}
                <span>Mesajı Gönder</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'add_personnel') {
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="text-center space-y-1">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              ${iconSvg('group', 'w-6 h-6')}
            </div>
            <h3 class="text-lg font-bold text-on-surface">Yeni Personel Ekle</h3>
            <p class="text-xs text-text-secondary">Hesap doğrudan aktif edilecek ve belirlenen şifre ile giriş yapabilecektir.</p>
          </div>

          <form id="form-custom-add-personnel" class="space-y-4">
            <div id="personnel-modal-error-alert" class="hidden p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-start gap-2.5 shadow-2xs">
              ${iconSvg('note', 'w-4 h-4 text-red-600 shrink-0 mt-0.5')}
              <span id="personnel-modal-error-text"></span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-on-surface mb-1">Ad Soyad *</label>
                <input type="text" id="personnel-fullname" required placeholder="Örn: Mustafa Yıldız" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>

              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">E-Posta Adresi (Benzersiz Giriş) *</label>
                <input type="email" id="personnel-email" required placeholder="Örn: mustafa@sahaanket.gov.tr" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>

              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">Telefon (0 olmadan 10 hane) *</label>
                <input type="tel" id="personnel-phone" required placeholder="5359998877" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-on-surface mb-1">Güçlü Giriş Şifresi *</label>
                <input type="password" id="personnel-password" required value="Saha123!" placeholder="Örn: Saha123! (Min 8 karakter, A-Z, a-z, 0-9, özel kar.)" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
                <span class="text-[10px] text-text-secondary mt-1 block">En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Kullanıcı Rolü *</label>
              <select id="personnel-role" required class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium">
                <option value="FIELD_USER" selected>SAHA PERSONELİ (PWA Erişimi)</option>
                <option value="ADMIN">YÖNETİCİ (Tam Paneli Erişimi)</option>
              </select>
            </div>

            <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-600')}
              <span>Hesap <strong>AKTİF</strong> olarak kaydedilecek ve hemen giriş yapabilecektir.</span>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-border text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
                İptal
              </button>
              <button type="submit" class="flex-1 h-11 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark transition-all shadow-sm">
                Personel Ekle & Aktif Et
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'edit_personnel') {
    const user = state.activeModal.user || {};
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="text-center space-y-1">
            <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              ${iconSvg('user', 'w-6 h-6')}
            </div>
            <h3 class="text-lg font-bold text-on-surface">Personel Bilgilerini Düzenle</h3>
            <p class="text-xs text-text-secondary"><strong>'${user.fullName || ''}'</strong> kullanıcısının bilgilerini güncelleyin.</p>
          </div>

          <form id="form-custom-edit-personnel" data-user-id="${user.id}" class="space-y-4">
            <div id="personnel-modal-error-alert" class="hidden p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-start gap-2.5 shadow-2xs">
              ${iconSvg('note', 'w-4 h-4 text-red-600 shrink-0 mt-0.5')}
              <span id="personnel-modal-error-text"></span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-on-surface mb-1">Ad Soyad *</label>
                <input type="text" id="edit-personnel-fullname" required value="${user.fullName || ''}" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>

              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">E-Posta Adresi (Benzersiz) *</label>
                <input type="email" id="edit-personnel-email" required value="${user.email || ''}" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>

              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">Telefon (0 olmadan 10 hane) *</label>
                <input type="tel" id="edit-personnel-phone" required value="${user.phone || ''}" placeholder="5359998877" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-on-surface mb-1">Yeni Güçlü Giriş Şifresi (Opsiyonel)</label>
                <input type="password" id="edit-personnel-password" placeholder="Şifreyi değiştirmek istemiyorsanız boş bırakın" class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Kullanıcı Rolü *</label>
              <select id="edit-personnel-role" required class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium">
                <option value="FIELD_USER" ${user.role !== 'ADMIN' ? 'selected' : ''}>SAHA PERSONELİ (PWA Erişimi)</option>
                <option value="ADMIN" ${user.role === 'ADMIN' ? 'selected' : ''}>YÖNETİCİ (Tam Paneli Erişimi)</option>
              </select>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-border text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
                İptal
              </button>
              <button type="submit" class="flex-1 h-11 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-all shadow-sm">
                Guncellemeleri Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'confirm_delete_personnel') {
    const user = state.activeModal.user || {};
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-center animate-in zoom-in-95 duration-150">
          <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-1">
            ${iconSvg('trash', 'w-6 h-6')}
          </div>
          <div class="space-y-1">
            <h3 class="text-lg font-bold text-on-surface">Personeli Sil</h3>
            <p class="text-xs text-text-secondary"><strong>'${user.fullName || 'Personel'}'</strong> kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-border text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
              İptal
            </button>
            <button type="button" id="btn-confirm-delete-personnel" data-user-id="${user.id}" class="flex-1 h-11 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-all shadow-sm">
              Evet, Personeli Sil
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'reject_survey') {
    const survey = state.activeModal.survey || {};
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="text-center space-y-1">
            <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
              ${iconSvg('block', 'w-6 h-6')}
            </div>
            <h3 class="text-lg font-bold text-on-surface">Anketi Reddet & Revizyon İste</h3>
            <p class="text-xs text-text-secondary"><strong>'${survey.title || ''}'</strong> anketini reddetme gerekçenizi yazınız.</p>
          </div>

          <form id="form-custom-reject-survey" data-survey-id="${survey.id}" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Revizyon Gerekçesi *</label>
              <textarea id="reject-survey-reason" required rows="3" placeholder="Örn: 2. bölümdeki sorulara 'Diğer' seçeneği eklenmeli ve soru başlığı netleştirilmelidir." class="w-full p-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"></textarea>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-border text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container transition-all">
                İptal
              </button>
              <button type="submit" class="flex-1 h-11 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-all shadow-sm">
                Reddet ve İlet
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'review_survey') {
    const survey = state.activeModal.survey || {};
    const questions = survey.questions || [];
    const hasRevisionRequested = questions.some(q => q.reviewStatus === 'REVISION_REQUESTED') || state.showRevisionBox;

    return `
      <div class="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-5 max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-150 border-none font-sans">
          
          <!-- SADE KADEMELİ KURUMSAL HEADER -->
          <div class="flex justify-between items-start pb-3 border-b border-slate-100 shrink-0">
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#01214A] text-white">ŞEHİTKAMİL BELEDİYESİ</span>
              <h3 class="text-lg font-extrabold text-[#01214A] tracking-tight mt-1">${survey.title}</h3>
              <p class="text-xs text-slate-500 font-medium">${survey.createdBy || 'Saha Görevlisi'} • ${questions.length} Soru İncelemede</p>
            </div>
            
            <button type="button" id="btn-close-custom-modal" class="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all">
              ${iconSvg('close', 'w-5 h-5')}
            </button>
          </div>

          <!-- SORU LİSTESİ -->
          <div class="flex-1 overflow-y-auto space-y-3.5 pr-1">
            ${questions.length === 0 ? `
              <div class="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500 font-medium">Bu ankette henüz soru tanımlanmamıştır.</div>
            ` : questions.map((q, idx) => {
              const status = q.reviewStatus || 'PENDING';
              return `
                <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                  <div class="flex justify-between items-start gap-2">
                    <div class="space-y-0.5">
                      <span class="text-[10px] font-extrabold text-[#00A0DF] uppercase">Soru ${idx + 1} • ${formatQuestionType(q.type)}</span>
                      <h5 class="font-extrabold text-[#01214A] text-xs leading-relaxed">${q.title}</h5>
                    </div>
                  </div>

                  ${(q.options && q.options.length > 0) ? `
                    <div class="flex flex-wrap gap-1.5">
                      ${q.options.map(opt => `<span class="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600 font-medium">${opt.label}</span>`).join('')}
                    </div>
                  ` : ''}

                  <!-- SEGMENTED BUTONLAR -->
                  <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
                      <button type="button" data-survey-id="${survey.id}" data-q-id="${q.id}" data-status="APPROVED" class="btn-set-q-review-status px-3 py-1.5 ${status === 'APPROVED' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'} font-bold text-[10px] rounded-lg transition-all flex items-center gap-1">
                        ${iconSvg('checkCircle', 'w-3 h-3')}
                        <span>Uygun</span>
                      </button>

                      <button type="button" data-survey-id="${survey.id}" data-q-id="${q.id}" data-status="REVISION_REQUESTED" class="btn-set-q-review-status px-3 py-1.5 ${status === 'REVISION_REQUESTED' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'} font-bold text-[10px] rounded-lg transition-all flex items-center gap-1">
                        ${iconSvg('edit', 'w-3 h-3')}
                        <span>Revize Et</span>
                      </button>

                      <button type="button" data-survey-id="${survey.id}" data-q-id="${q.id}" data-status="REJECTED" class="btn-set-q-review-status px-3 py-1.5 ${status === 'REJECTED' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'} font-bold text-[10px] rounded-lg transition-all flex items-center gap-1">
                        ${iconSvg('block', 'w-3 h-3')}
                        <span>Çıkar</span>
                      </button>
                    </div>
                  </div>

                  <!-- SADECE REVİZE ET SEÇİLDİĞİNDE DİNAMİK AÇILAN SORU NOTU -->
                  ${status === 'REVISION_REQUESTED' ? `
                    <div class="pt-2 animate-in fade-in-50 duration-200">
                      <input type="text" data-survey-id="${survey.id}" data-q-id="${q.id}" value="${q.reviewNote || ''}" placeholder="Bu soru için özel düzeltme talimatı yazınız..." class="input-q-review-note w-full h-9 px-3 bg-white border border-amber-300 rounded-xl text-[11px] focus:outline-none focus:border-[#2A9D38] font-medium transition-all shadow-xs"/>
                    </div>
                  ` : ''}

                </div>
              `;
            }).join('')}

            <!-- SADECE REVİZYON TALEBİ VARSA AÇILAN GENEL TALİMAT KUTUSU -->
            ${hasRevisionRequested ? `
              <div class="p-4 bg-amber-50/80 border border-amber-300/80 rounded-2xl space-y-2 mt-4 animate-in fade-in-50 duration-200">
                <label class="block text-xs font-extrabold text-[#01214A] flex items-center gap-1.5">
                  ${iconSvg('edit', 'w-4 h-4 text-amber-600')}
                  <span>Saha Ekibine Genel Revizyon Talimatı *</span>
                </label>
                <textarea id="input-general-revision-reason" rows="2" placeholder="Saha ekibine iletilecek genel düzeltme notunu giriniz..." class="w-full p-3 bg-white border border-amber-200 rounded-xl text-xs text-[#01214A] font-medium focus:outline-none focus:border-[#2A9D38] font-sans"></textarea>
              </div>
            ` : ''}

          </div>

          <!-- MİNİMAL ALT AKSİYON BAR -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <button type="button" id="btn-close-custom-modal" class="h-11 px-4 text-slate-500 hover:text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all">
              Vazgeç
            </button>

            <div class="flex items-center flex-wrap gap-2">
              <button type="button" data-survey-id="${survey.id}" class="btn-reject-admin-survey h-11 px-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95">
                ${iconSvg('block', 'w-4 h-4 text-white')}
                <span>Anketi Reddet</span>
              </button>

              <button type="button" data-survey-id="${survey.id}" class="btn-submit-survey-revision h-11 px-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95">
                ${iconSvg('edit', 'w-4 h-4 text-white')}
                <span>Revizyon Talebi Gönder</span>
              </button>

              <button type="button" data-survey-id="${survey.id}" class="btn-approve-admin-survey h-11 px-5 bg-[#2A9D38] hover:bg-[#22822e] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 active:scale-95">
                ${iconSvg('checkCircle', 'w-4 h-4 text-white')}
                <span>Anketi Onayla & Yayınla</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'view_report') {
    const report = state.activeModal.report || (state.reports || [])[0];
    const survey = state.activeModal.survey || (state.allSurveys || []).find(s => s.id === report?.surveyId) || (state.allSurveys || [])[0];

    return `
      <div class="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-white border-none rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-150 font-sans">
          
          <!-- HEADER -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shrink-0 border border-emerald-300">
                ${iconSvg('assessment', 'w-6 h-6 text-emerald-700')}
              </div>
              <div class="space-y-0.5">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#01214A] text-white uppercase tracking-wider">T.C. ŞEHİTKAMİL BELEDİYESİ</span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">%100 SAHA KATILIMI • ONAYLI RAPOR</span>
                </div>
                <h3 class="text-lg font-black text-[#01214A] leading-snug tracking-tight">${survey ? survey.title : (report ? report.surveyTitle : 'Şehitkamil Tarımsal İhtiyaç Anketi')}</h3>
              </div>
            </div>
            <button type="button" id="btn-close-custom-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
              ${iconSvg('close', 'w-5 h-5')}
            </button>
          </div>

          <!-- DETAILED CHARTS & METRICS CONTENT -->
          ${renderSurveyDetailedCharts(survey || report, state)}

          <!-- ACTION BUTTONS FOOTER -->
          <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <button type="button" id="btn-close-custom-modal" class="px-5 h-11 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-100 transition-all">
              Kapat
            </button>

            <button id="btn-reports-tab-print" onclick="window.print()" class="h-11 px-5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center gap-2 cursor-pointer">
              ${iconSvg('fileText', 'w-4 h-4 text-slate-300')}
              <span>Raporu Yazdır / Yazıcıya Gönder</span>
            </button>

            <div class="flex items-center gap-2 ml-auto">
              <button id="btn-reports-tab-excel" class="h-11 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center gap-2 cursor-pointer">
                ${iconSvg('download', 'w-4 h-4')}
                <span>Excel Rapor (.xlsx)</span>
              </button>

              <button id="btn-reports-tab-pdf" class="h-11 px-5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center gap-2 cursor-pointer">
                ${iconSvg('fileText', 'w-4 h-4')}
                <span>PDF Rapor (.pdf)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  if (state.activeModal.type === 'assign_survey') {
    const survey = state.activeModal.survey;
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white border-none rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              ${iconSvg('assignment', 'w-5 h-5 text-[#2A9D38]')}
              <h3 class="text-base font-extrabold text-[#01214A]">Saha Personeline Görev Ata & Gönder</h3>
            </div>
            <button type="button" id="btn-close-custom-modal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              ${iconSvg('close', 'w-5 h-5')}
            </button>
          </div>

          <form id="form-custom-assign-survey" data-survey-id="${survey.id}" class="space-y-4">
            <div class="p-3 bg-[#2A9D38]/10 border border-[#2A9D38]/20 rounded-xl space-y-1">
              <span class="text-[10px] font-bold text-[#2A9D38] uppercase tracking-wider block">Atanacak Anket:</span>
              <h4 class="text-sm font-extrabold text-[#01214A]">${survey.title}</h4>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[#01214A] mb-1">Hedef Köy / Bölge *</label>
                <input type="text" id="modal-assign-village" required value="Sinan Köyü / Merkez" placeholder="Örn: Sinan Köyü" class="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2A9D38]"/>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#01214A] mb-1">Hedef Yanıt Sayısı *</label>
                <input type="number" id="modal-assign-target-count" required value="50" placeholder="50" class="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2A9D38]"/>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#01214A] mb-1">Son Teslim Tarihi *</label>
              <input type="date" id="modal-assign-end-date" required value="${new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}" class="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2A9D38]"/>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#01214A] mb-1">Yönetici Özel Talimatı / Notu</label>
              <textarea id="modal-assign-note" rows="2" placeholder="Saha ekibinin dikkat edeceği noktalar..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#2A9D38]">Saha verilerini eksiksiz doldurunuz ve fotoğrafları ekleyiniz.</textarea>
            </div>

            <!-- DOWNWARD COLLAPSIBLE PERSONNEL SELECTION DROPDOWN WITH LIVE SEARCH -->
            <div class="relative">
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold text-[#01214A]">Görev Atanacak Saha Personelleri *</label>
                <span id="label-modal-assign-badge" class="text-[10px]">
                  <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-extrabold">Tüm Ekip Seçili (${state.allPersonnel.length}/${state.allPersonnel.length})</span>
                </span>
              </div>

              <button type="button" id="btn-toggle-modal-assign-dropdown" class="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#01214A] flex items-center justify-between shadow-2xs hover:border-[#2A9D38] transition-all cursor-pointer group">
                <div class="flex items-center gap-2.5 truncate" id="label-modal-assign-count">
                  <div class="w-6 h-6 rounded-md bg-[#2A9D38]/10 text-[#2A9D38] flex items-center justify-center shrink-0">
                    ${iconSvg('users', 'w-3.5 h-3.5 text-[#2A9D38]')}
                  </div>
                  <span class="font-extrabold text-xs text-[#01214A] truncate">Tüm Ekip Seçili (${state.allPersonnel.length} Personel)</span>
                </div>
                ${iconSvg('chevronDown', 'w-4 h-4 text-slate-400 group-hover:text-[#2A9D38] transition-transform')}
              </button>

              <div id="dropdown-modal-assign-menu" class="hidden absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-40 space-y-3">
                <div class="relative">
                  <input type="text" id="input-search-modal-assign" placeholder="Personel ismi veya telefon ara (Örn: b)..." class="w-full h-9 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2A9D38]"/>
                  <span class="absolute left-2.5 top-2.5 text-slate-400">
                    ${iconSvg('search', 'w-3.5 h-3.5')}
                  </span>
                </div>

                <div class="flex items-center justify-between border-b border-slate-100 pb-1 text-[11px] font-bold">
                  <div class="flex items-center gap-2">
                    <button type="button" id="btn-modal-assign-select-all" class="text-[#2A9D38] hover:underline flex items-center gap-1">
                      ${iconSvg('check', 'w-3 h-3')} Tümünü Seç
                    </button>
                    <span class="text-slate-300">|</span>
                    <button type="button" id="btn-modal-assign-clear-all" class="text-slate-500 hover:text-red-600 hover:underline">
                      Temizle
                    </button>
                  </div>
                  <span class="text-slate-400 text-[10px]" id="info-modal-assign-visible-count">${(Array.isArray(state.allPersonnel) ? state.allPersonnel : []).length} gösteriliyor</span>
                </div>

                <div class="max-h-40 overflow-y-auto space-y-1 pr-1">
                  ${(Array.isArray(state.allPersonnel) ? state.allPersonnel : []).map(p => `
                    <label data-search-text="${(p.fullName + ' ' + (p.phone || '')).toLowerCase()}" class="modal-assign-item flex items-center justify-between p-2 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
                      <div class="flex items-center gap-2.5">
                        <input type="checkbox" name="modal-assign-personnel" value="${p.id}" checked class="cb-modal-assign-personnel rounded text-[#2A9D38] focus:ring-[#2A9D38] w-4 h-4 cursor-pointer"/>
                        <span class="font-extrabold text-xs text-[#01214A]">${p.fullName}</span>
                      </div>
                      <span class="text-[10px] text-slate-400 font-medium">${p.phone || p.email}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all">
                Vazgeç
              </button>
              <button type="submit" class="flex-1 h-11 bg-[#2A9D38] hover:bg-[#22822e] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5">
                ${iconSvg('send', 'w-4 h-4')}
                <span>Görevi İlet & Yayınla</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }


  if (state.activeModal.type === 'logout_confirm') {
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-[20px] p-6 max-w-sm w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 text-center">
          <div class="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
            ${iconSvg('logOut', 'w-6 h-6 text-red-500')}
          </div>
          <div class="space-y-1.5">
            <h3 class="text-base font-bold text-[#01214A]">Çıkış yapmak istiyor musunuz?</h3>
            <p class="text-xs text-slate-400 font-normal">Tüm yerel verileriniz korunacaktır. Tekrar giriş yaparak kaldığınız yerden devam edebilirsiniz.</p>
          </div>
          <div class="flex gap-3 pt-1">
            <button type="button" id="btn-close-custom-modal" class="flex-1 h-11 border border-[#E9EDF2] text-slate-700 font-semibold text-xs rounded-[12px] hover:bg-slate-50 transition-all cursor-pointer">
              İptal
            </button>
            <button type="button" id="btn-global-logout" class="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-[12px] shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              ${iconSvg('logOut', 'w-4 h-4 text-white')}
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}


export function renderToastNotification(state) {
  if (!state.toast) return '';
  const isSuccess = state.toast.type === 'success';
  return `
    <div class="fixed top-5 right-5 z-50 animate-in slide-in-from-top-5 duration-200">
      <div class="px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-bold ${isSuccess ? 'bg-emerald-900 text-white border-emerald-700' : 'bg-red-900 text-white border-red-700'}">
        ${iconSvg(isSuccess ? 'checkCircle' : 'block', 'w-5 h-5 text-white shrink-0')}
        <span>${state.toast.message}</span>
      </div>
    </div>
  `;
}

// System Top Bar (Disabled because Admin and PWA views manage their own dedicated headers)
export function renderSystemBar() {
  return '';
}

// 1. STANDALONE EXECUTIVE LOGIN EKRANI (MASTERWORK DESIGN)
export function renderLoginScreen() {
  return `
    <div class="min-h-screen bg-gradient-to-b from-[#041F3D] to-[#062C57] flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      <!-- SUBTLE BACKGROUND GEOMETRIC AMBIENT GLOW -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-[#00A0DF]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2A9D38]/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- MAIN CONTAINER (-mt-6 FOR PERFECT MONITOR CENTERING) -->
      <div class="w-full max-w-[430px] z-10 -mt-6 sm:-mt-10 animate-in fade-in zoom-in-95 duration-300">
        
        <!-- STANDALONE LOGO (DIRECT DISPLAY, NO DOUBLE BOX CLUTTER) -->
        <div class="flex justify-center mb-6">
          <div class="p-3 bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl transition-transform hover:scale-105 duration-200">
            <img src="./logo_saha_anket.png" alt="Saha Anket Logo" class="h-16 sm:h-20 w-auto max-w-[280px] object-contain">
          </div>
        </div>

        <!-- EXECUTIVE LOGIN CARD -->
        <div class="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-slate-100 p-8 sm:p-9 space-y-6">
          
          <!-- TITLE -->
          <div class="text-center pb-1">
            <h1 class="text-lg sm:text-xl font-bold text-[#0B315D] tracking-tight leading-snug">Saha Anket</h1>
          </div>

          <!-- FORM -->
          <form id="form-login" class="space-y-5">
            
            <!-- EMAIL FIELD -->
            <div class="space-y-1.5">
              <label for="login-email" class="block text-xs font-semibold text-[#1F2937]">E-posta adresi</label>
              <div class="relative">
                <input type="email" id="login-email" required placeholder="E-posta adresinizi girin" class="w-full h-[50px] pl-11 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B315D] focus:ring-4 focus:ring-[#0B315D]/10 transition-all placeholder:text-slate-400"/>
                <span class="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                  ${iconSvg('mail', 'w-5 h-5 text-slate-400')}
                </span>
              </div>
            </div>

            <!-- PASSWORD FIELD WITH EYE TOGGLE -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label for="login-password" class="block text-xs font-semibold text-[#1F2937]">Şifre</label>
              </div>
              <div class="relative">
                <input type="password" id="login-password" value="Saha123!" required placeholder="••••••••" class="w-full h-[50px] pl-4 pr-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-[#0B315D] focus:ring-4 focus:ring-[#0B315D]/10 transition-all placeholder:text-slate-400"/>
                <button type="button" id="btn-toggle-password" title="Şifreyi Göster / Gizle" class="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer focus:outline-none">
                  <span id="pwd-eye-icon">${iconSvg('eye', 'w-5 h-5 text-slate-400')}</span>
                </button>
              </div>
            </div>

            <!-- SUBMIT BUTTON -->
            <button type="submit" class="w-full h-[52px] bg-[#0B315D] hover:bg-[#072446] text-white font-semibold text-sm rounded-[14px] shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center cursor-pointer mt-3">
              Giriş Yap
            </button>
          </form>

        </div>

      </div>
    </div>
  `;
}

// BOTTOM NAVIGATION
export function renderBottomNav() {
  const state = store.getState();
  const screen = state.pwaScreen;
  const unreadMsgCount = (state.messages || []).filter(m => m.isUnread).length;

  return `
    <!-- SAFE-AREA COMPLIANT FIXED BOTTOM NAVIGATION (SECTION 10) -->
    <nav class="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#E9EDF2] pb-safe">
      <div class="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        <button id="nav-home" type="button" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${['home', 'task_detail', 'survey_success'].includes(screen) ? 'text-[#2A9D38] font-semibold' : 'text-slate-400 hover:text-[#01214A]'} transition-all cursor-pointer">
          ${iconSvg('home', `w-5 h-5 ${['home', 'task_detail', 'survey_success'].includes(screen) ? 'text-[#2A9D38]' : 'text-slate-400'}`)}
          <span class="text-[11px]">Ana Sayfa</span>
        </button>

        <button id="nav-surveys" type="button" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${screen === 'my_surveys' || screen === 'quick_builder' ? 'text-[#2A9D38] font-semibold' : 'text-slate-400 hover:text-[#01214A]'} transition-all cursor-pointer">
          ${iconSvg('poll', `w-5 h-5 ${screen === 'my_surveys' || screen === 'quick_builder' ? 'text-[#2A9D38]' : 'text-slate-400'}`)}
          <span class="text-[11px]">Anketlerim</span>
        </button>

        <button id="nav-messages" type="button" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${screen === 'messages' || screen === 'message_detail' ? 'text-[#2A9D38] font-semibold' : 'text-slate-400 hover:text-[#01214A]'} transition-all cursor-pointer relative">
          <div class="relative">
            ${iconSvg('mail', `w-5 h-5 ${screen === 'messages' || screen === 'message_detail' ? 'text-[#2A9D38]' : 'text-slate-400'}`)}
            ${unreadMsgCount > 0 ? `<span class="absolute -top-1 -right-1 w-2 h-2 bg-[#2A9D38] rounded-full ring-2 ring-white"></span>` : ''}
          </div>
          <span class="text-[11px]">Mesajlar</span>
        </button>

        <button id="nav-profile" type="button" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${screen === 'profile' ? 'text-[#2A9D38] font-semibold' : 'text-slate-400 hover:text-[#01214A]'} transition-all cursor-pointer">
          ${iconSvg('user', `w-5 h-5 ${screen === 'profile' ? 'text-[#2A9D38]' : 'text-slate-400'}`)}
          <span class="text-[11px]">Profil</span>
        </button>
      </div>
    </nav>
  `;
}

// PWA BİLDİRİM ZİLİ BUTONU (State-driven, Section 13)
export function renderPwaNotificationBell(state) {
  const notifications = Array.isArray(state.notifications) ? state.notifications : [];
  // PWA-relevant notifications: type ALL or PWA
  const pwaNotifs = notifications.filter(n => !n.targetRole || n.targetRole === 'ALL' || n.targetRole === 'PWA');
  const unreadCount = pwaNotifs.filter(n => !n.isRead).length;
  const isOpen = state.showPwaNotifications === true;

  return `
    <button type="button" id="btn-toggle-pwa-notifications" class="relative p-2 text-slate-400 hover:text-[#01214A] transition-colors rounded-full hover:bg-slate-50 cursor-pointer ${isOpen ? 'bg-slate-50 text-[#01214A]' : ''}" title="Bildirimler">
      ${iconSvg('bell', `w-5 h-5 ${isOpen ? 'text-[#01214A]' : 'text-slate-500'}`)}
      ${unreadCount > 0 ? `<span class="absolute top-1.5 right-1.5 flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>` : ''}
    </button>
  `;
}

// PWA BİLDİRİM PANELİ (State-driven, re-render safe)
export function renderPwaNotificationsPanel(state) {
  if (!state.showPwaNotifications) return '';

  const notifications = Array.isArray(state.notifications) ? state.notifications : [];
  const pwaNotifs = notifications.filter(n => !n.targetRole || n.targetRole === 'ALL' || n.targetRole === 'PWA');
  const unreadCount = pwaNotifs.filter(n => !n.isRead).length;

  const typeIcon = {
    NEW_SURVEY: 'poll',
    NEW_MESSAGE: 'mail',
    NEW_ASSIGNMENT: 'assignment',
    SYSTEM: 'bell'
  };

  return `
    <div class="bg-white border-b border-[#E9EDF2] shadow-lg animate-in slide-in-from-top-2 duration-200">
      <!-- Panel Header -->
      <div class="flex items-center justify-between px-4 py-3 bg-[#01214A]">
        <div class="flex items-center gap-2">
          ${iconSvg('bell', 'w-4 h-4 text-[#2A9D38]')}
          <span class="text-xs font-bold text-white">Bildirimler</span>
          ${unreadCount > 0 ? `<span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#2A9D38] text-white">${unreadCount}</span>` : ''}
        </div>
        <div class="flex items-center gap-3">
          ${unreadCount > 0 ? `<button type="button" id="btn-pwa-mark-all-read" class="text-[10px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">Tümünü okundu işaretle</button>` : ''}
          <button type="button" id="btn-close-pwa-notifications" class="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
            ${iconSvg('close', 'w-4 h-4')}
          </button>
        </div>
      </div>

      <!-- Panel Items -->
      <div class="max-h-72 overflow-y-auto divide-y divide-[#F1F5F9]">
        ${pwaNotifs.length === 0 ? `
          <div class="p-6 text-center space-y-2">
            ${iconSvg('checkCircle', 'w-8 h-8 text-slate-300 mx-auto')}
            <p class="text-xs text-slate-400 font-normal">Henüz bildiriminiz bulunmuyor.</p>
          </div>
        ` : pwaNotifs.map(notif => `
          <div data-notif-id="${notif.id}" class="pwa-notif-item flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${!notif.isRead ? 'bg-emerald-50/40' : ''}">
            <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
              ${iconSvg(typeIcon[notif.type] || 'bell', 'w-4 h-4 text-[#01214A]')}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline justify-between gap-1">
                <h5 class="text-xs font-semibold text-[#01214A] truncate">${notif.title}</h5>
                <span class="text-[9px] text-slate-400 font-normal shrink-0">${notif.createdAt}</span>
              </div>
              <p class="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">${notif.message}</p>
            </div>
            ${!notif.isRead ? '<span class="w-2 h-2 rounded-full bg-[#2A9D38] shrink-0 mt-1.5"></span>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderNotificationCenter(state) {
  const allNotifs = Array.isArray(state.notifications) ? state.notifications : [];
  // Admin sadece ADMIN veya ALL hedefli bildirimleri görür
  const adminNotifs = allNotifs.filter(n => !n.targetRole || n.targetRole === 'ADMIN' || n.targetRole === 'ALL');
  const unreadCount = adminNotifs.filter(n => !n.isRead).length;
  const isOpen = state.showAdminNotifications === true;

  const typeIcon = { NEW_SURVEY: 'poll', NEW_MESSAGE: 'mail', NEW_ASSIGNMENT: 'assignment', SURVEY_APPROVED: 'checkCircle', SURVEY_REVISED: 'edit', SYSTEM: 'bell' };

  return `
    <div class="relative">
      <!-- ZİL BUTONU -->
      <button type="button" id="btn-toggle-notifications-dropdown"
        class="relative p-2 transition-colors rounded-full cursor-pointer ${isOpen ? 'bg-slate-100 text-[#01214A]' : 'text-slate-400 hover:text-[#01214A] hover:bg-slate-50'}"
        title="Bildirim Merkezi">
        ${iconSvg('bell', `w-5 h-5 ${isOpen ? 'text-[#01214A]' : 'text-slate-500'}`)}
        ${unreadCount > 0 ? `
          <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        ` : ''}
      </button>

      <!-- BİLDİRİM PANELİ (state-driven, re-render safe) -->
      ${isOpen ? `
        <div id="dropdown-notifications-menu" class="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#E9EDF2] rounded-[14px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
          <!-- Header -->
          <div class="px-4 py-3 bg-[#01214A] flex items-center justify-between">
            <div class="flex items-center gap-2">
              ${iconSvg('bell', 'w-4 h-4 text-[#2A9D38]')}
              <h4 class="font-bold text-xs text-white tracking-tight">Bildirim Merkezi</h4>
              ${unreadCount > 0 ? `<span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#2A9D38] text-white">${unreadCount} Yeni</span>` : ''}
            </div>
            <div class="flex items-center gap-3">
              ${unreadCount > 0 ? `<button type="button" id="btn-mark-all-notifications-read" class="text-[10px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">Tümünü okundu</button>` : ''}
              <button type="button" id="btn-close-admin-notifications" class="p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
                ${iconSvg('close', 'w-3.5 h-3.5')}
              </button>
            </div>
          </div>

          <!-- Bildirim listesi -->
          <div class="max-h-80 overflow-y-auto divide-y divide-[#F1F5F9]">
            ${adminNotifs.length === 0 ? `
              <div class="p-8 text-center text-slate-400 text-xs font-normal space-y-1.5">
                ${iconSvg('checkCircle', 'w-8 h-8 text-slate-300 mx-auto mb-2')}
                <span class="block">Henüz bildiriminiz bulunmuyor.</span>
              </div>
            ` : adminNotifs.map(notif => `
              <div data-notif-id="${notif.id}" class="notif-item p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer ${!notif.isRead ? 'bg-emerald-50/40' : ''}">
                <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  ${iconSvg(typeIcon[notif.type] || 'bell', 'w-4 h-4 text-[#01214A]')}
                </div>
                <div class="flex-1 space-y-0.5 min-w-0">
                  <div class="flex items-center justify-between gap-1">
                    <h5 class="text-xs font-semibold text-[#01214A] truncate">${notif.title}</h5>
                    <span class="text-[9px] text-slate-400 font-normal shrink-0">${notif.createdAt}</span>
                  </div>
                  <p class="text-[11px] text-slate-500 leading-snug line-clamp-2">${notif.message}</p>
                </div>
                ${!notif.isRead ? '<span class="w-2 h-2 rounded-full bg-[#2A9D38] shrink-0 mt-1.5"></span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}



// 2. SAHA PERSONELİ PWA ANA SAYFA (SECTIONS 12-20 & 57)
export function renderPwaHome() {
  const state = store.getState();
  const user = state.auth?.user || {};
  const unreadMsg = (state.messages || []).find(m => m.isUnread) || (state.messages || [])[0];
  
  const mainTask = (state.assignedSurveys || [])[0] || {
    id: '77777777-7777-7777-7777-777777777771',
    title: 'Üretici İhtiyaç Anketi',
    village: 'Sinan Köyü',
    completed: 180,
    target: 500,
    priority: 'Yüksek Öncelik'
  };

  const progressPct = Math.round(((mainTask.completed || 180) / (mainTask.target || 500)) * 100);
  const currentDateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });

  // Sync status
  const queueCount = state.offlineQueueCount || 0;
  const isOnline = state.isOnline !== false;

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      
      <!-- TOP PWA BRANDING HEADER (SECTIONS 4 & 13) -->
      <header class="bg-white border-b border-[#E9EDF2] px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="./logo_sehitkamil.png" alt="Şehitkamil Logo" class="h-9 w-auto object-contain shrink-0">
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-[#01214A] leading-tight tracking-tight truncate">Şehitkamil Strateji Merkezi</span>
            <span class="text-[10px] font-normal text-slate-400 mt-0.5">Saha Uygulaması</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- PWA BİLDİRİM ZILI (State-driven) -->
          ${renderPwaNotificationBell(state)}
          <!-- BAĞLANTI DURUMU -->
          <div class="flex items-center gap-1 text-slate-400">
            ${iconSvg('wifi', `w-4 h-4 ${isOnline ? 'text-[#2A9D38]' : 'text-amber-500'}`)}
          </div>
        </div>
      </header>

      <!-- PWA BİLDİRİM PANELİ (State-driven, re-render safe) -->
      ${renderPwaNotificationsPanel(state)}


      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-5">
        
        <!-- MERHABA & SENKRONİZASYON DURUMU (SECTIONS 14-16) -->
        <section class="space-y-1">
          <h1 class="text-2xl font-bold text-[#01214A] tracking-tight">Merhaba, ${user.fullName || 'Ahmet Yılmaz'}</h1>
          <p class="text-xs text-slate-400 font-normal">${currentDateStr}</p>

          <div class="pt-2">
            ${queueCount > 0 ? `
              <div class="inline-flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-amber-900 text-[11px] font-medium">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>${queueCount} kayıt gönderilmeyi bekliyor</span>
              </div>
            ` : !isOnline ? `
              <div class="inline-flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-amber-900 text-[11px] font-medium">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Çevrimdışı · Cihaza kaydediliyor</span>
              </div>
            ` : `
              <div class="inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                <span class="w-2 h-2 rounded-full bg-[#2A9D38]"></span>
                <span>Tüm kayıtlar güncel</span>
              </div>
            `}
          </div>
        </section>

        <!-- GÖREVLERİM CARD (SECTIONS 17-19) -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold text-[#01214A]">Görevlerim</h2>
          </div>

          <div class="bg-white rounded-[14px] p-5 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div class="flex justify-between items-start gap-2">
              <div class="space-y-1">
                <div class="inline-flex items-center gap-1 text-slate-500 text-xs font-normal">
                  ${iconSvg('mapPin', 'w-3.5 h-3.5 text-[#2A9D38]')}
                  <span>${mainTask.village || 'Sinan Köyü'}</span>
                </div>
                <h3 class="font-bold text-[#01214A] text-base leading-snug">${mainTask.title || 'Üretici İhtiyaç Anketi'}</h3>
              </div>
              <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-[6px] shrink-0">
                ${mainTask.priority || 'Yüksek Öncelik'}
              </span>
            </div>

            <!-- PROGRESS AREA (SECTION 18) -->
            <div class="space-y-1.5 pt-1">
              <div class="flex justify-between text-xs text-slate-500 font-normal">
                <span>İlerleme</span>
                <span class="font-semibold text-[#01214A]">${mainTask.completed || 180} / ${mainTask.target || 500} · %${progressPct}</span>
              </div>
              <div class="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                <div class="bg-[#2A9D38] h-full rounded-full transition-all duration-500" style="width: ${progressPct}%"></div>
              </div>
            </div>

            <!-- PRIMARY BUTTON CTA (SECTION 9 & 17) -->
            <button data-task-id="${mainTask.id}" class="btn-start-survey-direct h-12 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-sm rounded-[12px] w-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98">
              ${iconSvg('play', 'w-4 h-4 text-white')}
              <span>${(mainTask.completed || 0) > 0 ? 'Devam Et' : 'Ankete Başla'}</span>
            </button>
          </div>

          <!-- SECONDARY ACTION BUTTON (SECTION 20) -->
          <button id="btn-home-quick-builder" class="h-12 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-[12px] w-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98">
            ${iconSvg('plus', 'w-4 h-4 text-slate-500')}
            <span>Hızlı Anket Oluştur</span>
          </button>
        </section>

        <!-- RECENT MESSAGES PREVIEW (IF ANY) -->
        ${unreadMsg ? `
          <section class="space-y-2 pt-1">
            <h2 class="text-base font-semibold text-[#01214A]">Son Mesajlar</h2>
            <div id="btn-home-msg-preview" class="bg-white rounded-[14px] p-4 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:border-[#D0D5DD] transition-all">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-2.5 h-2.5 rounded-full bg-[#2A9D38] shrink-0"></div>
                <div class="min-w-0">
                  <div class="text-xs font-semibold text-[#01214A] truncate">${unreadMsg.title}</div>
                  <p class="text-[11px] text-slate-400 truncate mt-0.5 font-normal">${unreadMsg.content}</p>
                </div>
              </div>
              <span class="text-xs font-semibold text-[#2A9D38] shrink-0 flex items-center gap-0.5 ml-2">
                Gör ${iconSvg('chevronRight', 'w-4 h-4')}
              </span>
            </div>
          </section>
        ` : ''}

      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// GÖREV DETAYI
export function renderTaskDetail() {
  const state = store.getState();
  const task = (state.assignedSurveys || []).find(t => t.id === state.selectedTaskId) || (state.assignedSurveys || [])[0] || {
    id: '77777777-7777-7777-7777-777777777771',
    title: 'Üretici İhtiyaç Anketi',
    village: 'Sinan Köyü',
    completed: 180,
    target: 500,
    priority: 'Yüksek Öncelik',
    endDate: '20 Ağustos 2026'
  };

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      <header class="h-14 bg-white border-b border-[#E9EDF2] px-4 flex items-center justify-between sticky top-0 z-30">
        <button id="btn-back-to-home" class="p-2 -ml-2 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1 text-xs font-semibold">
          ${iconSvg('arrowLeft', 'w-5 h-5 text-slate-700')}
          <span>Geri</span>
        </button>
        <span class="text-sm font-semibold text-[#01214A]">Görev Detayı</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-5">
        <div class="bg-white rounded-[14px] p-6 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
          <div class="space-y-2">
            <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-[6px]">
              ${task?.priority || 'Yüksek Öncelik'}
            </span>
            <h1 class="text-lg font-bold text-[#01214A] leading-snug">${task?.title}</h1>
            <div class="flex items-center gap-1 text-slate-500 text-xs font-normal">
              ${iconSvg('mapPin', 'w-4 h-4 text-[#2A9D38]')}
              <span>${task?.village}</span>
            </div>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-[10px] p-4 space-y-1">
            <div class="flex items-center gap-2 text-amber-900 font-semibold text-xs">
              ${iconSvg('note', 'w-4 h-4 text-amber-700')}
              <span>Yönetici Talimatı</span>
            </div>
            <p class="text-xs text-amber-800 leading-relaxed font-normal">
              ${task?.note || 'Sinan Köyü üreticileriyle görüşürken gübre ve ekipman ihtiyaçlarını detaylı olarak not alınız.'}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 p-4 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs">
            <div>
              <span class="text-slate-400 block text-[11px]">Hedef Anket</span>
              <span class="font-bold text-[#01214A] text-sm">${task?.target || 500}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Tamamlanan</span>
              <span class="font-bold text-[#2A9D38] text-sm">${task?.completed || 180}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Son Tarih</span>
              <span class="font-semibold text-slate-700">${task?.endDate || '20 Ağustos 2026'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Durum</span>
              <span class="font-semibold text-emerald-800 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#2A9D38]"></span> Aktif
              </span>
            </div>
          </div>

          <button id="btn-detail-start-survey" class="h-12 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-sm rounded-[12px] w-full flex items-center justify-center gap-2 transition-all cursor-pointer">
            ${iconSvg('play', 'w-4 h-4 text-white')}
            <span>Ankete Başla</span>
          </button>
        </div>
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// 3. ANKET DOLDURMA SİHİRBAZI (SECTIONS 40-47)
export function renderSurveyRunner() {
  const state = store.getState();
  const task = (state.assignedSurveys || []).find(t => t.id === state.selectedTaskId) || (state.assignedSurveys || [])[0];
  const secIndex = state.activeSectionIndex || 0;
  const answers = state.activeFormAnswers || {};
  const yesNoVal = answers['q4'] || 'evet';
  const tractorVal = answers['q6'] || 'evet';
  const fertVal = answers['q7'] || 'evet';

  const stepTitles = [
    'Kişisel Bilgiler',
    'Arazi & Üretim Bilgileri',
    'Ekipman & İhtiyaçlar',
    'Saha Kanıtı & Konum'
  ];

  const isOnline = state.isOnline !== false;

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-28 font-sans">
      <header class="h-14 bg-white border-b border-[#E9EDF2] px-4 flex items-center justify-between sticky top-0 z-30">
        <button id="btn-cancel-runner" class="p-2 -ml-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
          ${iconSvg('arrowLeft', 'w-5 h-5 text-slate-700')}
        </button>
        <h2 class="text-sm font-semibold text-[#01214A] truncate max-w-[200px]">${task?.title || 'Üretici İhtiyaç Anketi'}</h2>
        <div class="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-[6px] text-[11px] font-semibold border border-emerald-200 flex items-center gap-1.5">
          ${iconSvg('cloudCheck', 'w-3.5 h-3.5 text-[#2A9D38]')}
          <span>${isOnline ? 'Senkronize' : 'Cihaza Kaydedildi'}</span>
        </div>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-5">
        <div class="space-y-1.5">
          <div class="flex justify-between items-baseline">
            <h3 class="text-base font-bold text-[#01214A]">${stepTitles[secIndex] || 'Kişisel Bilgiler'}</h3>
            <span class="text-xs text-slate-400 font-normal">Soru ${secIndex + 1} / 4</span>
          </div>
          <div class="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
            <div class="bg-[#2A9D38] h-full rounded-full transition-all duration-300" style="width: ${((secIndex + 1) / 4) * 100}%"></div>
          </div>
        </div>

        <div class="bg-white rounded-[14px] border border-[#E9EDF2] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-6">
          ${secIndex === 0 ? `
            <div class="space-y-2 pb-5 border-b border-[#F1F5F9]">
              <label class="block text-sm font-semibold text-[#01214A]">1. Vatandaş Ad Soyad *</label>
              <input type="text" data-q-id="q1" value="${answers['q1'] || ''}" placeholder="Ad Soyad giriniz..." class="runner-input w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A9D38] focus:bg-white transition-all"/>
            </div>

            <div class="space-y-2 pb-5 border-b border-[#F1F5F9]">
              <label class="block text-sm font-semibold text-[#01214A]">2. Tarımsal Arazi Sahibisiniz mi? *</label>
              <div class="grid grid-cols-2 gap-3">
                <button type="button" data-q-id="q4" data-val="evet" class="btn-runner-yesno h-28 border ${yesNoVal === 'evet' ? 'border-[#2A9D38] bg-emerald-50 text-[#2A9D38]' : 'border-[#E9EDF2] bg-white text-slate-700'} rounded-[12px] flex flex-col items-center justify-center gap-2 font-semibold text-sm transition-all cursor-pointer">
                  ${iconSvg('land', `w-6 h-6 ${yesNoVal === 'evet' ? 'text-[#2A9D38]' : 'text-slate-500'}`)}
                  <span>Evet</span>
                </button>

                <button type="button" data-q-id="q4" data-val="hayir" class="btn-runner-yesno h-28 border ${yesNoVal === 'hayir' ? 'border-[#2A9D38] bg-emerald-50 text-[#2A9D38]' : 'border-[#E9EDF2] bg-white text-slate-700'} rounded-[12px] flex flex-col items-center justify-center gap-2 font-semibold text-sm transition-all cursor-pointer">
                  ${iconSvg('block', `w-6 h-6 ${yesNoVal === 'hayir' ? 'text-[#2A9D38]' : 'text-slate-500'}`)}
                  <span>Hayır</span>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-[#01214A]">3. Saha / Arazi Fotoğrafı</label>
              <p class="text-xs text-slate-400 font-normal">Üretim alanını gösteren bir fotoğraf ekleyebilirsiniz.</p>
              
              <div id="btn-runner-photo" class="border border-dashed ${state.activePhotoUploaded ? 'border-[#2A9D38] bg-emerald-50' : 'border-[#E9EDF2] hover:border-[#2A9D38]'} rounded-[12px] p-5 text-center cursor-pointer transition-all space-y-1.5">
                <div class="w-10 h-10 rounded-full ${state.activePhotoUploaded ? 'bg-emerald-100 text-[#2A9D38]' : 'bg-[#F8FAFC] text-slate-500'} mx-auto flex items-center justify-center">
                  ${iconSvg(state.activePhotoUploaded ? 'checkCircle' : 'cameraPlus', `w-5 h-5 ${state.activePhotoUploaded ? 'text-[#2A9D38]' : 'text-slate-500'}`)}
                </div>
                <div class="text-xs font-semibold text-[#2A9D38]">${state.activePhotoUploaded ? 'Fotoğraf Yüklendi (1 Adet)' : 'Kamera / Galeriden Fotoğraf Seç'}</div>
              </div>
            </div>
          ` : ''}

          ${secIndex === 1 ? `
            <div class="space-y-2 pb-5 border-b border-[#F1F5F9]">
              <label class="block text-sm font-semibold text-[#01214A]">4. Arazi Büyüklüğü (Dönüm)</label>
              <input type="number" inputmode="numeric" data-q-id="q5" value="${answers['q5'] || ''}" placeholder="Örn: 35" class="runner-input w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A9D38] focus:bg-white transition-all"/>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-[#01214A]">5. Ana Ürün Türü</label>
              <div class="space-y-2">
                ${['Buğday / Arpa', 'Antep Fıstığı', 'Zeytin', 'Mısır / Pamuk'].map(opt => `
                  <label data-q-id="q6" data-opt="${opt}" class="runner-radio-row flex items-center justify-between p-3.5 border ${answers['q6'] === opt ? 'border-[#2A9D38] bg-emerald-50' : 'border-[#E9EDF2] bg-white'} rounded-[10px] cursor-pointer transition-all">
                    <span class="text-xs font-medium text-slate-800">${opt}</span>
                    <span class="w-4 h-4 rounded-full border ${answers['q6'] === opt ? 'border-[#2A9D38] bg-[#2A9D38]' : 'border-slate-300'} flex items-center justify-center">
                      ${answers['q6'] === opt ? '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>' : ''}
                    </span>
                  </label>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${secIndex === 2 ? `
            <div class="space-y-2 pb-5 border-b border-[#F1F5F9]">
              <label class="block text-sm font-semibold text-[#01214A]">6. Traktör veya Ekipmanınız Var Mı?</label>
              <div class="grid grid-cols-2 gap-3">
                <button type="button" data-q-id="q6" data-val="evet" class="btn-runner-yesno h-24 border ${tractorVal === 'evet' ? 'border-[#2A9D38] bg-emerald-50 text-[#2A9D38]' : 'border-[#E9EDF2] bg-white text-slate-700'} rounded-[12px] flex flex-col items-center justify-center gap-1.5 font-semibold text-xs transition-all cursor-pointer">
                  <span>Evet var</span>
                </button>
                <button type="button" data-q-id="q6" data-val="hayir" class="btn-runner-yesno h-24 border ${tractorVal === 'hayir' ? 'border-[#2A9D38] bg-emerald-50 text-[#2A9D38]' : 'border-[#E9EDF2] bg-white text-slate-700'} rounded-[12px] flex flex-col items-center justify-center gap-1.5 font-semibold text-xs transition-all cursor-pointer">
                  <span>Hayır yok</span>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-[#01214A]">7. Gübre & Tohum Desteği İhtiyacınız Var Mı?</label>
              <div class="grid grid-cols-2 gap-3">
                <button type="button" data-q-id="q7" data-val="evet" class="btn-runner-yesno h-24 border ${fertVal === 'evet' ? 'border-[#2A9D38] bg-emerald-50 text-[#2A9D38]' : 'border-[#E9EDF2] bg-white text-slate-700'} rounded-[12px] flex flex-col items-center justify-center gap-1.5 font-semibold text-xs transition-all cursor-pointer">
                  <span>Evet var</span>
                </button>
                <button type="button" data-q-id="q7" data-val="hayir" class="btn-runner-yesno h-24 border ${fertVal === 'hayir' ? 'border-[#2A9D38] bg-emerald-50 text-[#2A9D38]' : 'border-[#E9EDF2] bg-white text-slate-700'} rounded-[12px] flex flex-col items-center justify-center gap-1.5 font-semibold text-xs transition-all cursor-pointer">
                  <span>İhtiyaç yok</span>
                </button>
              </div>
            </div>
          ` : ''}

          ${secIndex === 3 ? `
            <div class="space-y-2 pb-5 border-b border-[#F1F5F9]">
              <label class="block text-sm font-semibold text-[#01214A]">8. GPS Konumu Al</label>
              <button type="button" id="btn-runner-location" class="w-full h-11 border ${state.activeLocationAcquired ? 'border-[#2A9D38] bg-emerald-50 text-emerald-900' : 'border-[#E9EDF2] bg-[#F8FAFC] text-slate-700'} rounded-[10px] flex items-center justify-between px-3.5 text-xs font-semibold transition-all cursor-pointer">
                <span class="flex items-center gap-2">
                  ${iconSvg('mapPin', 'w-4 h-4 text-[#2A9D38]')}
                  ${state.activeLocationAcquired ? 'Konum Alındı (Hassasiyet: 8m)' : 'GPS Konumunu Al'}
                </span>
                ${state.activeLocationAcquired ? iconSvg('checkCircle', 'w-4 h-4 text-[#2A9D38]') : ''}
              </button>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-[#01214A]">9. Saha Notları</label>
              <textarea data-q-id="q9" rows="3" placeholder="Üretici talepleri veya açıklamalar..." class="runner-input w-full p-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2A9D38] focus:bg-white transition-all">${answers['q9'] || ''}</textarea>
            </div>
          ` : ''}
        </div>

        <div class="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#E9EDF2] p-4 z-40">
          <div class="max-w-md mx-auto flex items-center gap-3">
            <button id="btn-runner-prev" class="w-1/2 h-11 border border-[#E9EDF2] bg-white hover:bg-slate-50 rounded-[10px] font-semibold text-slate-700 text-xs transition-all cursor-pointer">
              Geri
            </button>

            ${secIndex < 3 ? `
              <button id="btn-runner-next" class="w-1/2 h-11 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold rounded-[10px] text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span>Devam Et</span> ${iconSvg('arrowRight', 'w-4 h-4 text-white')}
              </button>
            ` : `
              <button id="btn-runner-submit" class="w-1/2 h-11 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold rounded-[10px] text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                ${iconSvg('send', 'w-4 h-4 text-white')}
                <span>Anketi Tamamla</span>
              </button>
            `}
          </div>
        </div>
      </main>
    </div>
  `;
}

// ANKET TAMAMLAMA
export function renderSurveySuccess() {
  const state = store.getState();
  const isOnline = state.isOnline !== false;

  return `
    <div class="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-center font-sans">
      <div class="w-full max-w-sm bg-white p-8 rounded-[16px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
        <div class="w-16 h-16 rounded-full ${isOnline ? 'bg-emerald-50 text-[#2A9D38]' : 'bg-amber-50 text-amber-700'} mx-auto flex items-center justify-center">
          ${iconSvg('checkCircle', 'w-8 h-8')}
        </div>

        <div class="space-y-1.5">
          <h1 class="text-lg font-bold text-[#01214A]">
            ${isOnline ? 'Anket Sunucuya İletildi' : 'Anket Cihazda Güvenle Kaydedildi'}
          </h1>
          <p class="text-xs text-slate-500 font-normal leading-relaxed">
            ${isOnline 
              ? 'Anket verileri merkeze ulaştırıldı.' 
              : 'İnternet bağlantısı sağlandığında otomatik olarak merkeze gönderilecek.'}
          </p>
        </div>

        <div class="space-y-2 pt-2">
          <button id="btn-success-new-survey" class="w-full h-11 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold rounded-[10px] text-xs transition-all cursor-pointer">
            Yeni Anket Başlat
          </button>
          <button id="btn-success-back-home" class="w-full h-11 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 font-semibold rounded-[10px] text-xs transition-all cursor-pointer">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  `;
}

// 4. ANKETLERİM SAYFASI (SECTIONS 21-27 & 58)
export function renderMySurveys() {
  const state = store.getState();
  const currentTab = state.surveysTab || 'assigned';
  const assignedSurveys = Array.isArray(state.assignedSurveys) ? state.assignedSurveys : [];
  const myQuickSurveys = Array.isArray(state.myQuickSurveys) ? state.myQuickSurveys : [];

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      
      <!-- PAGE HEADER (SECTION 11 & 21) -->
      <header class="bg-white border-b border-[#E9EDF2] px-4 py-4 sticky top-0 z-30">
        <h1 class="text-lg font-bold text-[#01214A] leading-tight">Anketlerim</h1>
        <p class="text-xs text-slate-400 font-normal mt-0.5">Saha görevlerinizi ve oluşturduğunuz anketleri yönetin.</p>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-4">
        
        <!-- PREMIUM SEGMENTED CONTROL (SECTION 22-23) -->
        <div class="bg-[#F1F5F9] p-1 rounded-[12px] border border-[#E9EDF2] flex text-xs font-medium">
          <button id="tab-assigned" type="button" class="flex-1 py-2.5 rounded-[10px] transition-all cursor-pointer ${currentTab === 'assigned' ? 'bg-white text-[#01214A] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">
            Görevlerim
          </button>
          <button id="tab-my-quick" type="button" class="flex-1 py-2.5 rounded-[10px] transition-all cursor-pointer ${currentTab === 'my_quick' ? 'bg-white text-[#2A9D38] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">
            Oluşturduklarım
          </button>
        </div>

        <!-- TAB CONTENT: GÖREVLERİM -->
        ${currentTab === 'assigned' ? `
          <div class="space-y-3">
            ${assignedSurveys.length === 0 ? `
              <!-- EMPTY STATE: GÖREVLERİM (SECTION 26-27) -->
              <div class="bg-white rounded-[14px] p-8 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-center space-y-2">
                ${iconSvg('poll', 'w-10 h-10 text-slate-300 mx-auto')}
                <h3 class="font-bold text-[#01214A] text-sm">Henüz atanmış göreviniz yok</h3>
                <p class="text-xs text-slate-400 font-normal">Yeni bir saha görevi atandığında burada görüntülenecek.</p>
              </div>
            ` : assignedSurveys.map(task => {
              const pct = Math.round(((task.completed || 0) / (task.target || 1)) * 100);
              return `
                <div class="bg-white p-5 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-sm font-bold text-[#01214A] leading-snug">${task.title}</h3>
                      <span class="text-xs text-slate-500 flex items-center gap-1 mt-1 font-normal">
                        ${iconSvg('mapPin', 'w-3.5 h-3.5 text-[#2A9D38]')} ${task.village || 'Sinan Köyü'}
                      </span>
                    </div>
                    <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-[4px]">
                      Aktif
                    </span>
                  </div>

                  <div class="space-y-1">
                    <div class="flex justify-between text-[11px] text-slate-500 font-normal">
                      <span>İlerleme</span>
                      <span class="font-semibold text-[#01214A]">${task.completed || 0} / ${task.target || 50} · %${pct}</span>
                    </div>
                    <div class="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                      <div class="bg-[#2A9D38] h-full rounded-full" style="width: ${pct}%"></div>
                    </div>
                  </div>

                  <button data-task-id="${task.id}" class="btn-start-survey-direct h-10 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] w-full flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>Devam Et</span>
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <!-- TAB CONTENT: OLUŞTURDUKLARIM -->
          <div class="space-y-3">
            ${myQuickSurveys.length === 0 ? `
              <!-- EMPTY STATE: OLUŞTURDUKLARIM (SECTION 26-27) -->
              <div class="bg-white rounded-[14px] p-8 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-center space-y-3">
                ${iconSvg('plus', 'w-10 h-10 text-slate-300 mx-auto')}
                <div class="space-y-1">
                  <h3 class="font-bold text-[#01214A] text-sm">Henüz oluşturduğunuz bir anket yok</h3>
                  <p class="text-xs text-slate-400 font-normal">Oluşturduğunuz hızlı anketler burada görüntülenecek.</p>
                </div>
                <button id="btn-surveys-quick-builder" type="button" class="h-10 px-4 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-[10px] inline-flex items-center gap-1.5 cursor-pointer">
                  ${iconSvg('plus', 'w-4 h-4 text-[#2A9D38]')}
                  <span>Hızlı Anket Oluştur</span>
                </button>
              </div>
            ` : myQuickSurveys.map(qs => `
              <div class="bg-white p-4 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-xs font-bold text-[#01214A]">${qs.title}</h3>
                    <span class="bg-emerald-50 text-[#2A9D38] border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-[4px]">Hızlı Anket</span>
                  </div>
                  <span class="text-[11px] text-slate-400 block mt-1 font-normal">${qs.responseCount || 0} cevap · ${qs.createdAt || 'Bugün'}</span>
                </div>
                <button class="h-9 px-3 bg-[#F8FAFC] border border-[#E9EDF2] hover:bg-slate-100 text-[#01214A] font-semibold text-xs rounded-[8px] cursor-pointer">
                  Başlat →
                </button>
              </div>
            `).join('')}
          </div>
        `}
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// PWA FULL 4-STEP SURVEY BUILDER CONTAINER FOR FIELD MANAGERS
export function renderPwaSurveyBuilderContainer(state) {
  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      <header class="h-14 bg-white border-b border-[#E9EDF2] px-4 flex items-center justify-between sticky top-0 z-30">
        <button id="btn-cancel-builder" class="p-2 -ml-2 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 text-xs font-semibold">
          ${iconSvg('arrowLeft', 'w-5 h-5 text-slate-700')}
          <span>Çık</span>
        </button>
        <div class="text-center">
          <h1 class="text-xs font-bold text-[#01214A]">Saha Anket Oluşturucu</h1>
          <span class="text-[10px] text-[#2A9D38] font-semibold">Şehitkamil Strateji Merkezi</span>
        </div>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-5 max-w-3xl mx-auto w-full space-y-4">
        ${render4StepSurveyBuilder(state)}
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// HIZLI ANKET OLUŞTURUCU
export function renderQuickBuilder() {
  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      <header class="h-14 bg-white border-b border-[#E9EDF2] px-4 flex items-center justify-between sticky top-0 z-30">
        <button id="btn-cancel-builder" class="p-2 -ml-2 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1 text-xs font-semibold">
          ${iconSvg('arrowLeft', 'w-5 h-5 text-slate-700')}
        </button>
        <h1 class="text-sm font-semibold text-[#01214A]">Hızlı Anket Oluştur</h1>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-4">
        <form id="form-quick-builder" class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#01214A] mb-1.5">Anket Adı *</label>
            <input type="text" id="qb-title" required placeholder="Örn: Yol Problemleri Tespiti" class="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs focus:outline-none focus:border-[#2A9D38] font-normal"/>
          </div>

          <button type="submit" class="w-full h-12 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold rounded-[12px] text-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
            Anketi Oluştur & Yöneticinin Onayına Gönder
          </button>
        </form>
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// MESAJLAR EKRANI (SECTIONS 28-33 & 59)
export function renderMessages() {
  const state = store.getState();
  const messages = Array.isArray(state.messages) ? state.messages : [];

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      
      <!-- PAGE HEADER WITH RIGHT CTA (SECTION 28-29) -->
      <header class="bg-white border-b border-[#E9EDF2] px-4 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold text-[#01214A] leading-tight">Mesajlar</h1>
          <p class="text-xs text-slate-400 font-normal mt-0.5">Yönetici ve saha iletişimi</p>
        </div>
        <button id="btn-open-compose-msg-modal" type="button" class="h-9 px-3 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] flex items-center gap-1.5 cursor-pointer">
          ${iconSvg('plus', 'w-3.5 h-3.5 text-white')}
          <span>Yeni Mesaj</span>
        </button>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-3">
        ${messages.length === 0 ? `
          <!-- EMPTY STATE: MESAJLAR (SECTION 30) -->
          <div class="text-center py-10 px-6 bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3">
            ${iconSvg('mail', 'w-10 h-10 text-slate-300 mx-auto')}
            <div class="space-y-1">
              <h3 class="text-sm font-bold text-[#01214A]">Henüz mesajınız yok</h3>
              <p class="text-xs text-slate-400 font-normal">Yönetici tarafından gönderilen mesajlar burada görüntülenecek.</p>
            </div>
            <button id="btn-open-compose-msg-modal" type="button" class="h-9 px-4 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-[10px] inline-flex items-center gap-1.5 cursor-pointer">
              ${iconSvg('plus', 'w-3.5 h-3.5 text-[#2A9D38]')}
              <span>Yöneticiye Mesaj Gönder</span>
            </button>
          </div>
        ` : messages.map(msg => `
          <!-- COMPACT MESSAGE ITEM (SECTION 31) -->
          <div data-msg-id="${msg.id}" class="btn-open-msg-detail bg-white p-4 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-start gap-3 cursor-pointer hover:border-[#D0D5DD] transition-all">
            ${msg.isUnread ? `<div class="w-2 h-2 rounded-full bg-[#2A9D38] shrink-0 mt-1.5"></div>` : `<div class="w-2 h-2"></div>`}
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline gap-2">
                <h3 class="text-xs font-semibold text-[#01214A] truncate">${msg.title}</h3>
                <span class="text-[10px] text-slate-400 shrink-0 font-normal">${msg.date}</span>
              </div>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-[4px] ${msg.senderRole === 'FIELD_USER' ? 'bg-slate-100 text-slate-700' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
                  ${msg.senderRole === 'FIELD_USER' ? 'YÖNETİCİYE GÖNDERİLDİ' : 'YÖNETİCİ BİLDİRİMİ'}
                </span>
                <span class="text-[11px] text-slate-500 font-normal truncate">${msg.sender}</span>
              </div>
              <p class="text-xs text-slate-500 line-clamp-2 mt-1 font-normal">${msg.content}</p>
            </div>
          </div>
        `).join('')}
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// MESAJ DETAYI EKRANI (SECTION 32)
export function renderMessageDetail() {
  const state = store.getState();
  const msg = (state.messages || []).find(m => m.id === state.selectedMessageId) || (state.messages || [])[0];

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      <header class="h-14 bg-white border-b border-[#E9EDF2] px-4 flex items-center justify-between sticky top-0 z-30">
        <button id="btn-back-to-messages" class="p-2 -ml-2 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1 text-xs font-semibold">
          ${iconSvg('arrowLeft', 'w-5 h-5 text-slate-700')}
          <span>Mesajlar</span>
        </button>
        <span class="text-sm font-semibold text-[#01214A]">Mesaj Detayı</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-4">
        <div class="bg-white rounded-[14px] p-6 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
          <div class="border-b border-[#F1F5F9] pb-3 space-y-1">
            <h1 class="text-base font-bold text-[#01214A]">${msg?.title}</h1>
            <div class="flex justify-between items-center text-xs text-slate-400 font-normal">
              <span>Gönderen: <strong class="text-slate-700 font-medium">${msg?.sender}</strong></span>
              <span>${msg?.date}</span>
            </div>
          </div>

          <p class="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-normal">
            ${msg?.content}
          </p>

          <div class="pt-2 text-[11px] text-slate-400 border-t border-[#F1F5F9] flex items-center gap-1">
            ${iconSvg('checkCircle', 'w-3.5 h-3.5 text-[#2A9D38]')}
            <span>Görüldü Bilgisi İşlendi</span>
          </div>
        </div>
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// PROFİL EKRANI (SECTIONS 34-37 & 60)
export function renderProfile() {
  const state = store.getState();
  const user = state.auth.user || {};
  const queueCount = state.offlineQueueCount || 0;

  return `
    <div class="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pb-24 font-sans">
      
      <!-- PAGE HEADER (SECTION 11 & 34) -->
      <header class="bg-white border-b border-[#E9EDF2] px-4 py-4 sticky top-0 z-30">
        <h1 class="text-lg font-bold text-[#01214A] leading-tight">Profil</h1>
        <p class="text-xs text-slate-400 font-normal mt-0.5">Hesap ve uygulama bilgileri</p>
      </header>

      <main class="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-4">
        
        <!-- PROFİL KARTI (AVATAR 48-56px, NO TECHNICAL ROLE NAME - SECTION 35) -->
        <div class="bg-white rounded-[14px] p-5 border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center gap-4">
          <div class="w-13 h-13 rounded-full bg-[#01214A] text-white flex items-center justify-center font-bold text-lg shrink-0">
            ${user?.fullName?.charAt(0) || 'A'}
          </div>

          <div class="min-w-0">
            <h2 class="text-base font-bold text-[#01214A] truncate">${user?.fullName || 'Ahmet Yılmaz'}</h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">${user?.role === 'ADMIN' ? 'Yönetici' : 'Saha Personeli'}</p>
            <p class="text-[11px] text-slate-400 font-normal">${user?.phone || '0532 100 20 30'}</p>
          </div>
        </div>

        <!-- PROFİL ALT BİLGİ GRUPLARI (SECTION 36) -->
        <div class="bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] divide-y divide-[#F1F5F9] text-xs">
          
          <div class="p-4 flex items-center justify-between">
            <span class="text-slate-500 font-normal">Telefon Numarası</span>
            <span class="font-semibold text-[#01214A]">${user?.phone || '0532 100 20 30'}</span>
          </div>

          <div class="p-4 flex items-center justify-between">
            <span class="text-slate-500 font-normal">Sistem Rolü</span>
            <span class="font-semibold text-[#01214A]">${user?.role === 'ADMIN' ? 'Yönetici' : 'Saha Personeli'}</span>
          </div>

          <div class="p-4 flex items-center justify-between">
            <span class="text-slate-500 font-normal">Senkronizasyon Durumu</span>
            <span class="font-semibold ${queueCount > 0 ? 'text-amber-600' : 'text-[#2A9D38]'}">
              ${queueCount > 0 ? `${queueCount} Kayıt Bekliyor` : 'Tüm Kayıtlar Güncel'}
            </span>
          </div>

          <div class="p-4 flex items-center justify-between">
            <span class="text-slate-500 font-normal">Uygulama Sürümü</span>
            <span class="font-semibold text-slate-700">v1.0.0 (PWA Premium)</span>
          </div>

        </div>

        <!-- SMALL DESTRUCTIVE OUTLINE LOGOUT BUTTON AT BOTTOM (SECTION 37) -->
        <div class="pt-2">
          <button id="btn-open-logout-modal" type="button" class="w-full h-10 border border-red-200 hover:bg-red-50 text-red-600 font-semibold text-xs rounded-[10px] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            ${iconSvg('logOut', 'w-4 h-4 text-red-600')}
            <span>Çıkış Yap</span>
          </button>
        </div>

      </main>

      ${renderBottomNav()}
    </div>
  `;
}

export function formatQuestionType(type) {
  const types = {
    text: 'Metin',
    number: 'Sayısal',
    yesno: 'Evet / Hayır',
    single: 'Tek Seçim (Radyo)',
    multi: 'Çoklu Seçim (Kutu)',
    date: 'Tarih',
    photo: 'Fotoğraf',
    gps: 'GPS Konum'
  };
  return types[type] || type || 'Metin';
}

// EXECUTIVE ADMIN PANEL BİLEŞENİ
export function renderAdminView() {
  const state = store.getState();
  const activeTab = state.adminTab || 'dashboard';
  const user = state.auth?.user || {};

  const navItems = [
    { id: 'dashboard', label: 'Ana Sayfa', icon: 'dashboard', subtitle: 'Saha operasyonlarının güncel durumu' },
    { id: 'surveys', label: 'Anketler', icon: 'poll', subtitle: 'Sistemdeki tüm anket operasyonları ve onay durumları' },
    { id: 'assignments', label: 'Atamalar', icon: 'assignment', subtitle: 'Saha ekiplerine görev ve hedef atama yönetimi' },
    { id: 'responses', label: 'Cevaplar', icon: 'chatBubble', subtitle: 'Saha kayıtlarını inceleyin ve geçerlilik durumlarını yönetin' },
    { id: 'reports', label: 'Raporlar', icon: 'assessment', subtitle: 'Tamamlanan saha çalışmalarını inceleyin ve kurumsal çıktıları yönetin' },
    { id: 'personnel', label: 'Personeller', icon: 'group', subtitle: 'Saha ekibi ve sistem yöneticileri yönetimi' },
    { id: 'messages', label: 'Mesajlar', icon: 'mail', subtitle: 'Saha ekiplerine direkt talimat ve duyuru iletimi' }
  ];

  const currentNavItem = navItems.find(i => i.id === activeTab) || navItems[0];
  const currentDateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });

  return `
    <div class="flex min-h-screen bg-[#F8FAFC] relative font-sans">
      ${renderCustomModals(state)}

      <!-- LEFT SIDEBAR WITH TOP BRANDING (72px BRANDING HEIGHT, 32-36px LOGO, 10-12px GAP) -->
      <aside class="hidden md:flex flex-col w-64 border-r border-[#E9EDF2] bg-white z-30 shrink-0 sticky top-0 h-screen">
        
        <!-- SIDEBAR TOP BRANDING BLOCK -->
        <div class="h-[72px] px-4 border-b border-[#E9EDF2] flex items-center gap-3 shrink-0">
          <img src="./logo_sehitkamil.png" alt="Şehitkamil Logo" class="h-9 w-auto object-contain shrink-0">
          <div class="flex flex-col min-w-0">
            <span class="text-[13px] sm:text-[14px] font-semibold text-[#01214A] leading-snug tracking-tight truncate">Şehitkamil Strateji Merkezi</span>
            <span class="text-[11px] font-normal text-slate-400 mt-0.5">Yönetim Paneli</span>
          </div>
        </div>

        <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
          ${navItems.map(item => {
            const isActive = activeTab === item.id || (activeTab === 'builder' && item.id === 'surveys');
            return `
              <button data-admin-tab="${item.id}" class="btn-admin-tab w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-left text-xs transition-all duration-150 relative cursor-pointer ${isActive ? 'text-[#01214A] bg-[#2A9D38]/10 font-semibold border-l-3 border-[#2A9D38]' : 'text-slate-400 hover:text-[#01214A] hover:bg-slate-50 font-normal'}">
                ${iconSvg(item.icon, `w-4 h-4 ${isActive ? 'text-[#2A9D38]' : 'text-slate-400'}`)}
                <span>${item.label}</span>
              </button>
            `;
          }).join('')}
        </nav>

      </aside>

      <!-- MAIN CONTENT WRAPPER -->
      <div class="flex-1 flex flex-col min-w-0 min-h-screen">
        
        <!-- SINGLE UNIFIED TOP HEADER BAR (72px HEIGHT MATCHING BRANDING BLOCK) -->
        <header class="h-[72px] border-b border-[#E9EDF2] bg-white px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
          
          <!-- LEFT: PAGE TITLE & SUBTITLE / DATE -->
          <div class="space-y-0.5 min-w-0">
            <h1 class="text-[24px] sm:text-[26px] font-bold text-[#01214A] tracking-tight leading-tight truncate">
              ${activeTab === 'builder' ? 'Anket Oluştur' : currentNavItem.label}
            </h1>
            <p class="text-[13px] text-slate-400 font-normal truncate">
              ${currentDateStr} · ${activeTab === 'builder' ? 'Yeni saha araştırması hazırlama sihirbazı' : currentNavItem.subtitle}
            </p>
          </div>

          <!-- RIGHT: CONTEXTUAL CTA, NOTIFICATIONS & PROFILE DROPDOWN (NO SISTEM ÇEVRİMİÇİ, NO STANDALONE LOGOUT) -->
          <div class="flex items-center gap-3.5 shrink-0">
            
            <!-- CONTEXTUAL PRIMARY CTA -->
            ${activeTab === 'dashboard' || activeTab === 'surveys' ? `
              <button id="btn-admin-create-survey-dashboard" class="h-[38px] px-4 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] shadow-none transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-98">
                ${iconSvg('plus', 'w-4 h-4 text-white')}
                <span>Yeni Anket</span>
              </button>
            ` : activeTab === 'assignments' ? `
              <button id="btn-admin-create-assignment-header" class="h-[38px] px-4 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] shadow-none transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-98">
                ${iconSvg('plus', 'w-4 h-4 text-white')}
                <span>Yeni Atama</span>
              </button>
            ` : activeTab === 'personnel' ? `
              <button id="btn-admin-create-personnel-header" class="h-[38px] px-4 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] shadow-none transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-98">
                ${iconSvg('plus', 'w-4 h-4 text-white')}
                <span>Yeni Personel</span>
              </button>
            ` : ''}

            <!-- NOTIFICATION CENTER -->
            ${renderNotificationCenter(state)}

            <!-- USER PROFILE PILL WITH DROPDOWN MENU -->
            <div class="relative">
              <button id="btn-toggle-profile-dropdown" type="button" class="flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] hover:bg-slate-50 border border-transparent hover:border-[#E9EDF2] transition-all duration-150 cursor-pointer">
                <div class="w-8 h-8 rounded-full bg-[#01214A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ${user.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
                </div>
                <span class="hidden sm:inline-block text-xs font-semibold text-[#01214A] truncate max-w-[140px]">
                  ${user.fullName || 'Saha Koordinatörü'}
                </span>
                ${iconSvg('moveDown', 'w-3.5 h-3.5 text-slate-400')}
              </button>

              <!-- ELEGANT FLOATING DROPDOWN MENU -->
              <div id="dropdown-user-profile-menu" class="hidden absolute right-0 mt-2 w-48 bg-white border border-[#E9EDF2] rounded-[12px] shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div class="px-3.5 py-2 border-b border-[#F1F5F9] mb-1">
                  <p class="text-xs font-semibold text-[#01214A] truncate">${user.fullName || 'Saha Koordinatörü'}</p>
                  <p class="text-[11px] text-slate-400 truncate">${user.role === 'ADMIN' ? 'Yönetici / Koordinatör' : 'Saha Personeli'}</p>
                </div>

                <button type="button" id="btn-dropdown-profile" class="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer font-medium">
                  ${iconSvg('user', 'w-4 h-4 text-slate-400')}
                  <span>Profil</span>
                </button>

                <button type="button" id="btn-dropdown-account" class="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer font-medium">
                  ${iconSvg('dashboard', 'w-4 h-4 text-slate-400')}
                  <span>Hesap Ayarları</span>
                </button>

                <div class="border-t border-[#F1F5F9] my-1"></div>

                <button type="button" id="btn-global-logout" class="w-full px-3.5 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer font-semibold">
                  ${iconSvg('logOut', 'w-4 h-4 text-red-600')}
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>

          </div>
        </header>

        <!-- MAIN CONTENT (STARTS DIRECTLY BELOW UNIFIED HEADER) -->
        <main class="p-6 sm:p-8 max-w-[1520px] w-full mx-auto space-y-6 flex-1">
          ${activeTab === 'builder' ? render4StepSurveyBuilder(state) : renderAdminTabContent(activeTab, state)}
        </main>
      </div>
    </div>
  `;
}

// PREMIUM ANKET OLUŞTURUCU (NET, SADE VE TEMİZ 4 ADIMLI AKIŞ)
function render4StepSurveyBuilder(state) {
  const step = state.builderStep || 1;
  const survey = state.builderSurvey;

  return `
    <div class="space-y-6">
      
      <!-- SADE VE PREMİUM ADIM ÜST BAR -->
      <div class="bg-surface p-4 rounded-2xl border border-border shadow-sm">
        <div class="flex items-center justify-between max-w-2xl mx-auto text-xs font-bold">
          
          <button data-builder-step="1" class="btn-builder-step-nav flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-slate-400'}">
            <span class="w-6 h-6 rounded-full ${step > 1 ? 'bg-emerald-600 text-white' : (step === 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600')} flex items-center justify-center text-xs font-bold">
              ${step > 1 ? iconSvg('check', 'w-3.5 h-3.5') : '1'}
            </span>
            <span>Bilgiler</span>
          </button>

          <span class="h-0.5 w-16 ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}"></span>

          <button data-builder-step="2" class="btn-builder-step-nav flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-slate-400'}">
            <span class="w-6 h-6 rounded-full ${step > 2 ? 'bg-emerald-600 text-white' : (step === 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600')} flex items-center justify-center text-xs font-bold">
              ${step > 2 ? iconSvg('check', 'w-3.5 h-3.5') : '2'}
            </span>
            <span>Sorular</span>
          </button>

          <span class="h-0.5 w-16 ${step >= 3 ? 'bg-primary' : 'bg-slate-200'}"></span>

          <button data-builder-step="3" class="btn-builder-step-nav flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-slate-400'}">
            <span class="w-6 h-6 rounded-full ${step > 3 ? 'bg-emerald-600 text-white' : (step === 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600')} flex items-center justify-center text-xs font-bold">
              ${step > 3 ? iconSvg('check', 'w-3.5 h-3.5') : '3'}
            </span>
            <span>Önizleme</span>
          </button>

          <span class="h-0.5 w-16 ${step >= 4 ? 'bg-primary' : 'bg-slate-200'}"></span>

          <button data-builder-step="4" class="btn-builder-step-nav flex items-center gap-2 ${step >= 4 ? 'text-primary' : 'text-slate-400'}">
            <span class="w-6 h-6 rounded-full ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-xs">
              4
            </span>
            <span>Yayınla & Ata</span>
          </button>

        </div>
      </div>

      <!-- ADIM 1: ANKET BİLGİLERİ -->
      ${step === 1 ? `
        <div class="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-card space-y-6 border-none">
          <div class="text-center space-y-1">
            <h3 class="text-xl font-extrabold text-[#01214A]">Yeni Anket Tanımla</h3>
            <p class="text-xs text-slate-500 font-medium">Anketinizin adını yazın veya hızlı şablon seçin.</p>
          </div>

          <!-- HAZIR ŞABLON PRESETLERİ -->
          <div class="space-y-2">
            <span class="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Hızlı Şablonlar (İsteğe Bağlı):</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button type="button" class="btn-preset-template p-2.5 bg-slate-50 hover:bg-[#2A9D38]/10 border border-slate-200 hover:border-[#2A9D38] rounded-xl text-left transition-all active:scale-95 space-y-1" data-title="Tarımsal İhtiyaç Tespiti Anketi" data-desc="Çiftçilerimizin gübre, tohum ve ekipman ihtiyaçlarının belirlenmesi.">
                <div class="flex items-center gap-1.5 text-[#01214A]">
                  ${iconSvg('poll', 'w-4 h-4 text-[#2A9D38]')}
                  <span class="text-xs font-extrabold truncate">Tarımsal İhtiyaç</span>
                </div>
                <span class="text-[10px] text-slate-500 block truncate">Gübre, tohum & ekipman</span>
              </button>

              <button type="button" class="btn-preset-template p-2.5 bg-slate-50 hover:bg-[#2A9D38]/10 border border-slate-200 hover:border-[#2A9D38] rounded-xl text-left transition-all active:scale-95 space-y-1" data-title="Saha Altyapı & Yol Problemleri" data-desc="Mahallelerdeki yol bakım, kaldırım ve kanalizasyon altyapı tespiti.">
                <div class="flex items-center gap-1.5 text-[#01214A]">
                  ${iconSvg('mapPin', 'w-4 h-4 text-[#00A0DF]')}
                  <span class="text-xs font-extrabold truncate">Altyapı Tespiti</span>
                </div>
                <span class="text-[10px] text-slate-500 block truncate">Yol, asfalt & altyapı</span>
              </button>

              <button type="button" class="btn-preset-template p-2.5 bg-slate-50 hover:bg-[#2A9D38]/10 border border-slate-200 hover:border-[#2A9D38] rounded-xl text-left transition-all active:scale-95 space-y-1" data-title="Mahalle Sosyal Hizmet Talepleri" data-desc="Sosyal yardım, park ve gençlik merkezi taleplerinin toplanması.">
                <div class="flex items-center gap-1.5 text-[#01214A]">
                  ${iconSvg('users', 'w-4 h-4 text-indigo-600')}
                  <span class="text-xs font-extrabold truncate">Mahalle Talepleri</span>
                </div>
                <span class="text-[10px] text-slate-500 block truncate">Sosyal hizmet & parklar</span>
              </button>
            </div>
          </div>

          <form id="form-builder-step1" class="space-y-4 pt-2">
            <div>
              <label class="block text-xs font-extrabold text-[#01214A] mb-1.5">Anket Adı *</label>
              <input type="text" id="builder-info-title" required value="${survey.title}" placeholder="Örn: Çiftçi İhtiyaç Analiz Anketi" class="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2A9D38] focus:bg-white font-medium transition-all"/>
            </div>

            <div>
              <label class="block text-xs font-extrabold text-[#01214A] mb-1.5">Açıklama (Opsiyonel)</label>
              <textarea id="builder-info-desc" rows="3" placeholder="Saha personelinin anketi doldururken dikkat edeceği genel noktalar..." class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#01214A] font-medium focus:outline-none focus:border-[#2A9D38] focus:bg-white transition-all font-sans">${survey.description}</textarea>
            </div>

            <button type="submit" class="w-full h-12 bg-[#2A9D38] hover:bg-[#22822e] text-white font-extrabold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98">
              <span>İleri: Soruları Ekle →</span>
            </button>
          </form>
        </div>
      ` : ''}

      <!-- ADIM 2: SORULAR BUILDER -->
      ${step === 2 ? `
        <div class="space-y-6">
          ${survey.status === 'REVISION_REQUESTED' ? `
            <div class="p-5 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border-l-4 border-l-orange-600 rounded-2xl shadow-card space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  ${iconSvg('edit', 'w-5 h-5 text-orange-600')}
                  <h4 class="font-extrabold text-[#01214A] text-sm">Yönetici Revizyon Talimatı & Gerekçesi</h4>
                </div>
                <span class="text-[10px] font-extrabold bg-orange-100 text-orange-900 border border-orange-300 px-3 py-1 rounded-full">REVİZYON TALEBİ</span>
              </div>
              <p class="text-xs text-orange-950 font-semibold leading-relaxed bg-white/90 p-3.5 rounded-xl border border-orange-200 shadow-2xs">
                "${survey.rejectionReason || 'Yönetici bazı sorularda düzenleme yapmanızı talep etti.'}"
              </p>
            </div>
          ` : ''}

          <div class="bg-white p-4 rounded-2xl shadow-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-none">
            <div class="flex items-center gap-3 flex-wrap">
              <h3 class="font-extrabold text-[#01214A] text-base">${survey.title}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">Taslak Hazırlanıyor</span>
              <span class="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-600')} Kaydedildi
              </span>
            </div>

            <button id="btn-builder-goto-step3" class="w-full sm:w-auto px-5 py-2.5 bg-[#2A9D38] hover:bg-[#22822e] text-white font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95">
              <span>Önizlemeye Geç →</span>
            </button>
          </div>

          <!-- ANKET BÖLÜMLERİ VE YENİ BÖLÜM EKLE BUTTONU -->
          <div class="bg-white px-4 py-3 rounded-2xl shadow-card border-none space-y-2.5">
            <!-- ROW 1: Mevcut bölümler -->
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Bölümler (${(survey.sections || []).length}):</span>
              ${(survey.sections || []).map((sec, idx) => `
                <span class="px-2.5 py-1 bg-[#01214A]/8 text-[#01214A] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-[#01214A]/10">
                  ${iconSvg('poll', 'w-3 h-3 text-[#00A0DF]')}
                  <span>${idx + 1}. ${sec.title}</span>
                  ${(survey.sections || []).length > 1 ? `
                    <button type="button" data-sec-id="${sec.id}" class="btn-delete-section text-slate-300 hover:text-red-500 transition-colors ml-0.5 cursor-pointer">
                      ${iconSvg('close', 'w-3 h-3')}
                    </button>
                  ` : ''}
                </span>
              `).join('')}
            </div>

            <!-- ROW 2: Yeni bölüm ekle -->
            <form id="form-inline-add-section" class="flex items-center gap-2">
              <input type="text" id="inline-sec-title" placeholder="Yeni Bölüm Adı..." class="h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#01214A] flex-1 min-w-0 max-w-xs"/>
              <button type="submit" class="h-9 px-4 bg-[#01214A] hover:bg-[#011633] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center shrink-0 gap-1.5 active:scale-95 cursor-pointer">
                ${iconSvg('plus', 'w-3.5 h-3.5 text-white')}
                <span>Bölüm Ekle</span>
              </button>
            </form>
          </div>



          <!-- SORU TÜRÜ SEÇİM KARTLARI PANELİ (FULL RESPONSIVE) -->
          <div class="bg-white p-5 rounded-2xl shadow-card space-y-3 border-none">
            <div class="flex justify-between items-center">
              <span class="block text-xs font-extrabold text-[#01214A] uppercase tracking-wider">Hızlı Soru Türü Ekleyin</span>
              <span class="text-[10px] text-slate-400 font-semibold">Tıklayarak soru ekleyin</span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
              <button data-type="text" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                <span class="font-bold text-sm text-[#01214A]">Aa</span>
                <span class="text-[11px] font-bold text-slate-700">Metin</span>
              </button>

              <button data-type="number" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                <span class="font-bold text-sm text-[#01214A]">123</span>
                <span class="text-[11px] font-bold text-slate-700">Sayı</span>
              </button>

              <button data-type="yesno" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                <span class="font-bold text-xs text-[#01214A] flex items-center gap-0.5">${iconSvg('check', 'w-3.5 h-3.5 text-emerald-600')}/${iconSvg('block', 'w-3.5 h-3.5 text-red-600')}</span>
                <span class="text-[11px] font-bold text-slate-700">Evet/Hayır</span>
              </button>

              <button data-type="single" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                <span class="font-bold text-sm text-[#00A0DF]">○</span>
                <span class="text-[11px] font-bold text-slate-700">Tek Seçim</span>
              </button>

              <button data-type="multi" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                <span class="font-bold text-sm text-[#2A9D38]">${iconSvg('checkCircle', 'w-4 h-4')}</span>
                <span class="text-[11px] font-bold text-slate-700">Çoklu Seçim</span>
              </button>

              <button data-type="date" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                ${iconSvg('calendar', 'w-5 h-5 text-[#00A0DF]')}
                <span class="text-[11px] font-bold text-slate-700">Tarih</span>
              </button>

              <button data-type="photo" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                ${iconSvg('camera', 'w-5 h-5 text-indigo-600')}
                <span class="text-[11px] font-bold text-slate-700">Fotoğraf</span>
              </button>

              <button data-type="gps" class="btn-add-question-type p-3 bg-slate-50 hover:bg-[#2A9D38]/10 hover:border-[#2A9D38] border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95">
                ${iconSvg('mapPin', 'w-5 h-5 text-[#2A9D38]')}
                <span class="text-[11px] font-bold text-slate-700">GPS Konum</span>
              </button>
            </div>
          </div>

          <!-- BÖLÜM VE SORULAR LİSTESİ -->
          <div class="space-y-4">
            ${survey.questions.length === 0 ? `
              <div class="border-2 border-dashed border-border rounded-3xl p-12 text-center space-y-3 bg-surface">
                <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                  ${iconSvg('clipboard', 'w-6 h-6')}
                </div>
                <h4 class="font-bold text-on-surface text-base">Henüz soru eklenmedi</h4>
                <p class="text-xs text-text-secondary">Yukarıdaki panelden soru türü seçerek hemen başlayabilirsiniz.</p>
              </div>
            ` : survey.questions.map((q, idx) => `
              <div data-q-id="${q.id}" class="builder-question-card bg-white rounded-2xl border border-slate-200 shadow-card hover:border-[#2A9D38]/50 transition-all p-5 space-y-4">
                
                <!-- TOP HEADER & QUICK ACTIONS BAR -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-lg bg-[#01214A]/10 text-[#01214A] font-extrabold text-xs flex items-center justify-center font-mono shrink-0">${String(idx + 1).padStart(2, '0')}</span>
                    <span class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1">
                      ${formatQuestionType(q.type)}
                    </span>
                    ${q.isRequired 
                      ? `<span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-[10px] uppercase tracking-wider">Zorunlu</span>`
                      : `<span class="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-400 border border-slate-200 font-bold text-[10px]">İsteğe Bağlı</span>`}
                  </div>

                  <!-- ACTIONS BAR (UP/DOWN, COPY, DELETE) -->
                  <div class="flex items-center gap-1.5">
                    <button data-q-id="${q.id}" class="btn-move-q-up p-1.5 text-slate-500 hover:text-[#2A9D38] hover:bg-slate-100 rounded-lg transition-colors" title="Yukarı Taşı">
                      ${iconSvg('moveUp', 'w-4 h-4')}
                    </button>
                    <button data-q-id="${q.id}" class="btn-move-q-down p-1.5 text-slate-500 hover:text-[#2A9D38] hover:bg-slate-100 rounded-lg transition-colors" title="Aşağı Taşı">
                      ${iconSvg('moveDown', 'w-4 h-4')}
                    </button>
                    <span class="text-slate-200">|</span>
                    <button data-q-id="${q.id}" type="button" class="btn-duplicate-question text-xs font-bold text-slate-600 hover:text-[#01214A] hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1">
                      ${iconSvg('copy', 'w-3.5 h-3.5')}
                      <span>Kopyala</span>
                    </button>
                    <button data-q-id="${q.id}" type="button" class="btn-direct-delete-q text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1">
                      ${iconSvg('trash', 'w-3.5 h-3.5 text-red-600')}
                      <span>Sil</span>
                    </button>
                  </div>
                </div>

                <!-- QUESTION TITLE INPUT FIELD -->
                <div class="space-y-1.5">
                  <label class="block text-xs font-extrabold text-[#01214A]">Soru Başlığı *</label>
                  <input type="text" data-q-id="${q.id}" value="${q.title}" placeholder="Soru metnini buraya yazınız..." class="input-builder-q-title w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#01214A] focus:outline-none focus:border-[#2A9D38] focus:bg-white transition-all"/>
                </div>

                <!-- REAL-TIME EDITABLE OPTIONS BUILDER (FOR SINGLE / MULTI) -->
                ${(q.type === 'single' || q.type === 'multi') ? `
                  <div class="space-y-2.5 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                    <div class="flex items-center justify-between">
                      <label class="block text-xs font-extrabold text-[#01214A]">Seçenekler</label>
                      <span class="text-[10px] text-slate-400 font-semibold">${q.options.length} Seçenek Tanımlı</span>
                    </div>
                    <div class="space-y-2">
                      ${q.options.map((opt, oIdx) => `
                        <div class="flex items-center gap-2">
                          <span class="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-500 font-bold text-[10px] flex items-center justify-center shrink-0 font-mono">${oIdx + 1}</span>
                          <input type="text" data-q-id="${q.id}" data-opt-id="${opt.id}" value="${opt.label}" placeholder="Seçenek adını yazın..." class="input-option-edit flex-1 h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#2A9D38]"/>
                          <button type="button" data-q-id="${q.id}" data-opt-id="${opt.id}" class="btn-remove-option text-slate-400 hover:text-red-600 p-2 hover:bg-white rounded-lg transition-all" title="Seçeneği Sil">
                            ${iconSvg('trash', 'w-4 h-4')}
                          </button>
                        </div>
                      `).join('')}
                    </div>
                    <button type="button" data-q-id="${q.id}" class="btn-add-option-direct text-xs font-extrabold text-[#2A9D38] hover:underline flex items-center gap-1 pt-1">
                      ${iconSvg('plus', 'w-3.5 h-3.5')}
                      Yeni Seçenek Ekle
                    </button>
                  </div>
                ` : ''}

                <!-- FOOTER CONTROL BAR (REQUIRED TOGGLE SWITCH) -->
                <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-extrabold text-[#01214A]">Zorunlu Cevaplanması Gereksin Mi?</span>
                    <span class="text-[11px] text-slate-400 font-medium">(Sahada boş bırakılamaz)</span>
                  </div>
                  <button type="button" data-q-id="${q.id}" class="btn-toggle-required relative w-12 h-6.5 rounded-full transition-colors ${q.isRequired ? 'bg-[#2A9D38]' : 'bg-slate-300'}">
                    <span class="absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform shadow-xs ${q.isRequired ? 'translate-x-5.5' : ''}"></span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4 border-t border-border">
            <button id="btn-builder-step2-next" class="px-6 py-3 bg-[#2A9D38] hover:bg-[#22822e] text-white font-extrabold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md active:scale-95">
              <span>Önizlemeye Geç →</span>
            </button>
          </div>
        </div>
      ` : ''}

      <!-- ADIM 3: GERÇEK İNTERAKTİF MOBİL PREVIEW -->
      ${step === 3 ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-6 space-y-6">
            <div class="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4">
              <h3 class="font-bold text-on-surface text-lg">${survey.title}</h3>
              <p class="text-xs text-text-secondary leading-relaxed">${survey.description}</p>
              
              <div class="grid grid-cols-2 gap-4 p-4 bg-surface-container-low rounded-xl text-xs font-semibold">
                <div>
                  <span class="text-text-secondary block">Toplam Soru</span>
                  <span class="text-base font-bold text-primary">${survey.questions.length} Soru</span>
                </div>
                <div>
                  <span class="text-text-secondary block">Toplam Bölüm</span>
                  <span class="text-base font-bold text-on-surface">${survey.sections.length} Bölüm</span>
                </div>
              </div>
            </div>

            <div class="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4">
              <h4 class="font-bold text-on-surface text-base">Anket Kontrol Listesi</h4>
              
              <div class="space-y-3 text-xs font-semibold">
                <div class="flex items-center gap-2 text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-600')}
                  <span>${survey.questions.length} Soru Hazır ve Sıralandı</span>
                </div>

                <div class="flex items-center gap-2 text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-600')}
                  <span>Tüm seçim sorularında seçenekler mevcut</span>
                </div>

                <div class="flex items-center gap-2 text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-600')}
                  <span>Mantıksal Koşullar Geçerli</span>
                </div>
              </div>
            </div>

            <button id="btn-builder-step3-next" class="w-full h-12 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-sm">
              <span>${state.currentRole === 'pwa' || (state.auth.user && state.auth.user.role === 'FIELD_USER') ? 'Yöneticinin Onayına Gönder →' : 'Anketi Onayla & Yayınla →'}</span>
            </button>
          </div>

          <div class="lg:col-span-6 flex justify-center">
            <div class="w-[360px] h-[720px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 relative overflow-hidden flex flex-col">
              
              <!-- Phone Notch -->
              <div class="w-32 h-4 bg-slate-900 rounded-full mx-auto mb-2 shrink-0"></div>

              <!-- PWA Phone Container (100% Identical to PWA Runner Layout) -->
              <div class="flex-1 bg-[#f8f9fa] rounded-[28px] overflow-hidden flex flex-col text-slate-900 font-sans">
                
                <!-- PWA Header Bar -->
                <header class="h-12 bg-white border-b border-[#dadce0] px-3 flex items-center justify-between shrink-0 shadow-2xs">
                  <div class="flex items-center gap-1.5">
                    <span class="p-1 text-slate-700 font-bold">${iconSvg('arrowLeft', 'w-4 h-4 text-slate-800')}</span>
                    <h2 class="text-xs font-bold text-slate-900 truncate max-w-[130px]">${survey.title || 'Anket Adı'}</h2>
                  </div>
                  <div class="bg-[#e6f4ea] text-[#137333] px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-[#ceead6]">
                    ${iconSvg('cloudCheck', 'w-3 h-3 text-[#137333]')}
                    <span>Kaydedildi</span>
                  </div>
                </header>

                <!-- PWA Runner Main Content Area -->
                <main class="flex-1 p-3 overflow-y-auto space-y-4">
                  
                  <!-- Stepper / Section Header -->
                  <div class="space-y-1.5">
                    <div class="flex justify-between items-baseline">
                      <h3 class="text-sm font-bold text-[#64B352] tracking-tight">Kişisel Bilgiler & Saha Anketi</h3>
                      <span class="text-[10px] text-slate-500 font-semibold">Adım 1 / 1</span>
                    </div>
                    <div class="w-full bg-[#e8eaed] h-1.5 rounded-full overflow-hidden">
                      <div class="bg-[#64B352] h-full rounded-full transition-all duration-300 w-full"></div>
                    </div>
                  </div>

                  <!-- Question Card (PWA White Container Card) -->
                  <div class="bg-white rounded-2xl border border-[#dadce0] p-4 shadow-2xs space-y-5">
                    ${survey.questions.map((q, idx) => {
                      let isVisible = true;
                      if (q.condition && q.condition.sourceQuestionId) {
                        const srcAnswer = state.builderPreviewAnswers[q.condition.sourceQuestionId];
                        if (srcAnswer !== q.condition.value) {
                          isVisible = false;
                        }
                      }

                      if (!isVisible) {
                        return `
                          <div class="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
                            ${iconSvg('block', 'w-3.5 h-3.5 text-slate-400')} <span class="font-bold">${idx + 1}. ${q.title}</span> (Koşullu soru gizlendi)
                          </div>
                        `;
                      }

                      const currentAnswer = state.builderPreviewAnswers[q.id];

                      return `
                        <div class="space-y-2.5 pb-4 border-b border-[#f1f3f4] last:border-0 last:pb-0">
                          <div class="flex justify-between items-start gap-2">
                            <label class="block text-xs font-bold text-slate-900">${idx + 1}. ${q.title}</label>
                            ${q.isRequired ? `<span class="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Zorunlu</span>` : ''}
                          </div>

                          ${q.type === 'text' ? `
                            <input type="text" data-q-id="${q.id}" value="${currentAnswer || ''}" placeholder="Cevabınızı yazınız..." class="input-preview-answer w-full h-11 px-3 bg-[#f1f3f4] border border-[#dadce0] rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#64B352] focus:bg-white transition-all font-medium"/>
                          ` : ''}

                          ${q.type === 'number' ? `
                            <input type="number" data-q-id="${q.id}" value="${currentAnswer || ''}" placeholder="Sayısal değer..." class="input-preview-answer w-full h-11 px-3 bg-[#f1f3f4] border border-[#dadce0] rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#64B352] focus:bg-white transition-all font-medium"/>
                          ` : ''}

                          ${q.type === 'yesno' ? `
                            <div class="grid grid-cols-2 gap-3">
                              <button type="button" data-q-id="${q.id}" data-val="evet" class="btn-preview-yesno h-24 border-2 ${currentAnswer === 'evet' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all active:scale-95 shadow-2xs">
                                ${iconSvg('land', `w-6 h-6 ${currentAnswer === 'evet' ? 'text-[#64B352]' : 'text-slate-600'}`)}
                                <span>Evet</span>
                              </button>

                              <button type="button" data-q-id="${q.id}" data-val="hayir" class="btn-preview-yesno h-24 border-2 ${currentAnswer === 'hayir' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all active:scale-95 shadow-2xs">
                                ${iconSvg('block', `w-6 h-6 ${currentAnswer === 'hayir' ? 'text-[#64B352]' : 'text-slate-600'}`)}
                                <span>Hayır</span>
                              </button>
                            </div>
                          ` : ''}

                          ${(q.type === 'single' || q.type === 'multi') ? `
                            <div class="space-y-2">
                              ${(q.options || []).map(opt => `
                                <button type="button" data-q-id="${q.id}" data-val="${opt.value || opt.label}" class="btn-preview-option w-full text-left p-3 border ${currentAnswer === (opt.value || opt.label) ? 'border-[#64B352] bg-[#f0f7ee]' : 'border-[#dadce0] bg-white'} rounded-xl cursor-pointer transition-all flex items-center justify-between shadow-2xs">
                                  <span class="text-xs font-medium text-slate-900">${opt.label}</span>
                                  <span class="w-4 h-4 rounded-full border-2 ${currentAnswer === (opt.value || opt.label) ? 'border-[#64B352] bg-[#64B352]' : 'border-[#dadce0]'} flex items-center justify-center">
                                    ${currentAnswer === (opt.value || opt.label) ? '<span class="w-1.5 h-1.5 bg-white rounded-full"></span>' : ''}
                                  </span>
                                </button>
                              `).join('')}
                            </div>
                          ` : ''}

                          ${q.type === 'photo' ? `
                            <div class="border-2 border-dashed ${currentAnswer ? 'border-emerald-600 bg-emerald-50/50' : 'border-[#dadce0]'} hover:border-[#64B352] rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-all space-y-1">
                              <div class="w-10 h-10 rounded-full bg-[#f1f3f4] text-slate-700 mx-auto flex items-center justify-center">
                                ${iconSvg(currentAnswer ? 'checkCircle' : 'cameraPlus', 'w-5 h-5 text-[#64B352]')}
                              </div>
                              <div class="text-xs font-bold text-[#64B352]">Fotoğraf Çek / Yükle</div>
                              <div class="text-[10px] text-slate-500">Cihaz kamerasından çekim yapın</div>
                            </div>
                          ` : ''}

                          ${q.type === 'gps' ? `
                            <div class="border-2 border-dashed border-[#dadce0] bg-slate-50/70 hover:border-[#64B352] rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-all space-y-1">
                              <div class="w-10 h-10 rounded-full bg-[#f1f3f4] text-slate-700 mx-auto flex items-center justify-center">
                                ${iconSvg('mapPin', 'w-5 h-5 text-[#64B352]')}
                              </div>
                              <div class="text-xs font-bold text-[#64B352]">GPS Konumu Al</div>
                              <div class="text-[10px] text-slate-500">Enlem: 37.066, Boylam: 37.383</div>
                            </div>
                          ` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- Action Button inside preview -->
                  <button class="w-full h-11 bg-[#64B352] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#4e953f] transition-all">
                    <span>Devam Et & Anketi Tamamla →</span>
                  </button>
                </main>
              </div>

            </div>
          </div>

        </div>
      ` : ''}

      <!-- ADIM 4: YAYINLA & ONAMA TAMAMLANDI -->
      ${step === 4 ? `
        <div class="max-w-xl mx-auto bg-surface p-8 rounded-3xl border border-border shadow-sm space-y-6 text-center">
          <div class="w-16 h-16 rounded-full ${survey.status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center mx-auto">
            ${survey.status === 'PENDING_APPROVAL' ? iconSvg('clock', 'w-8 h-8') : iconSvg('checkCircle', 'w-8 h-8')}
          </div>

          <div class="space-y-2">
            <h3 class="text-xl font-bold text-on-surface">
              ${survey.status === 'PENDING_APPROVAL' ? 'Anketiniz Yöneticinin Onayına Gönderildi!' : 'Anketiniz Hazır ve Aktif!'}
            </h3>
            <p class="text-xs text-text-secondary leading-relaxed">
              ${survey.status === 'PENDING_APPROVAL' 
                ? `'<strong>${survey.title}</strong>' anketi oluşturuldu ve yönetici onayına sunuldu. Yönetici onayladıktan sonra sahadaki tüm ekibe yayınlanacaktır.`
                : `'<strong>${survey.title}</strong>' anketi başarıyla oluşturuldu ve yayınlandı.`}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 p-4 bg-surface-container-low rounded-xl text-xs font-semibold">
            <div>
              <span class="text-text-secondary block">Soru Sayısı</span>
              <span class="text-base font-bold text-primary">${survey.questions.length} Soru</span>
            </div>
            <div>
              <span class="text-text-secondary block">Durum</span>
              <span class="text-base font-bold ${survey.status === 'PENDING_APPROVAL' ? 'text-amber-800' : 'text-emerald-700'}">
                ${survey.status === 'PENDING_APPROVAL' ? 'ONAY BEKLİYOR' : 'AKTİF'}
              </span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            ${survey.status === 'PENDING_APPROVAL' ? `
              <button id="btn-builder-goto-surveys" class="w-full h-12 bg-[#01214A] hover:bg-[#082d5e] text-white font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2">
                ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-400')}
                <span>Yöneticinin Onayına İlet & Anketler Listesine Git</span>
              </button>
            ` : `
              <button data-survey-id="${survey.id}" class="btn-open-assign-survey-modal flex-1 h-12 bg-[#2A9D38] hover:bg-[#22822e] text-white font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95">
                ${iconSvg('send', 'w-4 h-4 text-white')}
                <span>Hemen Personellere Gönder / Ata</span>
              </button>

              <button id="btn-builder-goto-surveys" class="flex-1 h-12 bg-white border border-slate-200 text-[#01214A] font-extrabold rounded-xl text-xs hover:bg-slate-100 transition-all shadow-2xs">
                Anketler Listesine Git
              </button>
            `}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

// 7 SEKME İÇERİK RENDER MOTORU
function renderAdminTabContent(tab, state) {
  switch (tab) {
    case 'dashboard':
      return `
        <!-- 4 POWERFUL REFINED KPI SCORECARDS (24px padding, 14px radius, #667085 text) -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Card 1: Aktif Anketler -->
          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px] transition-colors duration-150 hover:border-[#D0D5DD]">
            <div>
              <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">AKTİF ANKETLER</span>
            </div>
            <div>
              <div class="text-[30px] font-bold text-[#01214A] leading-none">${state.adminKpis.activeSurveysCount || '8'}</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">6 mahallede devam ediyor</span>
            </div>
          </div>

          <!-- Card 2: Bugünkü Yanıtlar -->
          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px] transition-colors duration-150 hover:border-[#D0D5DD]">
            <div>
              <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">BUGÜNKÜ YANITLAR</span>
            </div>
            <div>
              <div class="text-[30px] font-bold text-[#01214A] leading-none">${state.adminKpis.todayCompleted || '142'}</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">+18 yanıt bugün eklendi</span>
            </div>
          </div>

          <!-- Card 3: Aktif Görev Atamaları -->
          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px] transition-colors duration-150 hover:border-[#D0D5DD]">
            <div>
              <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">AKTİF GÖREV ATAMALARI</span>
            </div>
            <div>
              <div class="text-[30px] font-bold text-[#01214A] leading-none">${state.adminKpis.activeAssignmentsCount || '24'}</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">4 sahada çalışma sürüyor</span>
            </div>
          </div>

          <!-- Card 4: Sahadaki Personel -->
          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px] transition-colors duration-150 hover:border-[#D0D5DD]">
            <div>
              <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">SAHADAKİ PERSONEL</span>
            </div>
            <div>
              <div class="text-[30px] font-bold text-[#01214A] leading-none">${state.adminKpis.fieldStaffCount || '12'} / 14</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">2 personel çevrimdışı</span>
            </div>
          </div>
        </section>

        <!-- SECONDARY QUIET STATUS ROW -->
        <div class="flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 bg-white rounded-[12px] border border-[#E9EDF2] text-xs text-[#667085] font-normal shadow-none">
          <div class="flex items-center gap-2">
            <span class="text-[#667085]">Toplam Tamamlanan:</span>
            <span class="font-semibold text-[#01214A]">${state.adminKpis.totalCompleted || '12.480'} yanıt</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-slate-600 font-normal">${state.offlineQueueCount || '3'} çevrimdışı kayıt senkronizasyon bekliyor</span>
          </div>
        </div>

        <!-- 68% / 32% GRID SPLIT -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- LEFT 68% (8 COLS): MAIN HERO TABLE -->
          <section class="lg:col-span-8 bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
            <div class="p-6 border-b border-[#E9EDF2] flex items-center justify-between">
              <div>
                <h2 class="text-[18px] font-semibold text-[#01214A]">Aktif Anketler ve Saha İlerlemesi</h2>
                <p class="text-[13px] text-slate-400 font-normal mt-0.5">Sahadaki görevlerin canlı hedef ve yüzde tamamlanma durumları</p>
              </div>
              <button type="button" class="btn-admin-tab text-xs font-semibold text-[#2A9D38] hover:underline cursor-pointer" data-admin-tab="surveys">
                Tümünü Gör →
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#F8FAFC] border-b border-[#E9EDF2] text-slate-500 font-semibold text-[11px]">
                    <th class="py-3 px-5">Anket Adı</th>
                    <th class="py-3 px-5">Bölge</th>
                    <th class="py-3 px-5">İlerleme Durumu</th>
                    <th class="py-3 px-5 text-right">Son Tarih</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#F1F5F9]">
                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5 font-semibold text-[#01214A] flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-[#2A9D38]"></span>
                      <span>Tarımsal İhtiyaç Analizi</span>
                    </td>
                    <td class="py-4 px-5 text-slate-600 font-normal">Sinan Köyü</td>
                    <td class="py-4 px-5">
                      <div class="space-y-1.5 max-w-xs">
                        <div class="flex justify-between text-xs font-medium text-slate-700">
                          <span>320 / 500 · %64</span>
                        </div>
                        <div class="w-full bg-[#F1F5F9] h-1 rounded-full overflow-hidden">
                          <div class="bg-[#2A9D38] h-full rounded-full transition-all duration-500" style="width: 64%"></div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-5 text-right text-slate-400 font-normal">30.11.2026</td>
                  </tr>

                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5 font-semibold text-[#01214A] flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-[#2A9D38]"></span>
                      <span>Altyapı Durum Tespiti</span>
                    </td>
                    <td class="py-4 px-5 text-slate-600 font-normal">Merkez Mahalle</td>
                    <td class="py-4 px-5">
                      <div class="space-y-1.5 max-w-xs">
                        <div class="flex justify-between text-xs font-medium text-slate-700">
                          <span>150 / 200 · %75</span>
                        </div>
                        <div class="w-full bg-[#F1F5F9] h-1 rounded-full overflow-hidden">
                          <div class="bg-[#2A9D38] h-full rounded-full transition-all duration-500" style="width: 75%"></div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-5 text-right text-slate-400 font-normal">15.11.2026</td>
                  </tr>

                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5 font-semibold text-[#01214A] flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Eğitim Memnuniyet Anketi</span>
                    </td>
                    <td class="py-4 px-5 text-slate-600 font-normal">Yeşilyurt</td>
                    <td class="py-4 px-5">
                      <div class="space-y-1.5 max-w-xs">
                        <div class="flex justify-between text-xs font-medium text-slate-700">
                          <span>45 / 300 · %15</span>
                        </div>
                        <div class="w-full bg-[#F1F5F9] h-1 rounded-full overflow-hidden">
                          <div class="bg-amber-500 h-full rounded-full transition-all duration-500" style="width: 15%"></div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-5 text-right text-slate-400 font-normal">10.12.2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- RIGHT 32% (4 COLS): RECENT ACTIVITY TIMELINE -->
          <section class="lg:col-span-4 bg-white rounded-[14px] border border-[#E9EDF2] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-[#E9EDF2]">
              <h3 class="text-base font-semibold text-[#01214A]">Son Saha Hareketleri</h3>
              <span class="flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
                <span class="w-2 h-2 rounded-full bg-[#2A9D38]"></span> Canlı
              </span>
            </div>

            <div class="space-y-5 relative pl-3 border-l border-[#E9EDF2]">
              <div class="relative pl-5">
                <div class="absolute -left-[17px] top-0.5 w-7 h-7 rounded-full bg-[#01214A] text-white font-semibold text-[10px] flex items-center justify-center ring-2 ring-white">AY</div>
                <div class="flex justify-between items-baseline">
                  <span class="text-[13px] font-semibold text-[#01214A]">Ahmet Yılmaz</span>
                  <span class="text-[11px] text-slate-400 font-normal">19:42</span>
                </div>
                <p class="text-[12px] text-slate-600 font-normal leading-relaxed mt-0.5">Sinan Köyü için <strong class="text-[#01214A] font-semibold">'Tarımsal İhtiyaç Analizi'</strong> yanıtını tamamladı.</p>
              </div>

              <div class="relative pl-5">
                <div class="absolute -left-[17px] top-0.5 w-7 h-7 rounded-full bg-[#2A9D38] text-white font-semibold text-[10px] flex items-center justify-center ring-2 ring-white">MD</div>
                <div class="flex justify-between items-baseline">
                  <span class="text-[13px] font-semibold text-[#01214A]">Mehmet Demir</span>
                  <span class="text-[11px] text-slate-400 font-normal">19:15</span>
                </div>
                <p class="text-[12px] text-slate-600 font-normal leading-relaxed mt-0.5">Merkez Mahalle konumunda 1 yeni saha fotoğrafı yükledi.</p>
              </div>

              <div class="relative pl-5">
                <div class="absolute -left-[17px] top-0.5 w-7 h-7 rounded-full bg-slate-700 text-white font-semibold text-[10px] flex items-center justify-center ring-2 ring-white">AK</div>
                <div class="flex justify-between items-baseline">
                  <span class="text-[13px] font-semibold text-[#01214A]">Ayşe Kaya</span>
                  <span class="text-[11px] text-slate-400 font-normal">18:50</span>
                </div>
                <p class="text-[12px] text-slate-600 font-normal leading-relaxed mt-0.5">Atanan 'Altyapı Durum Tespiti' görevini görüntüledi.</p>
              </div>
            </div>
          </section>

        </div>
      `;

    case 'surveys':
      const filteredSurveys = store.getFilteredSurveys();
      const currentCategory = state.surveyCategoryFilter || 'ALL';
      const currentStatusFilter = state.surveyStatusFilter || 'ACTIVE_ONLY';
      const viewMode = state.surveyViewMode || 'list';

      const categories = ['Tümü', 'Tarım', 'Hayvancılık', 'Altyapı', 'Eğitim', 'Sosyal Destek', 'Vatandaş Memnuniyeti', 'Saha Tespiti', 'Diğer'];

      return `
        <!-- SCALABLE TOOLBAR: CATEGORY FILTER, SEARCH & ARCHIVE TOGGLE (SECTIONS 4-10) -->
        <div class="bg-white p-4 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div class="flex items-center gap-3 w-full md:w-auto">
              <h2 class="text-base font-semibold text-[#01214A] whitespace-nowrap">Sistemdeki Anketler (${filteredSurveys.length})</h2>
              
              <!-- SEARCH INPUT -->
              <div class="relative flex-1 md:w-64">
                <input type="text" id="input-search-surveys" value="${state.searchSurveysQuery || ''}" placeholder="Anket adı, kategori veya bölge..." class="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal placeholder:text-slate-400 transition-colors duration-150"/>
                <span class="absolute left-3 top-2.5 text-slate-400 pointer-events-none">${iconSvg('search', 'w-4 h-4 text-slate-400')}</span>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <!-- ARCHIVE STATUS FILTER TOGGLE -->
              <div class="flex items-center gap-1 bg-[#F8FAFC] p-1 border border-[#E9EDF2] rounded-[10px] text-xs">
                <button type="button" data-status-filter="ACTIVE_ONLY" class="btn-survey-status-toggle px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${currentStatusFilter === 'ACTIVE_ONLY' ? 'bg-white text-[#01214A] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Aktif</button>
                <button type="button" data-status-filter="ARCHIVED_ONLY" class="btn-survey-status-toggle px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${currentStatusFilter === 'ARCHIVED_ONLY' ? 'bg-[#01214A] text-white font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Arşiv</button>
                <button type="button" data-status-filter="ALL" class="btn-survey-status-toggle px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${currentStatusFilter === 'ALL' ? 'bg-slate-200 text-slate-800 font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Tümü</button>
              </div>

              <!-- VIEW MODE SWITCHER (LIST VS CARD) -->
              <div class="flex items-center gap-1 bg-[#F8FAFC] p-1 border border-[#E9EDF2] rounded-[10px] text-xs">
                <button type="button" data-view-mode="list" class="btn-survey-view-toggle px-2.5 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#01214A] font-semibold shadow-xs' : 'text-slate-500'}" title="Liste Görünümü">
                  Liste
                </button>
                <button type="button" data-view-mode="card" class="btn-survey-view-toggle px-2.5 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${viewMode === 'card' ? 'bg-white text-[#01214A] font-semibold shadow-xs' : 'text-slate-500'}" title="Kart Görünümü">
                  Kart
                </button>
              </div>

              <button id="btn-admin-create-survey-modal" class="h-[38px] px-4 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold rounded-[10px] text-xs transition-all duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap">
                ${iconSvg('plus', 'w-4 h-4 text-white')}
                <span>Yeni Anket</span>
              </button>
            </div>
          </div>

          <!-- CATEGORY FILTER PILLS / DROPDOWN (SECTION 6) -->
          <div class="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-xs">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Kategori:</span>
            ${categories.map(cat => {
              const catKey = cat === 'Tümü' ? 'ALL' : cat;
              const isActiveCat = currentCategory === catKey;
              return `
                <button type="button" data-category="${catKey}" class="btn-filter-survey-category px-3 py-1 rounded-[8px] text-xs transition-colors duration-150 whitespace-nowrap cursor-pointer ${isActiveCat ? 'bg-[#2A9D38] text-white font-semibold' : 'bg-[#F8FAFC] border border-[#E9EDF2] text-slate-600 hover:bg-slate-100 font-normal'}">
                  ${cat}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- SCALABLE SURVEY CONTENT AREA (DEFAULT: KOMPAKT LİSTE) -->
        ${viewMode === 'list' ? `
          <!-- COMPACT LIST VIEW (SCALABLE FOR 100+ SURVEYS - SECTION 7) -->
          <div class="bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#F8FAFC] border-b border-[#E9EDF2] text-slate-500 font-semibold text-[11px]">
                    <th class="py-3 px-5">Anket Adı</th>
                    <th class="py-3 px-5">Kategori & Bölge</th>
                    <th class="py-3 px-5">Oluşturan</th>
                    <th class="py-3 px-5">Durum</th>
                    <th class="py-3 px-5">İlerleme</th>
                    <th class="py-3 px-5 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#F1F5F9]">
                  ${filteredSurveys.length === 0 ? `
                    <tr>
                      <td colspan="6" class="p-12 text-center text-slate-500 text-xs font-normal space-y-2">
                        ${iconSvg('poll', 'w-8 h-8 text-slate-300 mx-auto')}
                        <div class="font-semibold text-[#01214A]">Aramanıza veya seçilen kategoriye uygun anket bulunamadı.</div>
                        <p class="text-slate-400 text-xs">Filtreleri değiştirerek farklı anketleri görüntüleyebilirsiniz.</p>
                      </td>
                    </tr>
                  ` : filteredSurveys.map(s => `
                    <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                      <td class="py-4 px-5">
                        <div class="font-semibold text-[#01214A] leading-snug">${s.title}</div>
                        <div class="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">${s.description || 'Açıklama belirtilmedi.'}</div>
                      </td>
                      <td class="py-4 px-5 text-slate-600 font-normal">
                        <span class="inline-flex items-center gap-1">
                          <span class="px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-700 font-medium text-[10px]">${s.category || 'Tarım'}</span>
                          <span>${s.villageName || 'Sinan Köyü'}</span>
                        </span>
                      </td>
                      <td class="py-4 px-5 text-slate-500 font-normal">${s.createdBy || 'Yönetici'}</td>
                      <td class="py-4 px-5">
                        ${s.isArchived ? `<span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">Arşivlendi</span>` : ''}
                        ${!s.isArchived && s.status === 'COMPLETED' ? `<span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Tamamlandı</span>` : ''}
                        ${!s.isArchived && s.status === 'ACTIVE' ? `<span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Aktif</span>` : ''}
                        ${!s.isArchived && s.status === 'PENDING_APPROVAL' ? `<span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">Onay Bekliyor</span>` : ''}
                        ${!s.isArchived && s.status === 'DRAFT' ? `<span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">Taslak</span>` : ''}
                      </td>
                      <td class="py-4 px-5">
                        <div class="space-y-1 max-w-[140px]">
                          <div class="text-[11px] font-semibold text-[#01214A]">${s.status === 'COMPLETED' ? '100 / 100 · %100' : '320 / 500 · %64'}</div>
                          <div class="w-full bg-[#F1F5F9] h-1 rounded-full overflow-hidden">
                            <div class="bg-[#2A9D38] h-full rounded-full" style="width: ${s.status === 'COMPLETED' ? 100 : 64}%"></div>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-5 text-right">
                        <div class="flex items-center justify-end gap-2">
                          ${s.status === 'COMPLETED' ? `
                            <button data-survey-id="${s.id}" class="btn-view-survey-report h-8 px-3 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[8px] transition-colors duration-150 flex items-center gap-1 cursor-pointer">
                              ${iconSvg('assessment', 'w-3.5 h-3.5 text-white')}
                              <span>Raporu Gör</span>
                            </button>
                          ` : s.status === 'ACTIVE' ? `
                            <button data-survey-id="${s.id}" class="btn-open-assign-survey-modal h-8 px-3 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[8px] transition-colors duration-150 flex items-center gap-1 cursor-pointer">
                              ${iconSvg('send', 'w-3.5 h-3.5 text-white')}
                              <span>Atama Yap</span>
                            </button>
                          ` : `
                            <button data-survey-id="${s.id}" class="btn-open-review-survey-modal h-8 px-3 bg-[#01214A] hover:bg-[#082d5e] text-white font-semibold text-xs rounded-[8px] transition-colors duration-150 flex items-center gap-1 cursor-pointer">
                              <span>İncele</span>
                            </button>
                          `}

                          <button data-survey-id="${s.id}" class="btn-admin-clone-survey h-8 px-2.5 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors cursor-pointer">
                            Kopyala
                          </button>

                          ${s.isArchived ? `
                            <button data-survey-id="${s.id}" class="btn-unarchive-survey h-8 px-2.5 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors cursor-pointer">
                              Yayına Al
                            </button>
                          ` : `
                            <button data-survey-id="${s.id}" class="btn-archive-survey h-8 px-2.5 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-normal rounded-[8px] transition-colors cursor-pointer">
                              Arşivle
                            </button>
                          `}
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : `
          <!-- SECONDARY CARD GRID VIEW (SECTION 8) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${filteredSurveys.map(s => `
              <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between hover:border-[#D0D5DD] transition-colors duration-150">
                <div class="space-y-2">
                  <div class="flex justify-between items-start gap-3">
                    <div>
                      <span class="px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-700 font-medium text-[10px] mb-1.5 inline-block">${s.category || 'Tarım'}</span>
                      <h3 class="font-semibold text-[#01214A] text-base leading-snug">${s.title}</h3>
                    </div>
                    <div class="shrink-0">
                      ${s.status === 'COMPLETED' ? `<span class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Tamamlandı</span>` : ''}
                      ${s.status === 'ACTIVE' ? `<span class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Aktif</span>` : ''}
                      ${s.status === 'PENDING_APPROVAL' ? `<span class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">Onay Bekliyor</span>` : ''}
                      ${s.status === 'DRAFT' ? `<span class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">Taslak</span>` : ''}
                    </div>
                  </div>
                  <p class="text-xs text-slate-500 font-normal leading-relaxed">${s.description || 'Açıklama belirtilmedi.'}</p>
                </div>

                <div class="flex items-center justify-between gap-2 pt-3 border-t border-[#F1F5F9]">
                  <button data-survey-id="${s.id}" class="btn-view-survey-report h-9 px-3.5 bg-[#2A9D38] text-white font-semibold text-xs rounded-[10px]">Raporu Gör</button>
                  <button data-survey-id="${s.id}" class="btn-admin-clone-survey h-9 px-3 bg-white border border-[#E9EDF2] text-slate-700 text-xs rounded-[10px]">Kopyala</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      `;

    case 'assignments':
      return `
        <!-- FORM: NEW ASSIGNMENT (SECTION 12) -->
        <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
          <div>
            <h2 class="text-[18px] font-semibold text-[#01214A]">Yeni Görev Ataması Yap</h2>
            <p class="text-[13px] text-slate-400 font-normal mt-0.5">Saha personellerine hedef bölge, anket ve talimat atayın.</p>
          </div>

          <form id="form-admin-create-assignment" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Atanacak Anket *</label>
              <select id="assign-survey-id" required class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal">
                ${(Array.isArray(state.allSurveys) ? state.allSurveys : []).map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Hedef Köy / Bölge *</label>
              <input type="text" id="assign-village-name" required value="Sinan Köyü" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal"/>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Hedef Anket Sayısı *</label>
              <input type="number" id="assign-target-count" required value="50" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal"/>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Son Tarih *</label>
              <input type="date" id="assign-end-date" required value="${new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal"/>
            </div>

            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Yönetici Özel Notu *</label>
              <textarea id="assign-note" required rows="2" placeholder="Örn: Sinan Köyü üreticileriyle görüşürken gübre ve ekipman ihtiyaçlarını detaylı not alınız." class="w-full p-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal leading-relaxed">Sinan Köyü üreticileriyle görüşürken gübre ve ekipman ihtiyaçlarını detaylı olarak not alınız.</textarea>
            </div>

            <div class="md:col-span-2 relative">
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-semibold text-[#667085] uppercase tracking-wider">Görev Atanacak Saha Personelleri *</label>
                <span id="label-assign-selected-badge" class="text-[11px] font-medium text-slate-500">
                  <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-[6px]">Tüm Ekip Seçili (${state.allPersonnel.length}/${state.allPersonnel.length})</span>
                </span>
              </div>

              <!-- Dropdown Header Button -->
              <button type="button" id="btn-toggle-assign-personnel-dropdown" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] hover:border-[#2A9D38] rounded-[10px] text-xs font-normal text-[#01214A] flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2 truncate" id="label-assign-selected-personnel-count">
                  ${iconSvg('group', 'w-4 h-4 text-[#2A9D38]')}
                  <span class="font-medium text-xs text-[#01214A] truncate">Tüm Ekip Seçili (${state.allPersonnel.length} Personel)</span>
                </div>
                
                <div class="flex items-center gap-1 shrink-0">
                  <span class="text-[11px] font-medium text-slate-400">Değiştir</span>
                  ${iconSvg('chevronDown', 'w-4 h-4 text-slate-400')}
                </div>
              </button>

              <!-- Downward Collapsible Dropdown Menu -->
              <div id="dropdown-assign-personnel-menu" class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-[#E9EDF2] rounded-[14px] shadow-xl p-4 z-30 space-y-3">
                <div class="relative">
                  <input type="text" id="input-search-assign-personnel" placeholder="Personel ara..." class="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs font-normal text-slate-900 focus:outline-none focus:border-[#2A9D38]"/>
                  <span class="absolute left-3 top-2.5 text-slate-400">${iconSvg('search', 'w-4 h-4 text-slate-400')}</span>
                </div>

                <div class="flex items-center justify-between pt-1 pb-1 border-b border-[#F1F5F9] text-[11px] font-medium">
                  <div class="flex items-center gap-2">
                    <button type="button" id="btn-assign-select-all" class="text-[#2A9D38] hover:underline cursor-pointer">Tümünü Seç</button>
                    <span class="text-slate-300">|</span>
                    <button type="button" id="btn-assign-clear-all" class="text-slate-500 hover:text-slate-700 hover:underline cursor-pointer">Temizle</button>
                  </div>
                  <span class="text-slate-400 text-[10px]" id="info-assign-visible-count">${state.allPersonnel.length} personel</span>
                </div>

                <div id="container-assign-personnel-list" class="max-h-48 overflow-y-auto space-y-1 pr-1">
                  ${state.allPersonnel.map(p => `
                    <label data-search-text="${(p.fullName + ' ' + (p.phone || '') + ' ' + (p.email || '')).toLowerCase()}" class="assign-personnel-item flex items-center justify-between p-2 rounded-[8px] border border-[#E9EDF2] hover:bg-slate-50 cursor-pointer transition-colors">
                      <div class="flex items-center gap-2.5">
                        <input type="checkbox" name="assign-personnel" value="${p.id}" checked class="cb-assign-personnel rounded text-[#2A9D38] focus:ring-[#2A9D38] w-4 h-4 cursor-pointer"/>
                        <div>
                          <span class="font-semibold text-xs text-[#01214A] block">${p.fullName}</span>
                          <span class="text-[10px] text-slate-400 block">${p.phone || p.email}</span>
                        </div>
                      </div>
                      <span class="text-[10px] font-medium px-2 py-0.5 rounded-[4px] ${p.role === 'ADMIN' ? 'bg-slate-100 text-[#01214A]' : 'bg-emerald-50 text-emerald-800'}">
                        ${p.role === 'ADMIN' ? 'Yönetici' : 'Saha'}
                      </span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="md:col-span-2 pt-1">
              <button type="submit" class="h-[38px] px-5 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer">
                ${iconSvg('send', 'w-4 h-4 text-white')}
                <span>Görev Atamasını Kaydet</span>
              </button>
            </div>
          </form>
        </div>

        <!-- ASSIGNMENTS TABLE -->
        <div class="bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden space-y-3 p-6">
          <h2 class="text-[18px] font-semibold text-[#01214A]">Aktif Görev Atamaları (${(Array.isArray(state.allAssignments) ? state.allAssignments : []).length})</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E9EDF2] text-slate-500 font-semibold text-[11px]">
                  <th class="py-3 px-5">Anket Adı</th>
                  <th class="py-3 px-5">Hedef Köy / Bölge</th>
                  <th class="py-3 px-5">Yönetici Notu</th>
                  <th class="py-3 px-5">Hedef / Tamamlanan</th>
                  <th class="py-3 px-5 text-right">Saha Görüldü</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${(Array.isArray(state.allAssignments) ? state.allAssignments : []).map(a => `
                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5 font-semibold text-[#01214A]">${a.surveyTitle}</td>
                    <td class="py-4 px-5 text-slate-500 font-normal">${a.villageName}</td>
                    <td class="py-4 px-5 text-slate-600 font-normal max-w-xs truncate">${a.note || 'Özel not eklenmedi.'}</td>
                    <td class="py-4 px-5 font-semibold text-[#2A9D38]">${a.completedCount} / ${a.targetCount}</td>
                    <td class="py-4 px-5 text-right">
                      <span class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${a.viewedAt ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}">
                        ${a.viewedAt ? 'Görüldü' : 'Bekliyor'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'responses':
      const filteredSubmissions = store.getFilteredSubmissions();
      const statusFilterSub = state.statusFilterSubmissions || 'ALL';

      return `
        <!-- TOOLBAR: SEARCH & SEGMENTED FILTER (SECTION 13) -->
        <div class="bg-white p-4 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3 sm:space-y-0 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div class="flex items-center gap-3">
            <h2 class="text-base font-semibold text-[#01214A]">Gelen Cevaplar (${filteredSubmissions.length})</h2>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <!-- SEARCH INPUT -->
            <div class="relative w-full sm:w-64">
              <input type="text" id="input-search-submissions" value="${state.searchSubmissionsQuery || ''}" placeholder="Personel, anket veya bölge ara..." class="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal placeholder:text-slate-400 transition-colors duration-150"/>
              <span class="absolute left-3 top-2.5 text-slate-400 pointer-events-none">${iconSvg('search', 'w-4 h-4 text-slate-400')}</span>
            </div>

            <!-- SEGMENTED FILTER -->
            <div class="flex items-center gap-1 bg-[#F8FAFC] p-1 border border-[#E9EDF2] rounded-[10px] text-xs">
              <button type="button" data-filter="ALL" class="btn-filter-status-sub px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${statusFilterSub === 'ALL' ? 'bg-white text-[#01214A] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Tümü</button>
              <button type="button" data-filter="VALID" class="btn-filter-status-sub px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${statusFilterSub === 'VALID' ? 'bg-[#2A9D38] text-white font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Geçerli</button>
              <button type="button" data-filter="INVALID" class="btn-filter-status-sub px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${statusFilterSub === 'INVALID' ? 'bg-red-600 text-white font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Geçersiz</button>
            </div>
          </div>
        </div>

        <!-- RESPONSES DATA TABLE -->
        <div class="bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E9EDF2] text-slate-500 font-semibold text-[11px]">
                  <th class="py-3 px-5">Kayıt ID</th>
                  <th class="py-3 px-5">Saha Kullanıcısı</th>
                  <th class="py-3 px-5">Tarih & Saat</th>
                  <th class="py-3 px-5">GPS Konum</th>
                  <th class="py-3 px-5">Geçerlilik Durumu</th>
                  <th class="py-3 px-5 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${filteredSubmissions.length === 0 ? `
                  <tr>
                    <td colspan="6" class="p-12 text-center text-slate-500 text-xs font-normal space-y-2">
                      <div class="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center mb-2">
                        ${iconSvg('chatBubble', 'w-6 h-6 text-slate-400')}
                      </div>
                      <div class="font-semibold text-[#01214A]">Henüz cevap bulunmuyor</div>
                      <p class="text-slate-400 text-xs max-w-sm mx-auto">Saha personelinden gelen kayıtlar burada görüntülenecek.</p>
                      ${statusFilterSub !== 'ALL' || state.searchSubmissionsQuery ? `
                        <button type="button" id="btn-clear-submission-filters" class="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-[8px] transition-colors cursor-pointer">Filtreleri Temizle</button>
                      ` : ''}
                    </td>
                  </tr>
                ` : filteredSubmissions.map(sub => `
                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5 font-mono text-[11px] text-slate-400">${sub.clientSubmissionId || sub.id}</td>
                    <td class="py-4 px-5 font-semibold text-[#01214A]">${sub.fieldUserName || 'Ahmet Yılmaz'}</td>
                    <td class="py-4 px-5 text-slate-500 font-normal">${new Date(sub.submittedAt || Date.now()).toLocaleTimeString('tr-TR')}</td>
                    <td class="py-4 px-5 text-slate-500 font-normal">
                      ${sub.latitude ? `
                        <span class="inline-flex items-center gap-1 text-[#2A9D38] font-medium">
                          ${iconSvg('mapPin', 'w-3.5 h-3.5')} ${sub.latitude.toFixed(2)}, ${sub.longitude?.toFixed(2)}
                        </span>
                      ` : 'Çevrimdışı'}
                    </td>
                    <td class="py-4 px-5">
                      <span class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${sub.isInvalid ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
                        ${sub.isInvalid ? 'Geçersiz İşaretlendi' : 'Geçerli Yanıt'}
                      </span>
                    </td>
                    <td class="py-4 px-5 text-right">
                      <button data-sub-id="${sub.id}" class="btn-toggle-invalid-sub h-8 px-3 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors duration-150 cursor-pointer">
                        ${sub.isInvalid ? 'Geçerli Yap' : 'Geçersiz Say'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'reports':
      const savedReports = store.getFilteredReports();
      const allReports = Array.isArray(state.reports) ? state.reports : [];
      const totalCitizenCount = allReports.reduce((acc, r) => acc + (r.completedCount || 100), 0);
      const currentReportCategory = state.reportCategoryFilter || 'ALL';

      const reportCategories = ['Tümü', 'Tarım', 'Hayvancılık', 'Altyapı', 'Eğitim', 'Sosyal Destek', 'Vatandaş Memnuniyeti'];

      return `
        <!-- 4 CLEAN WHITE KPI SCORECARDS (SECTIONS 11-12) -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px]">
            <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">TOPLAM RAPOR</span>
            <div>
              <div class="text-[30px] font-bold text-[#01214A] leading-none">${allReports.length}</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">Hazır kurumsal rapor</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px]">
            <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">KATILIMCI SAYISI</span>
            <div>
              <div class="text-[30px] font-bold text-[#01214A] leading-none">${totalCitizenCount || 100}</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">Doğrulanmış vatandaş yanıtı</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px]">
            <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">DOĞRULAMA ORANI</span>
            <div>
              <div class="text-[30px] font-bold text-[#2A9D38] leading-none">%100</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">Tam saha katılımı</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[128px]">
            <span class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">HEDEF BÖLGE</span>
            <div>
              <div class="text-xl font-bold text-[#01214A] leading-none truncate">Sinan Köyü</div>
              <span class="text-xs text-[#667085] font-normal mt-1 block">6 Mahalle genelinde</span>
            </div>
          </div>
        </section>

        <!-- TOOLBAR: SEARCH & CATEGORY FILTER (SECTIONS 16-17) -->
        <div class="bg-white p-4 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3">
          <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div class="flex items-center gap-3">
              <h2 class="text-base font-semibold text-[#01214A]">Rapor Kütüphanesi (${savedReports.length})</h2>
            </div>

            <div class="relative w-full sm:w-72">
              <input type="text" id="input-search-reports" value="${state.reportSearchQuery || ''}" placeholder="Rapor adı veya bölge ara..." class="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal placeholder:text-slate-400 transition-colors duration-150"/>
              <span class="absolute left-3 top-2.5 text-slate-400 pointer-events-none">${iconSvg('search', 'w-4 h-4 text-slate-400')}</span>
            </div>
          </div>

          <!-- CATEGORY FILTER PILLS -->
          <div class="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 scrollbar-none text-xs">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Kategori:</span>
            ${reportCategories.map(cat => {
              const catKey = cat === 'Tümü' ? 'ALL' : cat;
              const isActiveCat = currentReportCategory === catKey;
              return `
                <button type="button" data-report-category="${catKey}" class="btn-filter-report-category px-3 py-1 rounded-[8px] text-xs transition-colors duration-150 whitespace-nowrap cursor-pointer ${isActiveCat ? 'bg-[#2A9D38] text-white font-semibold' : 'bg-[#F8FAFC] border border-[#E9EDF2] text-slate-600 hover:bg-slate-100 font-normal'}">
                  ${cat}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- COMPACT REPORT LIBRARY TABLE (NO GIANT DUMP - SECTIONS 13-15) -->
        <div class="bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E9EDF2] text-slate-500 font-semibold text-[11px]">
                  <th class="py-3 px-5">Rapor Adı</th>
                  <th class="py-3 px-5">Kategori & Bölge</th>
                  <th class="py-3 px-5">Kayıt Tarihi</th>
                  <th class="py-3 px-5">Saha Katılımı</th>
                  <th class="py-3 px-5">Durum</th>
                  <th class="py-3 px-5 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${savedReports.length === 0 ? `
                  <tr>
                    <td colspan="6" class="p-12 text-center text-slate-500 text-xs font-normal space-y-2">
                      ${iconSvg('assessment', 'w-10 h-10 text-slate-300 mx-auto')}
                      <div class="font-semibold text-[#01214A] text-sm">Henüz kayıtlı rapor bulunmuyor.</div>
                      <p class="text-slate-400 text-xs max-w-md mx-auto">Anketler sekmesinde tamamlanan (100/100) anketler için "Rapor Oluştur & Kaydet" butonuna basarak rapora dönüştürebilirsiniz.</p>
                    </td>
                  </tr>
                ` : savedReports.map(rpt => `
                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5">
                      <div class="font-semibold text-[#01214A] leading-snug">${rpt.surveyTitle}</div>
                    </td>
                    <td class="py-4 px-5 text-slate-600 font-normal">
                      <span class="inline-flex items-center gap-1">
                        <span class="px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-700 font-medium text-[10px]">${rpt.category || 'Tarım'}</span>
                        <span>${rpt.villageName || 'Sinan Köyü'}</span>
                      </span>
                    </td>
                    <td class="py-4 px-5 text-slate-500 font-normal">${rpt.createdAt || '12 Ağustos 2026'}</td>
                    <td class="py-4 px-5 font-semibold text-[#2A9D38]">${rpt.completedCount || 100} / ${rpt.targetCount || 100} Yanıt (%100)</td>
                    <td class="py-4 px-5">
                      <span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ${rpt.statusLabel || 'Hazır'}
                      </span>
                    </td>
                    <td class="py-4 px-5 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button data-report-id="${rpt.id}" class="btn-open-report-modal h-8 px-3.5 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[8px] transition-colors duration-150 flex items-center gap-1.5 cursor-pointer">
                          ${iconSvg('search', 'w-3.5 h-3.5 text-white')}
                          <span>Raporu Gör</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'personnel':
      const filteredPersonnel = store.getFilteredPersonnel();
      const roleFilterP = state.roleFilterPersonnel || 'ALL';

      return `
        <!-- TOOLBAR: SEARCH, SEGMENTED FILTER & PRIMARY CTA (SECTION 15) -->
        <div class="bg-white p-4 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-3 sm:space-y-0 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div class="flex items-center gap-3">
            <h2 class="text-base font-semibold text-[#01214A]">Saha Ekibi ve Personeller (${filteredPersonnel.length})</h2>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <!-- SEARCH INPUT -->
            <div class="relative w-full sm:w-60">
              <input type="text" id="input-search-personnel" value="${state.searchPersonnelQuery || ''}" placeholder="Personel adı, e-posta..." class="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal placeholder:text-slate-400 transition-colors duration-150"/>
              <span class="absolute left-3 top-2.5 text-slate-400 pointer-events-none">${iconSvg('search', 'w-4 h-4 text-slate-400')}</span>
            </div>

            <!-- SEGMENTED FILTER -->
            <div class="flex items-center gap-1 bg-[#F8FAFC] p-1 border border-[#E9EDF2] rounded-[10px] text-xs">
              <button type="button" data-filter="ALL" class="btn-filter-role-personnel px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${roleFilterP === 'ALL' ? 'bg-white text-[#01214A] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Tümü</button>
              <button type="button" data-filter="FIELD" class="btn-filter-role-personnel px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${roleFilterP === 'FIELD' ? 'bg-[#2A9D38] text-white font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Saha</button>
              <button type="button" data-filter="ADMIN" class="btn-filter-role-personnel px-3 py-1 rounded-[8px] font-medium transition-all duration-150 cursor-pointer ${roleFilterP === 'ADMIN' ? 'bg-[#01214A] text-white font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-800'}">Yönetici</button>
            </div>

            <button id="btn-open-add-personnel-modal" class="h-[38px] px-4 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] transition-all duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap">
              ${iconSvg('plus', 'w-4 h-4 text-white')}
              <span>Yeni Personel Ekle</span>
            </button>
          </div>
        </div>

        <!-- PERSONNEL TABLE -->
        <div class="bg-white rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#F8FAFC] border-b border-[#E9EDF2] text-slate-500 font-semibold text-[11px]">
                  <th class="py-3 px-5">Ad Soyad</th>
                  <th class="py-3 px-5">E-Posta (Giriş Adresi)</th>
                  <th class="py-3 px-5">Telefon</th>
                  <th class="py-3 px-5">Rol</th>
                  <th class="py-3 px-5">Hesap Durumu</th>
                  <th class="py-3 px-5 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F1F5F9]">
                ${filteredPersonnel.length === 0 ? `
                  <tr>
                    <td colspan="6" class="p-12 text-center text-slate-500 text-xs font-normal space-y-2">
                      <div class="font-semibold text-[#01214A]">Henüz personel bulunmuyor</div>
                      <p class="text-slate-400 text-xs">Aramanıza uygun kayıt bulunamadı.</p>
                    </td>
                  </tr>
                ` : filteredPersonnel.map(p => `
                  <tr class="hover:bg-slate-50/60 transition-colors duration-150">
                    <td class="py-4 px-5 font-semibold text-[#01214A]">${p.fullName}</td>
                    <td class="py-4 px-5 text-slate-500 font-normal">${p.email || 'personel@sahaanket.gov.tr'}</td>
                    <td class="py-4 px-5 text-slate-500 font-normal">${p.phone}</td>
                    <td class="py-4 px-5">
                      <span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold ${p.role === 'ADMIN' ? 'bg-slate-100 text-[#01214A] border border-slate-200' : 'bg-slate-50 text-slate-700 border border-slate-200'}">
                        ${p.role === 'ADMIN' ? 'YÖNETİCİ' : 'SAHA PERSONELİ'}
                      </span>
                    </td>
                    <td class="py-4 px-5">
                      <span class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold ${p.isActive ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}">
                        ${p.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td class="py-4 px-5 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button data-user-id="${p.id}" class="btn-open-edit-personnel-modal h-8 px-3 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors duration-150 flex items-center gap-1 cursor-pointer">
                          ${iconSvg('user', 'w-3.5 h-3.5 text-slate-400')}
                          <span>Düzenle</span>
                        </button>

                        <button data-user-id="${p.id}" class="btn-toggle-personnel-status h-8 px-3 bg-white border border-[#E9EDF2] hover:bg-slate-50 text-slate-700 text-xs font-normal rounded-[8px] transition-colors duration-150 cursor-pointer">
                          ${p.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                        </button>

                        <button data-user-id="${p.id}" class="btn-open-delete-personnel-modal h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-[8px] transition-colors flex items-center justify-center cursor-pointer" title="Personeli Sil">
                          ${iconSvg('trash', 'w-3.5 h-3.5')}
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    case 'messages':
      const messagesList = Array.isArray(state.messages) ? state.messages : [];
      // Adminın gönderdiği mesajlar
      const sentMessages = messagesList.filter(m => m.senderRole === 'ADMIN' || m.direction === 'FROM_ADMIN');
      // Saha personelinden gelen mesajlar
      const receivedMessages = messagesList.filter(m => m.senderRole === 'FIELD_USER' || m.direction === 'TO_ADMIN');

      return `
        <!-- 2-COLUMN BALANCED GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- LEFT COLUMN: MESAJ OLUŞTURMA FORMU -->
          <section class="lg:col-span-6 bg-white p-6 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
            <div>
              <h2 class="text-[18px] font-semibold text-[#01214A]">Saha Ekibine Mesaj Gönder</h2>
              <p class="text-[13px] text-slate-400 font-normal mt-0.5">Saha personeline özel talimat veya tüm ekibe toplu duyuru iletin.</p>
            </div>

            <form id="form-admin-send-message" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Gönderim Modu *</label>
                <div class="flex items-center gap-4 text-xs font-medium text-[#01214A]">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="msg-target-mode" value="all" checked class="text-[#2A9D38] focus:ring-[#2A9D38] cursor-pointer"/>
                    <span>Tüm Ekibe Toplu Duyuru</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="msg-target-mode" value="specific" class="text-[#2A9D38] focus:ring-[#2A9D38] cursor-pointer"/>
                    <span>Özel Personel Seç</span>
                  </label>
                </div>
              </div>

              <div id="msg-personnel-selector-wrapper" class="hidden space-y-2">
                <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider">Mesaj Alıcıları *</label>
                
                <button type="button" id="btn-toggle-msg-personnel-dropdown" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs font-medium text-[#01214A] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                  <div class="flex items-center gap-2">
                    ${iconSvg('group', 'w-4 h-4 text-[#2A9D38]')}
                    <span id="label-selected-personnel-count">Personelleri Seçin (0 kişi seçildi)</span>
                  </div>
                  ${iconSvg('moveDown', 'w-4 h-4 text-slate-400')}
                </button>

                <div id="dropdown-msg-personnel-menu" class="hidden relative z-30 bg-white border border-[#E9EDF2] rounded-[14px] p-3 shadow-xl space-y-2 border-t-2 border-t-[#2A9D38]">
                  <div class="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                    <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Personel Seçimi</span>
                    <div class="flex items-center gap-2 text-[11px] font-medium">
                      <button type="button" id="btn-msg-select-all-personnel" class="text-[#2A9D38] hover:underline cursor-pointer">Tümünü Seç</button>
                      <span class="text-slate-300">|</span>
                      <button type="button" id="btn-msg-clear-all-personnel" class="text-slate-400 hover:text-slate-600 hover:underline cursor-pointer">Temizle</button>
                    </div>
                  </div>

                  <div class="relative">
                    <input type="text" id="input-search-msg-personnel" placeholder="Personel ara..." class="w-full h-8 pl-8 pr-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[8px] text-xs font-normal focus:outline-none focus:border-[#2A9D38]"/>
                    <span class="absolute left-2.5 top-2 text-slate-400">${iconSvg('search', 'w-3.5 h-3.5 text-slate-400')}</span>
                  </div>

                  <div class="max-h-48 overflow-y-auto divide-y divide-[#F1F5F9] bg-[#F8FAFC] rounded-[8px] border border-[#E9EDF2] p-1">
                    ${(Array.isArray(state.allPersonnel) ? state.allPersonnel : []).map(p => `
                      <label class="msg-personnel-item flex items-center justify-between p-2 hover:bg-white rounded-[6px] cursor-pointer transition-colors" data-name="${(p.fullName + ' ' + (p.email || '')).toLowerCase()}">
                        <div class="flex items-center gap-2.5">
                          <input type="checkbox" name="msg-selected-personnel" value="${p.id}" class="cb-msg-personnel rounded text-[#2A9D38] focus:ring-[#2A9D38] w-4 h-4 cursor-pointer"/>
                          <div>
                            <span class="font-medium text-[#01214A] block text-xs">${p.fullName}</span>
                            <span class="text-[10px] text-slate-400 block">${p.email || p.phone}</span>
                          </div>
                        </div>
                        <span class="px-2 py-0.5 rounded text-[10px] font-medium ${p.role === 'ADMIN' ? 'bg-slate-200 text-[#01214A]' : 'bg-emerald-50 text-emerald-800'}">${p.role === 'ADMIN' ? 'Yönetici' : 'Saha'}</span>
                      </label>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Mesaj Başlığı *</label>
                <input type="text" id="admin-msg-title" required placeholder="Örn: Sinan Köyü Saha Hatırlatması" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal"/>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Mesaj İçeriği *</label>
                <textarea id="admin-msg-content" required rows="4" placeholder="Saha personeline iletilecek açık duyuru metni..." class="w-full p-3 bg-[#F8FAFC] border border-[#E9EDF2] rounded-[10px] text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#2A9D38] font-normal leading-relaxed"></textarea>
              </div>

              <button type="submit" class="h-[38px] px-5 bg-[#2A9D38] hover:bg-[#22822e] text-white font-semibold text-xs rounded-[10px] transition-all duration-150 flex items-center gap-2 cursor-pointer">
                ${iconSvg('send', 'w-4 h-4 text-white')}
                <span>Mesaj Gönder</span>
              </button>
            </form>
          </section>

          <!-- RIGHT COLUMN: MESAJ GEÇMİŞİ (Gönderilen + Gelen) -->
          <section class="lg:col-span-6 space-y-5">

            <!-- SAHADAN GELEN MESAJLAR -->
            <div class="bg-white p-5 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-[#E9EDF2]">
                <div class="flex items-center gap-2">
                  ${iconSvg('mail', 'w-4 h-4 text-[#01214A]')}
                  <h2 class="text-sm font-semibold text-[#01214A]">Sahadan Gelen Mesajlar</h2>
                  ${receivedMessages.length > 0 ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200">${receivedMessages.filter(m => m.isUnread).length} Yeni</span>` : ''}
                </div>
                <span class="text-[11px] text-slate-400 font-normal">${receivedMessages.length} mesaj</span>
              </div>

              <div class="space-y-3 max-h-64 overflow-y-auto">
                ${receivedMessages.length === 0 ? `
                  <div class="py-8 text-center space-y-1.5">
                    ${iconSvg('mail', 'w-8 h-8 text-slate-300 mx-auto')}
                    <p class="text-xs text-slate-400 font-normal">Henüz saha mesajı alınmadı.</p>
                  </div>
                ` : receivedMessages.map(m => `
                  <div class="p-3.5 bg-[#F8FAFC] rounded-[10px] border ${m.isUnread ? 'border-emerald-300 bg-emerald-50/30' : 'border-[#E9EDF2]'} space-y-1.5 transition-colors">
                    <div class="flex justify-between items-start gap-2">
                      <div class="flex items-center gap-2 min-w-0">
                        ${m.isUnread ? '<span class="w-2 h-2 rounded-full bg-[#2A9D38] shrink-0 mt-0.5"></span>' : ''}
                        <h3 class="font-semibold text-[#01214A] text-xs truncate">${m.title}</h3>
                      </div>
                      <span class="text-[10px] text-slate-400 font-normal shrink-0">${m.date || 'Bugün'}</span>
                    </div>
                    <p class="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">${m.content}</p>
                    <div class="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500 font-normal border-t border-[#F1F5F9]">
                      ${iconSvg('user', 'w-3 h-3 text-slate-400')}
                      <span><strong class="text-slate-700 font-medium">${m.sender || 'Saha Personeli'}</strong> · Saha Personeli</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- GÖNDERİLEN MESAJLAR -->
            <div class="bg-white p-5 rounded-[14px] border border-[#E9EDF2] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-[#E9EDF2]">
                <div class="flex items-center gap-2">
                  ${iconSvg('send', 'w-4 h-4 text-[#01214A]')}
                  <h2 class="text-sm font-semibold text-[#01214A]">Gönderilmiş Mesajlar</h2>
                </div>
                <span class="text-[11px] text-slate-400 font-normal">${sentMessages.length} mesaj</span>
              </div>

              <div class="space-y-3 max-h-64 overflow-y-auto">
                ${sentMessages.length === 0 ? `
                  <div class="py-8 text-center space-y-1.5">
                    ${iconSvg('send', 'w-8 h-8 text-slate-300 mx-auto')}
                    <p class="text-xs text-slate-400 font-normal">Sol taraftaki formu kullanarak saha ekibine mesaj gönderin.</p>
                  </div>
                ` : sentMessages.map(m => `
                  <div class="p-3.5 bg-[#F8FAFC] rounded-[10px] border border-[#E9EDF2] space-y-1.5 hover:bg-slate-50 transition-colors">
                    <div class="flex justify-between items-start gap-2">
                      <h3 class="font-semibold text-[#01214A] text-xs">${m.title}</h3>
                      <span class="text-[10px] text-slate-400 font-normal shrink-0">${m.date || 'Bugün'}</span>
                    </div>
                    <p class="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">${m.content}</p>
                    <div class="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-normal border-t border-[#F1F5F9]">
                      <span>Alıcı: <strong class="text-slate-600 font-medium">${m.recipient || 'Tüm Saha Ekibi'}</strong></span>
                      <span class="text-[#2A9D38] font-semibold flex items-center gap-1">
                        ${iconSvg('checkCircle', 'w-3 h-3')} Gönderildi
                      </span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </section>

        </div>
      `;

    default:
      return '';
  }
}

