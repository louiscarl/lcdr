var render = require("./render");

var H = 14;
var W = 80;

var bits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
var shifted = new Uint8Array(W*H);

var shift = function (row, num) {
    for (var i = 0; i < W; ++i) {
        if (i + num > 0 && i + num < W) {
            shifted[i + row * W] = bits[i + num + row * W];
        }
        else {
            shifted[i + row * W] = 0;
        }
    }
};
var turn = function (row, amp, waveLen, time) {
    return Math.floor(amp * Math.sin((Math.PI / row + time) / waveLen));
};


module.exports = function(caps, menuCallback) {
	
    var carPos = 8;

    var car0Arr = [0x0, 0xf, 0x8, 0x2, 0xc, 0xf, 0xc];
    var car1Arr = [0x0, 0x1e, 0x2, 0x8, 0x6, 0x1e, 0x6];
    var car0LArr = [0x0, 0x7, 0x4, 0x19, 0x1c, 0x1f, 0xc];
    var car1LArr = [0x0, 0x1e, 0x2, 0x4, 0x3, 0x1f, 0x3];
    var car0RArr = [0x0, 0xf, 0x8, 0x4, 0x18, 0x1f, 0x18];
    var car1RArr = [0x0, 0x1c, 0x4, 0x13, 0x7, 0x1f, 0x6];

    var lcd = caps.lcd;
    var renderChar = render.renderChar;
	caps.rotator.on("data", function() {
	    var newRotary = Math.floor(this.value / 1024 * 5);
	    if (newRotary < 3) {
	        // Right
	        renderChar(car0LArr, lcd, 6);
	        renderChar(car1LArr, lcd, 7);

	        if (noise > 0) {
	            carPos = carPos < 14 ? carPos + 0.25 : 14;
	        }
	    } else if (newRotary > 3) {
	        // Left
	        renderChar(car0RArr, lcd, 6);
	        renderChar(car1RArr, lcd, 7);

	        if (noise > 0) {
	            carPos = carPos > 0 ? carPos - 0.25 : 0;
	        }
	    } else {
	        // Straight
	        renderChar(car0Arr, lcd, 6);
	        renderChar(car1Arr, lcd, 7);
	    }
	});

	var noise = 100;
	caps.sound.on('data', function () {
	    if (this.value > 500) {
	        if (noise < 200) {
	            noise += 50;
	        }
	    }
	});

	caps.lcd.bgColor(0,0,255);
	
	var t = 0;
    var waveLen = 5;
	caps.mainLoop = function() {
		if (t % 50 === 0) {
            amp = Math.random() * 4;
        }
        for (var j = 0; j < H; ++j) {
            shift(j, turn(j / 5, amp, waveLen, t));
        }
		// At this point shifted[x + y*W] is whether the pixel at x/y is set.
		var d1 = packBits(5,7);
		var d2 = packBits(5,0);
		var d3 = packBits(70,0);
		var d4 = packBits(70,7);
		var d5 = packBits(0,7);
		var d6 = packBits(75,7);

		render.renderChar(d1, caps.lcd, 0);
		render.renderChar(d2, caps.lcd, 1);
		render.renderChar(d3, caps.lcd, 2);
		render.renderChar(d4, caps.lcd, 3);
		render.renderChar(d5, caps.lcd, 4);
		render.renderChar(d6, caps.lcd, 5);

		caps.line1 = " \u0001            \u0002 ";
		caps.line2 = "\u0004\u0000            \u0003\u0005";

		var index = 5;
		var kph = Math.floor(noise) + 'kph';
		caps.line1 = caps.line1.substr(0, index) + kph
	        + caps.line1.substr(index + kph.length);

		index = Math.floor(carPos);
		caps.line2 = caps.line2.substr(0, index)
            + '\u0007\u0006'
            + caps.line2.substr(index + 2);

		if (noise > 0) {
		    t++;
		    noise--;
		}

		if (t > 1000) {
			caps.mainLoop = null;
			caps.lcd.bgColor(255,255,255);
			menuCallback();
		} else {
			var cols = interpColorAtTime(t);
			caps.lcd.bgColor(cols.r, cols.g, cols.b);
		}
	};
	
}

var packBits = function(x,y) {
	// convert the shift array starting at x, y to a character
	var data = [];
	for(var dy = 0; dy < 7; ++dy) {
		var d = 0;
		for(var dx = 5; dx >= 0; --dx) {
			d = d << 1;
			d |= shifted[x + dx + (y + dy) * W] ? 1 : 0;
		}
		data.push(d);
	}
	return data;
} 

var interpColorAtTime = function(t) {
	var ret = {};
	ret.r = 255;
	ret.g = 255;
	ret.b = 255;

	

	if (t < 500) {
		var pct = t/500;
		// blue to yellow;
		ret.r = 128 * (pct);
		ret.g = 128 * pct;
		ret.b = 255 * (1-pct);
	} else if (t < 800) {
		// yellow to red;
		var pct = (t-500)/500;
		ret.b = 0;
		ret.r = 255 * (0.5 + (pct * 0.5));
		ret.g = 128 * (1-pct);
	} else {
		var pct = (t-800)/200;
		ret.b = 0;
		ret.r = 255 * (0.5 + (0.6 * 0.5)) * (1-pct)
		ret.g = 128 * (1-.6) * (1-pct);
	}

	return ret;
}
