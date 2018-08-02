//pulos restantes
var skip=10;
//cartas restantes
var cards=2;
//ja usou as cartas este turno?
var cardThisTurn;

var sorteados = [];
//var sorteioQuestao = [];
var order;
//contador de questoes e numero maximo de questoes
var questionCount=1;
var maxQuestions=5;

//carrega a questao na tela
function populate(){
    //se o quiz acabou, mostra o placar
    //if(quiz.isEnded()){
    if(questionCount>maxQuestions){
        showScores();
    }else{
        //habilita todos as alternativas desativados
        for(var i=0;i<4;i++){
            document.getElementById("btn"+i).disabled = false;
        }
        cardThisTurn=false;
        //sorteia e mostra a questao
        order = criarUnico(quiz.questions.length-1);
        quiz.questionIndex=order;
        var element=document.getElementById("question");
        element.innerHTML=quiz.getQuestionIndex().text;
        
        //mostra a imagem(se houver)
        var element=document.getElementById("image");
        element.innerHTML=quiz.getQuestionIndex().src=image;
        
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
        questionCount++;
        quiz.guess(guess);
        populate();
    }
};

function showProgress(){
    var currentQuestionNumber=quiz.questionIndex+1;
    var element=document.getElementById("progress");
    element.innerHTML="Questão "+ questionCount+" de "+maxQuestions;

    //element=document.getElementById("skip");
    //element.innerHTML="Pular("+skip+")";
    //element=document.getElementById("cards");
    //element.innerHTML="Cartas("+cards+")";
};

//mostra o placar ao final do game
function showScores(){
    var gameOver="<h1>Fim do jogo</h1>";
    gameOver+="<h2 id='score'> Você acertou "+quiz.score+" de "+maxQuestions+"</h2>";
    var element=document.getElementById("quiz");
    element.innerHTML=gameOver;
};

function cardQuestion(){
    if(cards>0 && cardThisTurn==false){
        cards--;
        cardThisTurn=true;
        var sortCard=[];
        for(var i=0;i<2;i++){
            //sorteia duas alternativas erradas e as desativa
            var number = Math.floor(Math.random()*4); //escolher um numero ao acaso
            while(sortCard.indexOf(number)>=0 || quiz.getQuestionIndex().answer==quiz.getQuestionIndex().choices[number]){  //enquanto o numero já existir, escolher outro
                number = Math.floor(Math.random()*4);
            }
            sortCard.push(number); //adicionar este numero à array de numeros sorteados para futura referência
            document.getElementById("btn"+number).disabled = true;
        }
    }
    if(cards==0){
        document.getElementById("cards").disabled = true;
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
        populate();
    }
    //desabilita o botao, caso nao hajam pulos restantes
    if(skip==0){
        document.getElementById("skip").disabled = true;
    }
    showProgress();
};

//armazena as perguntas do arquivo -questoes.js-
var quiz = new Quiz(fase1);

populate();
showProgress();