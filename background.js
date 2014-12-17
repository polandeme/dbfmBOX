'use strict';
	
chrome.webRequest.onResponseStarted.addListener( 
    function(details) { //status.code

		chrome.tabs.query({url: "http://douban.fm/*"}, function(tabs) {  //query 条件
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
