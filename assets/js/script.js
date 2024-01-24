var questionElement = document.querySelector(".question");
var answerList = document.querySelector(".answer-list");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var score = document.querySelector(".score");
var resetButton = document.querySelector(".reset-button");
var submitButton = document.querySelector(".submit-button");
var submitSection = document.querySelector(".submit-section");

// Array of question objects that contain the questions for the test
var questionData = [
  {
    question: "What is the capital of France?", // Questin to ask
    answers: ["Paris", "London", "Berlin", "Rome"], // Possible answers
    correctAnswer: 0 // Index of the correct answer in the answers array
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Mercury", "Venus", "Earth", "Jupiter"],
    correctAnswer: 3
  },
  // Add more question objects as needed
];

//Setting up needed variables
var scoreCounter = 0;
var timer;
var timerCount;
var currentQuestion;
var currentQuestionIndex;


// The init function is called when the page loads 
function init() {
  resetButton.style.display = "none";
  submitSection.style.display = "none";
  highScoresString = localStorage.getItem("highScores");
  highScores = JSON.parse(highScoresString) || [];
}

// The startGame function is called when the start button is clicked
function startGame() {
  timeUp = false;
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startButton.style.display = "none";
  submitSection.style.display = "none";
  scoreCounter = 0;
  nextQuestion()
  populateQuestion()
  startTimer()
}

function nextQuestion() {
  // Pick a question index from our question bank
  currentQuestionIndex = Math.floor(Math.random() * questionData.length);
}

// The timeAtZero function is called when timercount = 0
function timeAtZero() {
  questionElement.textContent = "Times UP!!!";
  startButton.disabled = false;
  resetButton.style.display = "block";
  submitSection.style.display = "block";
  setScore();
}

// The setTimer function starts and stops the timer and triggers timeAtZero() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      timeAtZero();
    }
  }, 1000);
}


// populates both the answer and question field when called
function populateQuestion() {

  //finding our next question and putting it as a variable
  currentQuestion = questionData[currentQuestionIndex];

  // Clear existing content
  answerList.innerHTML = "";
  questionElement.textContent = "";

  let tempQuestion = currentQuestion.question;
  questionElement.textContent = tempQuestion;

  currentQuestion.answers.forEach(function(answer) {
    const liElement = document.createElement("li");
    liElement.textContent = answer;
    liElement.classList.add("answer");
    answerList.appendChild(liElement);
  });
}

function SetHighScore () {
  score = scoreCounter;
  playerName = document.getElementById("player-name").value;
  record = {
    playerName,
    score
  }
  highScores.push(record);
  var updatedHighScores = JSON.stringify(highScores);
  localStorage.setItem("highScores", updatedHighScores);
};

// Updates win count on screen and sets win count to client storage
function setScore() {
  score.textContent = scoreCounter;
  localStorage.setItem("score", scoreCounter);
}

function checkCorrect(chosenAnswer) {
  // Get the correct answer using the stored index
  var correctAnswer = questionData[currentQuestionIndex].correctAnswer;
  if (chosenAnswer === currentQuestion.answers[correctAnswer]) {
    // adds to the score
    scoreCounter++;
    setScore()
    nextQuestion()
    populateQuestion()
  } else {
    timerCount = timerCount - 5;
  }
}

// Event listener to listen for an aswer being chosen
answerList.addEventListener("click", function(event) {
  // If the count is zero, exit function
  if (timerCount <= 0) {
    return;
  }
  // grab the content of the answer selected and check against the correct answer
  var clickedElement = event.target;
  var chosenAnswer = clickedElement.textContent;

  checkCorrect(chosenAnswer);
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets the Score
  scoreCounter = 0;
  // Renders score and puts them into client storage
  setScore()
}
// Event listener for button
resetButton.addEventListener("click", resetGame);
submitButton.addEventListener("click", SetHighScore)