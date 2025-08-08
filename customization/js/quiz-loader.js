  document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('[data-quiz]');
  if (!container) return;

  const quizPath = container.getAttribute('data-quiz');
  if (!quizPath) return;

  const script = document.createElement('script');
  script.src = 'customization/js/' + quizPath;
  script.onload = () => {
    if (typeof quizData === 'undefined') {
      container.innerHTML = "<p>Quiz data not found.</p>";
      return;
    }

    let current = 0;
    let score = 0;

    const questionEl = document.createElement("div");
    const optionsEl = document.createElement("div");
    const feedbackEl = document.createElement("div");
    const buttonEl = document.createElement("button");
    const restartEl = document.createElement("button");
    const resultEl = document.createElement("div");

// Create wrapper div for styling and alignment
    const wrapper = document.createElement("div");
    wrapper.className = "quiz-wrapper";

// Clear previous content
    container.innerHTML = "";

// Append quiz elements into wrapper
    wrapper.appendChild(questionEl);
    wrapper.appendChild(optionsEl);
    wrapper.appendChild(feedbackEl);
    wrapper.appendChild(buttonEl);
    wrapper.appendChild(restartEl);
    wrapper.appendChild(resultEl);

// Append wrapper into container
    container.appendChild(wrapper);

// Set initial text and styling
    buttonEl.textContent = "Submit";
    buttonEl.style.marginTop = "1em";

    restartEl.textContent = "Try Again";
    restartEl.style.display = "none";
    restartEl.style.marginTop = "1em";


    let selected = null;

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = `${current + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  resultEl.textContent = "";
  selected = null;
  buttonEl.disabled = true;
  buttonEl.textContent = "Submit";
  buttonEl.onclick = handleSubmit; // ✅ Reset

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quiz";
    input.value = i;
    input.addEventListener("change", () => {
      selected = parseInt(input.value);
      buttonEl.disabled = false;
    });
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opt));
    label.style.display = "block";
    optionsEl.appendChild(label);
  });
}

    buttonEl.onclick = handleSubmit;

function handleSubmit() {
  const q = quizData[current];
  const inputs = optionsEl.querySelectorAll("input[type=radio]");
  inputs.forEach((input) => input.disabled = true);

  if (selected === q.answerIndex) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
    score++;
  } else {
    feedbackEl.textContent = `❌ Incorrect. Correct answer: ${q.options[q.answerIndex]}`;
    feedbackEl.style.color = "red";
  }

  // Change button label and behavior
  buttonEl.textContent = current < quizData.length - 1 ? "Next" : "See Results";
  buttonEl.onclick = next;
}

    function next() {
      current++;
      if (current < quizData.length) {
        buttonEl.textContent = "Submit";
        loadQuestion();
      } else {
        showResults();
      }
    }

    function showResults() {
      questionEl.textContent = "";
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      buttonEl.style.display = "none";
      resultEl.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>`;
      restartEl.style.display = "inline-block";
    }

    restartEl.onclick = () => {
      current = 0;
      score = 0;
      buttonEl.style.display = "inline-block";
      buttonEl.textContent = "Submit";
      restartEl.style.display = "none";
      loadQuestion();
    };

    loadQuestion();
  };

  script.onerror = () => {
    container.innerHTML = "<p>Error loading quiz script.</p>";
  };

  document.body.appendChild(script);
});
