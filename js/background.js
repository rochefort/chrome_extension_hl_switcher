chrome.commands.onCommand.addListener(function(command) {
  console.log(command);
  if (command === 'switch-hl') {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      switchHl(tabs[0]);
    });
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  switchHl(tab);
});

function switchHl(tab) {
  var url = new URL(tab.url);
  if (!url.protocol.match(/https?/)) {
    return;
  }

  var hl = localStorage.hl ? localStorage.hl : 'ja';
  var hlParam = 'hl=' + hl;
  if (url.search.match('hl=')) {
    // Replace the `hl` parameter with a localStorage value
    if (url.search.match(hlParam)) {
      hlParam = 'hl=en';
    }
    url.search = url.search.replace(/&?hl=[^&\s]*/mg, hlParam);
  } else {
    // Append the `hl` parameter
    var querySign = url.search ? '&' : '?';
    url.search += (querySign + hlParam);
  }
  chrome.tabs.update(tab.id, {url: url.toString()});
}
