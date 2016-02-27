chrome.browserAction.onClicked.addListener(function(tab) {
  var url = new URL(tab.url);
  if (!url.protocol.match(/https?/)) {
    return;
  }

  var hlPram = 'hl=' + localStorage.hl;
  if (url.search.match(/hl=/)) {
    // Replace hl
    url.search = url.search.replace(/&?hl=[^&\s]*/mg, hlPram);
  } else {
    // Append hl
    var querySign = url.search ? '&' : '?';
    url.search += (querySign + hlPram);
  }
  chrome.tabs.update(tab.id, {url: url.toString()});
});
