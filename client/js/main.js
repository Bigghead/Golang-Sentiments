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
            body: JSON.stringify({ image: "HELLO" })
        })
            .then(function (res) { return res.json(); })
            .then(function (res) { return console.log(res); })
            .catch(function (err) { return console.log(err); });
    }
});
//# sourceMappingURL=main.js.map