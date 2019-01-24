//pulos restantes
var skip = 2;
//cartas restantes
var cards = 2;
//ja usou as cartas este turno?
var cardThisTurn;

var sorteados = [];

var order;
//contador de questoes e numero maximo de questoes
var questionCount = 1;
var maxQuestions = 41;

//level do game
var level = 0;

//tamanho da barra de tempo
var width = 0;

//placar
var score = 0;

//preenche a barra de carregamento
window.onload = function() {
    var elem = document.getElementById("timer");   
    
    setInterval(function () {
        document.getElementById("timer").innerHTML = width;
        if (width >= 100) {
            width = 0;
            //clearInterval(id);
            questionCount++;
            populate();
        } else {
          width++; 
          elem.style.width = width/3 + '%'; 
        }
      }, 1000);
}

//carrega a questao na tela
function populate(){
    //se o quiz acabou, mostra o placar
    if(questionCount>maxQuestions){
        showScores();
    }else{
        //carrega o nivel da questao
        if(questionCount % 10 == 1 && questionCount != 1){
            sorteados = [];   //limpa o array de numeros sorteados
            cards = 2;
            skip = 2;
            level++;
        }
        quiz = new Quiz(fase[level]);

        //habilita todos as alternativas desativadas
        for(var i=0;i<4;i++){
            document.getElementById("btn"+i).disabled = false;
            document.getElementById("btn"+i).className = "waves-effect waves-light btn-large";
        }
        cardThisTurn=false;

        //sorteia e mostra a questao
        order = criarUnico(quiz.questions.length);
        quiz.questionIndex=order;
        var element=document.getElementById("question");
        element.innerHTML=quiz.getQuestionIndex().text;
        
        //mostra a imagem(se houver)
        var element=document.getElementById("image").src;
        element=quiz.getQuestionIndex().image;
        
        //mostra as alternativas
        var choices = quiz.getQuestionIndex().choices;
        for(var i=0;i<choices.length;i++){
            var element = document.getElementById("choice"+i);
            element.innerHTML=choices[i];
            guess("btn"+i,choices[i]);
        };
        showProgress();
    }
};

//Botoes das alternativas
function guess(id,guess){
    var button=document.getElementById(id);
    button.onclick=function(){
        width = 0;
        questionCount++;

        if(quiz.getQuestionIndex().answer == guess){
            score++;
        }

        quiz.guess(guess);
        populate();
    }
};

function showProgress(){
    var currentQuestionNumber=quiz.questionIndex+1;
    var element=document.getElementById("progress");
    element.innerHTML="Questão "+ questionCount+" de "+maxQuestions;

    //element=document.getElementById("skip");
    //element.innerHTML="Pula para a próxima questão. Restam " + skip;
    //element=document.getElementById("cards");
    //element.innerHTML="Remove duas alternativas erradas. Restam " + cards;
};

//mostra o placar ao final do game
function showScores(){
    var gameOver="<h3>Fim do jogo!</h3>";
    gameOver+="<h2 id='score'> Você acertou "+score+" de "+maxQuestions+"</h2>";
    var element=document.getElementById("quiz");
    element.innerHTML=gameOver;
};

function cardQuestion(){
    if(cards>0 && cardThisTurn==false){
        cards--;
        cardThisTurn=true;
        var sortCard=[];
        var wrongQuestions=2
        for(var i=0;i<wrongQuestions;i++){
            var number = Math.floor(Math.random()*4); //escolher um numero ao acaso
            while(sortCard.indexOf(number)>=0 || quiz.getQuestionIndex().answer==quiz.getQuestionIndex().choices[number]){  //enquanto o numero já existir ou a alternativa escolhida estiver correta, escolher outro
                number = Math.floor(Math.random()*4);
            }
            sortCard.push(number); //adicionar este numero à array de numeros sorteados para futura referência
            //document.getElementById("btn"+number).disabled = true;
            document.getElementById("btn"+number).className = "btn-large disabled";
        }
    }
    if(cards==0){
        document.getElementById("cards").disabled = true;
        document.getElementById("cards").className="btn-floating btn-large disabled";
    }
    showProgress();
    //document.getElementsByClassName("buttons").disabled = false;
};

function criarUnico(valorMaximo){
    /*
    if(sorteados.length==valorMaximo){
        
        return;
    }
    */
    var rdnNumber = Math.floor(Math.random() * valorMaximo); // Escolher um numero ao acaso
    while (sorteados.indexOf(rdnNumber) >= 0) {  // Enquanto o numero já existir, escolher outro
        rdnNumber = Math.floor(Math.random() * valorMaximo);
    }
    sorteados.push(rdnNumber); // adicionar este numero à array de numeros sorteados para futura referência
    return rdnNumber; // devolver o numero único
}

//pula a questao
function skipQuestion(){
    //pula a questao se houver pulos restantes
    if(skip>0){
        skip--;
        quiz.questionIndex++;
        width = 0;
        populate();
    }

    //desabilita o botao, caso nao hajam pulos restantes
    if(skip==0){
        document.getElementById("skip").disabled = true;
        document.getElementById("skip").className ="btn-floating btn-large disabled";
    }
    showProgress();
};

//armazena as perguntas do arquivo -questoes.js
var quiz = new Quiz(fase[level]);

populate();
showProgress();