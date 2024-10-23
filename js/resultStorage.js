// Function to save an individual result to localStorage
function saveResultToLocalStorage(resultObj) {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(resultObj);
    localStorage.setItem("results", JSON.stringify(results));
}

// Function to load all results from localStorage and display them
function loadResultsFromLocalStorage() {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) {
        console.error("Results container not found");
        return;
    }
    
    resultsContainer.innerHTML = "";
    
    if (results.length === 0) {
        return;
    }
    
    results.reverse().forEach((result, index) => {
        result.rollNumber = results.length - index;
        const resultCard = createResultCard(result);
        resultsContainer.appendChild(resultCard);
    });

    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    } else {
        console.error("updateResultListeners function not found");
    }

    // Apply dark mode to result cards if necessary
    applyDarkModeToCards();
}

// Function to clear all results from localStorage
function clearResultsFromLocalStorage() {
    localStorage.removeItem("results");
    const resultsContainer = document.getElementById("results");
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    }
}

// Helper function to get the appropriate result image
function getResultImage(successType) {
    switch (successType) {
        case "Voller Erfolg": return 'assets/vollerErfolg.png';
        case "Teilerfolg": return 'assets/Teilerforg.png';
        case "Fehlschlag": return 'assets/Fehlschlag.png';
        default: return '';
    }
}

// Ensure these functions are globally accessible
window.saveResultToLocalStorage = saveResultToLocalStorage;
window.loadResultsFromLocalStorage = loadResultsFromLocalStorage;
window.clearResultsFromLocalStorage = clearResultsFromLocalStorage;
window.getResultImage = getResultImage;
