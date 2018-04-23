document.addEventListener( 'DOMContentLoaded', () => {


    // ==== GLOBALS ===== //
    const ratio : number = 1.6;
    const canvasWidth :number = 1180;
    const canvasHeight:number = ( canvasWidth/ratio );

    interface Recognition {
        joyLikelihood     : string,
        sorrowLikelihood  : string,
        angerLikelihood   : string,
        surpriseLikelihood: string
    }


    // ===== DOM STUFFS ===== //
    const captureBtn = document.getElementById( 'capture-button' );
    const vidPlayer  = <HTMLVideoElement>document.getElementById( 'video-player' );
    const canvas     = <HTMLCanvasElement>document.getElementById( 'canvas' );
    
    
    // ===== Listeners ===== //

    captureBtn.addEventListener( 'click', getImage );


    chart.buildChart()


    function getImage() :void {
        let ctx: CanvasRenderingContext2D  = canvas.getContext( '2d' );
        ctx.drawImage( vidPlayer, 0, 0, canvas.width, canvas.height );
        let data: string = canvas.toDataURL( 'image/jpeg' )
        parseImage( data  );
    }
    

    function parseImage(image :string ) :void {
        // image = image.replace(/^data:image\/jpeg+;base64,/, "");
        // image = image.replace(/ /g, '+');

         fetch('/send', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
              },
            body: JSON.stringify(  { image }  )
        } )
            .then( res => {
                if(!res.ok ) {
                    throw new Error(res.statusText);
                }
                return res;
            } )
            .then( res => res.json() )
            .then( res => {

                const mappedRes : Array<Recognition> = JSON.parse(res).map( r => {
                    return {
                        "joyLikelihood"     : r.joyLikelihood,
                        "sorrowLikelihood"  : r.sorrowLikelihood,
                        "angerLikelihood"   : r.angerLikelihood,
                        "surpriseLikelihood": r.surpriseLikelihood
                    }
                } );
                console.log( res );

            } )
            .catch( err => console.log(err) )
    }
} )