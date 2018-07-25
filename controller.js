var quizlist = [
    {
        "question":"Quanto é o fatorial de 4?",
        "choices":["4", "5", "24", "30"],
        "correct":"24",
        "hint":"É um número par"
    },
    {
        "question":"Qual é o valor de pi?",
        "choices":["3.14", "3.15", "3.16", "3.17"],
        "correct":"3.14",
        "hint":"É um número par"
    },
    {  
        "question":"teste",
        "choices": ["teste", "teste", "teste", "correto"],
        "correct": "correto",
        "hint": "Correto"
    }
];


//Definição de Elementos
var content = $("content"),
questionBank = $("question"),
choicesBank = $("choices"),
answer = $("answer"),
confirmBtn = $("confirm");

//Variáveis importantes
var question_counting = 0,
score = 0,
question_situation = true;

function $(id){
    return document.getElementById(id);
}

function question_to_ask(){
    var choices = quizlist[question_counting].choices;
    var choicesHtml = "";

	for (var i = 0; i < choices.length; i++) {
		choicesHtml += "<input type='radio' name='quiz" + question_counting + "' id='choice" + (i + 1) + "' value='" + choices[i] + "'>" + " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
	}

    //Load question
    questionBank.textContent = quizlist[question_counting].question;

    //Load choices
    choicesBank.innerHTML = choicesHtml;
}

function isCorrect(){
	if(question_situation){
		question_situation = false;
	
		var userpick;
		var radios = document.getElementsByName("quizlist" + question_counting);
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				userpick = radios[i].value;
			}
		}
	}
	else{
		question_situation = true;
	    submitBtn.textContent = "Confirm Answer";
		if (question_counting < quizlist.length - 1){
			question_counting++;
			question_to_ask();
		}
	}
}


//Funções de ajuda
// 1 - Dica
function dica() {
	alert('É um número inferior a 10');
}

// 2 - Cartas
function cartas() {}

// 3 - Pular
function pular() {}

window.addEventListener("load", question_to_ask, false);
confirmBtn.addEventListener("click", isCorrect, false);
