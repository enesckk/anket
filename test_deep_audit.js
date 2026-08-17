// Comprehensive Deep Verification Script
import { strict as assert } from 'assert';

console.log('======================================================================');
console.log('🔬 SAHA ANKET - BİLDİRİMLER & İLERLEME DERİN DENETİM TESTİ');
console.log('======================================================================\n');

// 1. Module Imports Check
const storeModule = await import('./store.js');
const componentsModule = await import('./components.js');
const appModule = await import('./app.js');

console.log('✅ [1/5] Modül yüklemeleri (store.js, components.js, app.js) başarıyla tamamlandı.');

// 2. Store & Notification Routing Test
const store = storeModule.store;
assert(typeof store.handleNotificationClick === 'function', 'handleNotificationClick metodu mevcut');
assert(typeof store.addNotification === 'function', 'addNotification metodu mevcut');
assert(typeof store.requestNotificationPermission === 'function', 'requestNotificationPermission metodu mevcut');
assert(typeof store.showNativeOsNotification === 'function', 'showNativeOsNotification metodu mevcut');

console.log('✅ [2/5] Bildirim yönetimi ve Native Web Notification metotları doğrulandı.');

// Test notification routing for NEW_MESSAGE
store.state.currentRole = 'admin';
store.state.notifications = [{ id: 'test-notif-msg', type: 'NEW_MESSAGE', title: 'Test Mesaj', message: 'Test Mesaj İçeriği', isRead: false }];
store.handleNotificationClick('test-notif-msg');
assert(store.state.adminTab === 'messages', 'Admin mesaj bildirimine basınca messages tabına geçmeli');
assert(store.state.notifications[0].isRead === true, 'Bildirim okundu olarak işaretlenmeli');

// Test PWA notification routing for NEW_MESSAGE
store.state.currentRole = 'pwa';
store.state.notifications = [{ id: 'test-notif-msg-pwa', type: 'NEW_MESSAGE', title: 'Admin Mesajı', message: 'Merhaba', isRead: false }];
store.handleNotificationClick('test-notif-msg-pwa');
assert(store.state.pwaScreen === 'messages', 'PWA mesaj bildirimine basınca messages ekranına geçmeli');

// Test Admin notification routing for NEW_SURVEY
store.state.currentRole = 'admin';
store.state.allSurveys = [{ id: 'srv-test-1', title: 'Test Anket', status: 'PENDING_APPROVAL' }];
store.state.notifications = [{ id: 'test-notif-srv', type: 'NEW_SURVEY', title: 'Yeni Anket', surveyId: 'srv-test-1', isRead: false }];
store.handleNotificationClick('test-notif-srv');
assert(store.state.adminTab === 'surveys', 'Admin anket bildirimine basınca surveys tabına geçmeli');
assert(store.state.activeModal && store.state.activeModal.type === 'review_survey', 'İnceleme modalı açılmalı');

// Test PWA notification routing for NEW_ASSIGNMENT
store.state.currentRole = 'pwa';
store.state.notifications = [{ id: 'test-notif-assign', type: 'NEW_ASSIGNMENT', title: 'Yeni Görev', isRead: false }];
store.handleNotificationClick('test-notif-assign');
assert(store.state.pwaScreen === 'home', 'PWA görev bildirimine basınca ana sayfaya yönlenmeli');

// Test: Personel Kayıt Edilince Bildirim Tetiklenmesi
store.state.allPersonnel = [];
store.createAdminPersonnel('Deneme Personel', 'deneme@sahaanket.gov.tr', '05551112233', 'Demo123!', 'FIELD_USER');
assert(store.state.allPersonnel.length === 1, 'Personel başarıyla kaydedilmeli');
assert(store.state.notifications[0].type === 'SYSTEM' && store.state.notifications[0].title.includes('Yeni Personel Kaydı'), 'Personel kaydedilince anında bildirim üretilmeli');

