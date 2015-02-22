var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
	io: new Edison(),
	repl: false
});

board.on("ready", function() {
	var lcd = new five.LCD({
		controller: "JHD1313M1"
	});

	var rotator = new five.Sensor("A0");
	var button = new five.Button(2);

	var capabilities = {lcd: lcd, rotator: rotator, button: button};

	//           123456789abcdef0
	var line1 = "Do you want to  ";
	var line2 = "play a game?    ";
	var space = "                ";

	var frame = 0;

	var rotatorFunction;
	var buttonFunction;
	var rotatorChoices;

	var dummyfn = function(caps, menuCallback) {
		line1 = "You have chosen the following";
		line2 = "Choice: " + rotatorChoices[caps.rotator.choice].text;
		setTimeout(menuCallback, 10000);
	};

	var mainMenuChoices = [
		{text: "Outrunner", fn: dummyfn},
		{text: "Battleship", fn: dummyfn},
		{text: "Naughts and Crosses", fn: dummyfn}
	];	
	
	rotatorFunction = function() {
		this.choice = Math.floor((this.value / 1024) * rotatorChoices.length);
		line2 = rotatorChoices[this.choice];
	};

	buttonFunction = function() {
		rotator.removeListener("data", rotatorFunction);
		button.removeListener("press", buttonFunction);
		frame = 0;
		rotatorChoices[rotator.choice].fn(capabilities,function() {
			frame = 0;
			line1 = "Select an option using the rotator and button"
			rotator.on("data", rotatorFunction);
			button.on("press", buttonFunction);
		});
	};
	
	
	setTimeout(function() {
		rotatorChoices = mainMenuChoices
		button.on("press", buttonFunction);
		rotator.on("data", rotatorFunction);
	}, 2000);
	
	// 60FPS!
	this.loop(16, function() {
		++frame;
		var seconds = frame/60.0;
		var line1Offset = lineOffset(line1.length, seconds, 3, 2, 0.5);
		var line2Offset = lineOffset(line2.length, seconds, 3, 2, 0.5);
		var pline1 = (line1 + space).substring(line1Offset,line1Offset+16);
		var pline2 = (line2 + space).substring(line2Offset,line2Offset+16);
		lcd.cursor(0,0).print(pline1,{dontProcessSpeciails: true});
		lcd.cursor(1,0).print(pline2,{dontProcessSpeciails: true});
	});
});

function lineOffset(length, time, startWait, endWait, timePerChar) {
	// Given length characters at a specified time, how fast should we scroll
	var overflow = length - 16;
	if (overflow <= 0) { return 0; }

	var totalTime = startWait + endWait + (timePerChar * overflow);
	var t = time % totalTime;
	if (t < startWait) { return 0; }
	if (t > startWait + timePerChar * overflow) { return length-16; }
	return (t - startWait) / timePerChar;
}
