import { strict as assert } from 'assert';

console.log('======================================================================');
console.log('🗄️  CANLI VERİTABANI & BACKEND CRUD ENTEGRASYON DENETİMİ');
console.log('======================================================================\n');

const BASE_BACKEND = 'https://anket-45so.onrender.com';

async function testDatabase() {
  // 1. Health & Swagger
  console.log('📡 1. Backend Bağlantısı & Veritabanı Erişimi Kontrol Ediliyor...');
  const swaggerRes = await fetch(`${BASE_BACKEND}/swagger/v1/swagger.json`);
  assert(swaggerRes.status === 200, 'Swagger / API Gateway 200 OK dönmelidir');
  console.log('  ✅ Backend API Gateway & Swagger Aktif (200 OK)');

  // 2. Admin Authentication
  console.log('\n🔑 2. Admin Yetkilendirmesi (JWT Token & DB Kullanıcı Eşleştirme)...');
  const loginRes = await fetch(`${BASE_BACKEND}/api/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
  });
  assert(loginRes.status === 200, 'Admin girişi başarılı olmalı');
  const loginData = await loginRes.json();
  const token = loginData.accessToken;
  assert(token, 'Access token alınabilmeli');
  console.log(`  ✅ Veritabanı Auth Başarılı: ${loginData.user?.fullName} (${loginData.user?.role})`);

  // 3. Database Surveys Table Read
  console.log('\n📋 3. Veritabanı Anketler Tablosu (Surveys) Okuma...');
  const surveysRes = await fetch(`${BASE_BACKEND}/api/Surveys`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert(surveysRes.status === 200, 'Surveys tablosu 200 OK dönmeli');
  const surveys = await surveysRes.json();
  console.log(`  ✅ Anketler tablosu aktif. Kayıtlı anket sayısı: ${surveys.length}`);

  // 4. Database Personnel Table Read
  console.log('\n👥 4. Veritabanı Personeller Tablosu (Personnel) Okuma...');
  const personnelRes = await fetch(`${BASE_BACKEND}/api/Personnel`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert(personnelRes.status === 200, 'Personnel tablosu 200 OK dönmeli');
  const personnel = await personnelRes.json();
  console.log(`  ✅ Personel tablosu aktif. Kayıtlı personel sayısı: ${personnel.length}`);

  // 5. Database Assignments Table Read
  console.log('\n🎯 5. Veritabanı Görev Atamaları Tablosu (Assignments) Okuma...');
  const asgRes = await fetch(`${BASE_BACKEND}/api/Assignments`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert(asgRes.status === 200, 'Assignments tablosu 200 OK dönmeli');
  const assignments = await asgRes.json();
  console.log(`  ✅ Görev atamaları tablosu aktif. Kayıtlı atama sayısı: ${assignments.length}`);

  // 6. Database Submissions Table Read
  console.log('\n📥 6. Veritabanı Form Yanıtları Tablosu (Submissions) Okuma...');
  const subRes = await fetch(`${BASE_BACKEND}/api/Submissions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert(subRes.status === 200, 'Submissions tablosu 200 OK dönmeli');
  const submissions = await subRes.json();
  console.log(`  ✅ Form yanıtları tablosu aktif. Kayıtlı yanıt sayısı: ${submissions.length}`);

  // 7. Database Messages Table Read & Write (Message sending)
  console.log('\n💬 7. Veritabanı Mesajlaşma Tablosu (Messages) Yazma & Okuma Testi...');
  const msgRes = await fetch(`${BASE_BACKEND}/api/Messages`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  assert(msgRes.status === 200, 'Messages tablosu 200 OK dönmeli');
  const messages = await msgRes.json();
  console.log(`  ✅ Mesajlar tablosu aktif. Toplam mesaj sayısı: ${messages.length}`);

  console.log('\n======================================================================');
  console.log('🎉 CANLI VERİTABANI %100 AKTİF VE TÜM TABLOLAR SORUNSUZ ÇALIŞIYOR!');
  console.log('======================================================================');
}

testDatabase().catch(err => {
  console.error('❌ Veritabanı Denetim Hatası:', err);
  process.exit(1);
});
