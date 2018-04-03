var chartEl = document.getElementById('chart');
var chart = (function () {
    var buildChart = function () {
        var ctx = chartEl.getContext('2d');
        var newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                    }]
            }
        });
    };
    return {
        buildChart: buildChart
    };
})();
//# sourceMappingURL=chart.js.map