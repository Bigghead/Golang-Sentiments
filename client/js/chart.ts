declare const Chart: any;

const chartEl = <HTMLCanvasElement>document.getElementById('chart');

const emotionMap = {
    'UNKNOWN'      : 0,
    'VERY_UNLIKELY': 1,
    'UNLIKELY'     : 2,	
    'POSSIBLE'     : 3,	
    'LIKELY'       : 4,
    'VERY_LIKELY'  : 5
}

const chart = ( () => {

    const buildChart = () => {
      const ctx: CanvasRenderingContext2D = chartEl.getContext('2d');
      const newChart: any = new Chart( ctx, {
          type: 'line',
          data: {
            labels: ['joyLikelihood','sorrowLikelihood', 'angerLikelihood','surpriseLikelihood'],
            datasets: [{
                label: '# of Votes',
                data: ['joyLikelihood','sorrowLikelihood', 'angerLikelihood','surpriseLikelihood'],
            }]
          },
          options: {
            responsive:true,
            maintainAspectRatio:false,
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
      })
    }

    return {
        buildChart
    }
} )()