const fs = require('fs');
const path = require('path');

const htmlFile = path.join('out', 'quiz_introduction_to_dita.html');

const injectContent = `
<div class="quiz-container">
  <div id="quiz-intro-dita" data-quiz="quiz_introduction_to_dita.js">
    <p>Loading interactive quiz…</p>
  </div>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

try {
  let html = fs.readFileSync(htmlFile, 'utf-8');

  if (!html.includes('id="quiz-intro-dita"')) {
    html = html.replace('</article>', `${injectContent}\n</article>`);
    fs.writeFileSync(htmlFile, html, 'utf-8');
    console.log(`✅ Injected quiz into ${htmlFile}`);
  } else {
    console.log(`ℹ️ Quiz already present in ${htmlFile}`);
  }
} catch (err) {
  console.error(`❌ Failed to inject quiz:`, err);
}
