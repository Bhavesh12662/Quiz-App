// QuickCheck quiz: question data, countdown timer, answer checking and score summary.
const questions = [
  {
    question: "Which keyword declares a variable that can be reassigned?",
    answers: ["const", "let", "static", "define"],
    correct: 1,
    explanation: "let declares a block-scoped variable that can be reassigned."
  },
  {
    question: "Which method adds a new item to the end of an array?",
    answers: ["shift()", "unshift()", "push()", "pop()"],
    correct: 2,
    explanation: "push() adds one or more items to the end of an array."
  },
  {
    question: "What does === check in JavaScript?",
    answers: ["Value only", "Type only", "Value and type", "Whether a value exists"],
    correct: 2,
    explanation: "Strict equality (===) compares both value and type without type conversion."
  },
  {
    question: "Which event runs when a user clicks an element?",
    answers: ["change", "submit", "load", "click"],
    correct: 3,
    explanation: "The click event fires when the user clicks an element."
  },
  {
    question: "Which browser feature can store data between page refreshes?",
    answers: ["localStorage", "console.log()", "alert()", "prompt()"],
    correct: 0,
    explanation: "localStorage stores key-value data in the browser until it is cleared."
  }
];

const QUESTION_TIME = 20;

const quizView = document.querySelector("#quizView");
const resultView = document.querySelector("#resultView");
const questionText = document.querySelector("#questionText");
const answerList = document.querySelector("#answerList");
const questionCounter = document.querySelector("#questionCounter");
const answeredCounter = document.querySelector("#answeredCounter");
const progressFill = document.querySelector("#progressFill");
const timerText = document.querySelector("#timerText");
const timerBox = document.querySelector("#timerBox");
const feedback = document.querySelector("#feedback");
const nextBtn = document.querySelector("#nextBtn");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let secondsLeft = QUESTION_TIME;
let timerId = null;
let hasAnswered = false;

function startTimer() {
  clearInterval(timerId);
  secondsLeft = QUESTION_TIME;
  updateTimerDisplay();

  timerId = setInterval(() => {
    secondsLeft -= 1;
    updateTimerDisplay();

    if (secondsLeft <= 0) {
      clearInterval(timerId);
      if (!hasAnswered) {
        handleTimeout();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerText.textContent = `00:${String(secondsLeft).padStart(2, "0")}`;
  timerBox.classList.toggle("warning", secondsLeft <= 5);
}

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  selectedAnswer = null;
  hasAnswered = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;
  nextBtn.innerHTML = currentQuestionIndex === questions.length - 1
    ? 'See results <span>→</span>'
    : 'Next question <span>→</span>';

  questionCounter.textContent =
    `QUESTION ${String(currentQuestionIndex + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  answeredCounter.textContent = `${currentQuestionIndex} answered`;
  progressFill.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
  questionText.textContent = currentQuestion.question;

  answerList.replaceChildren();
  const letters = ["A", "B", "C", "D"];

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = letters[index];

    const answerText = document.createElement("span");
    answerText.className = "option-text";
    answerText.textContent = answer;

    button.append(letter, answerText);
    button.addEventListener("click", () => selectAnswer(index));
    answerList.append(button);
  });

  startTimer();
}

function selectAnswer(answerIndex) {
  if (hasAnswered) return;

  hasAnswered = true;
  selectedAnswer = answerIndex;
  clearInterval(timerId);

  const currentQuestion = questions[currentQuestionIndex];
  const options = answerList.querySelectorAll(".answer-option");
  const isCorrect = answerIndex === currentQuestion.correct;

  options.forEach((option, index) => {
    option.disabled = true;
    if (index === currentQuestion.correct) option.classList.add("correct");
    if (index === answerIndex && !isCorrect) option.classList.add("incorrect");
    if (index === answerIndex) option.classList.add("selected");
  });

  if (isCorrect) {
    score += 1;
    feedback.textContent = `Correct! ${currentQuestion.explanation}`;
    feedback.className = "feedback";
  } else {
    feedback.textContent = `Not quite. ${currentQuestion.explanation}`;
    feedback.className = "feedback wrong";
  }

  answeredCounter.textContent = `${currentQuestionIndex + 1} answered`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  nextBtn.disabled = false;
}

function handleTimeout() {
  hasAnswered = true;
  const currentQuestion = questions[currentQuestionIndex];
  const options = answerList.querySelectorAll(".answer-option");

  options.forEach((option, index) => {
    option.disabled = true;
    if (index === currentQuestion.correct) option.classList.add("correct");
  });

  feedback.textContent = `Time is up. ${currentQuestion.explanation}`;
  feedback.className = "feedback wrong";
  answeredCounter.textContent = `${currentQuestionIndex + 1} answered`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  nextBtn.disabled = false;
}

function showResults() {
  clearInterval(timerId);
  quizView.hidden = true;
  resultView.hidden = false;
  timerBox.hidden = true;

  const percentage = Math.round((score / questions.length) * 100);
  document.querySelector("#finalScore").textContent = `${score}/${questions.length}`;
  document.querySelector("#accuracy").textContent = `${percentage}%`;
  document.querySelector("#correctAnswers").textContent = score;

  let heading;
  let message;
  if (percentage === 100) {
    heading = "Perfect score!";
    message = "Every answer was right. You know your JavaScript basics.";
  } else if (percentage >= 60) {
    heading = "Good effort.";
    message = "You have a solid start. Review the explanations and try again.";
  } else {
    heading = "Keep practising.";
    message = "Go over the fundamentals, then take another run at the quiz.";
  }

  document.querySelector("#resultHeading").textContent = heading;
  document.querySelector("#resultCopy").textContent = `You answered ${score} out of ${questions.length} questions correctly.`;
  document.querySelector("#resultMessage").textContent = message;
  document.querySelector("#resultStamp").textContent = percentage >= 60 ? "✓" : "↗";
}

nextBtn.addEventListener("click", () => {
  if (!hasAnswered) return;

  if (currentQuestionIndex === questions.length - 1) {
    showResults();
  } else {
    currentQuestionIndex += 1;
    renderQuestion();
  }
});

document.querySelector("#restartBtn").addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  quizView.hidden = false;
  resultView.hidden = true;
  timerBox.hidden = false;
  renderQuestion();
});

renderQuestion();
