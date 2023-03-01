import React from 'react';

function PushNotificationButton() {
    function handlePushNotificationClick() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'BLR6jMQ3R5NlQcQzXc0vFBtArPl4iFfC9kq0O34AZXGMCgEKfI2lKsKNWEcnKN8c3QfW6ba3wHttTk6byecz-6w'
                }).then(function(subscription) {
                    console.log('Push notification subscription successful: ', subscription);
                    // fetch('/subscribe', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify(subscription)
                    // }).then(function(response) {
                    //     console.log('Push notification subscription saved on server.');
                    // }).catch(function(error) {
                    //     console.error('Push notification subscription failed: ', error);
                    // });
                });
            });
        }
    }

    return (
        <button onClick={handlePushNotificationClick}>Send Push Notification</button>
    );
}

export default PushNotificationButton;
