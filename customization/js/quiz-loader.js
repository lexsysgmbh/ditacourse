document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector('[data-quiz]');
  if (!container) return;

  const quizPath = container.getAttribute("data-quiz");

  try {
    const module = await import(`./${quizPath}`);
    const questions = module.default;

    // Initialize quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedButton = null;

    container.innerHTML = `
      <div class="quiz-container">
        <h2 id="question" class="quiz-question"></h2>
        <div id="options" class="quiz-options"></div>
        <div id="feedback" class="quiz-feedback"></div>
        <div class="quiz-controls">
          <button id="next" class="quiz-next" disabled>Next Question</button>
        </div>
        <div id="results" class="quiz-results hidden">
          <h2 class="quiz-score"></h2>
          <button id="restart" class="quiz-restart">Play Again</button>
        </div>
      </div>
    `;

    const questionEl = container.querySelector("#question");
    const optionsEl = container.querySelector("#options");
    const feedbackEl = container.querySelector("#feedback");
    const nextButton = container.querySelector("#next");
    const restartButton = container.querySelector("#restart");
    const resultsEl = container.querySelector("#results");
    const scoreText = container.querySelector(".quiz-score");

    function loadQuestion() {
      const q = questions[currentQuestionIndex];
      questionEl.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
      feedbackEl.textContent = "";
      nextButton.disabled = true;
      optionsEl.innerHTML = "";
      selectedButton = null;

      q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "quiz-option";
        btn.onclick = () => selectOption(btn, opt);
        optionsEl.appendChild(btn);
      });
    }

    function selectOption(btn, answer) {
      if (selectedButton) {
        selectedButton.classList.remove("selected");
      }

      selectedButton = btn;
      selectedButton.classList.add("selected");

      Array.from(optionsEl.children).forEach((b) => {
        b.disabled = true;
      });

      const q = questions[currentQuestionIndex];
      if (answer === q.answer) {
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "quiz-feedback correct";
        btn.classList.add("correct");
      } else {
        feedbackEl.textContent = `Incorrect. The correct answer was: ${q.answer}`;
        feedbackEl.className = "quiz-feedback incorrect";
        btn.classList.add("incorrect");

        // Highlight correct one
        Array.from(optionsEl.children).forEach((b) => {
          if (b.textContent === q.answer) b.classList.add("correct");
        });
      }

      nextButton.disabled = false;
    }

    nextButton.onclick = () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        questionEl.textContent = "";
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        nextButton.classList.add("hidden");
        resultsEl.classList.remove("hidden");
        scoreText.textContent = `You scored ${score} out of ${questions.length}!`;
      }
    };

    restartButton.onclick = () => {
      currentQuestionIndex = 0;
      score = 0;
      resultsEl.classList.add("hidden");
      nextButton.classList.remove("hidden");
      loadQuestion();
    };

    loadQuestion();
  } catch (e) {
    console.error("Quiz failed to load:", e);
    container.innerHTML = `<p class="quiz-error">Failed to load quiz.</p>`;
  }
});
