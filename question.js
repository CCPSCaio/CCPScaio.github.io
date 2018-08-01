function Question(text, choices, answer, image){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
    this.image=image;
}

Question.prototype.correctAnswer=function(choice){
    return choice === this.answer;
}