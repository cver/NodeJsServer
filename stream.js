var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var stream = require('socket.io-stream');
var fs = require("fs");
server.listen(process.env.PORT || 4443);
 
io.sockets.on('connection', function(socket) {
	console.log("on stream");
  socket.on('profile-image', function(stream, data) {
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  });
});