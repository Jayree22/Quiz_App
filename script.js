const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Lion", correct: false}
        ]
    },
    {
        question: "Elon Musk's aerospace company is called ?",
        answers: [
            {text: "A-Space", correct: false},
            {text: "SpaceX", correct: true},
        
        ]
    },

    {
        question: "What is the colour of the cue ball in pool?",
        answers: [
            {text: "black", correct: false},
            {text: "Red", correct: false},
            {text: "White", correct: true},
            {text: "Blue", correct: false}
        ]
    },
    {
        question: "Which country has its capital as Copenhagen?",
        answers: [
            {text: "Denmark", correct: true},
            {text: "England", correct: false},
            {text: "Finland", correct: false},
            {text: "Switzerland", correct: false}
        ]
    },
    {
        question: "Is Avocado a fruit or a vegetable?",
        answers: [
            {text: "Fruit", correct: true},
            {text: "Vegetable", correct: false},
        ]
    },
    {
        question: "What does 'hakuna matata' mean?",
        answers: [
            {text: "Carry me", correct: false},
            {text: "Big Fool", correct: false },
            {text: "No Worries", correct: true},
            {text: "Freedom Fighter", correct: false}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Vincent Van De Gogh", correct: false},
            {text: "Michelangelo", correct: false},
            {text: "Pablo Picasso", correct: false},
            {text: "Leonardo Da Vinci", correct: true}
        ]
    },
    {
        question: "Which planet is closest to the sun?",
        answers: [
            {text: "Saturn", correct: false},
            {text: "Mercury", correct: true},
            {text: "Pluto", correct: false},
            {text: "Neptune", correct: false}
        ]
    },
     {
        question: "How many bones are in the human body?",
        answers: [
            {text: "206", correct: true},
            {text: "306", correct: false},
            {text: "406", correct: false}
        ]
    },

    {
        question: "What is the name of a shape with nine sides?",
        answers: [
            {text: "Decagon", correct: false},
            {text: "Sexagon", correct: false},
            {text: "Hexagon", correct: false},
            {text: "Nonagon", correct: true}
        ]
    },
    {
        question: "What is the chemical symbol for Iron?",
        answers: [
            {text: "Fe", correct: true},
            {text: "Ag", correct: false},
            {text: "Ir", correct: false},
            {text: "Na", correct: false}
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            {text: "Ghana", correct: false},
            {text: "Myanmar", correct: false},
            {text: "Vatican City", correct: true},
            {text: "Mexico", correct: false}
        ]
    },
    {
        question: "In which two countries can you not buy Coca Cola?",
        answers: [
            {text: "Austria & Germany", correct: false},
            {text: "North Korea & Cuba", correct: true},
            {text: "Morocco & Algeria", correct: false},
            {text: "Sweden & Finland", correct: false}
        ]
    },
    {
        question: "What is Twitter now called?",
        answers: [
            {text: "T", correct: false},
            {text: "U", correct: false},
            {text: "V", correct: false},
            {text: "X", correct: true},
            {text: "Y", correct: false},
            {text: "Z", correct: false},
        ]
    },
     {
        question: "Emmanuel Macron is the president of France?",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false},
        
        ]
    },
    {
        question: "Which Prestigious University did Bill Gates Drop Out From?",
        answers: [
            {text: "Princeton", correct: false},
            {text: "Oxford", correct: false},
            {text: "Cambridge", correct: false},
            {text: "Harvard", correct: true},
        
        ]
    },
    {
        question: "A group of lions is called?",
        answers: [
            {text: "A Den", correct: false},
            {text: "A Pride", correct: true},
            {text: "A Flock", correct: false},
            {text: "A Litter", correct: false},
        
        ]
    },
    {
        question: "Barcelona Is In Brazil?",
        answers: [
            {text: "Yes", correct: false},
            {text: "No", correct: true},
        
        ]
    },
    {
        question: "Which music band sang the song 'Incomplete'?",
        answers: [
            {text: "BoyzIIMen", correct: false},
            {text: "Westlife", correct: false},
            {text: "Backstreet Boys", correct: true},
            {text: "MLTR", correct: false},
        
        ]
    },
    {
        question: "In which year did Nigeria become a republic?",
        answers: [
            {text: "1960", correct: false},
            {text: "1961", correct: false},
            {text: "1962", correct: false},
            {text: "1963", correct: true},
        
        ]
    },
]

// Global variables  
const questionElement = document.getElementById('question');

const answerButtons = document.getElementById('answer-buttons');

const nextButton = document.getElementById('next-btn');

let shuffledQuestions;

let currentQuestionIndex;

let score;


// Function to shuffle array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Initialize State for Progress
// Function to save progress to local storage
// Updated Function to save progress to local storage
function saveProgress() {
    const userAnswers = [];
    Array.from(answerButtons.children).forEach((button, index) => {
        if (button.classList.contains("correct") || button.classList.contains("incorrect")) {
            userAnswers.push({
                questionIndex: currentQuestionIndex,
                selectedAnswer: button.innerText
            });
        }
    });

    const quizState = {
        questions: shuffledQuestions,
        currentIndex: currentQuestionIndex,
        score: score,
        userAnswers: userAnswers
    };

    localStorage.setItem('quizProgress', JSON.stringify(quizState));
}

// Function to start the quiz from saved progress
function startQuizFrom(savedState) {
    // Update the quiz state with the saved progress
    shuffledQuestions = savedState.questions;
    currentQuestionIndex = savedState.currentIndex;
    score = savedState.score || 0; // If score was saved, use it, otherwise start from 0

    // Continue the quiz from the saved question index
    showQuestion();
}

// Function to load progress from local storage
function loadProgress() {
    const savedProgress = localStorage.getItem('quizProgress');
    return savedProgress ? JSON.parse(savedProgress) : null;
}

// Function to reset progress
function resetProgress() {
    localStorage.removeItem('quizProgress');
}

// Function to start the quiz
function startQuiz() {
    // Retrieve Progress on Page Load
    const savedState = localStorage.getItem('quizProgress');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        shuffledQuestions = parsedState.questions;
        currentQuestionIndex = parsedState.currentIndex;
        showQuestion();
    } else {
        currentQuestionIndex = 0;
        score = 0;
        shuffledQuestions = shuffleArray(questions);
        showQuestion();
    }
} 

// Function to show a question
function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Function to reset the state of the quiz
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    // Reset the progress
    resetProgress();
} 

// Function to handle the selection of an answer
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    // Save the updated progress
    saveProgress();
}

// Function to show the final score
function showScore() {
    resetState();
    questionElement.innerHTML = `Congratulations!!! You have scored ${score} out of ${shuffledQuestions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to handle the "Next" button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            nextButton.innerHTML = "Submit";
        }
    } else {
        showScore();
    }
}

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
    const progress = loadProgress();
    if (progress) {
        // Resume quiz from saved progress
        startQuizFrom(progress);
    }
    if (currentQuestionIndex < shuffledQuestions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart the quiz
    }
});

startQuiz(); // Start the quiz initially