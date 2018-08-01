function Quiz(questions){
    this.score=0;
    this.questions=questions;
    this.questionIndex=0;
}

Quiz.prototype.getQuestionIndex=function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded=function(){
    return this.questions.length===this.questionIndex;
}

Quiz.prototype.guess=function(answer){
    if(this.getQuestionIndex().correctAnswer(answer)){
        this.score++; 
    }
    this.questionIndex++;
}

var sorteados = [];
function sorteio(){
    if (sorteados.length == valorMaximo) {
        if (confirm('Já não há mais! Quer recomeçar?')) sorteados = [];
        else return;
    }
    // Escolher um numero ao acaso
    var sugestao = Math.ceil(Math.random() * valorMaximo); 
    // Enquanto o numero já existir, escolher outro
    while (sorteados.indexOf(sugestao) >= 0) {  
        sugestao = Math.ceil(Math.random() * valorMaximo);
    }
    // adicionar este numero à array de numeros sorteados para futura referência
    sorteados.push(sugestao);
    // devolver o numero único 
    return sugestao; 
}

//Funções de ajuda durante o progresso do jogo
function pular(){
}

function cartas(){
}