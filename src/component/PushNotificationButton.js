import React from 'react';

function PushNotificationButton() {
    function handlePushNotificationClick() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'YOUR_APPLICATION_SERVER_KEY'
                }).then(function(subscription) {
                    console.log('Push notification subscription successful: ', subscription);
                    fetch('/subscribe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(subscription)
                    }).then(function(response) {
                        console.log('Push notification subscription saved on server.');
                    }).catch(function(error) {
                        console.error('Push notification subscription failed: ', error);
                    });
                });
            });
        }
    }

    return (
        <button onClick={handlePushNotificationClick}>Send Push Notification</button>
    );
}

export default PushNotificationButton;
