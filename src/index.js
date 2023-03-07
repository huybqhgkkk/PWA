// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// serviceWorker.register();
//
//
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('./sw.js').then(function(registration) {
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }
//
// ReactDOM.render(<App />, document.getElementById('root'));
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
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

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
});
