import React, {useState, useEffect, useRef} from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "./component/Header";
import About from "./component/About";
import Home from "./component/Home";
import Categories from "./component/Categories";
import Category from "./component/Category";
import ScrollToTopButton from './component/ScrollToTopButton';

function App() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);
    const [stream, setStream] = useState(null);
    const [headerFixed, setHeaderFixed] = useState(false);
    const videoRef = useRef();

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', handleInstallPrompt);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
        };
    }, []);

    useEffect(() => {
        if (stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    async function handleCameraClick() {
        try {
            // Truy cập thiết bị camera
            const stream = await navigator.mediaDevices.getUserMedia({video: true});

            // Lưu trữ stream vào trạng thái của ứng dụng
            setStream(stream);
        } catch (error) {
            console.error(error);
        }
    }


    function handleInstallPrompt(event) {
        // Prevent the default behavior of the event
        event.preventDefault();

        // Save the install prompt event to state
        setInstallPrompt(event);
    }

    function handleInstallClick() {
        // Show the install prompt to the user

        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                new Notification("Chào huykkk");
            } else {
                new Notification("Chào huykkk");
            }
            // Reset the install prompt state
            setInstallPrompt(null);
        });
    }

    useEffect(() => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        setIsInstalled(isStandalone);
    }, []);

    const handleAddToHomeScreen = () => {
        const promptEvent = window.deferredPrompt;

        if (promptEvent) {
            promptEvent.prompt();

            promptEvent.userChoice.then(result => {
                console.log(result);

                if (result.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
            });

            window.deferredPrompt = null;
        }
    };

    // function handlePushNotification() {
    //    //kiểm tra permission
    //     if (Notification.permission === 'granted') {
    //         if ('serviceWorker' in navigator) {
    //             navigator.serviceWorker.ready.then(function (registration) {
    //                 registration.showNotification('Hello, world!');
    //             });
    //         }
    //     } else if (Notification.permission !== 'denied') {
    //         Notification.requestPermission().then(permission => {
    //             if (permission === 'granted') {
    //                 if ('serviceWorker' in navigator) {
    //                     navigator.serviceWorker.ready.then(function (registration) {
    //                         registration.showNotification('Hello, world!');
    //                     });
    //                 }
    //             }
    //         });
    //     }
    // }

    function handlePushNotification() {
        // Check if permission has been granted
        if (Notification.permission === 'granted') {
            // Check if service workers are supported
            if ('serviceWorker' in navigator) {
                // Get the registration for the service worker
                navigator.serviceWorker.ready.then(function (registration) {
                    // Show the notification
                    registration.showNotification('Hello, world!');
                });
            }
        }
        // If permission is not granted or denied, request permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    // Check if service workers are supported
                    if ('serviceWorker' in navigator) {
                        // Get the registration for the service worker
                        navigator.serviceWorker.ready.then(function (registration) {
                            // Show the notification
                            registration.showNotification('Hello, world!');
                        });
                    }
                }
            });
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 0) {
                setHeaderFixed(true);
            } else {
                setHeaderFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <h1>Welcome to My PWA</h1>
            {/*{!isInstalled && (*/}
            {/*    <button onClick={handleAddToHomeScreen}>*/}
            {/*        Add to Home Screen*/}
            {/*    </button>*/}
            {/*)}*/}

            {installPrompt && (
                <button onClick={handleInstallClick}>
                    Install the app
                </button>
            )}

            {/*<div>*/}
            {/*    <h1>My PWA</h1>*/}
            {/*    <button onClick={handleCameraClick}>Open Camera</button>*/}
            {/*    <video ref={videoRef} autoPlay />*/}
            {/*</div>*/}

            <button onClick={handlePushNotification}>Send Push Notification</button>
            <div className={headerFixed ? 'header-fixed' : ''}>
                <Header/>
            </div>


            <Routes>
                <Route path="/" element={<Home title="Welcome to Red30 Tech"/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="categories" element={<Categories/>}>
                    <Route path=":catId" element={<Category/>}/>
                </Route>
                <Route
                    path="*"
                    element={<h1 className="not-found">Page Not Found</h1>}
                />
            </Routes>
            <ScrollToTopButton/>

            <footer className="container">
                copy right 2023 | <a>Huykkk</a>
            </footer>
        </div>
    );
}

export default App;
