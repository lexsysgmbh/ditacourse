const fs = require('fs');
const path = require('path');

const htmlFile = path.join('out', 'quiz_introduction_to_dita.html');

// This HTML will be injected before </main>
const quizHTML = `
<div id="quiz-intro-dita" data-quiz="quiz_introduction_to_dita.js">
  <p>Loading quiz...</p>
</div>
<script src="customization/js/quiz-loader.js"></script>
`;

// Read file
let content = fs.readFileSync(htmlFile, 'utf-8');

// Inject only if quiz container not already present
if (!content.includes('id="quiz-intro-dita"')) {
  content = content.replace('</main>', `${quizHTML}\n</main>`);
  fs.writeFileSync(htmlFile, content, 'utf-8');
  console.log(`✅ Injected quiz container and quiz-loader.js into ${htmlFile}`);
} else {
  console.log(`ℹ️ Quiz container already present in ${htmlFile}`);
}
