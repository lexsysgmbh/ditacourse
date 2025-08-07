const fs = require('fs');
const path = require('path');

const outDir = path.join('out');

// Match files like quiz_topic_types.html, quiz_dita_maps.html, etc.
const quizFiles = fs.readdirSync(outDir).filter(file => file.startsWith('quiz_') && file.endsWith('.html'));

if (quizFiles.length === 0) {
  console.log('⚠️ No quiz HTML files found in /out.');
  process.exit(0);
}

quizFiles.forEach(file => {
  const htmlPath = path.join(outDir, file);
  const quizId = file.replace('.html', '').replace(/^quiz_/, 'quiz_');

  // Unique div ID for each quiz
  const quizHTML = `
<div id="${quizId.replace('.html', '')}" data-quiz="${quizId}.js">
  <p>Loading quiz...</p>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

  let content = fs.readFileSync(htmlPath, 'utf-8');

  if (!content.includes(`id="${quizId.replace('.html', '')}"`)) {
    content = content.replace('</main>', `${quizHTML}\n</main>`);
    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log(`✅ Injected quiz into ${file}`);
  } else {
    console.log(`ℹ️ Quiz already injected into ${file}`);
  }
});
