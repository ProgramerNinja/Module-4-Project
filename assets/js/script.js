var questionElement = document.querySelector(".question");
var questionBox = document.querySelector(".question-box");
var answerList = document.querySelector(".answer-list");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var answerBox = document.querySelector(".answer-box");
var score = document.querySelector(".score");
var resetButton = document.querySelector(".reset-button");
var submitButton = document.querySelector(".submit-button");
var submitSection = document.querySelector(".submit-section");
var gameInfo = document.querySelector(".game-info");
var resetButton = document.querySelector(".reset-button");
var highScoresSection = document.querySelector(".high-scores");

// Array of question objects that contain the questions for the test
var questionData = [
  // {
  //   question: "What is the capital of France?", // Questin to ask
  //   answers: ["Paris", "London", "Berlin", "Rome"], // Possible answers
  //   correctAnswer: 0 // Index of the correct answer in the answers array
  // },
  // {
  //   question: "What is the largest planet in our solar system?",
  //   answers: ["Mercury", "Venus", "Earth", "Jupiter"],
  //   correctAnswer: 3
  // },
  // Add more question objects as needed
  { question: "What is HTML?", answers: ["High-level Text Manipulation Language", "Hyperlink Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language"], correctAnswer: 2 },

  { question: "What is CSS?", answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Cascading Sheet Styles"], correctAnswer: 1 },

  { question: "What is JavaScript?", answers: ["A markup language", "A styling language", "A programming language", "A database language"], correctAnswer: 2 },

  { question: "What is the purpose of a web server?", answers: ["To create web pages", "To style web pages", "To host and serve web pages", "To store data for web pages"], correctAnswer: 2 },

  { question: "What is a database?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A structured collection of data"], correctAnswer: 3 },

  { question: "What is a front-end framework?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A collection of pre-written code for building user interfaces"], correctAnswer: 3 },

  { question: "What is a back-end framework?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A collection of pre-written code for building server-side applications"], correctAnswer: 3 },

  { question: "What is an API?", answers: ["Application Programming Internet", "Application Programming Interface", "Application Programming Integration", "Application Programming Interface"], correctAnswer: 1 },

  { question: "What is a RESTful API?", answers: ["An API that uses JavaScript", "An API that follows the principles of Representational State Transfer", "An API that is used for styling web pages", "An API that is used for hosting web pages"], correctAnswer: 1 },

  { question: "What is version control?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A system for managing changes to files and code"], correctAnswer: 3 },

  { question: "What is Git?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A distributed version control system"], correctAnswer: 3 },

  { question: "What is GitHub?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A web-based hosting service for Git repositories"], correctAnswer: 3 },

  { question: "What is a full stack developer?", answers: ["A developer who only works on the front-end of a web application", "A developer who only works on the back-end of a web application", "A developer who specializes in databases", "A developer who can work on both the front-end and back-end of a web application"], correctAnswer: 3 },

  { question: "What is responsive web design?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "Designing websites that adapt to different screen sizes and devices"], correctAnswer: 3 },

  { question: "What is a wireframe?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A visual representation of the layout and structure of a web page"], correctAnswer: 3 },

  { question: "What is a user story?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "A description of a feature from the perspective of the end user"], correctAnswer: 3 },

  { question: "What is a front-end developer responsible for?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "Building the user interface and user experience of a web application"], correctAnswer: 3 },

  { question: "What is a back-end developer responsible for?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "Building the server-side logic and database of a web application"], correctAnswer: 3 },

  { question: "What is the purpose of testing in web development?", answers: ["A programming language", "A server for hosting web pages", "A styling language", "To ensure that the application works as expected and to catch any bugs or errors"], correctAnswer: 3 },
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
  gameInfo.style.display = "none";
  answerBox.style.display = "none";
  highScoresString = localStorage.getItem("highScores");
  highScores = JSON.parse(highScoresString) || [];
  renderHighScores()
}

// The startGame function is called when the start button is clicked
function startGame() {
  timeUp = false;
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  submitSection.style.display = "none";
  resetButton.style.display = "none";
  startButton.style.display = "none";
  answerBox.style.display = "block";
  gameInfo.style.display = "flex";
  questionBox.style.display = "block";
  scoreCounter = 0;
  nextQuestion()
  populateQuestion()
  startTimer()
}

function renderHighScores() {
  highScoresSection.textContent = "";
  highScores.forEach(function(data, index) {
    const liElement = document.createElement("li");
    liElement.textContent = data.playerName + ': ' + data.score;
    //liElement.classList.add("answer");
    highScoresSection.appendChild(liElement);
})}

function nextQuestion() {
  // Pick a question index from our question bank
  currentQuestionIndex = Math.floor(Math.random() * questionData.length);
}

// The timeAtZero function is called when timercount = 0
function timeAtZero() {
  timerElement.textContent = "Times UP!!!";
  resetButton.style.display = "inline-block";
  submitSection.style.display = "inline-block";
  answerBox.style.display = "none";
  questionBox.style.display = "none";
  submitButton.disabled = false;
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
  submitButton.disabled = true;
  score = scoreCounter;
  playerName = document.getElementById("player-name").value;
  record = {
    playerName,
    score
  }
  highScores.push(record);
  var updatedHighScores = JSON.stringify(highScores);
  localStorage.setItem("highScores", updatedHighScores);
  renderHighScores()
};

// Updates win count on screen and sets win count to client storage
function setScore() {
  score.textContent = "Score: " + scoreCounter;
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

function resetGame() {
  // Resets the Score
  scoreCounter = 0;
  // Renders score and puts them into client storage
  setScore()
  startGame()
}
// Event listener for button
resetButton.addEventListener("click", resetGame);
submitButton.addEventListener("click", SetHighScore)