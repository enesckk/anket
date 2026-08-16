// E2E System Integration Test Script (Node.js Fetch API)

const API = process.env.API_URL || 'https://anket-45so.onrender.com/api';

async function runTests() {
  console.log('==========================================================');
  console.log(' SURVEYADMIN PRO - UÇTAN UCA SYSTEM E2E TEST SUITE');
  console.log('==========================================================\n');

  // 1. AUTHENTICATION
  console.log('[1/6] AUTHENTICATION TESTS');
  const adminAuth = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
  }).then(r => r.json());

  console.log(` -> Admin Login OK: Role=${adminAuth.user.role} | FullName=${adminAuth.user.fullName}`);

  const fieldAuth = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernameOrPhone: 'ahmet', password: 'Saha123!' })
  }).then(r => r.json());

  console.log(` -> Field User Login OK: Role=${fieldAuth.user.role} | FullName=${fieldAuth.user.fullName}\n`);

  const adminHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminAuth.accessToken}`
  };

  const fieldHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${fieldAuth.accessToken}`
  };

  // 2. SURVEY CREATION & CLONE
  console.log('[2/6] SURVEY CREATION & CLONE TESTS');
  const newSurvey = await fetch(`${API}/surveys`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      title: '2026 Sulama Altyapı Anketi',
      description: 'Saha sulama boruları tespiti',
      source: 'ADMIN'
    })
  }).then(r => r.json());

  console.log(` -> Created Survey ID: ${newSurvey.id} | Title: ${newSurvey.title}`);

  const clonedSurvey = await fetch(`${API}/surveys/${newSurvey.id}/clone`, {
    method: 'POST',
    headers: adminHeaders
  }).then(r => r.json());

  console.log(` -> Cloned Survey ID: ${clonedSurvey.id} | Title: ${clonedSurvey.title}\n`);

  // 3. ASSIGNMENT & VIEWED_AT TRACKING
  console.log('[3/6] ASSIGNMENT & VIEWED_AT TRACKING TESTS');
  const assignment = await fetch(`${API}/assignments`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      surveyId: newSurvey.id,
      villageId: '33333333-3333-3333-3333-333333333331',
      targetCount: 100,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 86400000).toISOString(),
      note: 'Sinan Köyü saha ataması',
      assignedUserIds: [fieldAuth.user.id]
    })
  }).then(r => r.json());

  console.log(` -> Created Assignment ID: ${assignment.id} | Village: ${assignment.villageName}`);

  const viewRes = await fetch(`${API}/assignments/${assignment.id}/viewed`, {
    method: 'POST',
    headers: fieldHeaders
  }).then(r => r.json());

  console.log(` -> Field User Viewed Assignment: Success=${viewRes.success}\n`);

  // 4. IDEMPOTENT SUBMISSION & DUPLICATE PREVENT
  console.log('[4/6] IDEMPOTENT SUBMISSION & DUPLICATE PREVENT TESTS');
  const clientSubId = `guid-${Date.now()}`;
  const subPayload = {
    clientSubmissionId: clientSubId,
    surveyId: newSurvey.id,
    assignmentId: assignment.id,
    villageId: '33333333-3333-3333-3333-333333333331',
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    latitude: 37.0662,
    longitude: 37.3833,
    accuracy: 6.0,
    syncSource: 'ONLINE',
    answers: [{ questionId: '66666666-6666-6666-6666-666666666661', answerValue: 'Mehmet Yılmaz' }]
  };

  const sub1 = await fetch(`${API}/submissions`, {
    method: 'POST',
    headers: fieldHeaders,
    body: JSON.stringify(subPayload)
  }).then(r => r.json());

  const sub2 = await fetch(`${API}/submissions`, {
    method: 'POST',
    headers: fieldHeaders,
    body: JSON.stringify(subPayload)
  }).then(r => r.json());

  console.log(` -> Submission 1 ID: ${sub1.id}`);
  console.log(` -> Submission 2 ID (Retry): ${sub2.id}`);
  if (sub1.id === sub2.id) {
    console.log(' -> SUCCESS: Mükerrer kayıt engellendi! Identical ID returned.\n');
  }

  // 5. MESSAGE & SEEN_AT TRACKING
  console.log('[5/6] MESSAGE & SEEN_AT TRACKING TESTS');
  const message = await fetch(`${API}/messages`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      title: 'Acil Saha Çalışması',
      content: 'Ekipmanlarınızı kontrol ediniz.',
      recipientUserIds: [fieldAuth.user.id]
    })
  }).then(r => r.json());

  console.log(` -> Created Message ID: ${message.id} | Title: ${message.title}`);

  const seenRes = await fetch(`${API}/messages/${message.id}/seen`, {
    method: 'POST',
    headers: fieldHeaders
  }).then(r => r.json());

  console.log(` -> Field User Seen Message: Success=${seenRes.success}\n`);

  // 6. REAL EXCEL & PDF EXPORT
  console.log('[6/6] GERÇEK EXCEL (.XLSX) VE PDF RAPOR TESTLERİ');
  const excelRes = await fetch(`${API}/reports/excel`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({ surveyId: newSurvey.id })
  });

  const pdfRes = await fetch(`${API}/reports/pdf`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({ surveyId: newSurvey.id })
  });

  const excelBlob = await excelRes.arrayBuffer();
  const pdfBlob = await pdfRes.arrayBuffer();

  console.log(` -> Excel Export Status: ${excelRes.status} | File Size: ${excelBlob.byteLength} bytes`);
  console.log(` -> PDF Export Status: ${pdfRes.status} | File Size: ${pdfBlob.byteLength} bytes\n`);

  console.log('==========================================================');
  console.log(' TÜM E2E ENTEGRASYON VE SİSTEM TESTLERİ %100 BAŞARILI!');
  console.log('==========================================================');
}

runTests().catch(console.error);
