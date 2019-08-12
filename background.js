//replies to content script with current tab URL

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "shareTabInfo");
  port.onMessage.addListener(function(msg) {
    if (msg.question == "Tell me the url"){
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    		var activeTab = tabs[0];
    		var activeTabUrl = activeTab.url;
    		port.postMessage({answer : activeTabUrl});
    	}); // end getURL
    } //end if
  }); // end port
}); //end addlistener