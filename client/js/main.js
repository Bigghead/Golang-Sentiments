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
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(vidPlayer, 0, 0, canvasWidth, canvasHeight);
        var data = canvas.toDataURL('image/jpeg');
        parseImage(data);
    }
    function parseImage(data) {
        console.log(data);
    }
});
//# sourceMappingURL=main.js.map