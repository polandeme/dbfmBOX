'use strict';
console.log('ddd');
chrome.webRequest.onCompleted.addListener( 
    function(details) { //status.code
			        console.log(details.url);
		if(details.url.indexOf('http://mr4.douban.com/') !== -1) {
			alert('url success');
			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tabs) {
				if(changeInfo.status == 'complete') {
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {

						})
					})
				}
			});
		} else {
			// alert('url error');
		}
		
	}, 
    {
        urls: [
            "<all_urls>"
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