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

    const buildChart = ( recObj ) => {

        const datasets = [];
        const labels   = [];
        
        for( let key in recObj ) {
            datasets.push( { 
                label: key,
                data: [ emotionMap[ recObj[key] ] ]
            } )
        }

        labels.push( new Date().getSeconds() )
        
        const ctx: CanvasRenderingContext2D = chartEl.getContext('2d');
        const newChart: any = new Chart( ctx, {
            type: 'bar',
            data: {
                labels,
                datasets
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
                xAxes: [ {
                    scaleLabel: {
                        display: true,
                        labelString: 'Time Stamp',
                        fontSize: 20
                    }
                } ]
            } 
        }
    } )
    }

    return {
        buildChart
    }
} )()