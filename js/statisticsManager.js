// Function to get statistics from stored results
function getStatistics() {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    const statistics = {
        vollerErfolg: 0,
        vollerErfolgEpic: 0,
        teilerfolg: 0,
        fehlschlag: 0,
        fehlschlagEpic: 0
    };

    results.forEach(result => {
        switch (result.successType) {
            case "Voller Erfolg":
                statistics.vollerErfolg++;
                if (result.isEpic) {
                    statistics.vollerErfolgEpic++;
                }
                break;
            case "Teilerfolg":
                statistics.teilerfolg++;
                break;
            case "Fehlschlag":
                statistics.fehlschlag++;
                if (result.isEpic) {
                    statistics.fehlschlagEpic++;
                }
                break;
        }
    });

    return statistics;
}

// Ensure this function is globally accessible
window.getStatistics = getStatistics;
