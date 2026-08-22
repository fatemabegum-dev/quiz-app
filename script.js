const questions = [
    {
        question: "What is the name of the national tree of Bangladesh?",
        answer: [
            { text: "Jamun tree", correct: false},
            { text: "Mango tree", correct: true},
            { text: "Banana tree", correct: false},
            { text: "Jackfruit tree", correct: false},
        ]
    },

    {
       question: "What is the name of the highest mountain in Bangladesh?",
        answer: [
            { text: "Tajingdong", correct: false},
            { text: "Keokradong", correct: false},
            { text: "Kala Pahar", correct: false},
            { text: "Saka Haphong", correct: true},
        ]  
    },

    {
         question: "Which is smallest continent in the world?",
        answer: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },

    {
         question: "Which is smallest country in the world?",
        answer: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currectQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currectQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currectQuestion = questions[currectQuestionIndex];
    let questionNo = currectQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currectQuestion.question;


    currectQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }

    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currectQuestionIndex++;
    if(currectQuestionIndex < questions.length){
        showQuestion();
    }

    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currectQuestionIndex < questions.length){
        handleNextButton();
    }

    else{
        startQuiz();
    }
});

startQuiz();