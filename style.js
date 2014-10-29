jk('#ad-click-area').remove() || '';
jk('.send-song-to-phone').remove() || '';
jk('#fm-section-app-entry').remove() || '';
// var oldNode_A = jk('.chl_section').remove();
// var oldNode_A_U = jk('.channel_list').remove(); //私人赫兹
// console.log(oldNode_A);
// lrc box style
jk('.bd').remove() || '';
jk('#fm-bg').remove() || '';
jk('#logo').remove() || '';

// channel list
var body = document.querySelectorAll('body')[0];
var cname = document.querySelectorAll('.cname');
var title = [];//hz title
var href = [];

var firstChild = document.querySelectorAll('#fm-section')[0];
var cwarp = document.createElement('div');	
var cnameNode = '';

// for(var i = 0; i < cname.length-2; i++) {
// 	title.push(cname[i].firstChild.data);
// 	cnameNode += "<li class='channel' style='float: left;><a class='chl_name'> <span class='cname' '>"+ cname[i].firstChild.data +"</li></span></a>";
// }
// console.log(cnameNode);
// function cet(cwarp, childNode) {
// 	cwarp.id = 'cwarp';
// 	console.log(childNode);
// 	cwarp.innerHTML = childNode;
// 	return cwarp;
// }
// console.log(cet(cwarp, cnameNode));
// body.insertBefore(cet(cwarp, cnameNode), firstChild);

// jk('.cname').css({
// 	'margin': '5px'
// });

// jk('#cwarp').css({
// 	'width': '100px',
// 	'marginLeft': '30px'
// });
jk('.hidden_list').remove();
jk('.chl_name').css({
	'width':'100px'
});
jk('.channel ').css({
	'marginBottom': '0px'
});
//
jk('.channel_list').css({
	'width': '100px',
});
