const translations = {
    de: {
        action: "Aktion",
        challenge: "Herausforderung",
        roll: "Roll",
        topic: "Thema (optional)",
        settings: "Einstellungen",
        darkMode: "Darkmode",
        sound: "Sound",
        on: "An",
        off: "Aus",
        language: "Sprache",
        exportCsv: "Export CSV",
        importCsv: "Import CSV",
        clear: "Clear",
        statistics: "Statistiken",
        fullSuccess: "Voller Erfolg",
        partialSuccess: "Teilerfolg",
        failure: "Fehlschlag",
        epic: "episch",
        confirmClear: "Achtung:\nAlle Daten werden gelöscht.\nMöchten Sie wirklich fortfahren?",
        confirmImport: "Achtung:\nBestehende Daten werden überschrieben.\nMöchten Sie wirklich fortfahren?",
        yes: "Ja",
        no: "Nein",
        noResults: "Keine Ergebnisse zum Exportieren vorhanden.",
        exportSuccess: "CSV-Datei erfolgreich erstellt. Klicken Sie auf der nächsten Seite lange auf Download und dann auf Herunterladen.",
        exportError: "Fehler beim Exportieren der Datei. Bitte versuchen Sie es später erneut.",
        importSuccess: "Ergebnisse erfolgreich importiert!",
        rollNumber: "Wurf",
        modifier: "Modifier",
        timestamp: "Zeitstempel",
        download: "Download",
        clickToExpand: "Klicken zum Erweitern",
        clickToCollapse: "Klicken zum Einklappen",
        stronghit: "Voller Erfolg",
        weakhit: "Teilerfolg",
        miss: "Fehlschlag",
        vollerfolg: "Voller Erfolg",
        teilerfolg: "Teilerfolg",
        fehlschlag: "Fehlschlag",
        confirmDelete: "Bestätigen",
        cancel: "Abbrechen",
        total: "Gesamt",
        average: "Durchschnitt",
        statisticsTitle: "Statistiken",
        resetConfirm: "Möchten Sie die Statistiken zurücksetzen?"
    },
    en: {
        action: "Action",
        challenge: "Challenge",
        roll: "Roll",
        topic: "Topic (optional)",
        settings: "Settings",
        darkMode: "Dark Mode",
        sound: "Sound",
        on: "On",
        off: "Off",
        language: "Language",
        exportCsv: "Export CSV",
        importCsv: "Import CSV",
        clear: "Clear",
        statistics: "Statistics",
        fullSuccess: "Strong Hit",
        partialSuccess: "Weak Hit",
        failure: "Miss",
        epic: "epic",
        confirmClear: "Warning:\nAll data will be deleted.\nDo you want to proceed?",
        confirmImport: "Warning:\nExisting data will be overwritten.\nDo you want to proceed?",
        yes: "Yes",
        no: "No",
        noResults: "No results available for export.",
        exportSuccess: "CSV file successfully created. On the next page, long-press Download and then tap Download.",
        exportError: "Error exporting the file. Please try again later.",
        importSuccess: "Results successfully imported!",
        rollNumber: "Roll",
        modifier: "Modifier",
        timestamp: "Timestamp",
        download: "Download",
        clickToExpand: "Click to expand",
        clickToCollapse: "Click to collapse",
        stronghit: "Strong Hit",
        weakhit: "Weak Hit",
        miss: "Miss",
        vollerfolg: "Strong Hit",
        teilerfolg: "Weak Hit",
        fehlschlag: "Miss",
        confirmDelete: "Confirm",
        cancel: "Cancel",
        total: "Total",
        average: "Average",
        statisticsTitle: "Statistics",
        resetConfirm: "Do you want to reset the statistics?"
    }
};

let currentLanguage = 'de';

function getCurrentLanguage() {
    return currentLanguage;
}

function setLanguage(lang) {
    if (lang === 'de' || lang === 'en') {
        currentLanguage = lang;
        saveLangSettingToLocalStorage(lang);
        updateUILanguage();
    }
}

