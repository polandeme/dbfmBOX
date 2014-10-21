// jk('#btn').click(function() {
		// var song = jk('#song').value;
		// var song = document.getElementById('song').value;
		
// if(window.location.href === 'http://douban.fm') {
// http://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts
window.onload = function() {
    var init = function() {
    // (function() {
            // chrome.tabs.getSelected (null, function(tab) { //selected 得到url
                // console.log(tab.url);
                // if(tab.url === 'http://douban.fm/'){
                    // init();
                // }
            // });

        if(window.location.href === 'http://douban.fm/') {
            chrome.storage.onChanged.addListener(function(changes, namespace) {
                   console.log("New item in storage",changes.visitedPages.newValue);
                  });
            
            var song = window.localStorage.getItem('bubbler_song_info');
            song = JSON.parse(song).song_name;
            console.log("song name= " + song);
            jk().ajax({
                    url: 'http://geci.me/api/lyric/' + song,
                    type: 'GET',
                    success: function(data) {
                            if(data.result.length > 0) {
                                jk().ajax({
                                    url: data.result[0].lrc,
                                    type: 'GET',
                                    success: function(data) {
                                        console.log(data);
                                        var text = encode_lrc(data);
                                        write_lrc(text);
                                        // jk('.ad-click-area').html(text);
                                    },
                                    // error status
                                    error: function(err) { 
                                        console.log('err');
                                    }
                                });
                            } else {
                                console.log('没有找到歌词');
                            }
                    },
                    // error status
                    error: function(err) { 
                    }
                });

            // 处理得到的歌词
            function encode_lrc(text) {
                var s = text.replace(/\[(.*)\]/g, '').trim();//去除返回数据的[]两端的内容，只保留歌词部分  
                return s.replace(/\n/g, '\n<br />');//每行末尾输出html的换行符  
            }
            // 显示歌词在页面中
            function write_lrc(text) {
                console.log('test write_lrc');
                var lrcBox = document.createElement('div');
                var lrc = document.createTextNode(text);
                lrcBox.appendChild(lrc);
                document.getElementById("ad-click-area").innerHTML(lrcBox);
            }
        }
    // });
} 
window.setInterval(function() {
init()
},1000);
}
