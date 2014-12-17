$().ready(function(){
var cname = $(".cname");
var chl_name = $('.chl_name');
jk('#ad-click-area').remove() || '';
jk('.send-song-to-phone').remove() || '';
jk('#fm-section-app-entry').remove() || '';
var oldNode_A = jk('.chl_section').css({'display':'none'});//.remove();
var oldNode_A_U = jk('.channel_list').css({'display': 'none'});//.remove(); //私人赫兹
//
// lrc box style
jk('.bd').css({'display':'none'});//.remove() || '';
jk('#fm-bg').css({'display':'none'});//.remove() || '';
jk('#logo').css({'display':'none'});//.remove() || '';




	// menu event
	$(".po-current-play").mouseover(function() {
		$(".po-other-hz").show();
	});

	$(".po-menu").mouseleave(function() {
		$(".po-other-hz").hide();
	});
	$(".po-other-hz li").click(function(){
		var current_play_text = $(".po-current-play").text();
		$(".po-current-play").text($(this).text());
		$(this).text(current_play_text);
	})


var targetNode = document.getElementById("fm-section");
var menuNode = document.createElement("div");
menuNode.className = "po-hz-menu";
var menuNodeText = document.createTextNode("hello po");
menuNode.appendChild(menuNodeText);

var firstNode = document.getElementById("fm-header");
targetNode.insertBefore(menuNode, firstNode);

$(".po-hz-menu").css({
	"margin-left": -190,
	'display': 'inline-block'
});
var cnameBtn = "<li >" + cname.eq(1).text().substring(2, cname.eq(0).text().length) + "</li>";
var cnameBtn1 = "<div class='po-current-play'>" + cname.eq(0).text().substring(2, cname.eq(0).text().length) + "</div>";
for(var i = 2; i < cname.length - 2; i++){
	var str = cname.eq(i).text();
	str = str.indexOf("MHz") !== -1 ? str.substring(0, str.length-3) : str.substring(2, str.length);
	cnameBtn += "<li >" +
				str + "</li>"; 
}
menuNode.innerHTML = "<div class='po-menu' >" + cnameBtn1 + "<ul class='po-other-hz'>" + cnameBtn + "</ul> + <button class='clearCanvas'>clearCanvas</button> ";
                    
jk('.hidden_list').remove();
jk('.chl_name').css({
	'width':'100px'
});
jk('.channel ').css({
	'marginBottom': '0px'
});
jk('.channel_list').css({
	'width': '100px',
});
jk(".ch-list").css({'width': 0, 'margin': 0});
jk(".ch-list-wrapper").css({'width': 0, 'margin': 0, 'padding': 0, 'min-height': 0});
$('#fm-section').css('min-height', '0');

$(".po-hz-menu").css({"margin-left": "-190"});

$("#user_info").css('margin-top','-35px')
$(document).on('click', '.po-other-hz li', function() {
	var index = $(this).index();
	chl_name[index].click();//trigger('click');

})
$(".pro-promo, 	#fm-section2").remove();
	
	// menu style

	$('.po-menu').css({
		'display': 'inline-block'
	});
	$('.po-current-play').css({
		'width': '100px',
		'height': '30px',
		'cursor': 'pointer',
		'border': '1px solid gray',
		'text-align': 'center',
		'line-height': '30px',
		'background': 'green'
	});
	$('.po-other-hz').css({
		'display': 'none'
	});
	$('.po-other-hz li').css({
		'width': '100px',
		'height': '30px',
		'cursor': 'pointer',
		'border': '1px solid gray',
		'margin-top': '3px',
		'text-align': 'center',
		'line-height': '30px',
		'background': 'blue',
		'list-style-type': 'none'
	});

	// menu event
	$(document).on('mouseover', '.po-current-play', function(){
		$(".po-other-hz").show();
		$("#user_info").css('margin-top','-545px')

	})

	$(".po-menu").mouseleave(function() {
		$(".po-other-hz").hide();
	});
	$(".po-other-hz li").click(function(){
		var current_play_text = $(".po-current-play").text();
		console.log(current_play_text);
		$(".po-current-play").text($(this).text());
		$(this).text(current_play_text);
	})

	//get mp4 file
	function downloadMusicFile() {
		var MusicloaclData = window.localStorage.getItem('bubbler_song_info');
		MusicloaclData = JSON.parse(MusicloaclData);
		var songId = MusicloaclData.id;
		var downloadUrl = 'http://mr3.douban.com/201412172352/0d27ab769a9c90d3ea60de30b45aa001/view/song/small/p' + id + '.mp4'
	}
	downloadMusicFile();
});