function initializePage() {
    // Load language setting
    if (typeof loadLangSettingFromLocalStorage === 'function') {
        try {
            const savedLang = loadLangSettingFromLocalStorage();
            setLanguage(savedLang);
            updateLanguageButtonText();
        } catch (error) {
            console.error('Error in loadLangSettingFromLocalStorage:', error);
        }
    }

    // Load results
    if (typeof loadResultsFromLocalStorage === 'function') {
        try {
            loadResultsFromLocalStorage();
        } catch (error) {
            console.error('Error in loadResultsFromLocalStorage:', error);
        }
    }

    // Load dark mode setting
    if (typeof loadDarkModeFromLocalStorage === 'function') {
        try {
            loadDarkModeFromLocalStorage();
            initializeDarkModeButton();
        } catch (error) {
            console.error('Error in loadDarkModeFromLocalStorage:', error);
        }
    }

    // Load sound setting
    if (typeof loadSoundSettingFromLocalStorage === 'function') {
        try {
            window.soundEnabled = loadSoundSettingFromLocalStorage();
            updateSoundToggleButton();
        } catch (error) {
            console.error('Error in loadSoundSettingFromLocalStorage:', error);
        }
    }

    // Initialize roll button
    const rollButton = document.getElementById("rollButton");
    if (rollButton) {
        rollButton.addEventListener('click', function() {
            if (typeof rollDiceAndDisplayResults === 'function') {
                rollDiceAndDisplayResults();
            } else {
                console.error("rollDiceAndDisplayResults function not found");
            }
        });
    } else {
        console.error("Roll button not found");
    }

    // Initialize clear button
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            if (typeof showConfirmMessage === 'function' && typeof clearResultsFromLocalStorage === 'function') {
                showConfirmMessage(getTranslation('confirmClear'), function() {
                    clearResultsFromLocalStorage();
                });
            } else {
                console.error("showConfirmMessage or clearResultsFromLocalStorage function not found");
            }
        });
    } else {
        console.error("Clear button not found");
    }

    // Initialize sound toggle button
    const soundToggleButton = document.getElementById("soundToggleButton");
    if (soundToggleButton) {
        soundToggleButton.addEventListener('click', toggleSound);
    } else {
        console.error("Sound toggle button not found");
    }

    // Update UI language
    updateUILanguage();
}

function initializeDarkModeButton() {
    const darkModeButton = document.getElementById("darkModeButton");
    if (darkModeButton) {
        // Remove any existing event listeners
        const newDarkModeButton = darkModeButton.cloneNode(true);
        darkModeButton.parentNode.replaceChild(newDarkModeButton, darkModeButton);
        
        // Add new event listener
        newDarkModeButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode();
            } else {
                console.error("toggleDarkMode function not found");
            }
        });

        // Update button state based on current dark mode
        const isDarkMode = document.body.classList.contains('dark-mode');
        updateDarkModeButton(isDarkMode);
    }
}

function updateSoundToggleButton() {
    const soundToggleButton = document.getElementById("soundToggleButton");
    if (soundToggleButton) {
        soundToggleButton.textContent = `${getTranslation('sound')}: ${getTranslation(window.soundEnabled ? 'on' : 'off')}`;
        if (window.soundEnabled) {
            soundToggleButton.classList.remove('sound-disabled');
        } else {
            soundToggleButton.classList.add('sound-disabled');
        }
    }
}

function toggleSound() {
    window.soundEnabled = !window.soundEnabled;
    updateSoundToggleButton();
    if (typeof saveSoundSettingToLocalStorage === 'function') {
        saveSoundSettingToLocalStorage(window.soundEnabled);
    } else {
        console.error("saveSoundSettingToLocalStorage function not found");
    }
}

// Call initializePage when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Make functions globally accessible
window.initializePage = initializePage;
window.initializeDarkModeButton = initializeDarkModeButton;
window.updateSoundToggleButton = updateSoundToggleButton;
window.toggleSound = toggleSound;
