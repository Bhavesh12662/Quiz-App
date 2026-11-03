# QuickCheck Quiz App

A timed multiple-choice JavaScript quiz built with HTML, CSS and vanilla JavaScript.

## Features

- Five JavaScript fundamentals questions
- 20-second countdown for each question
- Four answer options per question
- Immediate correct/incorrect feedback
- Correct answer shown after selection or timeout
- Score calculation and final percentage
- Restart quiz button
- Responsive layout for mobile and desktop
- No framework or backend required

## Project structure

```text
quiz-app/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── quiz.js
```

## Run the project

1. Extract `quiz-app.zip`.
2. Open the folder in VS Code.
3. Open `index.html` with Live Server, or open it directly in a browser.

No npm install or build command is needed.

## Test checklist

- [ ] Start the quiz and confirm the timer begins at 20 seconds.
- [ ] Select a correct answer and check the feedback.
- [ ] Select a wrong answer and check the correct option is shown.
- [ ] Wait for the timer to reach zero and confirm the question advances.
- [ ] Finish all questions and check the score and percentage.
- [ ] Restart the quiz and confirm the score resets.
- [ ] Test on a narrow mobile screen.

## JavaScript concepts used

- Arrays and objects for question data
- `querySelector()` and DOM manipulation
- `addEventListener()` for user actions
- `setInterval()` and `clearInterval()` for the countdown
- Conditional statements for answer checking and result messages
- Functions to separate the quiz logic into manageable parts
