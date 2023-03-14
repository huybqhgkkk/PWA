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

//Cài đặt Cache API

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

self.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
});

// xử lý thông báo đẩy
// self.addEventListener('push', function(event) {
//     console.log('Push notification received', event);
//
//     var title = 'Example Push Notification';
//     var options = {
//         body: 'This is a push notification example',
//         icon: 'path/to/icon.png',
//         badge: 'path/to/badge.png'
//     };
//
//     event.waitUntil(self.registration.showNotification(title, options));
// });

