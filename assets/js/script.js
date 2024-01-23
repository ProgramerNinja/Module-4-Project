var question = document.querySelector(".question");
var answerList = document.querySelector(".answer-list");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var score = document.querySelector(".score");

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
var currentQuestion = 0;

// The init function is called when the page loads 
function init() {
  getScore();
}

// The startGame function is called when the start button is clicked
function startGame() {
  timeUp = false;
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
}

// The timeAtZero function is called when timercount = 0
function timeAtZero() {
  question.textContent = "Times UP!!!";
  startButton.disabled = false;
  setScore();
}

// The setTimer function starts and stops the timer and triggers timeAtZero() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      timeAtZero();
    }
  }, 1000);
}

//
// Need question and answers to be populated
// |
// V

// Updates win count on screen and sets win count to client storage
function setScore() {
  score.textContent = scoreCounter;
  localStorage.setItem("score", scoreCounter);
}


// These functions are used by init
function getScore() {
  // Get stored value from client storage, if it exists
  var storedScore = localStorage.getItem("score");
  // If stored value doesn't exist, set counter to 0
  if (storedScore === null) {
    scoreCounter = 0;
  } else {
    // If a value is retrieved from client storage set the scoreCounter to that value
    scoreCounter = storedScore;
  }
  //Render win count to page
  score.textContent = scoreCounter;
}

function checkCorrect(chosenAnswer) {
  // Checks if the answer that was chosen matches the set correct answer
  if (chosenAnswer === questionData[currentQuestion].answers[questionData[currentQuestion].correctAnswer]) {
    // sets the isCorrect to true and adds to the score
    isCorrect = true;
    scoreCounter++;
  } else{
    timerCount - 5;
  }
}

// Event listener to listen for an aswer being chosen
document.addEventListener("click", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // grab the content of the answer selected and check against the correct answer
  var clickedElement = event.target;
  var chosenAnswer = clickedElement.textContent;
    checkCorrect(chosenAnswer);
  }
);

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
