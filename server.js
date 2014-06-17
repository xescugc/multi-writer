var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io').listen(server);

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});

app.use('/public/components', express.static(__dirname + '/public/components'));
app.use('/public/javascripts', express.static(__dirname + '/public/javascripts'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.join('multi-writer');
  socket.on('keypress', function (data) {
    io.sockets.in('multi-writer').emit('keypress', data);
  });
});
