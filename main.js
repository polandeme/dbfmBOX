// jk('#btn').click(function() {
		// var song = jk('#song').value;
		// var song = document.getElementById('song').value;
		
// if(window.location.href === 'http://douban.fm') {
http://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts
	(function() {

		var url ='ddd';
		chrome.tabs.getSelected (null, function(tab) { //selected 得到url
			url = tab.url;
			// function get_url() {
			// 	return url;
			// }
			console.log(url);
			return url;
		});
		chrome.tabs.prototype.get_url = function() {
			console.log('test');
		}
		console.log();




		jk().ajax({
				url: 'http://geci.me/api/lyric/' + 'dd',
				type: 'GET',
				success: function(data) {
						if(data.result.length > 0) {
							jk().ajax({
								url: data.result[0].lrc,
								type: 'GET',
								success: function(data) {
									console.log(data);
									var text = encode_lrc(data);
									jk('#lrc-box').html(text);
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
	}());
// }
		
// });
