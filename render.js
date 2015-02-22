var renderChar = function(buffer, lcd, idx) {
	// Renders an 8 byte buffer to a character idx.
	// each byte only uses the low 5 bits
	// Only 8 such characters are supported at a time
	var data = [];
	for(var dy = 0; dy < 8; ++dy) {
		data.push(buffer[dy] || 0x00);
	}
	lcd.createChar(idx, data);
	return idx;
}

var renderBuffer = function(buffer, lcd, w,h) {
	
}

module.exports = renderBuffer
module.exports.renderChar = renderChar;
