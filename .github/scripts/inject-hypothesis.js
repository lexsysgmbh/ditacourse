const fs = require('fs');
const path = require('path');

const HYPOTHESIS_SNIPPET = `<script async src="https://hypothes.is/embed.js"></script>`;
const OUT_DIR = './out';

function injectScript(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes(HYPOTHESIS_SNIPPET)) {
    html = html.replace('</head>', `${HYPOTHESIS_SNIPPET}\n</head>`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Injected Hypothes.is into ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (file.endsWith('.html')) {
      injectScript(full);
    }
  });
}

walk(OUT_DIR);
