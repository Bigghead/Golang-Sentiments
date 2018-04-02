document.addEventListener( 'DOMContentLoaded', () => {


    // ==== GLOBALS ===== //
    const ratio : number = 1.6;
    const canvasWidth :number = 1180;
    const canvasHeight:number = (canvasWidth/ratio);


    // ===== DOM STUFFS ===== //
    const vidPlayer  = <HTMLVideoElement>document.getElementById('video-player');
    const captureBtn = document.getElementById('capture-button');
    const canvas     = <HTMLCanvasElement>document.getElementById('canvas');
    
    
    // ===== Listeners ===== //

    captureBtn.addEventListener( 'click', getImage );


    function getImage() :void {
        let ctx  = canvas.getContext('2d');
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(vidPlayer, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/jpeg')
        parseImage(data);
    }

    function parseImage(image :string) :void {
        // image = image.replace(/^data:image\/jpeg+;base64,/, "");
        // image = image.replace(/ /g, '+');

         fetch('/send', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
              },
            body: JSON.stringify(  { image }  )
        } )
            .then( res => res.json() )
            .then( res => console.log(res) )
            .catch( err => console.log(err) )
    }
} )