let children = 0;  // Default to 0 children
let taxSavings = 0; // Global variable to store the calculated tax savings

// Event listeners for child buttons
document.querySelectorAll('.child-btn').forEach(button => {
  button.addEventListener('click', function() {
    children = parseInt(this.getAttribute('data-children'));  // Get the number of children from the button's data-attribute
    highlightSelectedButton(this);  // Highlight the selected button
  });
});

// Event listener for the calculate button
document.querySelector('#calculate').addEventListener('click', function() {
    // Calculate tax savings
    calculateTax();
    // Call function to calculate the budget breakdown using global taxSavings
    calculateBudgetBreakdown(taxSavings);
});

function calculateTax() {
  const income = document.querySelector('#income').value;
  const period = document.querySelector('#period').value;

  // Set the base tax rate (adjust as needed)
  let taxRate = 0.25;

  // Adjust the tax rate based on number of children (lower tax for more kids)
  if (children === 1) {
    taxRate -= 0.03;  // 3% tax reduction for 1 child
  } else if (children === 2) {
    taxRate -= 0.05;  // 5% tax reduction for 2 children
  } else if (children >= 3) {
    taxRate -= 0.07;  // 7% tax reduction for 3 or more children
  }

  // Calculate the yearly income based on the selected period
  let yearlyIncome;
  if (period === 'week') {
    yearlyIncome = income * 52;
  } else if (period === 'month') {
    yearlyIncome = income * 12;
  } else {
    yearlyIncome = income;
  }

  // Calculate tax savings
  taxSavings = yearlyIncome * taxRate;

  // Add a fun message
  let funnyMessage;
  if (taxSavings < 5000) {
    funnyMessage = "You're making it rain, but don't forget to save for Uncle Sam!";
  } else if (taxSavings >= 5000 && taxSavings < 20000) {
    funnyMessage = "You’re rolling in it, but remember to stash some for taxes! 😎";
  } else {
    funnyMessage = "Big baller alert! Keep it up, but save that bag for tax season. 💰";
  }

  // Display the result
  document.querySelector('#result').textContent = `You should save about $${taxSavings.toFixed(2)} for taxes this year. ${funnyMessage}`;
}

// Highlight the selected button for children
function highlightSelectedButton(selectedButton) {
  // Remove the highlight from all buttons
  document.querySelectorAll('.child-btn').forEach(button => {
    button.style.backgroundColor = '#f4a261';
  });
  
  // Add highlight to the selected button
  selectedButton.style.backgroundColor = '#2a9d8f';
}

// Budget breakdown calculation
function calculateBudgetBreakdown(taxSavings) {
  // Divide the total tax savings by 12 for monthly savings and by 52 for weekly savings
  const weeklySavings = taxSavings / 52;
  const monthlySavings = taxSavings / 12;

  // Update the HTML with the new breakdown for both weekly and monthly savings
  document.querySelector('#weekly-savings-amount').textContent = `$${weeklySavings.toFixed(2)}`;
  document.querySelector('#monthly-savings-amount').textContent = `$${monthlySavings.toFixed(2)}`;
}

//quiz logic
const quizData = [
  {
    question: "Which of the following can you deduct as a business expense?",
    answers: [
      "Costumes and stage outfits",
      "Hair and makeup",
      "Transportation to and from the club",
      "All of the above"
    ],
    correct: "d",
    feedback: "Correct! You can deduct costumes, makeup, and even transportation as part of your business expenses."
  },
  {
    question: "As an exotic dancer, do you need to pay taxes every quarter or just once a year?",
    answers: [
      "Every quarter",
      "Only at the end of the year",
      "It doesn’t matter",
      "Pay what I want because I am a boss"
    ],
    correct: "a",
    feedback: "Correct! Since you're likely considered an independent contractor, you're responsible for paying estimated quarterly taxes."
  },
  {
    question: "How should you keep track of your work-related expenses to make tax time easier?",
    answers: [
      "Keep all receipts and log them regularly",
      "Use a spreadsheet or an app to track expenses",
      "Both a & b",
      "Keep my mind on my money and my money on my mind"
    ],
    correct: "c",
    feedback: "Correct! Keeping receipts and logging your expenses in an organized way (using spreadsheets or an app) will save you time and money."
  }
];

let currentQuestion = 0;

document.querySelectorAll('.quiz-answer').forEach((button, index) => {
  button.addEventListener('click', function() {
    const selectedAnswer = this.getAttribute('data-answer');
    checkAnswer(selectedAnswer);
  });
});

document.querySelector('#next-question').addEventListener('click', nextQuestion);
document.querySelector('#retry-quiz').addEventListener('click', restartQuiz);

function loadQuestion() {
  const quizQuestion = quizData[currentQuestion];
  document.querySelector('#question-text').textContent = quizQuestion.question;
  document.querySelectorAll('.quiz-answer').forEach((button, index) => {
    button.textContent = `${String.fromCharCode(97 + index)}) ${quizQuestion.answers[index]}`;
  });
  document.querySelector('#quiz-feedback').classList.add('hidden');
  document.querySelector('#next-question').classList.add('hidden');
  document.querySelector('#retry-quiz').classList.add('hidden');
}

function checkAnswer(selectedAnswer) {
  const quizQuestion = quizData[currentQuestion];
  const feedbackElement = document.querySelector('#quiz-feedback');
  
  if (selectedAnswer === quizQuestion.correct) {
    feedbackElement.textContent = quizQuestion.feedback;
    feedbackElement.style.color = 'green';
  } else {
    feedbackElement.textContent = `Incorrect. The correct answer was: ${quizQuestion.correct.toUpperCase()}`;
    feedbackElement.style.color = 'red';
  }
  
  feedbackElement.classList.remove('hidden');
  document.querySelector('#next-question').classList.remove('hidden');
}

function nextQuestion() {
  currentQuestion++;
  
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.querySelector('#quiz-question').innerHTML = '<p>Great job! You’ve completed the quiz!</p>';
    document.querySelector('#retry-quiz').classList.remove('hidden');
  }
}

function restartQuiz() {
  currentQuestion = 0;
  loadQuestion();
}

// Load the first question
loadQuestion();
