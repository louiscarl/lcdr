var renderChar = function(buffer, lcd, idx) {
	// Renders an 8 byte buffer to a character idx.
	// each byte only uses the low 5 bits
	// Only 8 such characters are supported at a time
	var data = [];
	for(var dy = 0; dy < 8; ++dy) {
		var d = 0;
		for (var i = 0; i < 5; ++i) {
			d = d << 1;
			d |= (buffer[dy] >> i) & 0x1;
		}
		data.push(d);
	}
	lcd.createChar(idx, data);
	return idx;
}

var renderBuffer = function(buffer, lcd, w,cw,ch) {
	// render the w by h pixel buffer to 5x8 pixel characters,
	// numbered sequentially from top left to bottom right

	var idx = 0;
	for(var cy = 0; cy < ch; ++cy) {
		for(var cx = 0; cx < cw; ++cx) {
			// compute the character data for the 5x8 block in this location
			var data = new Uint8Array(8);
			for(var y = 0; y < 8; ++y) {
				// grab the 5 bits on row
				// (cy * 8) + y
				// starting at bit offset
				// (cx * 5)
				data[y] = 0;
				for(var x = 0; x < 5; ++x) {
					var startRow = (cy * 8) + y
					var startBitOffset = cx * 5;
					var startInByteOffset = startBitOffset % 8;
					var startByteOffset = startRow * w/8 + Math.floor(startBitOffset / 8);
					//  Byte 01234567
					//  with offset 0 becomes
					//       01234XXX
					//  with offset 3 becomes
					//       34567XXX
					//  with offset 5 becomes
					//       567**XXX
					data[y] = (buffer[startByteOffset] >> startInByteOffset) & 0x1F;
					if (startInByteOffset > 3) {
						data[y] |= (buffer[startByteOffset + 1] & 
									((1 << (5+startInByteOffset-8))-1))
							<< (8-startInByteOffset);
					}
				}
			}
			renderChar(data, lcd, idx);
			++idx;
		}
	}
}

module.exports = renderBuffer
module.exports.renderChar = renderChar;
