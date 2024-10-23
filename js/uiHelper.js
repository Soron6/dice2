// Function to format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Function to display the latest result
function displayLatestResult(result) {
    const resultsContainer = document.getElementById("results");
    result.rollNumber = document.querySelectorAll(".result-card").length + 1;
    const resultCard = createResultCard(result);
    resultsContainer.insertBefore(resultCard, resultsContainer.firstChild);

    if (typeof updateResultListeners === 'function') {
        updateResultListeners();
    }
}

export { formatDateTime, displayLatestResult };
