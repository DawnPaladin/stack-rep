var userID = 1805453;
$.getJSON(`https://api.stackexchange.com/2.2/users/${userID}?site=stackoverflow`, function(json) {
	var userObj = json.items[0];
	console.log(userObj);
	$('.avatar').attr('src', userObj.profile_image);
	$('#rep-badge').text(userObj.reputation);
	var badgesHTML = "<span class='gold-badge'>g</span>".repeat(userObj.badge_counts.gold) +
		"<span class='silver-badge'>s</span>".repeat(userObj.badge_counts.silver) +
		"<span class='bronze-badge'>b</span>".repeat(userObj.badge_counts.bronze);
	$('#badges-badge').html(badgesHTML);
});
