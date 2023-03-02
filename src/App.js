import React, { useState, useEffect } from 'react';

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
        </div>
    );
}

export default App;
