import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import "./index.css";

ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>,
    document.getElementById('root'));

//reference đến nơi serviceWorker hoạt động
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        //đk thông báo
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.VAPID_PUBLIC_KEY,
        })
            .then(subscription => {
                console.log('User is subscribed:', subscription);
            })
            .catch(err => {
                console.log('Failed to subscribe the user:', err);
            });
    });
}


// kiểm tra xem trình duyệt có hỗ trợ serviceWorker hay không
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    }
});
