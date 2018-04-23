var chartEl = document.getElementById('chart');
var emotionMap = {
    'UNKNOWN': 0,
    'VERY_UNLIKELY': 1,
    'UNLIKELY': 2,
    'POSSIBLE': 3,
    'LIKELY': 4,
    'VERY_LIKELY': 5
};
var chart = (function () {
    var buildChart = function (recObj) {
        var datasets = [];
        var labels = [];
        for (var key in recObj) {
            datasets.push({
                label: key,
                data: [emotionMap[recObj[key]]]
            });
        }
        labels.push(new Date().getSeconds());
        var ctx = chartEl.getContext('2d');
        var newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Emotions',
                                fontSize: 20
                            }
                        }],
                    xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Time Stamp',
                                fontSize: 20
                            }
                        }]
                }
            }
        });
    };
    return {
        buildChart: buildChart
    };
})();
//# sourceMappingURL=chart.js.map