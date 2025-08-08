const fs = require('fs');
const path = require('path');

const htmlFile = path.join('out', 'quiz_introduction_to_dita.html');

const quizId = 'quiz-intro-dita';

const injectStart = `<div class="quiz-container">`;
const injectEnd = `<script src="customization/js/quiz-loader.js"></script>`;

try {
  let html = fs.readFileSync(htmlFile, 'utf-8');

  if (!html.includes(injectStart)) {
    // Wrap the existing quiz div with a container and add the script
    html = html.replace(
      `<div id="${quizId}" data-quiz="quiz_introduction_to_dita.js">`,
      `${injectStart}\n<div id="${quizId}" data-quiz="quiz_introduction_to_dita.js">`
    );

    html = html.replace(
      `</div>\n</div>`, // end of the quiz div and probably conbody
      `</div>\n${injectEnd}\n</div>`
    );

    fs.writeFileSync(htmlFile, html, 'utf-8');
    console.log(`✅ Quiz injected into layout flow of ${htmlFile}`);
  } else {
    console.log(`ℹ️ Quiz already injected into ${htmlFile}`);
  }
} catch (err) {
  console.error(`❌ Failed to inject quiz into ${htmlFile}:`, err);
}
