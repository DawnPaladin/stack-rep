var apiKey = "JmoWt5aVRK5SYSViNZGmkQ((";
var defaultUserID = 1805453;
var site = "stackoverflow";
function lookup(userID) {
	$('#question-rows').empty();
	$('#answer-rows').empty();
	$.getJSON(`https://api.stackexchange.com/2.2/users/${ userID }?site=${ site }&key=${ apiKey }`, function (json) {
		var userObj = json.items[0];
		console.log(userObj);
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
			$row.find('.question-title').html(qData.title).parent().attr('href', qData.link);
			$row.find('.question-text').html(qData.body);
		});
	});
	var answers;
	$.getJSON(`https://api.stackexchange.com/2.2/users/${ userID }/answers?site=${ site }&key=${ apiKey }&filter=!b0OfNJcHF3jvMq`, function (json) {
		answers = json.items;
		var answerQuestions = answers.map(function (answer) {
			return answer.question_id;
		});
		var answerQuestionsList = answerQuestions.join(";");
		$.getJSON(`https://api.stackexchange.com/2.2/questions/${ answerQuestionsList }?site=${ site }&key=${ apiKey }`, function (json) {
			answerQuestionsArray = json.items;
			// add question title and URL to each answer
			for (var i = 0; i < answers.length; i++) {
				answers[i].question_title = answerQuestionsArray[i].title;
				//answers[i].question_link = answerQuestionsArray[i].link;
			}
			// arrays ready
			answers.forEach(function (aData) {
				var $row = $('#answer-template').clone().appendTo('#answer-rows').removeClass('hidden');
				$row.find('.answer-question').html(aData.question_title).parent().attr('href', aData.link);
				$row.find('.answer-score').text(aData.score);
				$row.find('.answer-text').html(aData.body);
			});
		});
	});
}
lookup(defaultUserID);
$('#random-user-btn').click(function (event) {
	var highestUserId = 7472117;
	var randomUserId = Math.floor(Math.random() * highestUserId);
	lookup(randomUserId);
});