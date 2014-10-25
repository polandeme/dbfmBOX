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

            if(window.location.href === 'http://douban.fm/') {
                
                var _song_info = window.localStorage.getItem('bubbler_song_info');
                song_info = JSON.parse(_song_info);

                var song_name = song_info.song_name  // 歌曲名字
                var artist = song_info.artist; // 歌手
                var text = '';

                jk().ajax({
                        url: 'http://geci.me/api/lyric/'+ song_name,
                        type: 'GET',
                        Async: false,
                        wait: function() {
                            write_lrc('wait...');
                        },
                        success: function(data) {
                                if(data.result.length > 0) {
                                    jk().ajax({
                                        url: data.result[0].lrc,
                                        type: 'GET',
                                        Async: false,
                                        wait: function() {
                                            write_lrc('wait...wait...');
                                        },
                                        success: function(data) {
                                            text = encode_lrc(data);
                                            write_lrc(text);
                                        },
                                        // error status
                                        error: function(err) { 
                                            console.log('err');
                                        }
                                    });
                                } else {
                                    ajax_bd();
                                    // console.log('没有找到歌词');
                                    // text = '没有找到歌词';
                                    // write_lrc(text);
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

                //请求百度歌词
                function ajax_bd() {
                    jk().ajax({
                        url: 'http://mp3.baidu.com/dev/api/?tn=getinfo&ct=0&ie=utf-8&word='+ song_name +'&format=json',
                        type: 'GET',
                        Async: false,
                        wait: function() {
                            write_lrc('wait...');
                        },
                        success: function(data) {
                                var data = JSON.parse(data);
                               if(data.length > 0) {
                                    var song_id = data[0].song_id;
                                    jk().ajax({
                                        url: 'http://ting.baidu.com/data/music/links?songIds=' + song_id,
                                        type: 'GET',
                                        Async: false,
                                        wait: function() {
                                            write_lrc('bd wait...');
                                        },
                                        success: function(data) {
                                            var data = JSON.parse(data);
                                            var lrcLink = data.data.songList[0].lrcLink;

                                            if(lrcLink !== ''){
                                                 jk().ajax({
                                                    url: 'http://ting.baidu.com' + lrcLink,
                                                    type: 'GET',
                                                    Async: false,
                                                    wait: function() {
                                                        write_lrc('bd wait... wait');
                                                    },
                                                    success: function(data) {
                                                        text = encode_lrc(data);
                                                        write_lrc(text);
                                                    }
                                                });
                                             } else {
                                                text = 'bd lrc not found';
                                             }
                                           
                                        }
                                    });
                               } else {
                                    console.log('没有找到歌词');
                                    text = '没有找到歌词';
                                    write_lrc(text);
                               }
                        },
                        // error status
                        error: function(err) { 
                        }
                    });
                }
                //解码百度歌词  

                function encode_bdlrc() {


                }
                // 显示歌词在页面中
                function write_lrc(text) {
                    document.getElementById("ft-ads-slot").innerHTML = "<div id='lrcBox'>" + text + "</div>";
                    jk('#lrcBox').css({'marginTop': '180px', 
                       'marginLeft': '215px',
                       'float': 'left'
                    });
                }

            }
    };
    
    // first open page
    window.setTimeout(function() {
        init()
    }, 3000);
}

/*ajax before http://stackoverflow.com/questions/16463177/javascript-on-before-and-after-every-ajax-call*/
