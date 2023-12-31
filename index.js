const questions = [

    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    }, {

        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
        ]
    }, {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ]
    }, {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "K2", correct: false },
            { text: "Kilimanjaro", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Denali", correct: false },
        ]
    }, {
        question: "How many continents are there?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const NextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");

let currentQuestion = 0;
let scrore = 0;
let timer;

function startQuiz() {
    currentQuestion = 0;
    scrore = 0;
    NextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion() {
    resetState();
    let current = questions[currentQuestion];
    let questionNo = currentQuestion + 1;
    questionElement.innerHTML = questionNo + ". " + current.question;

    startTimer();

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    clearInterval(timer);
    NextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        scrore++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    clearInterval(timer);
    NextButton.style.display = "block"
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${scrore} out of ${questions.length}!`;
    restartButton.style.display = "block";
}

function startTimer() {
    let timeLeft = 10;
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    answerButtons.appendChild(timerElement);

    timer = setInterval(function () {
        timerElement.textContent = `Time Left: ${timeLeft} s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer({ target: null });
        }
        timeLeft--;
    }, 1000);
}


function handlednextButton() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showScore();
    }

}

NextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
        handlednextButton();
    } else {
        startQuiz();
    }
})
restartButton.addEventListener("click", startQuiz);

startQuiz();
