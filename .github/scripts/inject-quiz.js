const fs = require('fs');
const path = require('path');

// Define quizzes to inject
const quizzes = [
  {
    file: 'quiz_introduction_to_dita.html',
    id: 'quiz-intro-dita',
    script: 'quiz_introduction_to_dita.js',
  },
  {
    file: 'quiz_dita_maps.html',
    id: 'quiz-dita-maps',
    script: 'quiz_dita_maps.js',
  },
  {
    file: 'quiz_topic_types.html',
    id: 'quiz-topic-types',
    script: 'quiz_topic_types.js',
  },
  {
    file: 'quiz_short_descriptions.html',
    id: 'quiz-short-descriptions',
    script: 'quiz_short_descriptions.js',
  },
  {
    file: 'quiz_content_reuse.html',
    id: 'quiz-content-reuse',
    script: 'quiz_content_reuse.js',
  }
];

quizzes.forEach(({ file, id, script }) => {
  const htmlFile = path.join('out', file);
  const injectContent = `
<div class="quiz-container">
  <div id="${id}" data-quiz="${script}">
    <p>Loading interactive quiz…</p>
  </div>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

  try {
    let html = fs.readFileSync(htmlFile, 'utf-8');

    if (!html.includes(`id="${id}"`)) {
      html = html.replace('</article>', `${injectContent}\n</article>`);
      fs.writeFileSync(htmlFile, html, 'utf-8');
      console.log(`✅ Injected quiz into ${htmlFile}`);
    } else {
      console.log(`ℹ️ Quiz already present in ${htmlFile}`);
    }
  } catch (err) {
    console.error(`❌ Failed to inject quiz into ${htmlFile}:`, err);
  }
});
