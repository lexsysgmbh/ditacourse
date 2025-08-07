const fs = require('fs');
const path = require('path');

const outDir = path.join('out');
const quizJsDir = path.join('customization', 'js');

const quizFiles = fs.readdirSync(outDir).filter(file =>
  file.startsWith('quiz_') && file.endsWith('.html')
);

if (quizFiles.length === 0) {
  console.log('⚠️ No quiz HTML files found in /out.');
  process.exit(0);
}

quizFiles.forEach(file => {
  const htmlPath = path.join(outDir, file);
  const quizId = file.replace('.html', ''); // e.g. quiz_dita_maps
  const quizJsFile = `${quizId}.js`;        // e.g. quiz_dita_maps.js
  const quizJsPath = path.join(quizJsDir, quizJsFile);

  const quizHTML = fs.existsSync(quizJsPath)
    ? `
<div id="${quizId}" data-quiz="${quizJsFile}">
  <p>Loading quiz...</p>
</div>
<script src="customization/js/quiz-loader.js"></script>
`
    : `
<div style="border: 2px dashed red; padding: 1rem;">
  ⚠️ Quiz JavaScript file <code>${quizJsFile}</code> not found. Please add it to <code>${quizJsDir}</code>.
</div>
`;

  let content = fs.readFileSync(htmlPath, 'utf-8');

  if (!content.includes(`id="${quizId}"`) && !content.includes(quizJsFile)) {
    content = content.replace('</main>', `${quizHTML}\n</main>`);
    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log(`✅ Injected quiz container into ${file}`);
  } else {
    console.log(`ℹ️ Quiz already injected into ${file}`);
  }
});
