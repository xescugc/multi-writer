_.mixin(_.str.exports());
var socket  = io.connect(window.location.href);
var $sheet  = $('#sheet');
var forbiddenKeys  = [8, 13, 40, 38, 37, 39, 46];
socket.on('keypress', function(data) {
  // if (!_.contains(forbiddenKeys, data.keyCode)){
  $sheet.val(_.insert($sheet.val(), data.position, data.key));
  if (data.socket = socket.socket.transport.sessid) {
    $sheet.moveCursorPosition(data.position);
  }
  // }
})

$sheet.on('keypress', function(e) {
  if (!_.contains(forbiddenKeys, e.keyCode)){
    e.preventDefault();
  } else {
    switch (e.keyCode) {
      case 13:
        e.key = '\n';
        break;
    }
  }
  console.log(e);
  socket.emit('keypress',
              {
                position: $sheet.getCursorPosition(),
                keyCode: e.keyCode,
                socekt: socket.socket.transport.sessid,
                key: e.key
              }
             );
})
