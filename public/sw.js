const CACHE_NAME = 'alkadami-keto-v1';
const OFFLINE_URL = '/';

// Assets to cache on install
const STATIC_CACHE = [
  '/',
  '/productos',
  '/nutricionistas',
  '/chat-ia',
  '/foro',
  '/personalizados',
  '/carrito',
  '/contacto',
  '/about',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      // Try to cache all resources, but don't fail installation if some fail
      return Promise.allSettled(
        STATIC_CACHE.map(url => 
          cache.add(url).catch(err => {
            console.warn(`Failed to cache ${url}:`, err);
            return null;
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the new response asynchronously (don't await)
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        }).catch((err) => {
          // Log cache write errors in development
          if (self.location.hostname === 'localhost') {
            console.warn('Failed to cache resource:', event.request.url, err);
          }
        });

        return response;
      }).catch((err) => {
        // If both cache and network fail, show offline page
        console.warn('Fetch failed, returning offline page:', err);
        return caches.match(OFFLINE_URL);
      });
    })
  );
});
