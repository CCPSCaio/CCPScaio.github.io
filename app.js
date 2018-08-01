function populate(){
	if(quiz.isEnded()){
		showScores();
	}
	else{
		//show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;
	
		//show choices
		var choices = quiz.getQuestionIndex().choices;
		for(var i = 0; i < choices.length; i++){
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
            guess("choice" + i, choices[i]);
		}
	}

	showProgress();
};

function guess(id, guess){
	var button = document.getElementById(id);
	button.onclick = function(){
		quiz.guess(guess);
		populate();
	}
};

function showProgress(){
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores(){
	var gameOverHtml = "<p>Result</p>";
	gameOverHtml += "<p id='score'> Your score: " + quiz.score + "</p>";
	var element = document.getElementById("question");
	element.innerHTML = gameOverHtml;
}

var quiz = new Quiz(questions);

populate();