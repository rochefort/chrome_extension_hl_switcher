chrome.browserAction.onClicked.addListener(function(tab) {
  var url = new URL(tab.url);
  if (!url.protocol.match(/https?/)) {
    return;
  }

  var hlParam = 'hl=' + localStorage.hl;
  if (url.search.match(/hl=/)) {
    // Replace hl
    url.search = url.search.replace(/&?hl=[^&\s]*/mg, hlParam);
  } else {
    // Append hl
    var querySign = url.search ? '&' : '?';
    url.search += (querySign + hlParam);
  }
  chrome.tabs.update(tab.id, {url: url.toString()});
});
