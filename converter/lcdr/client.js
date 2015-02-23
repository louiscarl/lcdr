var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
    io: new Edison(),
    repl: false
});

board.on("ready", function () {
    var car0Arr = [0x0, 0xf, 0x8, 0x2, 0xc, 0xf, 0xc];
    var car1Arr = [0x0, 0x1e, 0x2, 0x8, 0x6, 0x1e, 0x6];
    var car0LArr = [0x0, 0x7, 0x4, 0x19, 0x1c, 0x1f, 0xc];
    var car1LArr = [0x0, 0x1e, 0x2, 0x4, 0x3, 0x1f, 0x3];
    var car0RArr = [0x0, 0xf, 0x8, 0x4, 0x18, 0x1f, 0x18];
    var car1RArr = [0x0, 0x1c, 0x4, 0x13, 0x7, 0x1f, 0x6];

    var lcd = new five.LCD({
        controller: "JHD1313M1"
    });
    var rotary = new five.Sensor('A0');
    var sound = new five.Sensor('A1');
    var led = new five.Led(8);

    var renderChar = function (buffer, lcd, idx) {
        var data = [];
        for (var dy = 0; dy < 8; ++dy) {
            data.push(buffer[dy] || 0x00);
        }
        lcd.createChar(idx, data);
        return idx;
    };

    var noise = 100;
    sound.on('data', function () {
        if (this.value > 500) {
            if (noise < 200) {
                noise += 50;
            }
        }
    });

    var carPos = 8;

    rotary.on('data', function () {
        var newRotary = Math.floor(this.value / 1024 * 5);
        if (newRotary < 3) {
            // Right
            renderChar(car0RArr, lcd, 6);
            renderChar(car1RArr, lcd, 7);

            if (noise > 0) {
                carPos = carPos < 14 ? carPos + 0.25 : 14;
            }
        } else if (newRotary > 3) {
            // Left
            renderChar(car0LArr, lcd, 6);
            renderChar(car1LArr, lcd, 7);

            if (noise > 0) {
                carPos = carPos > 0 ? carPos - 0.25 : 0;
            }
        } else {
            // Straight
            renderChar(car0Arr, lcd, 6);
            renderChar(car1Arr, lcd, 7);
        }
    });

    var interpolateColor = function (d) {
        var r = 255 - 255 * d / 8;
        var g = 50 + 205 * d / 8;
        var b = 50;
        lcd.bgColor(r, g, b);
    }

    this.loop(16, function () {
        lcd.cursor(0, 0).print('                ');
        lcd.cursor(1, 0).print('                ');
        lcd.cursor(1, Math.floor(carPos)).print('\u0006\u0007');

        var d = carPos > 7 ? 15 - carPos : carPos;
        interpolateColor(d);

        if (noise > 0) {
            noise--;
        }

        lcd.cursor(0, 5).print(Math.floor(noise) + 'kph');
    });
});
