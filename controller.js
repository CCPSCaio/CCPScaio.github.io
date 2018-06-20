$(document).ready(function() {
	var questionNumber = 0;
	var questionBank = new Array();
	var stage = '#game1';
	var stage2 = new Object();
	var questionLock = false;
	var numberOfQuestions;
	var answeredQuestions = 0;
	var score = 0;
	var skip = 2;
  var sorteados = [];
  var valorMaximo = numberOfQuestions;

	$.getJSON('activity.json', function(data) {
		for (i = 0; i < data.quizlist.length; i++) {
			questionBank[i] = new Array();
			questionBank[i][0] = data.quizlist[i].question;
			questionBank[i][1] = data.quizlist[i].option1;
			questionBank[i][2] = data.quizlist[i].option2;
			questionBank[i][3] = data.quizlist[i].option3;
			questionBank[i][4] = data.quizlist[i].option4;
      questionBank[i][5] = data.quizlist[i].tip;
		}
		numberOfQuestions = questionBank.length;
		displayQuestion();
	});

	function displayQuestion() {
		var rnd_ans = Math.random() * 4;
		var rnd_ans = Math.ceil(rnd_ans);
		var q1;
		var q2;
		var q3;
		var q4;
    var tipText;

		if (rnd_ans == 1) {
			q1 = questionBank[questionNumber][1];
			q2 = questionBank[questionNumber][2];
			q3 = questionBank[questionNumber][3];
			q4 = questionBank[questionNumber][4];
		}
		if (rnd_ans == 2) {
			q2 = questionBank[questionNumber][1];
			q1 = questionBank[questionNumber][2];
			q4 = questionBank[questionNumber][3];
			q3 = questionBank[questionNumber][4];
		}
		if (rnd_ans == 3) {
			q3 = questionBank[questionNumber][1];
			q4 = questionBank[questionNumber][2];
			q1 = questionBank[questionNumber][3];
			q2 = questionBank[questionNumber][4];
		}
		if (rnd_ans == 4) {
			q4 = questionBank[questionNumber][1];
			q3 = questionBank[questionNumber][2];
			q2 = questionBank[questionNumber][3];
			q1 = questionBank[questionNumber][4];
		}

		$(stage).append(
      '<div class = "questionText">' +
			questionBank[questionNumber][0] +
			'</div><div id= "1" class="option">' + q1 +
			'</div> <div id="2" class="option">' + q2 +
			'</div> <div id="3" class="option">' + q3 +
			'</div> <div id="4" class="option">' + q4 +

      '</div> <div id= "1" class="help">' +
			'PULAR ' + '(' + skip + ')' +

      '</div> <div id="2" class="help">' +
			'CARTAS' +

      '</div> <div id="3" class="help">' +
			'DICA' +

      '</div> <div id="4" class="help">' +
			'ajuda4' +
			'</div>'
		);

		$('.option').click(function() {
			if (questionLock == false) {
				questionLock = true;
				//correct answer
				if (this.id == rnd_ans) {
					$(stage).append('<div class="feedback1">CORRETO</div>');
					score++;
				}
				//wrong answer
				if (this.id != rnd_ans) {
					$(stage).append('<div class="feedback2">ERRADO</div>');
				}
				setTimeout(function() {
					changeQuestion();
				}, 1000);
				answeredQuestions++;
			}
		});

		// Help menu
		$('.help').click(function() {
			//Skip option
			if (this.id==1 && skip > 0) {
				skip--;
				changeQuestion();
			}

			//Card option
			if (this.id == 2) {
				cartas();
			}
			//Tip option
			if (this.id == 3) {
				dica();
			}

			//To be implemented
			if (this.id == 4) {
				menuOption4();
			}
		});
	}

	//display questions
	function criarUnico() {
		if (sorteados.length == valorMaximo) {
			if (confirm('Já não há mais! Quer recomeçar?')){
        sorteados = [];
      }
			else{
        return;
      }
		}

    // Escolher um numero ao acaso
		var sugestao = Math.ceil(Math.random() * valorMaximo);

    while (sorteados.indexOf(sugestao) >= 0) {
			// Enquanto o numero já existir, escolher outro
			sugestao = Math.ceil(Math.random() * valorMaximo);
		}

    // adicionar este numero à array de numeros sorteados para futura referência
		sorteados.push(sugestao);
    // devolver o numero único
		return sugestao;
	}

	//change questions
	function changeQuestion() {
		questionNumber++;

		if (stage == '#game1') {
			stage2 = '#game1';
			stage = '#game2';
		}

    else {
      stage2 = '#game2';
      stage = '#game1';
		}

		if (questionNumber < numberOfQuestions) {
			displayQuestion();
		}

    else {
			displayFinalSlide();
		}

		$(stage2).animate({ right: '+=800px' }, 'slow', function() {
			$(stage2).css('right', '-800px');
			$(stage2).empty();
		});

		$(stage).animate({ right: '+=800px' }, 'slow', function() {
			questionLock = false;
		});
	}

	//Request card help.
	function cartas() {

  }

  //Request tip help.
  function dica(){
    $(stage).append(
      '<br><br><br> <div class = "tip">' + questionBank[questionNumber][5] +'</div>'
    );
  }

	//display final slide
	function displayFinalSlide() {
		$(stage).append(
			'<div class="questionText">Fim das perguntas!<br><br>Você acertou ' + score + ' de ' + answeredQuestions + '<br><br><br></div> <div class="return_btn">Reiniciar</div>'
		);

		//restart the quiz.
		$('.return_btn').click(function() {
			window.location.reload();
		});
	}
});
