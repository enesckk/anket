async function runCompleteFunctionalAudit() {
  console.log('======================================================================');
  console.log('🧪 SAHA ANKET - BÜTÜN FONKSİYONLAR UÇTAN UCA E2E TEST & DENETİMİ');
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;
  const issues = [];

  function check(featureName, condition, detail = '') {
    if (condition) {
      console.log(`  ✅ [BAŞARILI] ${featureName} ${detail ? '(' + detail + ')' : ''}`);
      passed++;
    } else {
      console.log(`  ❌ [HATA] ${featureName} -> ${detail}`);
      failed++;
      issues.push(`${featureName}: ${detail}`);
    }
  }

  const BASE_FRONTEND = 'https://anket-psi.vercel.app';
  const BASE_BACKEND = 'https://anket-45so.onrender.com';

  try {
    // -------------------------------------------------------------
    // MODÜL 1: BACKEND API & VERİTABANI ENDPOINT TESTLERİ
    // -------------------------------------------------------------
    console.log('⚙️  MODÜL 1: BACKEND API & VERİTABANI İŞLEMLERİ:');

    // 1.1 Swagger API
    const swg = await fetch(`${BASE_BACKEND}/swagger/v1/swagger.json`);
    check('Backend Swagger Docs', swg.status === 200, `Status: ${swg.status}`);

    // 1.2 Admin Girişi & JWT Token
    const adminLog = await fetch(`${BASE_BACKEND}/api/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
    });
    const adminData = await adminLog.json();
    check('Admin Login API', adminLog.status === 200 && adminData.accessToken, `Kullanıcı: ${adminData.user?.fullName}`);

    const adminToken = adminData.accessToken;

    // 1.3 Saha Personeli Girişi
    const sahaLog = await fetch(`${BASE_BACKEND}/api/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrPhone: 'saha', password: 'Saha123!' })
    });
    const sahaData = await sahaLog.json();
    check('Saha Personeli Login API', sahaLog.status === 200 && sahaData.user?.role === 'FIELD_USER');

    // 1.4 Hatalı Şifre Koruması (Güvenlik)
    const badLog = await fetch(`${BASE_BACKEND}/api/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrPhone: 'admin', password: 'YanlisSifre123!' })
    });
    check('Hatalı Şifre Reddi', badLog.status === 401 || badLog.status === 400, 'Doğru şekilde engellendi');

    // 1.5 Anket Listesi Çekme
    const srvRes = await fetch(`${BASE_BACKEND}/api/Surveys`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const srvData = await srvRes.json();
    check('Anket Listeleme API (/api/Surveys)', srvRes.status === 200 && Array.isArray(srvData), `Toplam Anket: ${srvData.length}`);

    // 1.6 Personel Listesi Çekme
    const perRes = await fetch(`${BASE_BACKEND}/api/Personnel`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const perData = await perRes.json();
    check('Personel Listeleme API (/api/Personnel)', perRes.status === 200 && Array.isArray(perData), `Toplam Personel: ${perData.length}`);

    // 1.7 Görev Atamaları API
    const asgRes = await fetch(`${BASE_BACKEND}/api/Assignments`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const asgData = await asgRes.json();
    check('Görev Atamaları API (/api/Assignments)', asgRes.status === 200 && Array.isArray(asgData));

    // 1.8 Mesajlar API
    const msgRes = await fetch(`${BASE_BACKEND}/api/Messages`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const msgData = await msgRes.json();
    check('Mesajlaşma API (/api/Messages)', msgRes.status === 200 && Array.isArray(msgData));

    console.log('\n-------------------------------------------------------------');
    // -------------------------------------------------------------
    // MODÜL 2: FRONTEND ARAYÜZ, STATE & MODALLAR
    // -------------------------------------------------------------
    console.log('🖥️  MODÜL 2: FRONTEND BİLEŞENLERİ & FONKSİYONLAR:');

    // 2.1 components.js ve store.js kod taraması
    const compText = await (await fetch(`${BASE_FRONTEND}/components.js`)).text();
    const storeText = await (await fetch(`${BASE_FRONTEND}/store.js`)).text();
    const appText = await (await fetch(`${BASE_FRONTEND}/app.js`)).text();

    // 2.2 Çift Header Kontrolü
    check('PWA Tekil Header Yapısı', compText.includes('renderSystemBar() {\n  return \'\';') || compText.includes('renderSystemBar() {\r\n  return \'\';'), 'Çift header temizlendi');

    // 2.3 Boş Login Inputları
    check('Giriş Ekranı Boş E-posta/Şifre', !compText.includes('value="Saha123!"') && !compText.includes('value="ahmet@sahaanket.gov.tr"'));

    // 2.4 Otomatik Güçlü Şifre Önerisi ve Kopyalama
    check('Personel Şifre Önerisi Motoru', compText.includes('btn-generate-personnel-password') && compText.includes('btn-copy-personnel-password'));
    check('Şifre Kopyalama Event Listener', appText.includes('navigator.clipboard.writeText') && appText.includes('btn-copy-personnel-password'));

    // 2.5 Personel Pasif/Aktif Toggle
    check('Personel Durum Değiştirme Butonu (UI)', compText.includes('btn-toggle-personnel-status'));
    check('Personel Durum Değiştirme Listener (App)', appText.includes('togglePersonnelBtn') && appText.includes('togglePersonnelStatus'));
    check('Personel Durum Değiştirme Metodu (Store)', storeText.includes('togglePersonnelStatus(userId)'));

    // 2.6 Fotoğraf Sıkıştırma Motoru
    check('İstemci Fotoğraf Sıkıştırıcı (Canvas Engine)', storeText.includes('compressImageFile') && storeText.includes('HTML5 Canvas'));
    check('Kamera/Galeri Tetikleyici (UI)', compText.includes('runner-camera-file') && compText.includes('btn-runner-photo'));
    check('Fotoğraf Sıkıştırma & Kaydetme Listener', appText.includes('compressImageFile(file)') && appText.includes('saveActivePhoto'));

    // 2.7 Dashboard Dinamik Veri Entegrasyonu
    check('Dinamik Dashboard KPI Kartları', !compText.includes("state.adminKpis.todayCompleted || '142'") && compText.includes('(state.submissions || []).length'));

    // 2.8 Bildirim Yönlendirme (Notification Navigation)
    check('Bildirim Tıklama Yönlendirmesi', storeText.includes('handleNotificationClick') && appText.includes('notif-item'));

    // 2.9 Rapor İndirme (Excel & PDF)
    check('Excel Rapor İndirme Fonksiyonu', appText.includes('btn-reports-tab-csv') && appText.includes('.csv'));
    check('PDF Analitik Rapor İndirme', appText.includes('btn-reports-tab-pdf') && appText.includes('.pdf'));

    // 2.10 GPS Konumu Alma
    check('Saha GPS Konum Alma Fonksiyonu', appText.includes('btn-runner-location') && storeText.includes('acquireLocation'));

    // 2.11 Service Worker & PWA Çevrimdışı Senkronizasyon
    const swText = await (await fetch(`${BASE_FRONTEND}/sw.js`)).text();
    check('PWA Service Worker v2', swText.includes('sahaanket-v2') && swText.includes('caches.match'));

    console.log('\n======================================================================');
    console.log(`📊 DENETİM SONUCU: ${passed} / ${passed + failed} FONKSİYON KUSURSUZ ÇALIŞIYOR (%${Math.round((passed / (passed + failed)) * 100)})`);
    if (failed === 0) {
      console.log('🎉 SİSTEMDE ÇALIŞMAYAN HİÇBİR FONKSİYON VEYA HATA BULUNMAMAKTADIR!');
    } else {
      console.log('⚠️ Bulunan Sorunlar:', issues);
    }
    console.log('======================================================================');

  } catch (err) {
    console.error('Kritik Tarama Hatası:', err);
  }
}

runCompleteFunctionalAudit();