function getTranslation(key) {
    if (!key) return '';
    const translation = translations[currentLanguage][key.toLowerCase()];
    if (!translation) {
        console.warn(`Missing translation for key: ${key} in language: ${currentLanguage}`);
        return key;
    }
    return translation;
}

function updateUILanguage() {
    // Update toggle button text without changing the state
    updateToggleButtonText();
    
    // Update roll button text
    const rollButton = document.getElementById('rollButton');
    if (rollButton) {
        rollButton.textContent = getTranslation('roll');
    }
    
    // Update topic input placeholder
    const topicInput = document.getElementById('topicInput');
    if (topicInput) {
        topicInput.placeholder = getTranslation('topic');
    }
    
    // Update side panel content
    const sidePanelContent = document.getElementById('sidePanelContent');
    if (sidePanelContent) {
        const settingsTitle = sidePanelContent.querySelector('h2');
        if (settingsTitle) {
            settingsTitle.textContent = getTranslation('settings');
        }

        const darkModeButton = document.getElementById('darkModeButton');
        if (darkModeButton) {
            darkModeButton.textContent = getTranslation('darkMode');
        }

        const soundToggleButton = document.getElementById('soundToggleButton');
        if (soundToggleButton) {
            const isOn = soundToggleButton.textContent.includes('An') || soundToggleButton.textContent.includes('On');
            soundToggleButton.textContent = `${getTranslation('sound')}: ${getTranslation(isOn ? 'on' : 'off')}`;
        }

        const languageToggleButton = document.getElementById('languageToggleButton');
        if (languageToggleButton) {
            languageToggleButton.textContent = currentLanguage === 'de' ? 'Sprache: DE' : 'Language: EN';
        }

        const exportCsvButton = document.getElementById('exportCsvButton');
        if (exportCsvButton) {
            exportCsvButton.textContent = getTranslation('exportCsv');
        }

        const importCsvButton = document.getElementById('importCsvButton');
        if (importCsvButton) {
            importCsvButton.textContent = getTranslation('importCsv');
        }

        const clearButton = document.getElementById('clearButton');
        if (clearButton) {
            clearButton.textContent = getTranslation('clear');
        }

        const statisticsButton = document.getElementById('statisticsButton');
        if (statisticsButton) {
            statisticsButton.textContent = getTranslation('statistics');
        }
    }

    // Update result cards
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        // Update roll number and type
        const rollNumberElement = card.querySelector('h4');
        if (rollNumberElement) {
            const parts = rollNumberElement.textContent.split(' ');
            const rollNumber = parts[1];
            const isAction = parts[2].toLowerCase() === '(aktion)' || parts[2].toLowerCase() === '(action)';
            rollNumberElement.textContent = `${getTranslation('rollNumber')} ${rollNumber} (${getTranslation(isAction ? 'action' : 'challenge')})`;
        }

        // Update result text
        const resultElement = card.querySelector('.result');
        if (resultElement) {
            const resultText = resultElement.textContent.split(' ')[0].toLowerCase();
            const isEpic = resultElement.textContent.includes('episch') || resultElement.textContent.includes('epic');
            resultElement.textContent = getTranslation(resultText) + (isEpic ? ` (${getTranslation('epic')})` : '');
        }

        // Update modifier text
        const modifierElement = card.querySelector('.modifier');
        if (modifierElement) {
            const modifierValue = modifierElement.querySelector('.modifier-value').textContent;
            const modifierResult = modifierElement.querySelector('.modifier-result').textContent;
            modifierElement.innerHTML = `${getTranslation('modifier')}: <span class="modifier-value">${modifierValue}</span> <span class="modifier-result">${modifierResult}</span>`;
        }
    });

    // Update arrow indicators
    updateArrowIndicator();
}

// Ensure these functions are globally accessible
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.getTranslation = getTranslation;
window.updateUILanguage = updateUILanguage;