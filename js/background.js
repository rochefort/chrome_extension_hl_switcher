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
  url.search = updateHlParameter(url.search, hl);
  chrome.tabs.update(tab.id, {url: url.toString()});
}

function updateHlParameter(query, hl) {
  var re = new RegExp('([?&])hl=(.*?)(&|$)', 'i');
  var separator = query.indexOf('?') !== -1 ? '&' : '?';
  var result = query.match(re);
  if (result) {
    if (result[2] === hl) {
      hl = 'en';
    }
    return query.replace(re, '$1' + 'hl=' + hl + '$3');
  } else {
    return query + separator + 'hl=' + hl;
  }
}
