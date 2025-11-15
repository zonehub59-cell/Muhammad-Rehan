const CACHE_NAME = 'malik-rehan-chatbot-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/types.ts',
  '/App.tsx',
  '/components/ChatHeader.tsx',
  '/components/ChatMessage.tsx',
  '/components/ChatInput.tsx',
  '/components/TypingIndicator.tsx',
  '/services/geminiService.ts',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Note: Caching CDN resources can be brittle. This is a basic implementation.
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache URLs:', error);
        });
      })
  );
  self.skipWaiting();
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

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
