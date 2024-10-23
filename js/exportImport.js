// Function to export results to CSV
function exportResultsToCsv() {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    if (results.length === 0) {
        showMessage('info', getTranslation('noResults'));
        return;
    }

    let csvContent = "Roll Number,Action/Challenge,Topic,Success Type,Epic,D6,D10_1,D10_2,Result,Modifier,Timestamp\n";

    results.forEach((result, index) => {
        const row = [
            results.length - index,
            result.isAction ? getTranslation('action') : getTranslation('challenge'),
            result.topic,
            result.successType,
            result.isEpic,
            result.d6,
            result.d10_1,
            result.d10_2,
            result.result,
            result.modifier,
            result.timestamp
        ];
        csvContent += row.map(item => `"${item}"`).join(",") + "\n";
    });

    // Generate a unique filename
    const filename = `IronDiceRoller_${Date.now()}.csv`;

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', blob, filename);

    // Check if running in Median environment
    if (navigator.userAgent.indexOf('median') > -1) {
        // Use fetch to upload the file to tmpfiles.org
        fetch('https://tmpfiles.org/api/v1/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const uploadUrl = data.data.url;
            // Generate the direct download URL
            const downloadUrl = uploadUrl.replace('/api/v1/', '/dl/');
            
            // Show message with download link
            showDownloadMessage('info', getTranslation('exportSuccess'), downloadUrl, filename);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            showMessage('error', getTranslation('exportError'));
        });
    } else {
        // Fallback for non-Median environments (e.g., web browsers)
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Function to import results from CSV
function importResultsFromCsv() {
    showConfirmMessage(getTranslation('confirmImport'), () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';

        input.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const content = e.target.result;
                const lines = content.split('\n');
                const results = [];

                // Skip the header row
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim() === '') continue;
                    const values = lines[i].split(',').map(value => value.replace(/^"|"$/g, ''));
                    const result = {
                        isAction: values[1] === getTranslation('action'),
                        topic: values[2],
                        successType: values[3],
                        isEpic: values[4] === "true",
                        d6: parseInt(values[5]),
                        d10_1: parseInt(values[6]),
                        d10_2: parseInt(values[7]),
                        result: parseInt(values[8]),
                        modifier: parseInt(values[9]),
                        timestamp: values[10],
                        resultImage: getResultImage(values[3])
                    };
                    results.push(result);
                }

                // Save imported results to localStorage
                localStorage.setItem("results", JSON.stringify(results));

                // Reload and display the imported results
                loadResultsFromLocalStorage();

                showMessage('success', getTranslation('importSuccess'));
            };

            reader.readAsText(file);
        };

        input.click();
    });
}

// Function to handle clear button click
function handleClearButtonClick() {
    showConfirmMessage(getTranslation('confirmClear'), () => {
        if (typeof clearResultsFromLocalStorage === 'function') {
            clearResultsFromLocalStorage();
        } else {
            console.error("clearResultsFromLocalStorage function not found");
        }
    });
}

// Ensure these functions are globally accessible
window.exportResultsToCsv = exportResultsToCsv;
window.importResultsFromCsv = importResultsFromCsv;
window.handleClearButtonClick = handleClearButtonClick;
