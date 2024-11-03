const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const music = document.getElementById('background-music'); // Updated to use the audio element
let userAnswers = []; // Array to store user answers

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

// Shuffle function to randomize the questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    // Shuffle questions before showing them
    questions = shuffle(questions);

    // Start background music only when quiz starts
    music.play();

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    userAnswers = []; // Reset the user answers

    // Reset the quiz and shuffle questions again
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    questions = shuffle(questions);  // Shuffle questions for the retry
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();

    // Restart the music when trying the quiz again
    music.currentTime = 0; // Reset the music to the beginning
    music.play();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    userAnswers = []; // Reset the user answers

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    // Stop the music when returning to the home screen
    music.pause();
    music.currentTime = 0; // Reset to the start
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
};

const optionList = document.querySelector('.option-list');

// Getting questions and options from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent =  `${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    // Store the user's answer in the array
    userAnswers.push({
        question: questions[questionCount].question,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer
    });

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');

        // If answer incorrect, auto select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // If user has selected, disable all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    // Stop the background music when quiz is finished
    music.pause();
    music.currentTime = 0;

    // Display the score
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

    // Clear previous answer review if it exists to avoid duplication
    const existingReview = resultBox.querySelector('.answer-review');
    if (existingReview) {
        existingReview.remove();
    }

    // Create the answer review section
    const answerReview = document.createElement('div');
    answerReview.classList.add('answer-review');
    resultBox.appendChild(answerReview);

    // Display the user answers
    userAnswers.forEach((item, index) => {
        let resultTag = `
            <div class="review-item">
                <h4>Question ${index + 1}: ${item.question}</h4>
                <p>Your Answer: <span class="${item.userAnswer === item.correctAnswer ? 'correct' : 'incorrect'}">${item.userAnswer}</span></p>
                <p>Correct Answer: <span class="correct">${item.correctAnswer}</span></p>
            </div>
        `;
        answerReview.innerHTML += resultTag;
    });

    // Reset and calculate circular progress
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = Math.min(Math.round((userScore / questions.length) * 100), 100);
    let speed = 20;

    // Ensure circular progress is visible
    circularProgress.style.display = 'flex';

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#62009b ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

    // Feedback text logic remains the same



    // Adding feedback based on user performance
    const feedbackText = document.querySelector('.feedback-text');
    let performance = (userScore / questions.length) * 100;

    if (performance == 100) {
        feedbackText.textContent = "Excellent! You got everything correct!";
    } else if (performance >= 80) {
        feedbackText.textContent = "Great job! You scored really high!";
    } else if (performance >= 50) {
        feedbackText.textContent = "Good effort! You passed, but there’s room for improvement.";
    } else {
        feedbackText.textContent = "Don't give up! Try again and you can improve      :)";
    }
}
