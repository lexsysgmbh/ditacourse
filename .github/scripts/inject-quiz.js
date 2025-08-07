const fs = require('fs');
const path = require('path');

const htmlFile = path.join('out', 'quiz_introduction_to_dita.html');

const injectContent = `
<div id="quiz-intro-dita" data-quiz="quiz_introduction_to_dita.js">
  <p>Loading quiz...</p>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

try {
  let html = fs.readFileSync(htmlFile, 'utf-8');

  if (!html.includes('id="quiz-intro-dita"')) {
    html = html.replace('</body>', `${injectContent}\n</body>`);
    fs.writeFileSync(htmlFile, html, 'utf-8');
    console.log(`✅ Injected quiz placeholder and script into ${htmlFile}`);
  } else {
    console.log(`ℹ️ Quiz placeholder already present in ${htmlFile}`);
  }
} catch (err) {
  console.error(`❌ Failed to inject quiz into ${htmlFile}:`, err);
}
