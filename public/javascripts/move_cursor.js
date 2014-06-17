(function($) {
  $.fn.moveCursorPosition = function(position) {
    var input = this.get(0);
    if (!input) return; // No (input) element found
    // Standard-compliant browsers
    input.selectionEnd = position + 1;
    return input.selectionStart = position + 1;
  }
})(jQuery)
