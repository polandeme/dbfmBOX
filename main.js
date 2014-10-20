// window.onload = function() {
	jk('#btn').click(function() {
		console.log('dts');
		jk().ajax({
			url: 'http://geci.me/api/lyric/枫',
			type: 'GET',
			success: function(data) {
				console.log(data);
			},
			error: function(err) {
				console.log('dds');
			}
		});
	})
	
// }