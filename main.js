// if (window.addEventListener) {
//   window.addEventListener("storage", handle_storage, false);
// } else {
//   window.attachEvent("onstorage", handle_storage);
// };
// function handle_storage(e) {
//   if (!e) { e = window.event; }
// console.log('dddd');
// }
window.onload = function() {


    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        console.log("res");
        if (msg.action == 'SendIt') {
            console.log('sendit get');
            init();
        } else {
            console.log('res error');
        }
    });
    var init = function() {
         
        // var setInt = function() {
            if(window.location.href === 'http://douban.fm/') {
                
                var song = window.localStorage.getItem('bubbler_song_info');
                song = JSON.parse(song).song_name;

                jk().ajax({
                        url: 'http://geci.me/api/lyric/' + song,
                        type: 'GET',
                        success: function(data) {
                                if(data.result.length > 0) {
                                    jk().ajax({
                                        url: data.result[0].lrc,
                                        type: 'GET',
                                        success: function(data) {
                                            // console.log(data);
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
                                    var text = '没有找到歌词';
                                    write_lrc(text);
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
                    document.getElementById("ft-ads-slot").innerHTML = "<div id='lrcBox'>" + text + "</div>";
                }

            }
        // }
        // window.setInterval(function() {
        //         setInt();
        //     },2000);
        
    };
    
    // first open page
    window.setTimeout(function() {
        init()
    }, 3000);
}

/*ajax before http://stackoverflow.com/questions/16463177/javascript-on-before-and-after-every-ajax-call*/