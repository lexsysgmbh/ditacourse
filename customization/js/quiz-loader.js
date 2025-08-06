document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('[data-quiz]');
  if (container) {
    const quizPath = container.getAttribute('data-quiz');
    
    // Use relative path based on current location to support GitHub Pages subfolders
    const basePath = window.location.pathname.replace(/\/[^\/]*$/, '/');
    const fullPath = `${basePath}customization/quizzes/${quizPath}`;

    fetch(fullPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
      })
      .catch(err => {
        container.innerHTML = '<p>Error loading quiz.</p>';
        console.error('Quiz loader error:', err);
      });
  }
});
