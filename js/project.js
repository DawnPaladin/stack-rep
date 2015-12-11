var apiKey = "JmoWt5aVRK5SYSViNZGmkQ((";
var userID = 1805453;
var site = "stackoverflow";
$.getJSON(`https://api.stackexchange.com/2.2/users/${ userID }?site=${ site }&key=${ apiKey }`, function (json) {
	var userObj = json.items[0];
	//console.log(userObj);
	$('.avatar').attr('src', userObj.profile_image);
	$('#rep-badge').text(userObj.reputation);
	var badgesHTML = "<span class='gold-badge'>g</span>".repeat(userObj.badge_counts.gold) + "<span class='silver-badge'>s</span>".repeat(userObj.badge_counts.silver) + "<span class='bronze-badge'>b</span>".repeat(userObj.badge_counts.bronze);
	$('#badges-badge').html(badgesHTML);
});
var questions;
$.getJSON(`https://api.stackexchange.com/2.2/users/${ userID }/questions?site=${ site }&key=${ apiKey }&filter=withbody`, function (json) {
	questions = json.items;
	json.items.forEach(function (qData) {
		var $row = $('#question-template').clone().appendTo('#question-rows').removeClass('hidden');
		$row.find('.question-score').text(qData.score);
		$row.find('.question-title').html(qData.title);
		$row.find('.question-text').html(qData.body);
	});
});