document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('[data-quiz]');
  if (container) {
    const quizPath = container.getAttribute('data-quiz');
    const script = document.createElement('script');
    script.src = `customization/quizzes/${quizPath}`;
    script.onload = function () {
      if (window.quiz) {
        renderQuiz(container, window.quiz);
      } else {
        container.innerHTML = '<p>Quiz data not found.</p>';
      }
    };
    script.onerror = function () {
      container.innerHTML = '<p>Error loading quiz script.</p>';
      console.error(`Failed to load ${quizPath}`);
    };
    document.body.appendChild(script);
  }
});

// Renders the quiz into the container
function renderQuiz(container, quizData) {
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = quizData.title;
  title.className = 'text-xl font-bold mb-4';
  container.appendChild(title);

  const quizForm = document.createElement('form');
  quizData.questions.forEach((q, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-4';

    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionText.className = 'font-semibold mb-2';
    wrapper.appendChild(questionText);

    q.options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.className = 'block mb-1';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${index}`;
      input.value = i;
      input.className = 'mr-2';

      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      wrapper.appendChild(label);
    });

    quizForm.appendChild(wrapper);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  submitBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded';
  quizForm.appendChild(submitBtn);

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let score = 0;

    quizData.questions.forEach((q, index) => {
      const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) {
        score++;
      }
    });

    container.innerHTML = `<p class="mt-4 font-bold">You scored ${score} out of ${quizData.questions.length}</p>`;
  });

  container.appendChild(quizForm);
}
