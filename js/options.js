'use strict';
(function(){
  /**
   * Shorthand of getElementById
   */
  function $(id) {
    return document.getElementById(id);
  }

  class HlSwitcherOption {
    constructor() {
      let hl = localStorage.hl;
      if (!hl) {
        hl = 'ja';
        localStorage.hl = hl;
      }
      $('hl').value = hl;
    }

    /**
     * Save hl
     */
    save() {
      let hl = $('hl');
      if (!/^[a-zA-z]+$/.test(hl.value)) {
        this._setErrorMessage('Error: only alphabets are allowed.');
        return;
      }
      hl.value = hl.value.toLowerCase();
      localStorage.hl = hl.value;
      this._setMessage('Option Saved.');
    }

    /**
     * Show an error message
     */
    _setErrorMessage(message) {
      this._setMessage(message, '#bd3f55');
    }

    /**
     * Show a message
     */
    _setMessage(message, color) {
      let elm = $('message');
      elm.style.color = color ? color : '#2c7d3e';
      elm.innerHTML = message;
      setTimeout(function() {
        elm.innerHTML = '';
      }, 1000);
    }
  }

  let option = new HlSwitcherOption();
  
  $('hl').addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      option.save();
    }
  });

  $('save').addEventListener('click', function() {
    option.save();
  });
})();
