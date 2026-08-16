async function runPerformanceAudit() {
  console.log('===============================================================');
  console.log('⚡ SAHA ANKET - CANLI PERFORMANS & HIZ DENETİMİ');
  console.log('===============================================================\n');

  const targets = [
    { name: 'Frontend index.html (Vercel)', url: 'https://anket-psi.vercel.app/' },
    { name: 'Frontend store.js', url: 'https://anket-psi.vercel.app/store.js' },
    { name: 'Frontend components.js', url: 'https://anket-psi.vercel.app/components.js' },
    { name: 'Frontend app.js', url: 'https://anket-psi.vercel.app/app.js' },
    { name: 'Frontend PWA 192 Icon', url: 'https://anket-psi.vercel.app/icons/icon-192.png' },
    { name: 'Backend Health (Render)', url: 'https://anket-45so.onrender.com/swagger/v1/swagger.json' }
  ];

  console.log('📡 1. STATİK DOSYA VE VARLIK YANIT SÜRELERİ (TTFB & Download):');
  for (const t of targets) {
    const start = performance.now();
    try {
      const res = await fetch(t.url);
      const data = await res.arrayBuffer();
      const duration = Math.round(performance.now() - start);
      const sizeKB = (data.byteLength / 1024).toFixed(1);
      console.log(`  ⏱️  [${duration} ms] (${sizeKB} KB) -> ${t.name} (Status: ${res.status})`);
    } catch (e) {
      console.log(`  ❌ Hata (${t.name}):`, e.message);
    }
  }

  console.log('\n🔐 2. BACKEND API LOGIN İŞLEM SÜRESİ TESTİ:');
  const apiStart = performance.now();
  try {
    const loginRes = await fetch('https://anket-45so.onrender.com/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrPhone: 'admin', password: 'Admin123!' })
    });
    const loginData = await loginRes.json();
    const apiDuration = Math.round(performance.now() - apiStart);
    console.log(`  ⏱️  [${apiDuration} ms] -> API Auth Login Yanıt Süresi (Token Alındı: ${!!loginData.accessToken})`);
  } catch (e) {
    console.log('  ❌ API Hata:', e.message);
  }

  console.log('\n===============================================================');
}

runPerformanceAudit();
