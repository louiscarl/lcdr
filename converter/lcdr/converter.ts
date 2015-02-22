var H = 14;
var W = 80;
var ctx;
var imageData;
var LEN = W * H;
var bits: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
//new Uint8Array(LEN);
var shifted: Uint8Array = new Uint8Array(LEN);

var start = function() {
    var c: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    ctx = c.getContext('2d');
    var out: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("out");
    var ctxOut = out.getContext('2d');

    var image = document.getElementById("img");
    ctx.drawImage(image, 0, 0);

    imageData = ctx.getImageData(0, 0, W, H);
    /*for (var i = 0; i < LEN; i++) {
        if (imageData.data[i * 4] === 0) {
            bits[i] = 1;
        } else {
            bits[i] = 0;
        }
    }*/

    var preview = function() {
        for (var i = 0; i < LEN; ++i) {
            imageData.data[i * 4] = shifted[i] * 255;
            imageData.data[i * 4 + 1] = shifted[i] * 255;
            imageData.data[i * 4 + 2] = shifted[i] * 255;
        }
        ctxOut.putImageData(imageData, 0, 0);
    };

    var str = '[';
    for (var i = 0; i < LEN; ++i) {
        str += bits[i] + ',';
    }
    str += ']';
    document.getElementById('cons').innerText = str;

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

    var car = function () {
        var carImage = document.getElementById('car1');
        var carImageLeft = document.getElementById('car2');
        var carImageRight = document.getElementById('car3');
        var carcanvas = <HTMLCanvasElement>document.getElementById('carcanvas');
        var carctx = carcanvas.getContext('2d');
        var iteration = 0;

        var carBits = new Uint8Array(35 * 7);
        setInterval(function () {
            switch (iteration % 4) {
                case 0:
                case 2:
                    carctx.drawImage(carImage, 0, 0);
                    break;
                case 1:
                    carctx.drawImage(carImageLeft, 0, 0);
                    break;
                case 3:
                    carctx.drawImage(carImageRight, 0, 0);
                    break;
            }

            var carImageData = carctx.getImageData(0, 0, 10, 7);
            for (var i = 0; i < 35 * 7; ++i) {
                if (carImageData.data[i * 4] === 0) {
                    carBits[i] = 1;
                } else {
                    carBits[i] = 0;
                }
            }

            for (var i = 0; i < LEN; ++i) {
                imageData.data[i * 4] = shifted[i] * 255;
                imageData.data[i * 4 + 1] = shifted[i] * 255;
                imageData.data[i * 4 + 2] = shifted[i] * 255;
            }
            ctx.putImageData(imageData, 0, 0);

            for (var i = 0; i < 37 * 7; ++i) {
                carImageData.data[i * 4] = carBits[i] * 255;
                carImageData.data[i * 4 + 1] = carBits[i] * 255;
                carImageData.data[i * 4 + 2] = carBits[i] * 255;                
            }
            ctx.putImageData(carImageData, 35 + (iteration % 4 - 2) * 10, 7);

            /*var sectionToChar = function (arr: Uint8Array, xw: number, xh: number) {
                var cha = [];
                for (var j = 0; j < 7; j++) {
                    var v = 0;
                    v += arr[0 + xw + (j + xh) * 5] === 1 ? 0x10 : 0;
                    v += arr[1 + xw + (j + xh) * 5] === 1 ? 0x08 : 0;
                    v += arr[2 + xw + (j + xh) * 5] === 1 ? 0x04 : 0;
                    v += arr[3 + xw + (j + xh) * 5] === 1 ? 0x02 : 0;
                    v += arr[4 + xw + (j + xh) * 5] === 1 ? 0x01 : 0;
                    cha.push(v);
                }
                return cha;
            }

            console.log(sectionToChar(carBits, 0, 0));
            console.log(sectionToChar(carBits, 6, 0));*/

            iteration++;
        }, 500);
    };
    car();

    var t = 0;
    var amp = 0;
    var waveLen = 10;
    setInterval(function () {
        if (t % 50 === 0) {
            amp = Math.random() * 4;
        }
        for (var j = 0; j < H; ++j) {
            shift(j, turn(j / 5, amp, waveLen, t));
            preview();
        }
        t++;
    }, 33);
};
document.getElementById('img').addEventListener('click', start);

var car0Arr = [0x0, 0xf, 0x8, 0x2, 0xc, 0xf, 0xc];
var car1Arr = [0x0, 0x1e, 0x2, 0x8, 0x6, 0x1e, 0x6];
var car0LArr = [0x0, 0x7, 0x4, 0x19, 0x1c, 0x1f, 0xc];
var car1LArr = [0x0, 0x1e, 0x2, 0x4, 0x3, 0x1f, 0x3];
var car0RArr = [0x0, 0xf, 0x8, 0x4, 0x18, 0x1f, 0x18];
var car1RArr = [0x0, 0x1c, 0x4, 0x13, 0x7, 0x1f, 0x6];
