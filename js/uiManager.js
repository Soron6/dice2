// This file now serves as a central point for importing and exporting UI-related functions

// Import functions from eventListeners.js
import { updateResultListeners, toggleResultsList, updateArrowIndicator } from './eventListeners.js';

// Import functions from sidePanelManager.js
import { toggleSidePanel, closeSidePanel, updateSidePanelIndicator } from './sidePanelManager.js';

// Import functions from messageManager.js
import { showMessage, showConfirmMessage, showDownloadMessage } from './messageManager.js';

// Import functions from statisticsUI.js
import { showStatisticsPopup } from './statisticsUI.js';

// Export all functions
export {
    updateResultListeners,
    toggleResultsList,
    updateArrowIndicator,
    toggleSidePanel,
    closeSidePanel,
    updateSidePanelIndicator,
    showMessage,
    showConfirmMessage,
    showDownloadMessage,
    showStatisticsPopup
};
