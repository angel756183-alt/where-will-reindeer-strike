const CACHE_NAME = 'xmas-exchange-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg',
  // 男生圖片
  './boy_a.jpg',
  './boy_b.jpg',
  './boy_c.jpg',
  './boy_d.jpg',
  // 女生圖片
  './girl_a.jpg',
  './girl_b.jpg',
  './girl_c.jpg',
  './girl_d.jpg',
  './girl_e.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 清除舊版本的快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
