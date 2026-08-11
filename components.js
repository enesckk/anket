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
    check: `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  };
  return icons[name] || '';
}

// Custom Glassmorphism UI Modals Renderer (Replaces all native browser prompts/alerts)
export function renderCustomModals(state) {
  if (!state.activeModal) return '';

  if (state.activeModal.type === 'add_section') {
    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
          <div class="text-center space-y-1">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              +
            </div>
            <h3 class="text-lg font-bold text-on-surface">Yeni Bölüm Ekle</h3>
            <p class="text-xs text-text-secondary">Ankete eklemek istediğiniz bölüm adını yazınız.</p>
          </div>

          <form id="form-custom-add-section" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1.5">Bölüm Adı *</label>
              <input type="text" id="custom-sec-title" required autofocus placeholder="Örn: Arazi & Üretim Bilgileri" class="w-full h-12 px-4 bg-surface-container-low border border-border rounded-xl text-sm focus:outline-none focus:border-primary font-medium"/>
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

    return `
      <div class="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-150">
          
          <div class="flex justify-between items-start pb-3 border-b border-slate-100 shrink-0">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">⏳ ONAY İNCELEMESİ</span>
                <h3 class="text-base font-extrabold text-[#01214A]">${survey.title}</h3>
              </div>
              <p class="text-xs text-slate-500 mt-1">${survey.description || 'Açıklama belirtilmedi'}</p>
              <span class="text-[10px] text-slate-400 font-semibold mt-1 block">Oluşturan: <strong>${survey.createdBy || 'Saha Personeli'}</strong></span>
            </div>
            <button type="button" id="btn-close-custom-modal" class="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
              ${iconSvg('block', 'w-5 h-5')}
            </button>
          </div>

          <!-- SORU BAZLI İNCELEME LİSTESİ -->
          <div class="flex-1 overflow-y-auto space-y-4 pr-1">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Soru Bazlı Kontrol (${questions.length} Soru)</h4>
            
            ${questions.length === 0 ? `
              <div class="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">Bu ankette henüz soru bulunmuyor.</div>
            ` : questions.map((q, idx) => `
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div class="flex justify-between items-start">
                  <div class="space-y-0.5">
                    <span class="text-[10px] font-bold text-[#00A0DF] uppercase">Soru ${idx + 1} (${formatQuestionType(q.type)})</span>
                    <h5 class="font-bold text-slate-900 text-xs">${q.title}</h5>
                  </div>
                  <div>
                    ${q.reviewStatus === 'APPROVED' ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">${iconSvg('checkCircle', 'w-3 h-3 text-emerald-600')} Soruda Hata Yok</span>` : ''}
                    ${q.reviewStatus === 'REVISION_REQUESTED' ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-100 text-orange-800 inline-flex items-center gap-1">${iconSvg('edit', 'w-3 h-3 text-orange-600')} Revizyon İstendi</span>` : ''}
                    ${q.reviewStatus === 'REJECTED' ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-800 inline-flex items-center gap-1">${iconSvg('block', 'w-3 h-3 text-red-600')} Soru Çıkarılsın</span>` : ''}
                    {(!q.reviewStatus || q.reviewStatus === 'PENDING') ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-200 text-slate-700 inline-flex items-center gap-1">${iconSvg('history', 'w-3 h-3 text-slate-500')} İncelenmedi</span>` : ''}
                  </div>
                </div>

                ${(q.options && q.options.length > 0) ? `
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    ${q.options.map(opt => `<span class="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600 font-medium">${opt.label}</span>`).join('')}
                  </div>
                ` : ''}

                <!-- Soru Bazlı Aksiyon Butonları & Not Girişi -->
                <div class="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                  <input type="text" data-survey-id="${survey.id}" data-q-id="${q.id}" value="${q.reviewNote || ''}" placeholder="Soruya özel revizyon notu giriniz (opsiyonel)..." class="input-q-review-note flex-1 h-8 px-3 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:border-[#2A9D38]"/>
                  
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button type="button" data-survey-id="${survey.id}" data-q-id="${q.id}" data-status="APPROVED" class="btn-set-q-review-status px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-[10px] rounded-lg transition-all inline-flex items-center gap-1">
                      ${iconSvg('checkCircle', 'w-3 h-3')}
                      <span>Onayla</span>
                    </button>
                    <button type="button" data-survey-id="${survey.id}" data-q-id="${q.id}" data-status="REVISION_REQUESTED" class="btn-set-q-review-status px-2.5 py-1 bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 font-bold text-[10px] rounded-lg transition-all inline-flex items-center gap-1">
                      ${iconSvg('edit', 'w-3 h-3')}
                      <span>Revize Et</span>
                    </button>
                    <button type="button" data-survey-id="${survey.id}" data-q-id="${q.id}" data-status="REJECTED" class="btn-set-q-review-status px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold text-[10px] rounded-lg transition-all inline-flex items-center gap-1">
                      ${iconSvg('block', 'w-3 h-3')}
                      <span>Çıkar</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- GENEL AKSİYON BUTONLARI -->
          <div class="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button type="button" data-survey-id="${survey.id}" class="btn-approve-admin-survey flex-1 h-11 bg-[#2A9D38] hover:bg-[#22822e] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5">
              ${iconSvg('checkCircle', 'w-4 h-4')}
              <span>Tümünü Onayla & Yayınla</span>
            </button>

            <button type="button" data-survey-id="${survey.id}" class="btn-submit-survey-revision flex-1 h-11 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5">
              ${iconSvg('edit', 'w-4 h-4')}
              <span>Revizyon Talebini İlet</span>
            </button>

            <button type="button" id="btn-close-custom-modal" class="h-11 px-4 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all">
              Kapat
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

// System Top Bar (Role Switcher & Network Status)
export function renderSystemBar() {
  const state = store.getState();
  return `
    <div class="bg-slate-900 text-white text-xs px-4 py-2 flex flex-wrap justify-between items-center shadow-md border-b border-slate-800 sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5 font-bold tracking-wider uppercase text-indigo-400">
          <span class="w-2 h-2 rounded-full bg-primary"></span>
          <span>Saha Anket Yönetim Sistemi</span>
        </div>
        <span class="text-slate-700">|</span>
        <div class="inline-flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button id="btn-role-pwa" class="px-3 py-1 rounded-md text-xs font-semibold transition-all ${state.currentRole === 'pwa' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}">
            Saha Personeli PWA
          </button>
          <button id="btn-role-admin" class="px-3 py-1 rounded-md text-xs font-semibold transition-all ${state.currentRole === 'admin' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}">
            Yönetici Web Paneli
          </button>
        </div>
      </div>

      <div class="flex items-center gap-3 mt-1 sm:mt-0">
        <button id="btn-toggle-network" class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${state.isOnline ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50' : 'bg-amber-950/60 text-amber-400 border-amber-700/50'}" title="Ağ Durumu">
          <span class="w-2.5 h-2.5 rounded-full ${state.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}"></span>
          ${state.offlineQueueCount > 0 ? `<span class="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">${state.offlineQueueCount} Bekliyor</span>` : ''}
        </button>

        <button id="btn-reset-demo" class="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1">
          <span>Sıfırla</span>
        </button>
      </div>
    </div>
  `;
}

// 1. LOGIN EKRANI
export function renderLoginScreen() {
  return `
    <div class="min-h-[calc(100vh-41px)] bg-background flex flex-col justify-center items-center px-6 py-12">
      <div class="w-full max-w-sm space-y-6">
        <div class="text-center space-y-2">
          <div class="w-14 h-14 bg-primary text-white rounded-2xl mx-auto flex items-center justify-center shadow-md">
            ${iconSvg('clipboard', 'w-8 h-8')}
          </div>
          <h1 class="text-xl font-bold text-on-surface tracking-tight">Saha Anket Sistemi</h1>
          <p class="text-xs text-text-secondary">Güvenli Veri Toplama Platformu</p>
        </div>

        <form id="form-login" class="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <div>
            <label class="block text-xs font-semibold text-on-surface mb-1.5">E-Posta Adresi</label>
            <input type="email" id="login-email" value="ahmet@sahaanket.gov.tr" required placeholder="Örn: ahmet@sahaanket.gov.tr" class="w-full h-12 px-4 bg-surface-container-low border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all"/>
          </div>

          <div>
            <label class="block text-xs font-semibold text-on-surface mb-1.5">Giriş Şifresi</label>
            <input type="password" id="login-password" value="Saha123!" required placeholder="Şifrenizi giriniz" class="w-full h-12 px-4 bg-surface-container-low border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all"/>
          </div>

          <button type="submit" class="w-full h-12 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary-dark transition-all active:scale-[0.98] shadow-sm">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  `;
}

// BOTTOM NAVIGATION
export function renderBottomNav() {
  const state = store.getState();
  const screen = state.pwaScreen;
  const unreadCount = state.messages.filter(m => m.isUnread).length;

  return `
    <nav class="fixed bottom-0 left-0 w-full z-40 bg-surface border-t border-border pb-safe">
      <div class="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        <button id="nav-home" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${['home', 'task_detail', 'survey_success'].includes(screen) ? 'text-primary font-bold' : 'text-text-secondary hover:text-on-surface'} transition-all active:scale-90">
          ${iconSvg('home', 'w-5 h-5')}
          <span class="text-[11px] font-medium">Ana Sayfa</span>
        </button>

        <button id="nav-surveys" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${screen === 'my_surveys' || screen === 'quick_builder' ? 'text-primary font-bold' : 'text-text-secondary hover:text-on-surface'} transition-all active:scale-90">
          ${iconSvg('clipboard', 'w-5 h-5')}
          <span class="text-[11px] font-medium">Anketlerim</span>
        </button>

        <button id="nav-messages" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${screen === 'messages' || screen === 'message_detail' ? 'text-primary font-bold' : 'text-text-secondary hover:text-on-surface'} transition-all active:scale-90 relative">
          <div class="relative">
            ${iconSvg('message', 'w-5 h-5')}
            ${unreadCount > 0 ? `<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>` : ''}
          </div>
          <span class="text-[11px] font-medium">Mesajlar</span>
        </button>

        <button id="nav-profile" class="flex flex-col items-center justify-center flex-1 h-full gap-1 ${screen === 'profile' ? 'text-primary font-bold' : 'text-text-secondary hover:text-on-surface'} transition-all active:scale-90">
          ${iconSvg('user', 'w-5 h-5')}
          <span class="text-[11px] font-medium">Profil</span>
        </button>
      </div>
    </nav>
  `;
}

// 2. SAHA PERSONELİ PWA ANA SAYFA
export function renderPwaHome() {
  const state = store.getState();
  const unreadMsg = state.messages.find(m => m.isUnread) || state.messages[0];
  const mainTask = state.assignedSurveys[0] || {
    id: '77777777-7777-7777-7777-777777777771',
    title: 'Üretici İhtiyaç Anketi',
    village: 'Sinan Köyü',
    completed: 18,
    target: 50,
    priority: 'Yüksek Öncelik'
  };

  const progressPct = Math.round((mainTask.completed / (mainTask.target || 1)) * 100);

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#64B352] text-white flex items-center justify-center font-bold text-base shadow-sm">
              ${state.auth.user?.fullName?.charAt(0) || 'A'}
            </div>
            <div>
              <h1 class="text-lg font-bold text-on-surface leading-tight">Saha Anket Portalı</h1>
              <span class="text-xs text-text-secondary">Saha Personeli Uygulaması</span>
            </div>
          </div>

          <div class="flex items-center gap-1 text-primary">
            ${iconSvg('wifi', 'w-5 h-5')}
          </div>
        </div>

        <section class="space-y-1">
          <h2 class="text-2xl font-bold text-on-surface">Merhaba, ${state.auth.user?.fullName || 'Ahmet'}</h2>
          <p class="text-xs text-text-secondary">${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })}</p>

          <div class="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full mt-2 border border-emerald-200">
            <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Tüm kayıtlar güncel</span>
          </div>
        </section>

        <section class="space-y-3">
          <h3 class="text-lg font-bold text-on-surface">Görevlerim</h3>

          <div class="bg-surface rounded-2xl p-5 border border-border shadow-sm space-y-4 hover:border-primary/40 transition-all">
            <div class="flex justify-between items-start">
              <div>
                <div class="flex items-center gap-1 text-text-secondary text-xs mb-1">
                  ${iconSvg('mapPin', 'w-3.5 h-3.5 text-primary')}
                  <span class="font-medium">${mainTask.village}</span>
                </div>
                <h4 class="font-bold text-on-surface text-base">${mainTask.title}</h4>
              </div>
              <span class="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                ${mainTask.priority}
              </span>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-text-secondary">İlerleme</span>
                <span class="text-on-surface font-bold">%${progressPct}</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-[#64B352] h-full rounded-full transition-all duration-500" style="width: ${progressPct}%"></div>
              </div>
            </div>

            <button data-task-id="${mainTask.id}" class="btn-start-survey-direct w-full bg-[#64B352] text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:bg-[#4e953f]">
              ${iconSvg('play', 'w-4 h-4')}
              Ankete Başla
            </button>
          </div>

          <button id="btn-home-quick-builder" class="w-full bg-transparent border border-slate-300 text-slate-700 hover:bg-surface-container-low font-bold py-3.5 rounded-full flex items-center justify-center gap-2 text-sm transition-all active:scale-95">
            ${iconSvg('plus', 'w-4 h-4')}
            Hızlı Anket Oluştur
          </button>
        </section>

        ${unreadMsg ? `
          <section class="space-y-3 pt-2">
            <h3 class="text-lg font-bold text-on-surface">Son Mesajlar</h3>
            <div id="btn-home-msg-preview" class="bg-surface rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/40 transition-all">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></div>
                <div class="min-w-0">
                  <div class="text-xs font-bold text-on-surface truncate">${unreadMsg.title}</div>
                  <p class="text-[11px] text-text-secondary truncate mt-0.5">${unreadMsg.content}</p>
                </div>
              </div>
              <span class="text-xs font-bold text-primary shrink-0 flex items-center gap-0.5 ml-2">
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
  const task = state.assignedSurveys.find(t => t.id === state.selectedTaskId) || state.assignedSurveys[0];

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between sticky top-10 z-30">
        <button id="btn-back-to-home" class="p-2 -ml-2 text-on-surface hover:bg-surface-container rounded-full flex items-center gap-1 text-xs font-semibold">
          ${iconSvg('arrowLeft', 'w-5 h-5')}
          <span>Geri</span>
        </button>
        <span class="text-xs font-bold text-on-surface">Görev Detayı</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        <div class="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-6">
          <div class="space-y-2">
            <span class="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
              ${task?.priority || 'Yüksek'}
            </span>
            <h1 class="text-xl font-bold text-on-surface leading-tight">${task?.title}</h1>
            <div class="flex items-center gap-1 text-text-secondary text-xs">
              ${iconSvg('mapPin', 'w-4 h-4')}
              <span>${task?.village}</span>
            </div>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1.5">
            <div class="flex items-center gap-2 text-amber-900 font-bold text-xs">
              ${iconSvg('note', 'w-4 h-4 text-amber-700')}
              <span>Yönetici Notu</span>
            </div>
            <p class="text-xs text-amber-800 leading-relaxed font-medium">
              ${task?.note || 'Sinan Köyü üreticileriyle görüşürken gübre ve ekipman ihtiyaçlarını detaylı olarak not alınız.'}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 p-4 bg-surface-container-low rounded-xl text-xs">
            <div>
              <span class="text-text-secondary block mb-0.5">Hedef Anket</span>
              <span class="font-bold text-on-surface text-sm">${task?.target}</span>
            </div>
            <div>
              <span class="text-text-secondary block mb-0.5">Tamamlanan</span>
              <span class="font-bold text-primary text-sm">${task?.completed}</span>
            </div>
            <div>
              <span class="text-text-secondary block mb-0.5">Son Tarih</span>
              <span class="font-bold text-on-surface">${task?.endDate}</span>
            </div>
            <div>
              <span class="text-text-secondary block mb-0.5">Saha Takibi</span>
              <span class="font-bold text-success flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-success"></span> Görüldü
              </span>
            </div>
          </div>

          <button id="btn-detail-start-survey" class="w-full h-12 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm">
            ${iconSvg('plus', 'w-5 h-5')}
            Yeni Anket Başlat
          </button>
        </div>
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// 3. ANKET DOLDURMA SİHİRBAZI
export function renderSurveyRunner() {
  const state = store.getState();
  const task = state.assignedSurveys.find(t => t.id === state.selectedTaskId) || state.assignedSurveys[0];
  const secIndex = state.activeSectionIndex || 0;
  const answers = state.activeFormAnswers;
  const yesNoVal = answers['q4'] || 'yes';
  const tractorVal = answers['q6'] || 'yes';
  const fertVal = answers['q7'] || 'yes';

  const stepTitles = [
    'Kişisel Bilgiler',
    'Arazi & Üretim Bilgileri',
    'Ekipman & İhtiyaçlar',
    'Saha Kanıtı & Konum'
  ];

  return `
    <div class="min-h-screen bg-[#f8f9fa] text-slate-900 flex flex-col pb-28 font-sans">
      <header class="h-14 bg-white border-b border-[#dadce0] px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <button id="btn-cancel-runner" class="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all">
          ${iconSvg('arrowLeft', 'w-5 h-5 text-slate-800')}
        </button>
        <h2 class="text-base font-bold text-slate-900 tracking-tight">${task?.title || 'Üretici İhtiyaç Anketi'}</h2>
        <div class="bg-[#e6f4ea] text-[#137333] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#ceead6]">
          ${iconSvg('cloudCheck', 'w-4 h-4 text-[#137333]')}
          <span>Kaydedildi</span>
        </div>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between items-baseline">
            <h3 class="text-xl font-bold text-[#64B352] tracking-tight">${stepTitles[secIndex] || 'Kişisel Bilgiler'}</h3>
            <span class="text-xs text-slate-500 font-semibold">Adım ${secIndex + 1} / 4</span>
          </div>
          <div class="w-full bg-[#e8eaed] h-1.5 rounded-full overflow-hidden">
            <div class="bg-[#64B352] h-full rounded-full transition-all duration-300" style="width: ${((secIndex + 1) / 4) * 100}%"></div>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-[#dadce0] p-6 shadow-xs space-y-8">
          ${secIndex === 0 ? `
            <div class="space-y-2.5 pb-6 border-b border-[#f1f3f4]">
              <label class="block text-base font-bold text-slate-900">1. Ad Soyad</label>
              <input type="text" data-q-id="q1" value="${answers['q1'] || ''}" placeholder="Adınızı yazın" class="runner-input w-full h-13 px-4 bg-[#f1f3f4] border border-[#dadce0] rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#64B352] focus:bg-white transition-all"/>
            </div>

            <div class="space-y-3 pb-6 border-b border-[#f1f3f4]">
              <label class="block text-base font-bold text-slate-900">2. Araziniz var mı?</label>
              <div class="grid grid-cols-2 gap-4">
                <button type="button" data-q-id="q4" data-val="yes" class="btn-runner-yesno h-36 border-2 ${yesNoVal === 'yes' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-3 font-bold text-base transition-all active:scale-95 shadow-2xs">
                  ${iconSvg('land', `w-8 h-8 ${yesNoVal === 'yes' ? 'text-[#64B352]' : 'text-slate-600'}`)}
                  <span>Evet</span>
                </button>

                <button type="button" data-q-id="q4" data-val="no" class="btn-runner-yesno h-36 border-2 ${yesNoVal === 'no' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-3 font-bold text-base transition-all active:scale-95 shadow-2xs">
                  ${iconSvg('block', `w-8 h-8 ${yesNoVal === 'no' ? 'text-[#64B352]' : 'text-slate-600'}`)}
                  <span>Hayır</span>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-base font-bold text-slate-900">3. Fotoğraf Ekle</label>
              <p class="text-xs text-slate-500 leading-relaxed">Arazi veya üretim alanınızı gösteren bir fotoğraf ekleyebilirsiniz.</p>
              
              <div id="btn-runner-photo" class="border-2 border-dashed ${state.activePhotoUploaded ? 'border-emerald-600 bg-emerald-50/50' : 'border-[#dadce0] hover:border-[#64B352]'} rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50/60 transition-all space-y-2">
                <div class="w-14 h-14 rounded-full ${state.activePhotoUploaded ? 'bg-emerald-100 text-emerald-700' : 'bg-[#f1f3f4] text-slate-700'} mx-auto flex items-center justify-center">
                  ${iconSvg(state.activePhotoUploaded ? 'checkCircle' : 'cameraPlus', `w-7 h-7 ${state.activePhotoUploaded ? 'text-emerald-700' : 'text-slate-700'}`)}
                </div>
                <div class="text-sm font-bold text-[#64B352]">${state.activePhotoUploaded ? 'Fotoğraf Yüklendi (1 Adet)' : 'Kamera ile Çek'}</div>
                <div class="text-xs text-slate-500">${state.activePhotoUploaded ? 'Fotoğrafı değiştirmek için tıklayın' : 'veya galeriden seç'}</div>
              </div>
            </div>
          ` : ''}

          ${secIndex === 1 ? `
            <div class="space-y-2.5 pb-6 border-b border-[#f1f3f4]">
              <label class="block text-base font-bold text-slate-900">4. Kaç Dönüm Araziniz Var?</label>
              <input type="number" inputmode="numeric" data-q-id="q5" value="${answers['q5'] || ''}" placeholder="Örn: 35" class="runner-input w-full h-13 px-4 bg-[#f1f3f4] border border-[#dadce0] rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#64B352] focus:bg-white transition-all"/>
            </div>

            <div class="space-y-3">
              <label class="block text-base font-bold text-slate-900">5. Ana Ürün Türü</label>
              <div class="space-y-2.5">
                ${['Buğday / Arpa', 'Antep Fıstığı', 'Zeytin', 'Mısır / Pamuk'].map(opt => `
                  <label data-q-id="q6" data-opt="${opt}" class="runner-radio-row flex items-center justify-between p-4 border ${answers['q6'] === opt ? 'border-[#64B352] bg-[#f0f7ee]' : 'border-[#dadce0] bg-white'} rounded-xl cursor-pointer transition-all">
                    <span class="text-sm font-medium text-slate-900">${opt}</span>
                    <span class="w-5 h-5 rounded-full border-2 ${answers['q6'] === opt ? 'border-[#64B352] bg-[#64B352]' : 'border-[#dadce0]'} flex items-center justify-center">
                      ${answers['q6'] === opt ? '<span class="w-2 h-2 bg-white rounded-full"></span>' : ''}
                    </span>
                  </label>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${secIndex === 2 ? `
            <div class="space-y-3 pb-6 border-b border-[#f1f3f4]">
              <label class="block text-base font-bold text-slate-900">6. Traktör veya Ekipmanınız Var Mı?</label>
              <div class="grid grid-cols-2 gap-4">
                <button type="button" data-q-id="q6" data-val="yes" class="btn-runner-yesno h-32 border-2 ${tractorVal === 'yes' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-base transition-all">
                  <span>Evet var</span>
                </button>
                <button type="button" data-q-id="q6" data-val="no" class="btn-runner-yesno h-32 border-2 ${tractorVal === 'no' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-base transition-all">
                  <span>Hayır yok</span>
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <label class="block text-base font-bold text-slate-900">7. Gübre & Tohum Desteği İhtiyacınız Var Mı?</label>
              <div class="grid grid-cols-2 gap-4">
                <button type="button" data-q-id="q7" data-val="yes" class="btn-runner-yesno h-32 border-2 ${fertVal === 'yes' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-base transition-all">
                  <span>Evet var</span>
                </button>
                <button type="button" data-q-id="q7" data-val="no" class="btn-runner-yesno h-32 border-2 ${fertVal === 'no' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-base transition-all">
                  <span>İhtiyaç yok</span>
                </button>
              </div>
            </div>
          ` : ''}

          ${secIndex === 3 ? `
            <div class="space-y-3 pb-6 border-b border-[#f1f3f4]">
              <label class="block text-base font-bold text-slate-900">8. GPS Konumu Al</label>
              <button type="button" id="btn-runner-location" class="w-full h-14 border ${state.activeLocationAcquired ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-[#dadce0] bg-[#f1f3f4] text-slate-900'} rounded-xl flex items-center justify-between px-4 text-sm font-bold transition-all">
                <span class="flex items-center gap-2">
                  ${iconSvg('mapPin', 'w-5 h-5 text-[#64B352]')}
                  ${state.activeLocationAcquired ? 'Konum Alındı (Hassasiyet: 8m)' : 'GPS Konumunu Al'}
                </span>
                ${state.activeLocationAcquired ? iconSvg('checkCircle', 'w-5 h-5 text-emerald-700') : ''}
              </button>
            </div>

            <div class="space-y-2">
              <label class="block text-base font-bold text-slate-900">9. Saha Notları</label>
              <textarea data-q-id="q9" rows="3" placeholder="Üretici talepleri veya ek açıklamalar..." class="runner-input w-full p-4 bg-[#f1f3f4] border border-[#dadce0] rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#64B352] focus:bg-white transition-all">${answers['q9'] || ''}</textarea>
            </div>
          ` : ''}
        </div>

        <div class="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-[#dadce0] p-4 z-40">
          <div class="max-w-md mx-auto flex items-center gap-4">
            <button id="btn-runner-prev" class="w-1/2 h-13 border border-[#dadce0] bg-white rounded-full font-bold text-slate-800 text-sm hover:bg-slate-50 active:scale-95 transition-all shadow-2xs">
              Geri
            </button>

            ${secIndex < 3 ? `
              <button id="btn-runner-next" class="w-1/2 h-13 bg-[#64B352] text-white font-bold rounded-full text-sm hover:bg-[#4e953f] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm">
                Devam Et ${iconSvg('arrowRight', 'w-4 h-4')}
              </button>
            ` : `
              <button id="btn-runner-submit" class="w-1/2 h-13 bg-[#64B352] text-white font-bold rounded-full text-sm hover:bg-[#4e953f] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm">
                ${iconSvg('send', 'w-4 h-4')}
                Anketi Tamamla
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
  const isOnline = state.isOnline;

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background flex flex-col items-center justify-center p-6 text-center">
      <div class="w-full max-w-sm bg-surface p-8 rounded-2xl border border-border shadow-sm space-y-6">
        <div class="w-16 h-16 rounded-full ${isOnline ? 'bg-success/10 text-success' : 'bg-amber-500/10 text-amber-700'} mx-auto flex items-center justify-center">
          ${iconSvg('checkCircle', 'w-10 h-10')}
        </div>

        <div class="space-y-2">
          <h1 class="text-xl font-bold text-on-surface">
            ${isOnline ? 'Anket Sunucuya İletildi' : 'Anket Cihazda Güvenle Kaydedildi'}
          </h1>
          <p class="text-xs text-text-secondary leading-relaxed">
            ${isOnline 
              ? 'Anket verileri başarıyla merkeze ulaştırıldı.' 
              : 'İnternet bağlantısı geldiğinde otomatik olarak merkeze gönderilecek.'}
          </p>
        </div>

        <div class="space-y-2.5 pt-2">
          <button id="btn-success-new-survey" class="w-full h-12 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all shadow-sm">
            Yeni Anket Başlat
          </button>
          <button id="btn-success-back-home" class="w-full h-12 bg-surface-container-low border border-border text-on-surface font-semibold rounded-xl text-xs hover:bg-surface-container transition-all">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  `;
}

// ANKETLERİM
export function renderMySurveys() {
  const state = store.getState();
  const currentTab = state.surveysTab || 'assigned';

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between sticky top-10 z-30">
        <h1 class="text-base font-bold text-on-surface">Anketlerim</h1>
        <button id="btn-surveys-quick-builder" class="text-xs font-bold text-primary flex items-center gap-1">
          ${iconSvg('plus', 'w-4 h-4')}
          <span>Hızlı Anket</span>
        </button>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-4">
        <div class="bg-surface-container p-1 rounded-xl flex text-xs font-semibold">
          <button id="tab-assigned" class="flex-1 py-2 rounded-lg transition-all ${currentTab === 'assigned' ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary'}">
            Görev Anketleri
          </button>
          <button id="tab-my-quick" class="flex-1 py-2 rounded-lg transition-all ${currentTab === 'my_quick' ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary'}">
            Benim Anketlerim
          </button>
        </div>

        ${currentTab === 'assigned' ? `
          <div class="space-y-3">
            ${state.assignedSurveys.map(task => `
              <div class="bg-surface p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
                <div>
                  <h3 class="text-xs font-bold text-on-surface">${task.title}</h3>
                  <span class="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
                    ${iconSvg('mapPin', 'w-3 h-3')} ${task.village} • ${task.completed}/${task.target}
                  </span>
                </div>
                <button data-task-id="${task.id}" class="btn-start-survey-direct px-3 py-2 bg-primary text-white font-semibold text-xs rounded-lg active:scale-95">
                  Başlat
                </button>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="space-y-3">
            ${state.myQuickSurveys.map(qs => `
              <div class="bg-surface p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-xs font-bold text-on-surface">${qs.title}</h3>
                    <span class="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md">Benim Anketim</span>
                  </div>
                  <span class="text-[11px] text-text-secondary block mt-1">${qs.responseCount} cevap • ${qs.createdAt}</span>
                </div>
                <button class="px-3 py-2 bg-surface-container-low border border-border text-on-surface font-semibold text-xs rounded-lg hover:bg-surface-container">
                  Ankete Başla →
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

// HIZLI ANKET OLUŞTURUCU
export function renderQuickBuilder() {
  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between sticky top-10 z-30">
        <button id="btn-cancel-builder" class="p-2 -ml-2 text-on-surface hover:bg-surface-container rounded-full flex items-center gap-1 text-xs">
          ${iconSvg('arrowLeft', 'w-5 h-5')}
        </button>
        <h1 class="text-xs font-bold text-on-surface">Hızlı Anket Oluştur</h1>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-4">
        <form id="form-quick-builder" class="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Anket Adı *</label>
            <input type="text" id="qb-title" required placeholder="Örn: Yol Problemleri Tespiti" class="w-full h-11 px-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary"/>
          </div>

          <button type="submit" class="w-full h-12 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm">
            Anketi Oluştur & Başlat
          </button>
        </form>
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// MESAJLAR EKRANI
export function renderMessages() {
  const state = store.getState();

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between sticky top-10 z-30">
        <h1 class="text-base font-bold text-on-surface">Mesajlar</h1>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-3">
        ${state.messages.map(msg => `
          <div data-msg-id="${msg.id}" class="btn-open-msg-detail bg-surface p-4 rounded-xl border border-border shadow-sm flex items-start gap-3 cursor-pointer hover:border-primary/40 transition-all">
            ${msg.isUnread ? `<div class="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1"></div>` : `<div class="w-2.5 h-2.5"></div>`}
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline">
                <h3 class="text-xs font-bold text-on-surface truncate">${msg.title}</h3>
                <span class="text-[10px] text-text-secondary shrink-0 ml-2">${msg.date}</span>
              </div>
              <span class="text-[11px] text-text-secondary block font-medium mt-0.5">${msg.sender}</span>
              <p class="text-xs text-text-secondary line-clamp-2 mt-1">${msg.content}</p>
            </div>
          </div>
        `).join('')}
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// MESAJ DETAYI EKRANI
export function renderMessageDetail() {
  const state = store.getState();
  const msg = state.messages.find(m => m.id === state.selectedMessageId) || state.messages[0];

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between sticky top-10 z-30">
        <button id="btn-back-to-messages" class="p-2 -ml-2 text-on-surface hover:bg-surface-container rounded-full flex items-center gap-1 text-xs font-semibold">
          ${iconSvg('arrowLeft', 'w-5 h-5')}
          <span>Mesajlar</span>
        </button>
        <span class="text-xs font-bold text-on-surface">Mesaj Detayı</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-4">
        <div class="bg-surface rounded-2xl p-6 border border-border shadow-sm space-y-4">
          <div class="border-b border-border pb-3">
            <h1 class="text-base font-bold text-on-surface">${msg?.title}</h1>
            <div class="flex justify-between items-center text-xs text-text-secondary mt-1">
              <span>Gönderen: <strong>${msg?.sender}</strong></span>
              <span>${msg?.date}</span>
            </div>
          </div>

          <p class="text-xs text-on-surface leading-relaxed whitespace-pre-line">
            ${msg?.content}
          </p>

          <div class="pt-2 text-[10px] text-text-muted border-t border-border flex items-center gap-1">
            ${iconSvg('checkCircle', 'w-3.5 h-3.5 text-success')}
            <span>Görüldü Bilgisi İşlendi (${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })})</span>
          </div>
        </div>
      </main>

      ${renderBottomNav()}
    </div>
  `;
}

// PROFİL EKRANI
export function renderProfile() {
  const state = store.getState();
  const user = state.auth.user;

  return `
    <div class="min-h-[calc(100vh-41px)] bg-background text-on-surface flex flex-col pb-24">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between sticky top-10 z-30">
        <h1 class="text-base font-bold text-on-surface">Profil</h1>
      </header>

      <main class="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        <div class="bg-surface rounded-2xl p-6 border border-border shadow-sm text-center space-y-4">
          <div class="w-20 h-20 bg-primary text-white rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow-md">
            ${user?.fullName?.charAt(0) || 'A'}
          </div>

          <div>
            <h2 class="text-lg font-bold text-on-surface">${user?.fullName || 'Ahmet Yılmaz'}</h2>
            <p class="text-xs text-text-secondary">${user?.role || 'Saha Personeli'} • ${user?.phone || '0532 555 43 21'}</p>
          </div>

          <div class="pt-2 border-t border-border">
            <button id="btn-logout" class="w-full h-11 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
              ${iconSvg('logOut', 'w-4 h-4')}
              Çıkış Yap
            </button>
          </div>
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

  const navItems = [
    { id: 'dashboard', label: 'ANA SAYFA', icon: 'dashboard' },
    { id: 'surveys', label: 'ANKETLER', icon: 'poll' },
    { id: 'assignments', label: 'ATAMALAR', icon: 'assignment' },
    { id: 'responses', label: 'CEVAPLAR', icon: 'chatBubble' },
    { id: 'reports', label: 'RAPORLAR', icon: 'assessment' },
    { id: 'personnel', label: 'PERSONELLER', icon: 'group' },
    { id: 'messages', label: 'MESAJLAR', icon: 'mail' }
  ];

  return `
    <div class="flex min-h-[calc(100vh-41px)] bg-[#F4F7F9] relative">
      ${renderCustomModals(state)}

      <aside class="hidden md:flex flex-col w-64 border-r border-slate-100 bg-white z-30 shrink-0 sticky top-10 h-[calc(100vh-41px)] shadow-sm">
        <!-- LOGO YERLEŞİMİ: ŞEHİTKAMİL STRATEJİ GELİŞTİRME MERKEZİ -->
        <div class="p-6 border-b border-slate-100 flex flex-col items-center justify-center text-center space-y-2.5">
          <div class="w-12 h-12 rounded-2xl bg-[#01214A] text-white flex items-center justify-center shadow-md shrink-0 ring-4 ring-[#01214A]/10">
            ${iconSvg('clipboard', 'w-6 h-6 text-[#2A9D38]')}
          </div>
          <div>
            <h1 class="font-extrabold text-[#01214A] text-xs uppercase tracking-wider leading-snug">ŞEHİTKAMİL</h1>
            <p class="text-[9px] text-[#00A0DF] uppercase tracking-widest font-extrabold">STRATEJİ GELİŞTİRME MERKEZİ</p>
          </div>
        </div>

        <nav class="flex-1 p-3 space-y-1.5 overflow-y-auto">
          ${navItems.map(item => `
            <button data-admin-tab="${item.id}" class="btn-admin-tab w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs font-semibold transition-all relative ${activeTab === item.id || (activeTab === 'builder' && item.id === 'surveys') ? 'text-[#01214A] bg-[#2A9D38]/10 font-bold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:bg-[#2A9D38] before:rounded-r-full' : 'text-slate-500 hover:text-[#01214A] hover:bg-slate-50'}">
              ${iconSvg(item.icon, `w-5 h-5 ${activeTab === item.id ? 'text-[#2A9D38]' : 'text-slate-400'}`)}
              <span>${item.label}</span>
            </button>
          `).join('')}
        </nav>

        <div class="p-3 border-t border-slate-100 mt-auto">
          <div class="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-600 bg-slate-50/80 rounded-xl">
            <div class="w-8 h-8 rounded-full bg-[#01214A] text-white flex items-center justify-center font-bold text-xs shrink-0">
              SK
            </div>
            <div class="truncate">
              <div class="text-[#01214A] font-bold text-xs truncate">${state.auth.user?.fullName || 'Saha Koordinatörü'}</div>
              <div class="text-[10px] text-[#00A0DF] font-semibold">Sistem Yöneticisi</div>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex-1 flex flex-col min-w-0">
        <header class="h-16 border-b border-slate-100 bg-white px-6 flex items-center justify-between sticky top-10 z-20 shadow-header">
          <div class="flex items-center gap-3">
            <h2 class="font-extrabold text-[#01214A] text-lg uppercase tracking-tight">${activeTab === 'builder' ? 'ANKET OLUŞTUR' : (navItems.find(i => i.id === activeTab)?.label || 'ANA SAYFA')}</h2>
          </div>
        </header>

        <main class="p-6 max-w-[1400px] w-full mx-auto space-y-6">
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
        <div class="max-w-xl mx-auto bg-surface p-8 rounded-3xl border border-border shadow-sm space-y-6">
          <div class="text-center space-y-1">
            <h3 class="text-xl font-bold text-on-surface">Yeni Anket Tanımla</h3>
            <p class="text-xs text-text-secondary">Anketinizin adını ve açıklamasını giriniz.</p>
          </div>

          <form id="form-builder-step1" class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1.5">Anket Adı *</label>
              <input type="text" id="builder-info-title" required value="${survey.title}" placeholder="Örn: Üretici İhtiyaç Anketi" class="w-full h-12 px-4 bg-surface-container-low border border-border rounded-xl text-sm focus:outline-none focus:border-primary font-medium"/>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1.5">Açıklama</label>
              <textarea id="builder-info-desc" rows="3" placeholder="Köylerde üreticilerin ihtiyaçlarını tespit etmek için hazırlanan saha çalışması..." class="w-full p-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary">${survey.description}</textarea>
            </div>

            <button type="submit" class="w-full h-12 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-sm">
              <span>Devam →</span>
            </button>
          </form>
        </div>
      ` : ''}

      <!-- ADIM 2: SORULAR BUILDER -->
      ${step === 2 ? `
        <div class="space-y-6">
          <div class="bg-surface p-4 rounded-2xl border border-border flex justify-between items-center">
            <div class="flex items-center gap-3">
              <h3 class="font-bold text-on-surface text-base">${survey.title}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Taslak</span>
              <span class="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                ${iconSvg('checkCircle', 'w-4 h-4 text-emerald-600')} Otomatik Kaydedildi
              </span>
            </div>

            <button id="btn-builder-goto-step3" class="px-5 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm">
              <span>Önizlemeye Geç →</span>
            </button>
          </div>

          <!-- ANKET BÖLÜMLERİ BARİ VE YENİ BÖLÜM EKLE BUTTONU -->
          <div class="bg-surface p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-bold text-text-secondary uppercase tracking-wider">Bölümler (${(survey.sections || []).length}):</span>
              ${(survey.sections || []).map(sec => `
                <span class="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  ${iconSvg('poll', 'w-3.5 h-3.5')}
                  <span>${sec.title}</span>
                </span>
              `).join('')}
            </div>

            <button id="btn-open-add-section-modal" type="button" class="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap">
              ${iconSvg('plus', 'w-4 h-4')}
              <span>Yeni Bölüm Ekle</span>
            </button>
          </div>

          <!-- SORU TÜRÜ SEÇİM KARTLARI PANELİ -->
          <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3">
            <span class="block text-xs font-bold text-on-surface uppercase tracking-wider">Soru Türü Seçin</span>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              <button data-type="text" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                <span class="font-bold text-sm text-primary">Aa</span>
                <span class="text-[11px] font-semibold text-slate-700">Metin</span>
              </button>

              <button data-type="number" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                <span class="font-bold text-sm text-primary">123</span>
                <span class="text-[11px] font-semibold text-slate-700">Sayı</span>
              </button>

              <button data-type="yesno" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                <span class="font-bold text-xs text-primary flex items-center gap-0.5">${iconSvg('check', 'w-3.5 h-3.5')}/${iconSvg('block', 'w-3.5 h-3.5')}</span>
                <span class="text-[11px] font-semibold text-slate-700">Evet/Hayır</span>
              </button>

              <button data-type="single" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                <span class="font-bold text-sm text-primary">○</span>
                <span class="text-[11px] font-semibold text-slate-700">Tek Seçim</span>
              </button>

              <button data-type="multi" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                <span class="font-bold text-sm text-primary">${iconSvg('checkCircle', 'w-4 h-4')}</span>
                <span class="text-[11px] font-semibold text-slate-700">Çoklu Seçim</span>
              </button>

              <button data-type="date" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                ${iconSvg('calendar', 'w-5 h-5 text-primary')}
                <span class="text-[11px] font-semibold text-slate-700">Tarih</span>
              </button>

              <button data-type="photo" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                ${iconSvg('camera', 'w-5 h-5 text-primary')}
                <span class="text-[11px] font-semibold text-slate-700">Fotoğraf</span>
              </button>

              <button data-type="gps" class="btn-add-question-type p-3 bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-border rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all">
                ${iconSvg('mapPin', 'w-5 h-5 text-primary')}
                <span class="text-[11px] font-semibold text-slate-700">GPS Konum</span>
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
              <div data-q-id="${q.id}" class="builder-question-card bg-surface rounded-2xl border ${q.expanded ? 'border-primary shadow-md ring-1 ring-primary/20' : 'border-border shadow-xs hover:border-slate-300'} transition-all overflow-hidden">
                
                <!-- QUESTION HEADER (COMPACT MODE) -->
                <div data-q-id="${q.id}" class="btn-toggle-question p-4 flex items-center justify-between cursor-pointer select-none bg-surface">
                  <div class="flex items-center gap-3">
                    <span class="text-slate-400 cursor-grab hover:text-slate-600">${iconSvg('grip', 'w-4 h-4')}</span>
                    <span class="font-mono text-xs font-bold text-primary w-6">${String(idx + 1).padStart(2, '0')}</span>
                    <span class="font-bold text-on-surface text-sm">${q.title}</span>
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="text-[11px] text-text-secondary font-bold px-2 py-0.5 rounded bg-slate-100">${formatQuestionType(q.type)}</span>
                    ${q.isRequired ? `<span class="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Zorunlu</span>` : ''}
                    ${q.condition ? `<span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Koşullu</span>` : ''}
                    <span class="text-slate-400">${iconSvg(q.expanded ? 'moveUp' : 'moveDown', 'w-4 h-4')}</span>
                  </div>
                </div>

                <!-- EXPANDED EDIT BODY -->
                ${q.expanded ? `
                  <div class="p-5 border-t border-border bg-slate-50/50 space-y-5">
                    <div class="space-y-1">
                      <label class="block text-xs font-bold text-on-surface">Soru Başlığı *</label>
                      <input type="text" data-q-id="${q.id}" value="${q.title}" class="input-builder-q-title w-full h-11 px-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary font-medium"/>
                    </div>

                    <!-- REAL-TIME EDITABLE OPTIONS BUILDER (NO PROMPT MODAL) -->
                    ${(q.type === 'single' || q.type === 'multi') ? `
                      <div class="space-y-2">
                        <label class="block text-xs font-bold text-on-surface">Seçenekler</label>
                        <div class="space-y-2">
                          ${q.options.map(opt => `
                            <div class="flex items-center gap-2">
                              <input type="text" data-q-id="${q.id}" data-opt-id="${opt.id}" value="${opt.label}" placeholder="Seçenek adını yazın..." class="input-option-edit flex-1 h-10 px-3 bg-white border border-border rounded-lg text-xs font-medium focus:outline-none focus:border-primary"/>
                              <button data-q-id="${q.id}" data-opt-id="${opt.id}" class="btn-remove-option text-slate-400 hover:text-red-600 p-2 transition-colors">
                                ${iconSvg('trash', 'w-4 h-4')}
                              </button>
                            </div>
                          `).join('')}
                        </div>
                        <button data-q-id="${q.id}" class="btn-add-option-direct text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-1">
                          ${iconSvg('plus', 'w-3.5 h-3.5')}
                          Seçenek Ekle
                        </button>
                      </div>
                    ` : ''}

                    <div class="flex items-center justify-between pt-2 border-t border-border/60">
                      <span class="text-xs font-bold text-on-surface">Zorunlu Soru</span>
                      <button data-q-id="${q.id}" class="btn-toggle-required relative w-11 h-6 rounded-full transition-colors ${q.isRequired ? 'bg-primary' : 'bg-slate-300'}">
                        <span class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${q.isRequired ? 'translate-x-5' : ''}"></span>
                      </button>
                    </div>

                    <div class="space-y-2 pt-2 border-t border-border/60">
                      <span class="block text-xs font-bold text-on-surface">Koşul Ayarları</span>
                      
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <select data-q-id="${q.id}" class="select-condition-source h-10 px-3 bg-white border border-border rounded-lg text-xs font-medium">
                          <option value="">-- Koşul Yok --</option>
                          ${survey.questions.filter(x => x.id !== q.id).map(x => `<option value="${x.id}" ${q.condition?.sourceQuestionId === x.id ? 'selected' : ''}>${x.title}</option>`).join('')}
                        </select>

                        <select data-q-id="${q.id}" class="select-condition-op h-10 px-3 bg-white border border-border rounded-lg text-xs font-medium">
                          <option value="equals" ${q.condition?.operator === 'equals' ? 'selected' : ''}>Eşittir (==)</option>
                        </select>

                        <input type="text" data-q-id="${q.id}" value="${q.condition?.value || 'yes'}" placeholder="Değer (örn: yes)" class="input-condition-val h-10 px-3 bg-white border border-border rounded-lg text-xs font-medium"/>
                      </div>

                      ${q.condition ? `
                        <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-medium leading-relaxed flex items-center gap-2">
                          ${iconSvg('note', 'w-4 h-4 text-indigo-600 shrink-0')}
                          <span><strong>İnsan Dili Önizleme:</strong> Bu soru yalnızca '<strong>${survey.questions.find(x => x.id === q.condition.sourceQuestionId)?.title || 'Önceki Soru'}</strong>' = '<strong>${q.condition.value}</strong>' olduğunda gösterilecek.</span>
                        </div>
                      ` : ''}
                    </div>

                    <div class="flex justify-between items-center pt-3 border-t border-border/60">
                      <div class="flex items-center gap-1">
                        <button data-q-id="${q.id}" class="btn-move-q-up p-1.5 text-slate-500 hover:text-primary rounded hover:bg-slate-100">
                          ${iconSvg('moveUp', 'w-4 h-4')}
                        </button>
                        <button data-q-id="${q.id}" class="btn-move-q-down p-1.5 text-slate-500 hover:text-primary rounded hover:bg-slate-100">
                          ${iconSvg('moveDown', 'w-4 h-4')}
                        </button>
                      </div>

                      <div class="flex items-center gap-3">
                        <button data-q-id="${q.id}" class="btn-duplicate-question text-xs font-semibold text-slate-700 hover:text-primary flex items-center gap-1">
                          ${iconSvg('copy', 'w-4 h-4')}
                          Kopyala
                        </button>
                        <button data-q-id="${q.id}" class="btn-open-delete-modal text-xs font-semibold text-red-600 hover:underline flex items-center gap-1">
                          ${iconSvg('trash', 'w-4 h-4')}
                          Sil
                        </button>
                      </div>
                    </div>

                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
            <button id="btn-open-add-section-modal" class="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5">
              ${iconSvg('plus', 'w-4 h-4')}
              Bölüm Ekle
            </button>

            <button id="btn-builder-step2-next" class="px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center gap-2 shadow-sm">
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
              <span>Anketi Yayınlamaya Geç →</span>
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
                              <button type="button" data-q-id="${q.id}" data-val="yes" class="btn-preview-yesno h-24 border-2 ${currentAnswer === 'yes' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all active:scale-95 shadow-2xs">
                                ${iconSvg('land', `w-6 h-6 ${currentAnswer === 'yes' ? 'text-[#64B352]' : 'text-slate-600'}`)}
                                <span>Evet</span>
                              </button>

                              <button type="button" data-q-id="${q.id}" data-val="no" class="btn-preview-yesno h-24 border-2 ${currentAnswer === 'no' ? 'border-[#64B352] bg-[#f0f7ee] text-[#64B352]' : 'border-[#dadce0] bg-white text-slate-700'} rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all active:scale-95 shadow-2xs">
                                ${iconSvg('block', `w-6 h-6 ${currentAnswer === 'no' ? 'text-[#64B352]' : 'text-slate-600'}`)}
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
            <button id="btn-builder-goto-assign" class="flex-1 h-12 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-sm">
              ${iconSvg('assignment', 'w-4 h-4')}
              Saha Personeline Ata
            </button>

            <button id="btn-builder-goto-surveys" class="flex-1 h-12 bg-surface-container-low border border-border text-on-surface font-bold rounded-xl text-xs hover:bg-surface-container transition-all">
              Anketlere Dön
            </button>
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
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h2 class="text-2xl font-extrabold text-[#01214A] tracking-tight">Genel Bakış</h2>
            </div>
            <p class="text-xs text-slate-500 font-medium">Anlık saha hareketleri ve operasyonel veriler özet paneli.</p>
          </div>

          <button id="btn-admin-create-survey-dashboard" class="h-11 px-5 bg-[#2A9D38] hover:bg-[#22822e] text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            ${iconSvg('plus', 'w-4 h-4 text-white')}
            <span>Yeni Anket Oluştur</span>
          </button>
        </div>

        <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="bg-white p-5 rounded-2xl shadow-card hover-lift flex flex-col justify-between h-36 border-none">
            <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">TOPLAM TAMAMLANAN</span>
            <div class="text-3xl font-extrabold text-[#01214A] tracking-tight mt-auto">${state.adminKpis.totalCompleted || '12.480'}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-card hover-lift flex flex-col justify-between h-36 border-none">
            <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">BUGÜN TAMAMLANAN</span>
            <div class="text-3xl font-extrabold text-[#01214A] tracking-tight mt-auto">${state.adminKpis.todayCompleted || '142'}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-card hover-lift flex flex-col justify-between h-36 border-none ring-2 ring-[#2A9D38]/20 bg-[#2A9D38]/5">
            <span class="text-[10px] text-[#2A9D38] uppercase font-bold tracking-wider mb-1">AKTİF ANKET</span>
            <div class="text-3xl font-extrabold text-[#2A9D38] tracking-tight mt-auto">${state.adminKpis.activeSurveysCount || '8'}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-card hover-lift flex flex-col justify-between h-36 border-none">
            <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">AKTİF ATAMA</span>
            <div class="text-3xl font-extrabold text-[#01214A] tracking-tight mt-auto">${state.adminKpis.activeAssignmentsCount || '24'}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-card hover-lift flex flex-col justify-between h-36 border-none">
            <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">SAHADA PERSONEL</span>
            <div class="text-3xl font-extrabold text-[#01214A] tracking-tight mt-auto">${state.adminKpis.fieldStaffCount || '12'}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-card hover-lift flex flex-col justify-between h-36 border-none bg-amber-50/40">
            <span class="text-[10px] text-amber-800 uppercase font-bold tracking-wider mb-1">OFFLINE KAYITLAR</span>
            <div class="text-3xl font-extrabold text-amber-700 tracking-tight mt-auto">${state.offlineQueueCount || '3'}</div>
          </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section class="lg:col-span-2 bg-white rounded-2xl shadow-card overflow-hidden flex flex-col border-none">
            <div class="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 class="font-extrabold text-[#01214A] text-base">Aktif Anketler</h3>
              <span class="text-xs font-bold text-[#00A0DF] hover:underline cursor-pointer">Tümünü Gör</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-100/70 border-b border-slate-100 text-[#01214A] uppercase font-extrabold text-[10px] tracking-wider">
                    <th class="p-4">Anket Adı</th>
                    <th class="p-4">Köy / Bölge</th>
                    <th class="p-4">İlerleme</th>
                    <th class="p-4 text-right">Son Tarih</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100/80">
                  <tr class="hover:bg-slate-50/60 transition-all">
                    <td class="p-4 font-bold text-[#01214A]">Tarımsal İhtiyaç Analizi</td>
                    <td class="p-4 text-slate-500 font-medium">Sinan Köyü</td>
                    <td class="p-4">
                      <div class="space-y-1">
                        <div class="flex justify-between text-[11px] font-bold">
                          <span class="text-slate-500">320 / 500</span>
                          <span class="text-[#00A0DF]">%64</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div class="bg-[#00A0DF] h-full rounded-full transition-all duration-300" style="width: 64%"></div>
                        </div>
                      </div>
                    </td>
                    <td class="p-4 text-right text-slate-500 font-semibold">30.11.2026</td>
                  </tr>

                  <tr class="hover:bg-slate-50/60 transition-all">
                    <td class="p-4 font-bold text-[#01214A]">Altyapı Durum Tespiti</td>
                    <td class="p-4 text-slate-500 font-medium">Merkez Mahalle</td>
                    <td class="p-4">
                      <div class="space-y-1">
                        <div class="flex justify-between text-[11px] font-bold">
                          <span class="text-slate-500">150 / 200</span>
                          <span class="text-[#2A9D38]">%75</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div class="bg-[#2A9D38] h-full rounded-full transition-all duration-300" style="width: 75%"></div>
                        </div>
                      </div>
                    </td>
                    <td class="p-4 text-right text-slate-500 font-semibold">15.11.2026</td>
                  </tr>

                  <tr class="hover:bg-slate-50/60 transition-all">
                    <td class="p-4 font-bold text-[#01214A]">Eğitim Memnuniyet Anketi</td>
                    <td class="p-4 text-slate-500 font-medium">Yeşilyurt</td>
                    <td class="p-4">
                      <div class="space-y-1">
                        <div class="flex justify-between text-[11px] font-bold">
                          <span class="text-slate-500">45 / 300</span>
                          <span class="text-amber-600">%15</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div class="bg-amber-500 h-full rounded-full transition-all duration-300" style="width: 15%"></div>
                        </div>
                      </div>
                    </td>
                    <td class="p-4 text-right text-slate-500 font-semibold">10.12.2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- SON SAHA HAREKETLERİ: DAİRESEL AVATARLAR (AHMET YILMAZ -> AY, MEHMET DEMİR -> MD, AYŞE KAYA -> AK) -->
          <section class="bg-white rounded-2xl p-5 shadow-card space-y-4 border-none">
            <div class="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 class="font-extrabold text-[#01214A] text-base">Son Saha Hareketleri</h3>
              <span class="text-[11px] text-[#00A0DF] font-bold bg-[#00A0DF]/10 px-2.5 py-0.5 rounded-full">Canlı Akış</span>
            </div>

            <div class="space-y-5 relative pl-4 border-l-2 border-slate-100">
              <div class="relative pl-5">
                <div class="absolute -left-[29px] top-0 w-8 h-8 rounded-full bg-[#01214A] text-white font-extrabold text-[11px] flex items-center justify-center ring-4 ring-white shadow-xs">AY</div>
                <div class="flex justify-between items-baseline">
                  <span class="font-bold text-xs text-[#01214A]">Ahmet Yılmaz</span>
                  <span class="text-[10px] text-slate-400 font-semibold">19:42</span>
                </div>
                <p class="text-xs text-slate-600 mt-0.5">Sinan Köyü için 'Tarımsal İhtiyaç Analizi' yanıtını tamamladı.</p>
              </div>

              <div class="relative pl-5">
                <div class="absolute -left-[29px] top-0 w-8 h-8 rounded-full bg-[#2A9D38] text-white font-extrabold text-[11px] flex items-center justify-center ring-4 ring-white shadow-xs">MD</div>
                <div class="flex justify-between items-baseline">
                  <span class="font-bold text-xs text-[#01214A]">Mehmet Demir</span>
                  <span class="text-[10px] text-slate-400 font-semibold">19:15</span>
                </div>
                <p class="text-xs text-slate-600 mt-0.5">Merkez Mahalle konumunda 1 yeni fotoğraf yükledi.</p>
              </div>

              <div class="relative pl-5">
                <div class="absolute -left-[29px] top-0 w-8 h-8 rounded-full bg-[#00A0DF] text-white font-extrabold text-[11px] flex items-center justify-center ring-4 ring-white shadow-xs">AK</div>
                <div class="flex justify-between items-baseline">
                  <span class="font-bold text-xs text-[#01214A]">Ayşe Kaya</span>
                  <span class="text-[10px] text-slate-400 font-semibold">18:50</span>
                </div>
                <p class="text-xs text-slate-600 mt-0.5">Atanan 'Altyapı Durum Tespiti' görevini görüntüledi.</p>
              </div>
            </div>
          </section>
        </div>
      `;

    case 'surveys':
      const filteredSurveys = store.getFilteredSurveys();
      return `
        <div class="bg-surface p-4 rounded-2xl border border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <div class="flex items-center gap-3 w-full md:w-auto">
            <h3 class="font-bold text-on-surface text-base whitespace-nowrap">Sistemdeki Anketler (${filteredSurveys.length})</h3>
            <div class="relative flex-1 md:w-72">
              <input type="text" id="input-search-surveys" value="${state.searchSurveysQuery || ''}" placeholder="Anket adı ile canlı ara..." class="w-full h-10 pl-9 pr-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
              <span class="absolute left-3 top-2.5 text-text-muted">${iconSvg('search', 'w-4 h-4 text-text-muted')}</span>
            </div>
          </div>

          <button id="btn-admin-create-survey-modal" class="px-4 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm w-full md:w-auto justify-center">
            ${iconSvg('plus', 'w-4 h-4')}
            Anket Oluştur
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${filteredSurveys.length === 0 ? `
            <div class="col-span-2 p-8 text-center bg-surface rounded-2xl border border-dashed border-border text-text-secondary text-xs font-medium">
              Aramanıza uygun anket bulunamadı.
            </div>
          ` : filteredSurveys.map(s => `
            <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-on-surface text-base">${s.title}</h4>
                  <p class="text-xs text-text-secondary mt-1">${s.description || 'Açıklama belirtilmedi.'}</p>
                  <span class="text-[10px] text-slate-500 font-medium mt-1.5 block">Oluşturan: <strong>${s.createdBy || 'Yönetici'}</strong></span>
                </div>
                <div>
                  ${s.status === 'ACTIVE' ? `<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">${iconSvg('checkCircle', 'w-3 h-3 text-emerald-600')} AKTİF</span>` : ''}
                  ${s.status === 'PENDING_APPROVAL' ? `<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse inline-flex items-center gap-1">${iconSvg('clock', 'w-3 h-3 text-amber-700')} ONAY BEKLİYOR</span>` : ''}
                  ${s.status === 'REVISION_REQUESTED' ? `<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-900 border border-orange-300 animate-pulse inline-flex items-center gap-1">${iconSvg('edit', 'w-3 h-3 text-orange-700')} REVİZYON İSTENDİ</span>` : ''}
                  ${s.status === 'DRAFT' ? `<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">${iconSvg('edit', 'w-3 h-3 text-slate-600')} TASLAK</span>` : ''}
                  ${s.status === 'REJECTED' ? `<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 inline-flex items-center gap-1">${iconSvg('block', 'w-3 h-3 text-red-600')} REDDEDİLDİ</span>` : ''}
                </div>
              </div>

              <div class="p-3 bg-[#01214A]/5 border border-[#01214A]/10 rounded-xl space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-[#01214A]">
                  <span>Yönetici Kontrolü & Soru İnceleme</span>
                  <span class="text-[10px] text-slate-500">${s.createdBy || 'Saha Görevlisi'}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button data-survey-id="${s.id}" class="btn-open-review-survey-modal flex-1 h-9 bg-[#01214A] hover:bg-[#0a2f5c] text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5">
                    ${iconSvg('search', 'w-4 h-4 text-[#00A0DF]')}
                    <span>Soruları İncele & Onayla/Revize Et</span>
                  </button>

                  ${s.status === 'PENDING_APPROVAL' || s.status === 'REVISION_REQUESTED' ? `
                    <button data-survey-id="${s.id}" class="btn-approve-admin-survey px-3 h-9 bg-[#2A9D38] hover:bg-[#22822e] text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center gap-1">
                      ${iconSvg('checkCircle', 'w-4 h-4')}
                      <span>Hızlı Onayla</span>
                    </button>
                  ` : ''}
                </div>
              </div>

              <div class="flex items-center gap-3 pt-3 border-t border-border">
                <button data-survey-id="${s.id}" class="btn-admin-clone-survey px-3 py-1.5 bg-surface-container-low border border-border text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-container">
                  Klonla / Kopyala
                </button>
                <button data-survey-id="${s.id}" class="btn-admin-survey-excel px-3 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800">
                  Excel Rapor
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

    case 'assignments':
      return `
        <div class="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-bold text-on-surface text-lg">Yeni Görev Ataması Yap (Not ve Personel Seçimli)</h3>
              <p class="text-xs text-text-secondary mt-0.5">Saha personellerine hedef bölge, anket ve yönetici talimatı atayın.</p>
            </div>
          </div>

          <form id="form-admin-create-assignment" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Atanacak Anket *</label>
              <select id="assign-survey-id" required class="w-full h-11 px-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary">
                ${state.allSurveys.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Hedef Köy / Bölge *</label>
              <input type="text" id="assign-village-name" required value="Sinan Köyü" class="w-full h-11 px-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary"/>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Hedef Anket Sayısı *</label>
              <input type="number" id="assign-target-count" required value="50" class="w-full h-11 px-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary"/>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Son Tarih *</label>
              <input type="date" id="assign-end-date" required value="${new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}" class="w-full h-11 px-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary"/>
            </div>

            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-on-surface mb-1">Yönetici Özel Notu (Admin Notu) *</label>
              <textarea id="assign-note" required rows="2" placeholder="Örn: Sinan Köyü üreticileriyle görüşürken gübre ve ekipman ihtiyaçlarını özellikle not alınız." class="w-full p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900 focus:outline-none focus:border-amber-500 font-medium">Sinan Köyü üreticileriyle görüşürken gübre ve ekipman ihtiyaçlarını detaylı olarak not alınız.</textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-on-surface mb-1.5">Görev Atanacak Saha Personelleri</label>
              <div class="flex flex-wrap gap-3 p-3 bg-surface-container-low border border-border rounded-xl text-xs">
                ${state.allPersonnel.map(p => `
                  <label class="flex items-center gap-2 font-medium cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-border hover:border-primary transition-all">
                    <input type="checkbox" name="assign-personnel" value="${p.id}" checked class="rounded text-primary focus:ring-primary w-4 h-4"/>
                    <span class="font-bold text-on-surface">${p.fullName}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="md:col-span-2 pt-2">
              <button type="submit" class="h-11 px-6 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-sm">
                ${iconSvg('send', 'w-4 h-4')}
                Görev Atamasını Kaydet & Saha Ekibine Bildir
              </button>
            </div>
          </form>
        </div>

        <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 class="font-bold text-on-surface text-base">Aktif Görev Atamaları Listesi (${state.allAssignments.length})</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-surface-container border-b border-border text-text-secondary uppercase font-bold text-[10px]">
                  <th class="p-3">Anket Adı</th>
                  <th class="p-3">Hedef Köy / Bölge</th>
                  <th class="p-3">Yönetici Notu</th>
                  <th class="p-3">Hedef / Tamamlanan</th>
                  <th class="p-3 text-right">Saha Görüldü</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                ${state.allAssignments.map(a => `
                  <tr>
                    <td class="p-3 font-bold text-on-surface">${a.surveyTitle}</td>
                    <td class="p-3 text-text-secondary">${a.villageName}</td>
                    <td class="p-3 text-amber-800 font-medium max-w-xs truncate">${a.note || 'Özel not eklenmedi.'}</td>
                    <td class="p-3 font-bold text-primary">${a.completedCount} / ${a.targetCount}</td>
                    <td class="p-3 text-right">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${a.viewedAt ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
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
        <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h3 class="font-bold text-on-surface text-base">Gelen Cevaplar ve İptal/Geçersiz İşlemleri (${filteredSubmissions.length})</h3>
              <p class="text-xs text-text-secondary mt-0.5">Saha verilerini arayın, inceleyin veya geçerlilik durumunu değiştirin.</p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <!-- Search Bar -->
              <div class="relative flex-1 md:w-64">
                <input type="text" id="input-search-submissions" value="${state.searchSubmissionsQuery || ''}" placeholder="Personel, anket veya köy ara..." class="w-full h-10 pl-9 pr-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
                <span class="absolute left-3 top-2.5 text-text-muted">${iconSvg('search', 'w-4 h-4 text-text-muted')}</span>
              </div>

              <!-- Filter Pills -->
              <div class="flex items-center gap-1 bg-surface-container-low p-1 border border-border rounded-xl text-[11px] font-bold">
                <button type="button" data-filter="ALL" class="btn-filter-status-sub px-3 py-1.5 rounded-lg transition-all ${statusFilterSub === 'ALL' ? 'bg-primary text-white shadow-xs' : 'text-text-secondary hover:text-on-surface'}">Tümü</button>
                <button type="button" data-filter="VALID" class="btn-filter-status-sub px-3 py-1.5 rounded-lg transition-all ${statusFilterSub === 'VALID' ? 'bg-emerald-600 text-white shadow-xs' : 'text-text-secondary hover:text-on-surface'}">Geçerli</button>
                <button type="button" data-filter="INVALID" class="btn-filter-status-sub px-3 py-1.5 rounded-lg transition-all ${statusFilterSub === 'INVALID' ? 'bg-red-600 text-white shadow-xs' : 'text-text-secondary hover:text-on-surface'}">Geçersiz</button>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-surface-container border-b border-border text-text-secondary uppercase font-bold text-[10px]">
                  <th class="p-3">Kayıt ID</th>
                  <th class="p-3">Saha Kullanıcısı</th>
                  <th class="p-3">Tarih</th>
                  <th class="p-3">GPS Konum</th>
                  <th class="p-3">Geçersizlik Durumu</th>
                  <th class="p-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                ${filteredSubmissions.length === 0 ? `
                  <tr>
                    <td colspan="6" class="p-8 text-center text-text-secondary text-xs font-medium">
                      Aramanıza veya seçilen filtreye uygun kayıt bulunamadı.
                    </td>
                  </tr>
                ` : filteredSubmissions.map(sub => `
                  <tr>
                    <td class="p-3 font-mono text-[11px] text-text-muted">${sub.clientSubmissionId || sub.id}</td>
                    <td class="p-3 font-bold text-on-surface">${sub.fieldUserName || 'Ahmet Yılmaz'}</td>
                    <td class="p-3 text-text-secondary">${new Date(sub.submittedAt || Date.now()).toLocaleTimeString('tr-TR')}</td>
                    <td class="p-3 text-text-secondary">${sub.latitude ? `${sub.latitude.toFixed(2)}, ${sub.longitude?.toFixed(2)}` : 'Çevrimdışı'}</td>
                    <td class="p-3">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sub.isInvalid ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}">
                        ${sub.isInvalid ? 'Geçersiz İşaretlendi' : 'Geçerli Yanıt'}
                      </span>
                    </td>
                    <td class="p-3 text-right">
                      <button data-sub-id="${sub.id}" class="btn-toggle-invalid-sub px-3 py-1 bg-surface-container-low border border-border text-xs font-semibold rounded-lg hover:bg-surface-container">
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
      return `
        <div class="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div>
            <h3 class="font-bold text-on-surface text-lg">Otomatik Rapor Üretim Merkezi</h3>
            <p class="text-xs text-text-secondary mt-1">Gelişmiş Excel ve PDF rapor motoru ile anlık belgeler indirin.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl space-y-3">
              <h4 class="font-bold text-emerald-900 text-base">Excel (.xlsx) Canlı Veri Seti</h4>
              <p class="text-xs text-emerald-700 leading-relaxed">Tüm soruları, saha koordinatlarını ve tarihleri kolonlar halinde içeren Excel belgesi üretir.</p>
              <button id="btn-reports-tab-excel" class="px-5 py-2.5 bg-emerald-700 text-white font-bold rounded-xl text-xs hover:bg-emerald-800 transition-all flex items-center gap-2">
                ${iconSvg('download', 'w-4 h-4')}
                Excel Belgesi İndir
              </button>
            </div>

            <div class="p-5 border border-red-200 bg-red-50/50 rounded-2xl space-y-3">
              <h4 class="font-bold text-red-900 text-base">PDF Kurumsal Analiz Raporu</h4>
              <p class="text-xs text-red-700 leading-relaxed">A4 formatında KPI istatistikleri ve yüzde dağılım tabloları içeren PDF raporu üretir.</p>
              <button id="btn-reports-tab-pdf" class="px-5 py-2.5 bg-red-700 text-white font-bold rounded-xl text-xs hover:bg-red-800 transition-all flex items-center gap-2">
                ${iconSvg('fileText', 'w-4 h-4')}
                PDF Belgesi İndir
              </button>
            </div>
          </div>
        </div>
      `;

    case 'personnel':
      const filteredPersonnel = store.getFilteredPersonnel();
      const roleFilterP = state.roleFilterPersonnel || 'ALL';

      return `
        <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h3 class="font-bold text-on-surface text-base">Saha Ekibi ve Personeller (${filteredPersonnel.length})</h3>
              <p class="text-xs text-text-secondary mt-0.5">Saha görevlileri ve yöneticileri ekleyin, e-posta, şifre ve hesap durumlarını yönetin.</p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <!-- Search Input -->
              <div class="relative flex-1 md:w-60">
                <input type="text" id="input-search-personnel" value="${state.searchPersonnelQuery || ''}" placeholder="Personel adı, e-posta..." class="w-full h-10 pl-9 pr-3 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
                <span class="absolute left-3 top-2.5 text-text-muted">${iconSvg('search', 'w-4 h-4 text-text-muted')}</span>
              </div>

              <!-- Role Filter -->
              <div class="flex items-center gap-1 bg-surface-container-low p-1 border border-border rounded-xl text-[11px] font-bold">
                <button type="button" data-filter="ALL" class="btn-filter-role-personnel px-3 py-1.5 rounded-lg transition-all ${roleFilterP === 'ALL' ? 'bg-primary text-white shadow-xs' : 'text-text-secondary hover:text-on-surface'}">Tümü</button>
                <button type="button" data-filter="FIELD" class="btn-filter-role-personnel px-3 py-1.5 rounded-lg transition-all ${roleFilterP === 'FIELD' ? 'bg-emerald-600 text-white shadow-xs' : 'text-text-secondary hover:text-on-surface'}">Saha</button>
                <button type="button" data-filter="ADMIN" class="btn-filter-role-personnel px-3 py-1.5 rounded-lg transition-all ${roleFilterP === 'ADMIN' ? 'bg-indigo-600 text-white shadow-xs' : 'text-text-secondary hover:text-on-surface'}">Admin</button>
              </div>

              <button id="btn-open-add-personnel-modal" class="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                ${iconSvg('plus', 'w-4 h-4')}
                Yeni Personel Ekle
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-surface-container border-b border-border text-text-secondary uppercase font-bold text-[10px]">
                  <th class="p-3">Ad Soyad</th>
                  <th class="p-3">E-Posta (Giriş Adresi)</th>
                  <th class="p-3">Telefon</th>
                  <th class="p-3">Rol</th>
                  <th class="p-3">Hesap Durumu</th>
                  <th class="p-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                ${filteredPersonnel.length === 0 ? `
                  <tr>
                    <td colspan="6" class="p-8 text-center text-text-secondary text-xs font-medium">
                      Aramanıza uygun personel bulunamadı.
                    </td>
                  </tr>
                ` : filteredPersonnel.map(p => `
                  <tr>
                    <td class="p-3 font-bold text-on-surface">${p.fullName}</td>
                    <td class="p-3 text-text-secondary font-medium">${p.email || 'personel@sahaanket.gov.tr'}</td>
                    <td class="p-3 text-text-secondary font-medium">${p.phone}</td>
                    <td class="p-3 font-semibold ${p.role === 'ADMIN' ? 'text-indigo-600' : 'text-primary'}">${p.role === 'ADMIN' ? 'YÖNETİCİ' : 'SAHA PERSONELİ'}</td>
                    <td class="p-3">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                        ${p.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td class="p-3 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button data-user-id="${p.id}" class="btn-open-edit-personnel-modal px-2.5 py-1 bg-surface-container-low border border-border text-xs font-semibold rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-1">
                          ${iconSvg('user', 'w-3.5 h-3.5')}
                          <span>Düzenle</span>
                        </button>

                        <button data-user-id="${p.id}" class="btn-toggle-personnel-status px-2.5 py-1 bg-surface-container-low border border-border text-xs font-semibold rounded-lg hover:bg-surface-container transition-all">
                          ${p.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                        </button>

                        <button data-user-id="${p.id}" class="btn-open-delete-personnel-modal p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Personeli Sil">
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
      return `
        <div class="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <div>
            <h3 class="font-bold text-on-surface text-lg">Saha Ekibine Mesaj Gönder (Kişiye Özel / Toplu Duyuru)</h3>
            <p class="text-xs text-text-secondary mt-1">İsterseniz özel bir saha personeli seçin, isterseniz tüm ekibe toplu bildirim gönderin.</p>
          </div>

          <form id="form-admin-send-message" class="space-y-4 max-w-xl">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1.5">Gönderim Modu *</label>
              <div class="flex gap-4 text-xs font-semibold">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="msg-target-mode" value="all" checked class="text-primary focus:ring-primary"/>
                  <span>Tüm Saha Ekibine Toplu Duyuru</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="msg-target-mode" value="specific" class="text-primary focus:ring-primary"/>
                  <span>Özel Kişi Seçerek Gönder</span>
                </label>
              </div>
            </div>

            <div id="msg-personnel-selector-wrapper" class="hidden space-y-2">
              <label class="block text-xs font-bold text-on-surface mb-1">Mesaj Gönderilecek Personeller *</label>
              
              <!-- Dropdown Trigger Button -->
              <button type="button" id="btn-toggle-msg-personnel-dropdown" class="w-full h-12 px-4 bg-surface-container-low border border-border rounded-xl text-xs font-bold text-on-surface flex items-center justify-between hover:bg-slate-50 transition-all shadow-xs">
                <div class="flex items-center gap-2">
                  ${iconSvg('group', 'w-4 h-4 text-primary')}
                  <span id="label-selected-personnel-count">Personelleri Seçin (0 kişi seçildi)</span>
                </div>
                ${iconSvg('moveDown', 'w-4 h-4 text-slate-500 transition-transform duration-200')}
              </button>

              <!-- Downward Dropdown Menu Container (Aşağı Doğru Açılan Kutu) -->
              <div id="dropdown-msg-personnel-menu" class="hidden relative z-30 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xl space-y-3 border-t-2 border-t-primary animate-in fade-in zoom-in-95 duration-150">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aşağı Açılır Personel Listesi</span>
                  <div class="flex items-center gap-2 text-[10px] font-bold">
                    <button type="button" id="btn-msg-select-all-personnel" class="text-primary hover:underline">Tümünü Seç</button>
                    <span class="text-slate-300">|</span>
                    <button type="button" id="btn-msg-clear-all-personnel" class="text-slate-400 hover:text-slate-600 hover:underline">Temizle</button>
                  </div>
                </div>

                <!-- Sticky Live Search Bar inside Dropdown -->
                <div class="relative">
                  <input type="text" id="input-search-msg-personnel" placeholder="Personel ara (isim veya e-posta)..." class="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary font-medium"/>
                  <span class="absolute left-3 top-3 text-slate-400">${iconSvg('search', 'w-4 h-4 text-slate-400')}</span>
                </div>

                <!-- Scrollable Personnel List for 100+ Users -->
                <div class="max-h-56 overflow-y-auto divide-y divide-slate-100 bg-slate-50/50 rounded-xl border border-slate-200 p-1">
                  ${state.allPersonnel.map(p => `
                    <label class="msg-personnel-item flex items-center justify-between p-2.5 hover:bg-white rounded-lg cursor-pointer transition-all" data-name="${(p.fullName + ' ' + (p.email || '')).toLowerCase()}">
                      <div class="flex items-center gap-3">
                        <input type="checkbox" name="msg-selected-personnel" value="${p.id}" class="cb-msg-personnel rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"/>
                        <div>
                          <span class="font-bold text-slate-900 block text-xs">${p.fullName}</span>
                          <span class="text-[10px] text-slate-500 block">${p.email || p.phone}</span>
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[9px] font-bold ${p.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">${p.role === 'ADMIN' ? 'Yönetici' : 'Saha'}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Mesaj Başlığı *</label>
              <input type="text" id="admin-msg-title" required placeholder="Örn: Sinan Köyü Saha Hatırlatması" class="w-full h-11 px-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary"/>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Mesaj İçeriği *</label>
              <textarea id="admin-msg-content" required rows="3" placeholder="Saha personeline iletilecek özel açıklama..." class="w-full p-4 bg-surface-container-low border border-border rounded-xl text-xs focus:outline-none focus:border-primary"></textarea>
            </div>

            <button type="submit" class="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all flex items-center gap-2 shadow-sm">
              ${iconSvg('send', 'w-4 h-4')}
              Mesajı İlet
            </button>
          </form>

          <div class="pt-4 border-t border-border space-y-3">
            <h4 class="font-bold text-on-surface text-sm">Gönderilmiş Mesajlar (${state.messages.length})</h4>
            <div class="space-y-2">
              ${state.messages.map(m => `
                <div class="p-4 bg-surface-container-low rounded-xl border border-border text-xs flex justify-between items-start">
                  <div>
                    <h5 class="font-bold text-on-surface text-sm">${m.title}</h5>
                    <p class="text-text-secondary mt-1">${m.content}</p>
                  </div>
                  <span class="text-[10px] text-text-muted">${m.date}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

    default:
      return '';
  }
}