// Test: Görev Kaydedilince / Tekrar Bildirim Gönderilince Bildirim Tetiklenmesi
store.state.allAssignments = [{ id: 'asg-test-99', surveyTitle: 'Mahalle Anketi', villageName: 'Köy A', targetCount: 100 }];
store.resendAssignmentNotification('asg-test-99');
assert(store.state.notifications[0].type === 'NEW_ASSIGNMENT' && store.state.notifications[0].title.includes('Saha Görevi Hatırlatması'), 'Tekrar bildirim gönderilince personele anında push bildirimi iletilmeli');

// Test: Test Bildirimi Gönder Butonu
store.sendTestNotification();
assert(store.state.notifications[0].type === 'SYSTEM' && store.state.notifications[0].title.includes('Test Bildirimi'), 'Test bildirimi butonu başarıyla bildirim üretmeli');

console.log('✅ [3/5] Bildirim yönlendirme rotaları, kayıt bildirimleri, tekrar bildirme ve test butonu hatasız çalışıyor.');

// 3. Progress Calculation Integrity Test in components.js
const testState = {
  ...store.state,
  allSurveys: [
    { id: 's1', title: 'Anket 1', category: 'Tarım', targetCount: 200, status: 'ACTIVE' },
    { id: 's2', title: 'Anket 2', category: 'Altyapı', targetCount: 100, status: 'COMPLETED' },
    { id: 's3', title: 'Anket 3', category: 'Sosyal', targetCount: 50, status: 'ACTIVE' }
  ],
  submissions: [
    { id: 'sub1', surveyId: 's1', isInvalid: false },
    { id: 'sub2', surveyId: 's1', isInvalid: false },
    { id: 'sub3', surveyId: 's1', isInvalid: true }, // Should be ignored
    { id: 'sub4', surveyId: 's3', isInvalid: false }
  ],
  surveyViewMode: 'list'
};

store.state = testState;
const renderedAdmin = componentsModule.renderAdminView();
// Survey 1: 2 valid submissions out of 200 target -> 2 / 200 · %1
assert(renderedAdmin.includes('2 / 200 · %1'), 'Anket 1 dinamik ilerlemesi doğru hesaplanmalı (2/200 · %1)');
// Survey 2: COMPLETED -> 100 / 100 · %100
assert(renderedAdmin.includes('100 / 100 · %100'), 'Tamamlanan anket dinamik ilerlemesi doğru hesaplanmalı (100/100 · %100)');
// Survey 3: 1 valid submission out of 50 target -> 1 / 50 · %2
assert(renderedAdmin.includes('1 / 50 · %2'), 'Anket 3 dinamik ilerlemesi doğru hesaplanmalı (1/50 · %2)');
// Ensure no static fake '320 / 500' exists anywhere in the output!
assert(!renderedAdmin.includes('320 / 500'), 'Statik fake 320 / 500 metni arayüzden tamamen temizlenmiş olmalıdır');

console.log('✅ [4/5] Anket ilerleme oranları dinamik olarak hesaplanıyor, statik/sahte veri kalmadı.');

// 4. Notification UI Render Check
const renderedNotifCenter = componentsModule.renderNotificationCenter(testState);
assert(renderedNotifCenter.includes('btn-toggle-notifications-dropdown'), 'Bildirim merkezi butonu mevcut');

const renderedPwaBell = componentsModule.renderPwaNotificationBell(testState);
assert(renderedPwaBell.includes('btn-toggle-pwa-notifications'), 'PWA bildirim butonu mevcut');

console.log('✅ [5/5] Bildirim bileşenleri (Admin & PWA) arayüzde eksiksiz render ediliyor.');

console.log('\n======================================================================');
console.log('🎉 TÜM DENETİMLER BAŞARIYLA GEÇTİ! HİÇBİR HATA VEYA KOPUKLUK YOKTUR.');
console.log('======================================================================');
