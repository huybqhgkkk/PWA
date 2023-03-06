import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "./component/Header";
import About from "./component/About";
import Home from "./component/Home";
import Categories from "./component/Categories";
import Category from "./component/Category";

function App() {
    const [isInstalled, setIsInstalled] = useState(false);

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
