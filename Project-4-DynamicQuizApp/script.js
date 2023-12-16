const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which programming language is often used for web development?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["China", "Japan", "South Korea", "Vietnam"],
    correctAnswer: "Japan",
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1923", "1931"],
    correctAnswer: "1912",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
    correctAnswer: "Canberra",
  },
  // Add more questions as needed
];

// Example of accessing a question
// console.log(quizData[5].question); // Output: "In which year did the Titanic sink?"

const answerEls = document.querySelectorAll(".answer");
const [questionElm, option_1, option_2, option_3, option_4] =
  document.querySelectorAll(
    "#question, .option_1, .option_2, .option_3, .option_4"
  );
const submitBtn = document.querySelector("#submit");

let currentQuiz = 0;
let score = 0;

//Load quiz function

const loadQuestion = () => {
  if (currentQuiz < quizData.length) {
    const { question, options } = quizData[currentQuiz];
    // console.log(question);

    questionElm.innerText = question;
    options.forEach((curOption, index) => {
      window[`option_${index + 1}`].innerText = curOption;
    });
  } else {
    // Handle the case when there are no more questions
    console.log("Quiz finished. Your score:", score);
  }
};


loadQuestion();
const getSelectedOption = () => {
  let ans_index = -1;

  answerEls.forEach((curOption, index) => {
    if (curOption.checked) {
      ans_index = index;
    }
  });
  console.log(ans_index);
  return ans_index;
};

deselectedAnswer = () => {
  return answerEls.forEach((curElem) => (curElem.checked = false));
};
submitBtn.addEventListener('click', () => {
    const selectedOptionIndex = getSelectedOption();
    console.log("Selected option index:", selectedOptionIndex);

    // Check if the quiz is finished
    if (currentQuiz < quizData.length) {
        // Check if the selected answer is correct
        const correctAnswerIndex = quizData[currentQuiz].options.indexOf(quizData[currentQuiz].correctAnswer);

        if (selectedOptionIndex === correctAnswerIndex) {
            console.log("Correct answer!");
            score++;
        } else {
            console.log("Incorrect answer!");
        }

        // Move to the next question
        currentQuiz++;
        if (currentQuiz < quizData.length) {
        // Load the next question
        deselectedAnswer();
        loadQuestion();
    } else {
        // The quiz is finished, display the score or perform other actions
        console.log("Quiz finished. Your score:", score);

        // Display result and reload button
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = `<div class="result">
            <h2>Your Score: ${score} / ${quizData.length} Correct Answers</h2>
            <p>Congratulations on completing the quiz!</p>
            <button class="reload-button" onclick="location.reload()">Play Again</button>
        </div>`;
        const quizSection = document.querySelector(".quiz");
      quizSection.style.display = "none";

    }
    }
});

