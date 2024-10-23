// This file now serves as a central point for importing and exporting storage-related functions

// Import functions from resultStorage.js
import { saveResultToLocalStorage, loadResultsFromLocalStorage, clearResultsFromLocalStorage, getResultImage } from './resultStorage.js';

// Import functions from settingsStorage.js
import { saveDarkModeToLocalStorage, loadDarkModeFromLocalStorage, toggleDarkMode, applyDarkModeToCards, saveSoundSettingToLocalStorage, loadSoundSettingFromLocalStorage } from './settingsStorage.js';

// Import functions from statisticsManager.js
import { getStatistics } from './statisticsManager.js';

// Import functions from exportImport.js
import { exportResultsToCsv, importResultsFromCsv } from './exportImport.js';

// Export all functions
export {
    saveResultToLocalStorage,
    loadResultsFromLocalStorage,
    clearResultsFromLocalStorage,
    getResultImage,
    saveDarkModeToLocalStorage,
    loadDarkModeFromLocalStorage,
    toggleDarkMode,
    applyDarkModeToCards,
    saveSoundSettingToLocalStorage,
    loadSoundSettingFromLocalStorage,
    getStatistics,
    exportResultsToCsv,
    importResultsFromCsv
};
