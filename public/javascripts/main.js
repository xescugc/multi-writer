_.mixin(_.str.exports());
var socket  = io.connect(window.location.href);
var $sheet  = $('#sheet');
var forbiddenKeys   = [40, 38, 37, 39];
// var specialKeys     = [8, 13, 46];
socket.on('keypress', function(data) {
  if (!_.contains(forbiddenKeys, data.keyCode)){
    var moveCursor = 0;
    $sheet.getCursorPosition(function(currentCursorPosition) {
      console.log(currentCursorPosition);
      switch (data.keyCode) {
        case 13:
          $sheet.val(_.insert($sheet.val(), data.position, '\n'));
        break;
        case 8:
          moveCursor = 2
        $sheet.val(_.splice($sheet.val(), data.position -1, 1, ''));
        break;
        case 46:
          moveCursor = 1
        $sheet.val(_.splice($sheet.val(), data.position, 1, ''));
        break;
        default:
          $sheet.val(_.insert($sheet.val(), data.position, data.key));
      }
      if (data.socket == socket.socket.transport.sessid) {
        $sheet.moveCursorPosition(data.position - moveCursor);
      } else {
        $sheet.moveCursorPosition(currentCursorPosition -1 );
      }
    });
  }
})

$sheet.on('keypress', function(e) {
  if (!_.contains(forbiddenKeys, e.keyCode)){
    e.preventDefault();
  }
  console.log(e);
  socket.emit('keypress',
              {
                position: $sheet.getCursorPosition(),
                keyCode: e.keyCode,
                socket: socket.socket.transport.sessid,
                key: e.key
              }
             );
})
