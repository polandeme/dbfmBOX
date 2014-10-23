'use strict';
console.log('ddd');
chrome.webRequest.onResponseStarted.addListener( 
    function(details) { //status.code
		// if(details.url.indexOf('http://mr4.douban.com/') !== -1) {
			// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tabs) {
				// // if(changeInfo.status == 'complete') {
				// var _url = details.url;
		  //   	var _mr3 = 'http://mr3.douban.com/';
		  //   	var _mr4 = 'http://mr4.douban.com/';
				// if((_url.indexOf(_mr4) !== -1) || (_url.indexOf(_mr3) !== -1)) {
					console.log('url success');
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {

						})
					});
				// }
			// });
	}, 
    {
        urls: [
            "http://mr3.douban.com/*","http://mr4.douban.com/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["responseHeaders"]
);

function isOfficeTime(currentTime){
    var hour = currentTime.getHours();
    return 1;
}

function isWeekday(currentTime){
    var dayOfWeek = currentTime.getDay();
    return true;
}