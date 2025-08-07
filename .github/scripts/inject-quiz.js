const fs = require('fs');
const path = require('path');

const htmlFile = path.join('out', 'quiz_introduction_to_dita.html');
const scriptTag = `<script src="customization/js/quiz-loader.js"></script>`;

// Read file
let content = fs.readFileSync(htmlFile, 'utf-8');

// Inject script before </body> if not already present
if (!content.includes(scriptTag)) {
  content = content.replace('</body>', `${scriptTag}\n</body>`);
  fs.writeFileSync(htmlFile, content, 'utf-8');
  console.log(`✅ Injected quiz-loader.js into ${htmlFile}`);
} else {
  console.log(`ℹ️ quiz-loader.js already present in ${htmlFile}`);
}
