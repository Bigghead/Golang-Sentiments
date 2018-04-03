declare const Chart: any;

const chartEl = <HTMLCanvasElement>document.getElementById('chart');

const chart = ( () => {

    const buildChart = () => {
      const ctx = chartEl.getContext('2d');
      const newChart = new Chart( ctx, {
          type: 'line',
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
            }]
          }
      })
    }

    return {
        buildChart
    }
} )()