const fs = require('fs');
const path = require('path');

// Prism includes (scripts and styles)
const prismIncludes = `
  <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-xml.min.js"></script>
`;

const outputDir = path.join(__dirname, '../../out');

function injectPrism(htmlContent) {
  return htmlContent.replace('</head>', `${prismIncludes}\n</head>`);
}

function processFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  if (html.includes('prism.css')) return; // Skip if already injected
  const updated = injectPrism(html);
  fs.writeFileSync(filePath, updated, 'utf-8');
}

// Recursively scan files in the output directory
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

walk(outputDir);
