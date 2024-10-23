document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("incrementButton").addEventListener("click", function() {
        const variableInput = document.getElementById("variableInput");
        let variable = parseInt(variableInput.value); 
        if (isNaN(variable)) variable = 3;
        variableInput.value = variable + 1;
    });

    document.getElementById("decrementButton").addEventListener("click", function() {
        const variableInput = document.getElementById("variableInput");
        let variable = parseInt(variableInput.value); 
        if (isNaN(variable)) variable = 3;
        if (variable > 0) variableInput.value = variable - 1;
    });

    document.getElementById("toggleButton").addEventListener("click", function() {
        window.isAction = !window.isAction;
        updateToggleButtonText();
    });

    const sidePanel = document.getElementById("sidePanel");
    const sidePanelIndicator = document.getElementById("sidePanelIndicator");

    // Dark mode button event listener
    const darkModeButton = document.getElementById("darkModeButton");
    if (darkModeButton) {
        darkModeButton.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode();
            } else {
                console.error("toggleDarkMode function not found");
            }
        });
    }

    sidePanelIndicator.addEventListener("click", function(event) {
        event.stopPropagation();
        toggleSidePanel();
    });

    document.addEventListener("click", function(event) {
        if (!sidePanel.contains(event.target) && 
            !sidePanelIndicator.contains(event.target) && 
            sidePanel.classList.contains("open")) {
            closeSidePanel();
        }
    });

    sidePanel.addEventListener("click", function(event) {
        // Don't stop propagation for dark mode button clicks
        if (!event.target.matches('#darkModeButton')) {
            event.stopPropagation();
        }
    });

    // Export CSV button event listener
    document.getElementById("exportCsvButton").addEventListener("click", function(event) {
        event.stopPropagation();
        if (typeof exportResultsToCsv === 'function') {
            exportResultsToCsv();
        } else {
            console.error("exportResultsToCsv function not found");
        }
    });

    // Import CSV button event listener
    document.getElementById("importCsvButton").addEventListener("click", function(event) {
        event.stopPropagation();
        if (typeof importResultsFromCsv === 'function') {
            importResultsFromCsv();
        } else {
            console.error("importResultsFromCsv function not found");
        }
    });

    // Clear button event listener
    document.getElementById("clearButton").addEventListener("click", function(event) {
        event.stopPropagation();
        if (typeof handleClearButtonClick === 'function') {
            handleClearButtonClick();
        } else {
            console.error("handleClearButtonClick function not found");
        }
    });

    // Statistics button event listener
    document.getElementById("statisticsButton").addEventListener("click", function(event) {
        event.stopPropagation();
        if (typeof showStatisticsPopup === 'function') {
            showStatisticsPopup();
        } else {
            console.error("showStatisticsPopup function not found");
        }
    });

    // Initialize isAction if not already set
    if (typeof window.isAction === 'undefined') {
        window.isAction = true;
    }
    updateToggleButtonText();

    // Initialize dark mode state
    if (typeof loadDarkModeFromLocalStorage === 'function') {
        loadDarkModeFromLocalStorage();
    }
});

function updateToggleButtonText() {
    const toggleButton = document.getElementById("toggleButton");
    if (toggleButton) {
        toggleButton.textContent = getTranslation(window.isAction ? 'action' : 'challenge');
    }
}

function updateResultListeners() {
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) return;

    const resultCards = resultsContainer.querySelectorAll('.result-card');
    
    // Remove existing listeners first
    resultCards.forEach(card => {
        const clone = card.cloneNode(true);
        card.parentNode.replaceChild(clone, card);
    });

    // Add listener only to the first card
    const firstCard = resultsContainer.querySelector('.result-card');
    if (firstCard) {
        firstCard.addEventListener('click', toggleResultsList);
    }

    updateArrowIndicator();
    
    // Apply dark mode to new cards if dark mode is active
    if (document.body.classList.contains('dark-mode')) {
        applyDarkModeToCards();
    }
}

function toggleResultsList() {
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) return;

    resultsContainer.classList.toggle('expanded');
    updateArrowIndicator();
}

function updateArrowIndicator() {
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) return;

    const firstCard = resultsContainer.firstElementChild;
    if (firstCard) {
        if (resultsContainer.classList.contains('expanded')) {
            firstCard.setAttribute('title', getTranslation('clickToCollapse'));
        } else {
            firstCard.setAttribute('title', getTranslation('clickToExpand'));
        }
    }
}

// Ensure these functions are globally accessible
window.updateResultListeners = updateResultListeners;
window.toggleResultsList = toggleResultsList;
window.updateArrowIndicator = updateArrowIndicator;
window.updateToggleButtonText = updateToggleButtonText;
