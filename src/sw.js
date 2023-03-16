//Cài đặt Cache API

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/css/main.chunk.css',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/statics',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.registration.sync.register('sync-cache'))
    );
});

//Sử dụng Cache API để tải nội dung nhanh hơn
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

// xóa tất cả các cache trừ phi tên cache bắt đầu bằng 'my-app-cache-' và khác với CACHE_NAME.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('my-app-cache-') && cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
});

// service-worker.js
self.addEventListener("message", (event) => {
    // event is an ExtendableMessageEvent object
    console.log(`The client sent me a message: ${event.data}`);

    event.source.postMessage("Hi client");
});


self.addEventListener('sync', event => {
    if (event.tag === 'sync-cache') {
        event.waitUntil(syncData());
    }
});

function syncData() {
    // Open the cache
    return caches.open(CACHE_NAME).then(cache => {
        // Get the data from the cache
        return cache.match('data').then(cachedResponse => {
            // Make a fetch request to the server
            return fetch('http://localhost:3000/').then(serverResponse => {
                // If the response from the server is okay
                if (serverResponse.ok) {
                    // Update the cache with the new data
                    cache.put('data', serverResponse.clone());
                }
            });
        });
    });
}

self.addEventListener('push', event => {
    console.log('Push received', event);

    // Get the notification data
    const data = event.data.json();
    console.log('Notification data', data);

    // Show the notification
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            // icon: '/path/to/icon.png',
        })
    );
});



