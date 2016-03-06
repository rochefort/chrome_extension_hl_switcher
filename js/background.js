'use strict';
(function(){
  class Background {
    switch(tab) {
      let url = new URL(tab.url);
      if (!url.protocol.match(/https?/)) {
        return;
      }
      let hl = localStorage.hl ? localStorage.hl : 'ja';
      url.search = this.updateHlParameter(url.search, hl);
      chrome.tabs.update(tab.id, {url: url.toString()});
    }

    updateHlParameter(query, hl) {
      let re = new RegExp('([?&])hl=(.*?)(&|$)', 'i');
      let separator = query.indexOf('?') === -1 ? '?' : '&';
      let result = query.match(re);
      if (result) {
        if (result[2] === hl) {
          hl = 'en';
        }
        return query.replace(re, '$1' + 'hl=' + hl + '$3');
      } else {
        return `${query}${separator}hl=${hl}`;
      }
    }
  }
  window.bg = new Background();

  chrome.commands.onCommand.addListener((command) => {
    if (command === 'switch-hl') {
      chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        window.bg.switch(tabs[0]);
      });
    }
  });

  chrome.browserAction.onClicked.addListener((tab) => {
    window.bg.switch(tab);
  });
}());
