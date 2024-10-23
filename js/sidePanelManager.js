function toggleSidePanel() {
    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");
    if (!sidePanel || !sidePanelIndicator) return;
    
    sidePanel.classList.toggle("open");
    sidePanelIndicator.classList.toggle("open");
    updateSidePanelIndicator();
}

function closeSidePanel() {
    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");
    if (!sidePanel || !sidePanelIndicator) return;
    
    sidePanel.classList.remove("open");
    sidePanelIndicator.classList.remove("open");
    updateSidePanelIndicator();
}

function updateSidePanelIndicator() {
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");
    if (!sidePanelIndicator) return;
    
    const isOpen = document.getElementById("sidePanel")?.classList.contains("open");
    sidePanelIndicator.innerHTML = isOpen ? "&#10005;" : "&#9881;";
    sidePanelIndicator.title = isOpen ? getTranslation('closePanel') : getTranslation('openPanel');
}

function initializeSidePanelButtons() {
    // Get all button elements
    const darkModeButton = document.getElementById("darkModeButton");
    const soundToggleButton = document.getElementById("soundToggleButton");
    const languageToggleButton = document.getElementById("languageToggleButton");
    const exportCsvButton = document.getElementById("exportCsvButton");
    const importCsvButton = document.getElementById("importCsvButton");
    const clearButton = document.getElementById("clearButton");
    const statisticsButton = document.getElementById("statisticsButton");

    // Remove existing event listeners (if any) by cloning and replacing elements
    if (darkModeButton) {
        const newDarkModeButton = darkModeButton.cloneNode(true);
        darkModeButton.parentNode.replaceChild(newDarkModeButton, darkModeButton);
        newDarkModeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode();
                // Don't close side panel for dark mode toggle
            } else {
                console.error("toggleDarkMode function not found");
            }
        });
    }

    if (soundToggleButton) {
        const newSoundToggleButton = soundToggleButton.cloneNode(true);
        soundToggleButton.parentNode.replaceChild(newSoundToggleButton, soundToggleButton);
        newSoundToggleButton.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleSound();
            closeSidePanel();
        });
    }

    if (languageToggleButton) {
        const newLanguageToggleButton = languageToggleButton.cloneNode(true);
        languageToggleButton.parentNode.replaceChild(newLanguageToggleButton, languageToggleButton);
        newLanguageToggleButton.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleLanguage();
            // Don't close side panel for language toggle
        });
    }

    if (exportCsvButton) {
        const newExportCsvButton = exportCsvButton.cloneNode(true);
        exportCsvButton.parentNode.replaceChild(newExportCsvButton, exportCsvButton);
        newExportCsvButton.addEventListener("click", (event) => {
            event.stopPropagation();
            exportResultsToCsv();
            closeSidePanel();
        });
    }

    if (importCsvButton) {
        const newImportCsvButton = importCsvButton.cloneNode(true);
        importCsvButton.parentNode.replaceChild(newImportCsvButton, importCsvButton);
        newImportCsvButton.addEventListener("click", (event) => {
            event.stopPropagation();
            importResultsFromCsv();
            closeSidePanel();
        });
    }

    if (clearButton) {
        const newClearButton = clearButton.cloneNode(true);
        clearButton.parentNode.replaceChild(newClearButton, clearButton);
        newClearButton.addEventListener("click", (event) => {
            event.stopPropagation();
            handleClearButtonClick();
            closeSidePanel();
        });
    }

    if (statisticsButton) {
        const newStatisticsButton = statisticsButton.cloneNode(true);
        statisticsButton.parentNode.replaceChild(newStatisticsButton, statisticsButton);
        newStatisticsButton.addEventListener("click", (event) => {
            event.stopPropagation();
            showStatisticsPopup();
            closeSidePanel();
        });
    }
}

function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'de' ? 'en' : 'de';
    setLanguage(newLang);
    updateLanguageButtonText();
    updateUILanguage();
}

function updateLanguageButtonText() {
    const languageToggleButton = document.getElementById("languageToggleButton");
    if (!languageToggleButton) return;
    
    const currentLang = getCurrentLanguage();
    languageToggleButton.textContent = currentLang === 'de' ? 'Sprache: DE' : 'Language: EN';
}

// Ensure these functions are globally accessible
window.toggleSidePanel = toggleSidePanel;
window.closeSidePanel = closeSidePanel;
window.updateSidePanelIndicator = updateSidePanelIndicator;
window.initializeSidePanelButtons = initializeSidePanelButtons;
window.toggleLanguage = toggleLanguage;
window.updateLanguageButtonText = updateLanguageButtonText;

// Add translations for the side panel
const sidePanelTranslations = {
    openPanel: {
        de: 'Panel öffnen',
        en: 'Open panel'
    },
    closePanel: {
        de: 'Panel schließen',
        en: 'Close panel'
    }
};

// Add translations to the main translations object
if (typeof translations !== 'undefined') {
    Object.keys(sidePanelTranslations).forEach(key => {
        translations.de[key] = sidePanelTranslations[key].de;
        translations.en[key] = sidePanelTranslations[key].en;
    });
}

// Initialize side panel buttons when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeSidePanelButtons);
