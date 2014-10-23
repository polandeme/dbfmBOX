'use strict';
console.log('ddd');
	
chrome.webRequest.onResponseStarted.addListener( 
    function(details) { //status.code

		console.log('url success');
		chrome.tabs.query({url: "http://douban.fm/*"}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {

			})
		});
	}, 
    {
        urls: [
            "http://mr3.douban.com/*","http://mr4.douban.com/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["responseHeaders"]
);
