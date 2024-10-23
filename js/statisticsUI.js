function showStatisticsPopup() {
    closeSidePanel();

    const statisticsData = getStatistics();
    const total = statisticsData.vollerErfolg + statisticsData.teilerfolg + statisticsData.fehlschlag;

    const popup = document.createElement('div');
    popup.id = 'statisticsPopup';
    popup.innerHTML = `
        <h3>Statistiken</h3>
        <div id="statisticsContent">
            <p>Voller Erfolg: ${statisticsData.vollerErfolg} (${((statisticsData.vollerErfolg / total) * 100).toFixed(2)}%)</p>
            <p class="indent">episch: ${statisticsData.vollerErfolgEpic}</p>
            <p>Teilerfolg: ${statisticsData.teilerfolg} (${((statisticsData.teilerfolg / total) * 100).toFixed(2)}%)</p>
            <p>Fehlschlag: ${statisticsData.fehlschlag} (${((statisticsData.fehlschlag / total) * 100).toFixed(2)}%)</p>
            <p class="indent">episch: ${statisticsData.fehlschlagEpic}</p>
        </div>
        <div id="pieChartContainer">
            <canvas id="statisticsPieChart"></canvas>
        </div>
        <button id="closeStatisticsButton">OK</button>
    `;

    document.body.appendChild(popup);

    const ctx = document.getElementById('statisticsPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Voller Erfolg', 'Teilerfolg', 'Fehlschlag'],
            datasets: [{
                data: [statisticsData.vollerErfolg, statisticsData.teilerfolg, statisticsData.fehlschlag],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    document.getElementById('closeStatisticsButton').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// Ensure this function is globally accessible
window.showStatisticsPopup = showStatisticsPopup;
