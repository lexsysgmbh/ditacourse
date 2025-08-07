document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('[data-quiz]');
    if (container) {
        const quizPath = container.getAttribute('data-quiz');
        fetch(`customization/quizzes/${quizPath}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load quiz: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
            })
            .catch(err => {
                container.innerHTML = '<p>Error loading quiz.</p>';
                console.error(err);
            });
    }
});
