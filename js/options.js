(function(){

  function HlSwitcherOption() {
    /**
     * Initializer
     */
    this.init = function() {
      var hl = localStorage.hl;
      if (!hl) {
        hl = 'ja';
        localStorage.hl = hl;
      }
      $('hl').value = hl;

      $('hl').addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
          $('save').click();
        }
      });

      $('save').addEventListener('click', function() {
        var hl = $('hl');
        hl.value = hl.value.toLowerCase();
        localStorage.hl = hl.value;
        _setMessage('Options Saved.');
      });
    };

    /**
     * Shorthand of getElementById
     */
    var $ = function(id) {
      return document.getElementById(id);
    };

    /**
     * Show message
     */
    var _setMessage = function(message) {
      var elm = $('message');
      elm.innerHTML = message;
      setTimeout(function() {
        elm.innerHTML = '';
      }, 1000);
    };
  }

  var option = new HlSwitcherOption();
  option.init();
})();
