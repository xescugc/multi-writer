(function($) {
  $.fn.getCursorPosition = function(callback) {
    var input = this.get(0);
    var position;
    if (!input) return; // No (input) element found
    if ('selectionStart' in input) {
      // Standard-compliant browsers
      position = input.selectionStart;
    } else if (document.selection) {
      // IE
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -input.value.length);
      position = sel.text.length - selLen;
    }
    if (callback) {
      callback(position);
    } else {
      return position;
    }
  }
})(jQuery)
