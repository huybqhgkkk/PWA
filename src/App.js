import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "./component/Header";
import About from "./component/About";
import Home from "./component/Home";
import Categories from "./component/Categories";
import Category from "./component/Category";

function App() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', handleInstallPrompt);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
        };
    }, []);

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
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
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

    return (
        <div>
            <h1>Welcome to My PWA</h1>
            {!isInstalled && (
                <button onClick={handleAddToHomeScreen}>
                    Add to Home Screen
                </button>
            )}

            {installPrompt && (
                <button onClick={handleInstallClick}>
                    Install the app
                </button>
            )}
            <Header/>

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

            <footer className="container">
                copy right 2022 | <a>Red30 Tech</a>
            </footer>
        </div>
    );
}

export default App;
