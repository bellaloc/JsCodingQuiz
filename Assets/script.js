const startButton = document.getElementById('start-button');
const quiz = document.getElementById('quiz');
const questionText = document.getElementById('question-text');
const answerChoices = document.getElementById('answer-choices');
const timerElement = document.getElementById('timer');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitScoreButton = document.getElementById('submit-score');

let currentQuestionIndex = 0;
let userScore = 0;
let timer;

const questions = [
    {
        question: "What does 'DOM' stand for in web development?",
        choices: ["Document Object Model", "Data Object Model", "Display Object Model", "Document Order Model"],
        correctAnswer: "Document Object Model"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript with block scope?",
        choices: ["var", "let", "const", "varlet"],
        correctAnswer: "let"
    },
    {
        question: "What is the result of 3 + '3' in JavaScript?",
        choices: [6, '33', 33, '6'],
        correctAnswer: '33'
    },

];

startButton.addEventListener('click', startQuiz);
answerChoices.addEventListener('click', checkAnswer);
submitScoreButton.addEventListener('click', saveHighScore);

function startQuiz() {
    startButton.style.display = 'none';
    quiz.style.display = 'block';
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

     
        answerChoices.innerHTML = '';

      
        currentQuestion.choices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice;
            choiceButton.classList.add('choice');
            choiceButton.setAttribute('data-index', index); 
            answerChoices.appendChild(choiceButton);
        });
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 60;
    timer = setInterval(() => {
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        timeLeft--;
    }, 1000);
}

function checkAnswer(event) {
    if (event.target.classList.contains('choice')) {
        const selectedChoiceIndex = event.target.getAttribute('data-index');
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedChoiceIndex == currentQuestion.choices.indexOf(currentQuestion.correctAnswer)) {
            userScore++;
        } else {
            timerElement.textContent = parseInt(timerElement.textContent) - 10;
        }

        currentQuestionIndex++;
        displayQuestion();
    }
}

function endQuiz() {
    clearInterval(timer);
    quiz.style.display = 'none';
    endScreen.style.display = 'block';
    finalScore.textContent = userScore;
}

function saveHighScore() {
    const userInitials = initialsInput.value.toUpperCase();
console.log(userInitials);
console.log(userScore);
}
//TODO make an array to add userName and userInput to local storage

