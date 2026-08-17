// SurveyAdmin Intelligence - Service Worker
// Versiyon: 1.0.1

const CACHE_NAME = 'sahaanket-v9';
const OFFLINE_URL = '/';

// Cache'e alınacak dosyalar (App Shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/app.js',
  '/components.js',
  '/store.js',
  '/styles.css',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ─── INSTALL ───────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing SurveyAdmin Service Worker...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching App Shell');
      return cache.addAll(APP_SHELL).catch((err) => {
        console.warn('[SW] App Shell caching partially failed:', err);
      });
    })
  );
});

// ─── ACTIVATE ──────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating SurveyAdmin Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activated. Claiming clients...');
      return self.clients.claim();
    })
  );
});

// ─── FETCH ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API isteklerini (backend) SW üzerinden geçirme → her zaman network
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({ error: 'Çevrimdışı - API erişilemiyor' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Chrome extension ve non-http istekleri atla
  if (!url.protocol.startsWith('http')) return;

  // Navigasyon & JS/CSS Script istekleri → Network-first, offline'da cache'den dön
  if (request.mode === 'navigate' || url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || (request.mode === 'navigate' ? caches.match('/index.html') : null);
          });
        })
    );
    return;
  }

  // Diğer Statik Asset'ler (Resimler, fontlar vb.) → Cache-first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type !== 'opaque'
          ) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.destination === 'image') {
            return new Response('', { status: 200 });
          }
          return new Response('Çevrimdışı - İçerik yüklenemedi', { status: 503 });
        });
    })
  );
});

// ─── BACKGROUND SYNC (Çevrimdışı anket gönderimi) ──────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-surveys') {
    console.log('[SW] Background sync: Offline anketler senkronize ediliyor...');
    event.waitUntil(syncOfflineSurveys());
  }
});

async function syncOfflineSurveys() {
  try {
    // IndexedDB'den bekleyen anketleri al ve gönder
    // Bu fonksiyon store.js ile entegre çalışır
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({ type: 'SYNC_OFFLINE_SURVEYS' });
    });
  } catch (err) {
    console.error('[SW] Sync failed:', err);
  }
}

// ─── PUSH & NATIVE WEB NOTIFICATIONS (Cross-Platform: Windows, Android, Apple) ──
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const options = {
    body: data.body || data.message || 'Yeni bildiriminiz var.',
    icon: data.icon || '/logo_saha_anket.png',
    badge: data.badge || '/logo_saha_anket.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      notifId: data.notifId,
      type: data.type || 'SYSTEM'
    },
    actions: [
      { action: 'open', title: 'Görüntüle' },
      { action: 'close', title: 'Kapat' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Saha Anket Bildirimi', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  const notifData = event.notification.data || {};
  const urlToOpen = notifData.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Zaten açık olan bir sekme/pencere varsa ona odaklan ve mesaj gönder
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NOTIFICATION_CLICKED',
            notifId: notifData.notifId,
            notifType: notifData.type,
            url: urlToOpen
          });
          return;
        }
      }
      // Hiç pencere açık değilse yeni pencere aç
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

console.log('[SW] SurveyAdmin Service Worker loaded.');
