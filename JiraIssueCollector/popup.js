console.log("ole");

chrome.windows.create({'url': chrome.extension.getURL("popup_window.html"), 'type': 'popup'}, function(window) {});

console.log(chrome.extension.getURL("popup_window.html"));

