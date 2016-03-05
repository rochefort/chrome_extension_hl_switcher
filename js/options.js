(function(){
  'use strict';
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
          _save();
        }
      });

      $('save').addEventListener('click', function() {
        _save();
      });
    };

    /**
     * Shorthand of getElementById
     */
    var $ = function(id) {
      return document.getElementById(id);
    };

    /**
     * Save hl
     */
    var _save = function() {
      var hl = $('hl');
      if (!/^[a-zA-z]+$/.test(hl.value)) {
        _setErrorMessage('Error: only alphabets are allowed.');
        return;
      }
      hl.value = hl.value.toLowerCase();
      localStorage.hl = hl.value;
      _setMessage('Option Saved.');
    };

    /**
     * Show an error message
     */
    var _setErrorMessage = function(message) {
      _setMessage(message, '#bd3f55');
    };

    /**
     * Show a message
     */
    var _setMessage = function(message, color) {
      var elm = $('message');
      elm.style.color = color ? color : '#2c7d3e';
      elm.innerHTML = message;
      setTimeout(function() {
        elm.innerHTML = '';
      }, 1000);
    };
  }

  var option = new HlSwitcherOption();
  option.init();
})();
