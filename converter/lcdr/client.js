var five = require('johnny-five');
var Edison = require('edison-io');
var board = new five.Board({
    io: new Edison()
});

board.on('ready', function () {
    var i = new Image();
    console.log('hi');
});
