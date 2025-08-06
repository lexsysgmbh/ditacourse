<!-- Tailwind CDN (optional, can later be replaced with local CSS) -->
<script src="https://cdn.tailwindcss.com"></script>

<div class="container mx-auto max-w-xl p-6 bg-white rounded-xl shadow-md">
  <h1 class="text-3xl font-extrabold text-center text-blue-800 mb-8">DITA XML Quiz</h1>

  <div id="quiz-section">
    <div class="text-xl font-bold mb-6" id="question-text"></div>
    <div id="options-container" class="grid grid-cols-1 gap-4"></div>
    <div id="feedback-message" class="text-center mt-4 font-semibold"></div>
    <div class="flex justify-end mt-6">
      <button id="next-button" class="bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50" disabled>Next Question</button>
    </div>
  </div>

  <div id="results-section" class="hidden text-center mt-8">
    <h2 id="final-score" class="text-2xl font-bold text-blue-700 mb-2"></h2>
    <p class="text-gray-700 mb-4">Thanks for playing!</p>
    <button id="restart-button" class="bg-orange-400 text-white px-5 py-2 rounded">Play Again</button>
  </div>
</div>

<script>
  const questions = [
    {
      question: "What is the primary goal of structured authoring?",
      options: [
        "a) To create visually appealing documents",
        "b) Enable consistent, reusable, and scalable content creation.",
        "c) To convert unstructured text into XML",
        "d) To primarily support single-channel publishing"
      ],
      answer: "b) Enable consistent, reusable, and scalable content creation."
    },
    {
      question: "Which of the following is NOT a core principle of DITA?",
      options: [
        "a) Topic-based authoring",
        "b) Specialization",
        "c) Content reuse",
        "d) Proprietary format."
      ],
      answer: "d) Proprietary format."
    },
    {
      question: "How does DITA support multi-channel publishing?",
      options: [
        "a) By embedding presentation styles directly in the XML",
        "b) By requiring manual formatting for each output type",
        "c) By separating content from presentation.",
        "d) By using only PDF as an output format"
      ],
      answer: "c) By separating content from presentation."
    },
    {
      question: "Which business challenge does DITA's content reuse capability primarily solve?",
      options: [
        "a) Difficulty in finding qualified technical writers",
        "b) Duplicate content maintenance across multiple documents.",
        "c) High costs of design software",
        "d) Lack of version control in documentation"
      ],
      answer: "b) Duplicate content maintenance across multiple documents."
    },
    {
      question: "When should an organization typically choose DITA over simpler markup formats like Markdown?",
      options: [
        "a) For simple blog posts or short articles",
        "b) When they need only basic text formatting",
        "c) When they need advanced content reuse, conditional publishing, or professional multi-format output.",
        "d) When they prefer a proprietary and closed system"
      ],
      answer: "c) When they need advanced content reuse, conditional publishing, or professional multi-format output."
    }
  ];

  const quizSection = document.getElementById('quiz-section');
  const resultsSection = document.getElementById('results-section');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const feedbackMessage = document.getElementById('feedback-message');
  const nextButton = document.getElementById('next-button');
  const restartButton = document.getElementById('restart-button');
  const finalScoreText = document.getElementById('final-score');

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;

  function loadQuestion() {
    optionsContainer.innerHTML = '';
    feedbackMessage.textContent = '';
    nextButton.disabled = true;
    selectedOption = null;

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.className = 'border rounded px-4 py-2 text-left w-full hover:bg-gray-100';
      button.addEventListener('click', () => selectOption(button, option));
      optionsContainer.appendChild(button);
    });
  }

  function selectOption(button, optionText) {
    if (selectedOption) {
      selectedOption.classList.remove('bg-blue-100');
    }

    selectedOption = button;
    selectedOption.classList.add('bg-blue-100');

    Array.from(optionsContainer.children).forEach(btn => {
      btn.disabled = true;
    });

    checkAnswer(optionText);
    nextButton.disabled = false;
  }

  function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      score++;
      feedbackMessage.textContent = "Correct!";
      feedbackMessage.className = "text-green-600 font-bold text-center mt-4";
      selectedOption.classList.add('bg-green-100', 'border-green-400');
    } else {
      feedbackMessage.textContent = "Incorrect. Correct answer: " + currentQuestion.answer;
      feedbackMessage.className = "text-red-600 font-bold text-center mt-4";
      selectedOption.classList.add('bg-red-100', 'border-red-400');

      Array.from(optionsContainer.children).forEach(btn => {
        if (btn.textContent === currentQuestion.answer) {
          btn.classList.add('bg-green-100', 'border-green-400');
        }
      });
    }
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      displayResults();
    }
  }

  function displayResults() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    finalScoreText.textContent = `You scored ${score} out of ${questions.length}`;
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    loadQuestion();
  }

  nextButton.addEventListener('click', nextQuestion);
  restartButton.addEventListener('click', restartQuiz);
  document.addEventListener('DOMContentLoaded', loadQuestion);
</script>
