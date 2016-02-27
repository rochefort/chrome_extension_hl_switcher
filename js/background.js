chrome.browserAction.onClicked.addListener(function(tab) {
  var url = new URL(tab.url);
  if (!url.protocol.match(/https?/)) {
    return;
  }

  var hlParam = 'hl=' + localStorage.hl;
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
});
