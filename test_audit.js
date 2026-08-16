async function runFullSystemAudit() {
  console.log('===============================================================');
  console.log('🚀 SAHA ANKET - KAPSAMLI CANLI SİSTEM & E2E DENETİM RAPORU');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log('  ✅ [BAŞARILI] ' + message);
      passedTests++;
    } else {
      console.log('  ❌ [HATA] ' + message);
    }
  }

  try {
    // ------------------------------------------------------------------
    // BÖLÜM 1: FRONTEND & PWA VARLIKLARI TESTLERİ (VERCEL)
    // ------------------------------------------------------------------
    console.log('📦 BÖLÜM 1: FRONTEND & PWA CANLI TESTLERİ (Vercel: https://anket-psi.vercel.app)');
    
    // 1.1 Index HTML
    const htmlRes = await fetch('https://anket-psi.vercel.app/');
    const htmlText = await htmlRes.text();
    assert(htmlRes.status === 200, 'index.html 200 OK ile yüklendi');
    assert(htmlText.includes('<title>Saha Anket</title>'), 'Sayfa başlığı doğru: <title>Saha Anket</title>');
    assert(htmlText.includes('manifest.json'), 'PWA manifest.json bağlantısı mevcut');
    assert(htmlText.includes('sw.js'), 'Service Worker kayıt kodu mevcut');

    // 1.2 Manifest JSON
    const manifestRes = await fetch('https://anket-psi.vercel.app/manifest.json');
    const manifest = await manifestRes.json();
    assert(manifestRes.status === 200, 'manifest.json 200 OK ile erişilebilir');
    assert(manifest.name === 'Saha Anket', 'Manifest uygulama adı: Saha Anket');
    assert(manifest.icons && manifest.icons.length >= 8, 'Manifest içinde 8 adet ikon tanımlı');

    // 1.3 Service Worker
    const swRes = await fetch('https://anket-psi.vercel.app/sw.js');
    const swText = await swRes.text();
    assert(swRes.status === 200, 'sw.js 200 OK ile erişilebilir');
    assert(swText.includes('sahaanket-v'), 'Service worker önbellek versiyonu: ' + (swText.match(/sahaanket-v\d+/)?.[0] || 'mevcut'));

    // 1.4 Scriptler (app.js, components.js, store.js)
    const storeRes = await fetch('https://anket-psi.vercel.app/store.js');
    const storeText = await storeRes.text();
    assert(storeRes.status === 200, 'store.js 200 OK ile erişilebilir');
    assert(storeText.includes('https://anket-45so.onrender.com/api'), 'store.js Render canlı backend adresine bağlı');

    const compRes = await fetch('https://anket-psi.vercel.app/components.js');
    const compText = await compRes.text();
    assert(compRes.status === 200, 'components.js 200 OK ile erişilebilir');
    assert(!compText.includes('value="Saha123!"'), 'Login formunda şifre alanı BOŞ (hardcoded değer yok)');
    assert(!compText.includes('value="ahmet@sahaanket.gov.tr"'), 'Login formunda e-posta alanı BOŞ (hardcoded değer yok)');

    // 1.5 Görsel ve İkonlar
    const icon192 = await fetch('https://anket-psi.vercel.app/icons/icon-192.png');
    assert(icon192.status === 200, '192px PWA ikonu 200 OK');
    const icon512 = await fetch('https://anket-psi.vercel.app/icons/icon-512.png');
    assert(icon512.status === 200, '512px PWA ikonu 200 OK');
    const logoSaha = await fetch('https://anket-psi.vercel.app/logo_saha_anket.png');
    assert(logoSaha.status === 200, 'Giriş ekranı Saha Anket logosu 200 OK');
    const logoSehit = await fetch('https://anket-psi.vercel.app/logo_sehitkamil.png');
    assert(logoSehit.status === 200, 'İç panel kurumsal logo 200 OK');

    console.log('\n------------------------------------------------------------------');
    // ------------------------------------------------------------------
    // BÖLÜM 2: BACKEND API & VERİTABANI TESTLERİ (RENDER)
    // ------------------------------------------------------------------
    console.log('⚙️  BÖLÜM 2: BACKEND API & VERİTABANI TESTLERİ (Render: https://anket-45so.onrender.com)');

    // 2.1 Swagger UI
    const swgRes = await fetch('https://anket-45so.onrender.com/swagger/v1/swagger.json');
    assert(swgRes.status === 200, 'Render Swagger API dökümanı aktif');

    // 2.2 Admin Login
    const adminLoginRes = await fetch('https://anket-45so.onrender.com/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
    });
    const adminData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, 'Admin girişi (admin / Admin123!) başarılı');
    assert(adminData.user && adminData.user.role === 'ADMIN', 'Admin kullanıcısı rolü: ADMIN');
    assert(typeof adminData.accessToken === 'string' && adminData.accessToken.length > 50, 'JWT Access Token başarıyla üretildi');

    const adminToken = adminData.accessToken;

    // 2.3 Saha Kullanıcısı Login
    const sahaLoginRes = await fetch('https://anket-45so.onrender.com/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrPhone: 'saha', password: 'Saha123!' })
    });
    const sahaData = await sahaLoginRes.json();
    assert(sahaLoginRes.status === 200, 'Saha personeli girişi (saha / Saha123!) başarılı');
    assert(sahaData.user && sahaData.user.role === 'FIELD_USER', 'Saha personeli rolü: FIELD_USER');

    // 2.4 Anketler API (Yetkili Get)
    const srvRes = await fetch('https://anket-45so.onrender.com/api/Surveys', {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    const surveys = await srvRes.json();
    assert(srvRes.status === 200, 'Yetkili GET /api/Surveys başarılı');
    assert(Array.isArray(surveys) && surveys.length > 0, 'Veritabanından anketler başarıyla çekildi (Mevcut anket sayısı: ' + surveys.length + ')');

    // 2.5 Personeller API (Yetkili Get)
    const persRes = await fetch('https://anket-45so.onrender.com/api/Personnel', {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    assert(persRes.status === 200, 'Yetkili GET /api/Personnel başarılı');

    // 2.6 Atamalar API (Yetkili Get)
    const asgnRes = await fetch('https://anket-45so.onrender.com/api/Assignments', {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    assert(asgnRes.status === 200, 'Yetkili GET /api/Assignments başarılı');

    // 2.7 Mesajlar API (Yetkili Get)
    const msgRes = await fetch('https://anket-45so.onrender.com/api/Messages', {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    assert(msgRes.status === 200, 'Yetkili GET /api/Messages başarılı');

    console.log('\n===============================================================');
    console.log(`📊 DENETİM SONUCU: ${passedTests} / ${totalTests} TEST BAŞARIYLA TAMAMLANDI (%${Math.round((passedTests/totalTests)*100)})`);
    console.log('===============================================================');
  } catch (err) {
    console.error('Kritik Denetim Hatası:', err);
  }
}
runFullSystemAudit();
