// Function to save dark mode setting in localStorage
function saveDarkModeToLocalStorage() {
    try {
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode.toString());
    } catch (error) {
        console.error("Error saving dark mode setting:", error);
    }
}

// Function to load dark mode setting from localStorage
function loadDarkModeFromLocalStorage() {
    try {
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode === "true") {
            document.body.classList.add("dark-mode");
            applyDarkModeToCards();
            updateDarkModeButton(true);
        } else {
            document.body.classList.remove("dark-mode");
            applyDarkModeToCards();
            updateDarkModeButton(false);
        }
    } catch (error) {
        console.error("Error loading dark mode setting:", error);
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    try {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        applyDarkModeToCards();
        saveDarkModeToLocalStorage();
        updateDarkModeButton(isDarkMode);
    } catch (error) {
        console.error("Error toggling dark mode:", error);
    }
}

// Function to update dark mode button text and state
function updateDarkModeButton(isDarkMode) {
    try {
        const darkModeButton = document.getElementById("darkModeButton");
        if (darkModeButton) {
            darkModeButton.classList.toggle("active", isDarkMode);
            // Update the button text based on the current language and dark mode state
            const buttonText = isDarkMode ? "Dark Mode" : "Light Mode";
            darkModeButton.textContent = getTranslation(buttonText.toLowerCase().replace(' ', ''));
        }
    } catch (error) {
        console.error("Error updating dark mode button:", error);
    }
}

// Function to apply dark mode to all cards
function applyDarkModeToCards() {
    try {
        const isDarkMode = document.body.classList.contains("dark-mode");
        
        // Apply to all cards
        document.querySelectorAll('.card, .result-card, .input-card').forEach(el => {
            el.classList.toggle("dark-mode", isDarkMode);
        });

        // Apply to message container
        const messageContainer = document.getElementById('messageContainer');
        if (messageContainer) {
            messageContainer.classList.toggle("dark-mode", isDarkMode);
        }

        // Apply to side panel
        const sidePanel = document.getElementById('sidePanel');
        if (sidePanel) {
            sidePanel.classList.toggle("dark-mode", isDarkMode);
        }

        // Apply to side panel indicator
        const sidePanelIndicator = document.getElementById('sidePanelIndicator');
        if (sidePanelIndicator) {
            sidePanelIndicator.classList.toggle("dark-mode", isDarkMode);
        }

        // Apply to statistics popup if it exists
        const statisticsPopup = document.getElementById('statisticsPopup');
        if (statisticsPopup) {
            statisticsPopup.classList.toggle("dark-mode", isDarkMode);
        }
    } catch (error) {
        console.error("Error applying dark mode to cards:", error);
    }
}

// Function to save sound setting to localStorage
function saveSoundSettingToLocalStorage(isEnabled) {
    try {
        localStorage.setItem("soundEnabled", isEnabled.toString());
        if (typeof updateSoundEnabled === 'function') {
            updateSoundEnabled(isEnabled);
        }
    } catch (error) {
        console.error("Error saving sound setting:", error);
    }
}

// Function to load sound setting from localStorage
function loadSoundSettingFromLocalStorage() {
    try {
        const soundEnabled = localStorage.getItem("soundEnabled");
        const isEnabled = soundEnabled === null ? true : soundEnabled === "true";
        if (typeof updateSoundEnabled === 'function') {
            updateSoundEnabled(isEnabled);
        }
        return isEnabled;
    } catch (error) {
        console.error("Error loading sound setting:", error);
        return true; // Default to enabled if there's an error
    }
}

// Function to save language setting to localStorage
function saveLangSettingToLocalStorage(lang) {
    try {
        localStorage.setItem("language", lang);
    } catch (error) {
        console.error("Error saving language setting:", error);
    }
}

// Function to load language setting from localStorage
function loadLangSettingFromLocalStorage() {
    try {
        const lang = localStorage.getItem("language");
        return lang || 'de'; // Default to German if no language is set
    } catch (error) {
        console.error("Error loading language setting:", error);
        return 'de'; // Default to German if there's an error
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDarkModeFromLocalStorage();
});

// Ensure these functions are globally accessible
window.saveDarkModeToLocalStorage = saveDarkModeToLocalStorage;
window.loadDarkModeFromLocalStorage = loadDarkModeFromLocalStorage;
window.toggleDarkMode = toggleDarkMode;
window.applyDarkModeToCards = applyDarkModeToCards;
window.updateDarkModeButton = updateDarkModeButton;
window.saveSoundSettingToLocalStorage = saveSoundSettingToLocalStorage;
window.loadSoundSettingFromLocalStorage = loadSoundSettingFromLocalStorage;
window.saveLangSettingToLocalStorage = saveLangSettingToLocalStorage;
window.loadLangSettingFromLocalStorage = loadLangSettingFromLocalStorage;
