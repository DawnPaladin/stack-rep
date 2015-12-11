var userID = 3803;
$.getJSON(`https://api.stackexchange.com/2.2/users/${userID}?site=graphicdesign`, function(json) {
	console.log(json);
	var userObj = json.items[0];
	var avatar = userObj.profile_image;
	$('body').append(`<img src=${avatar}>`);
});
