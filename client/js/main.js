document.addEventListener('DOMContentLoaded', function () {
    // ==== GLOBALS ===== //
    var ratio = 1.6;
    var canvasWidth = 1180;
    var canvasHeight = (canvasWidth / ratio);
    // ===== DOM STUFFS ===== //
    var captureBtn = document.getElementById('capture-button');
    var vidPlayer = document.getElementById('video-player');
    var canvas = document.getElementById('canvas');
    // ===== Listeners ===== //
    captureBtn.addEventListener('click', getImage);
    function getImage() {
        var ctx = canvas.getContext('2d');
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
            .then(function (res) {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res;
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            var mappedRes = JSON.parse(res).map(function (r) {
                return {
                    "Joy": r.joyLikelihood,
                    "Sorrow": r.sorrowLikelihood,
                    "Anger": r.angerLikelihood,
                    "Surprise": r.surpriseLikelihood
                };
            });
            console.log(mappedRes);
            chart.buildChart(mappedRes[0]);
        })
            .catch(function (err) { return console.log(err); });
    }
});
//# sourceMappingURL=main.js.map