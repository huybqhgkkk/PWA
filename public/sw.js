// self.addEventListener('push', function(event) {
//     if (event.data) {
//         const data = event.data.json();
//         self.registration.showNotification(data.title, {
//             body: data.message,
//             icon: data.icon,
//             vibrate: [200, 100, 200],
//             data: {
//                 url: data.url
//             }
//         });
//     }
// });
//
// self.addEventListener('notificationclick', function(event) {
//     event.notification.close();
//     event.waitUntil(
//         clients.openWindow(event.notification.data.url)
//     );
// });
const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/css/main.chunk.css',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
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
