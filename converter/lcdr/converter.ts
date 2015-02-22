var H = 14;
var W = 80;
var ctx;
var imageData;
var LEN = W * H;
var bits: Uint8Array = new Uint8Array(LEN);
var shifted: Uint8Array = new Uint8Array(LEN);

var start = function() {
    var c: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    ctx = c.getContext('2d');
    var out: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("out");
    var ctxOut = out.getContext('2d');

    var image = document.getElementById("img");
    ctx.drawImage(image, 0, 0);

    imageData = ctx.getImageData(0, 0, W, H);
    for (var i = 0; i < LEN; i++) {
        if (imageData.data[i * 4] === 0) {
            bits[i] = 1;
        } else {
            bits[i] = 0;
        }
    }
    var count = 0;
    for (var i = 0; i < LEN; i++) {
        if (bits[i] !== 0) {
            count++;
        }
    }
    var preview = function() {
        for (var i = 0; i < LEN; ++i) {
            imageData.data[i * 4] = shifted[i] * 255;
            imageData.data[i * 4 + 1] = shifted[i] * 255;
            imageData.data[i * 4 + 2] = shifted[i] * 255;
        }
        ctxOut.putImageData(imageData, 0, 0);
    };

    var shift = function(row, num) {
        for (var i = 0; i < W; ++i) {
            if (i + num > 0 && i + num < W) {
                shifted[i + row * W] = bits[i + num + row * W];
            } else {
                shifted[i + row * W] = 0;
            }
        }
    };

    var turn = function(row, amp, waveLen, time) {
        return Math.floor(amp * Math.sin((Math.PI / row + t) / waveLen));
    };

    var t = 0;
    setInterval(function() {
        for (var j = 0; j < H; ++j) {
            shift(j, turn(j / 5, 4, 10, t));
            preview();
        }
        t++;
    }, 33);
};
document.getElementById('img').addEventListener('click', start);