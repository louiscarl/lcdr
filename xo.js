var render = require("./render");

module.exports = function(caps, menuCallback) {
	caps.line1 = "\u0000\u0001             X";
	caps.line2 = "\u0002\u0003              ";
	
	var buffer = new Uint8Array(3 * 2 * 8);

	var gamestate = [0,0,0,
					 0,0,0,
					 0,0,0];
	gamestate.selected = 0 ;
	gamestate.turn = 1;

	caps.rotator.on("data", function() {
		gamestate.selected = Math.floor((this.value /1024) * 9);
		stateToScreen(gamestate,buffer);
		render(buffer, caps.lcd, 16,2,2);
	});
	caps.button.once("release", function() {
		caps.button.on("release", function() {
			if (gamestate[gamestate.selected] === 0) {
				gamestate[gamestate.selected] = gamestate.turn;
				gamestate.turn = (gamestate.turn === 1 ? 2 : 1);
				caps.line1 = "\u0000\u0001             " + (gamestate.turn === 1 ? "X" : "O");
				var winner = checkWinner(gamestate);
				if (winner) {
					caps.rotator.removeAllListeners("data");
					caps.button.removeAllListeners("relase");
					caps.line2 = "\u0002\u0003  " + winner + " WINS!";
					setTimeout(menuCallback,5000);
				} else {
					stateToScreen(gamestate, buffer);
					render(buffer, caps.lcd, 16,2,2);
				}
			}
		});
	});

	
	stateToScreen(gamestate, buffer);
	render(buffer, caps.lcd, 16,2,2);
}

function checkWinner(state) {
	if (state[0] && 
		 ((state[0] === state[1] && state[1] === state[2])
		  ||(state[0] === state[3] && state[3] === state[6])
		  ||(state[0] === state[4] && state[4] === state[8])
		 )
		) {
		return [null,"X","O"][state[0]];
	}
	if (state[1] && state[1] === state[4] && state[4] === state[7]) {
		return [null,"X","O"][state[1]];
	}
	if (state[2] && 
		((state[2] === state[5] && state[5] === state[7])
		 ||(state[2] === state[4] && state[4] === state[6])
		)
	   ) {
		return [null,"X","O"][state[2]];
	}
	if (state[3] && state[3] === state[4] && state[4] === state[5]) {
		return [null,"X","O"][state[3]];
	}
	if (state[6] && state[6] === state[7] && state[7] === state[8]) {
		return [null,"X","O"][state[1]];
	}
	if (state.indexOf(0) === -1) return "-";
	return null;
}

function stateToScreen(state, buffer) {
	for(var x = 0; x < 3; ++x) {
		for(var y = 0; y < 3; ++y) {
			var selected = (y*3 + x) === state.selected;
			switch(state[y*3 + x]) {
				case 1: drawX(buffer, x*3, y*3, selected);break;
				case 2: drawO(buffer, x*3, y*3, selected);break;
				default: drawBlank(buffer, x*3, y*3, selected);break;
			}
		}
	}
}

function drawX(buffer, x, y, s) {
	setBit(buffer, x,   y,   !s);
	setBit(buffer, x+1, y,   s);
	setBit(buffer, x+2, y,   !s);
	setBit(buffer, x,   y+1, s);
	setBit(buffer, x+1, y+1, !s);
	setBit(buffer, x+2, y+1, s);
	setBit(buffer, x,   y+2, !s);
	setBit(buffer, x+1, y+2, s);
	setBit(buffer, x+2, y+2, !s);
}
function drawO(buffer, x, y, s) {
	setBit(buffer, x,   y,   !s);
	setBit(buffer, x+1, y,   !s);
	setBit(buffer, x+2, y,   !s);
	setBit(buffer, x,   y+1, !s);
	setBit(buffer, x+1, y+1,  s);
	setBit(buffer, x+2, y+1, !s);
	setBit(buffer, x,   y+2, !s);
	setBit(buffer, x+1, y+2, !s);
	setBit(buffer, x+2, y+2, !s);
}
function drawBlank(buffer, x, y, s) {
	setBit(buffer, x,   y,   s);
	setBit(buffer, x+1, y,   s);
	setBit(buffer, x+2, y,   s);
	setBit(buffer, x,   y+1, s);
	setBit(buffer, x+1, y+1, s);
	setBit(buffer, x+2, y+1, s);
	setBit(buffer, x,   y+2, s);
	setBit(buffer, x+1, y+2, s);
	setBit(buffer, x+2, y+2, s);
}


function setBit(buffer, x, y, onoff) {
	var bytewidth = 2;
	var row = bytewidth * y;
	var colbyte = Math.floor(x/8);
	var bytebit = x % 8;
	if (onoff) {
		buffer[row + colbyte] |= 1 << bytebit;
	} else {
		buffer[row + colbyte] &= ~(1 << bytebit);
	}
}
