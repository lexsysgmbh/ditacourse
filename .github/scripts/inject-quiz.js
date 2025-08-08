const fs = require('fs');
const path = require('path');

// === QUIZ 1: Introduction to DITA ===
const htmlIntroFile = path.join('out', 'quiz_introduction_to_dita.html');

const injectIntro = `
<div class="quiz-container">
  <div id="quiz-intro-dita" data-quiz="quiz_introduction_to_dita.js">
    <p>Loading interactive quiz…</p>
  </div>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

try {
  let html = fs.readFileSync(htmlIntroFile, 'utf-8');
  if (!html.includes('id="quiz-intro-dita"')) {
    html = html.replace('</article>', `${injectIntro}\n</article>`);
    fs.writeFileSync(htmlIntroFile, html, 'utf-8');
    console.log(`✅ Injected quiz into ${htmlIntroFile}`);
  } else {
    console.log(`ℹ️ Quiz already present in ${htmlIntroFile}`);
  }
} catch (err) {
  console.error(`❌ Failed to inject quiz into ${htmlIntroFile}:`, err);
}

// === QUIZ 2: DITA Maps ===
const htmlMapsFile = path.join('out', 'quiz_dita_maps.html');

const injectMaps = `
<div class="quiz-container">
  <div id="quiz-dita-maps" data-quiz="quiz_dita_maps.js">
    <p>Loading interactive quiz…</p>
  </div>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

try {
