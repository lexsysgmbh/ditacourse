document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('[data-quiz]');
  if (container) {
    const quizPath = container.getAttribute('data-quiz');
    fetch('customization/js/' + quizPath)
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;
      })
      .catch(err => {
        container.innerHTML = '<p>Error loading quiz.</p>';
        console.error(err);
      });
  }
});
