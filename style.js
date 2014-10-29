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
for(var i = 0; i < cname.length; i++) {
	console.log(cname[i]);
	//.firstChild.nodeVlaue);
	// body.insertBefore(oldNode_A[i], firstChild[0]);
	// console.log(i);

}


