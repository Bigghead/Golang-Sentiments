document.addEventListener('DOMContentLoaded', function () {
    // ==== GLOBALS ===== //
    var ratio = 1.6;
    var canvasWidth = 1180;
    var canvasHeight = (canvasWidth / ratio);
    // ===== DOM STUFFS ===== //
    var vidPlayer = document.getElementById('video-player');
    var captureBtn = document.getElementById('capture-button');
    var canvas = document.getElementById('canvas');
    // ===== Listeners ===== //
    captureBtn.addEventListener('click', getImage);
    chart.buildChart();
    function getImage() {
        var ctx = canvas.getContext('2d');
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(vidPlayer, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/jpeg');
        parseImage(data);
    }
    function parseImage(image) {
        // image = image.replace(/^data:image\/jpeg+;base64,/, "");
        // image = image.replace(/ /g, '+');
        fetch('/send', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ image: image })
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            console.log(JSON.parse(res).map(function (r) {
                return {
                    "joyLikelihood": r.joyLikelihood,
                    "sorrowLikelihood": r.sorrowLikelihood,
                    "angerLikelihood": r.angerLikelihood,
                    "surpriseLikelihood": r.surpriseLikelihood
                };
            }));
        })
            .catch(function (err) { return console.log(err); });
    }
});
//# sourceMappingURL=main.js.map