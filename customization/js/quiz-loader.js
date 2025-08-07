document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('[data-quiz]');
  if (container) {
    const quizPath = container.getAttribute('data-quiz');
    fetch('customization/js/' + quizPath)
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;

        // Re-run any script tags added via innerHTML
        const scripts = container.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
        });
      })
      .catch(err => {
        container.innerHTML = '<p style="color:red;">Failed to load quiz.</p>';
        console.error(err);
      });
  }
});
