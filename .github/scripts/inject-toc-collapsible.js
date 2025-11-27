const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../../out');

function injectScript(htmlContent) {
  if (htmlContent.includes('toc-collapsible.js')) {
    return htmlContent; // Already injected
  }
  
  // Insert script before closing body tag
  return htmlContent.replace('</body>', `  <script src="customization/js/toc-collapsible.js"></script>\n</body>`);
}

function processFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const updated = injectScript(html);
  fs.writeFileSync(filePath, updated, 'utf-8');
  console.log(`✓ Injected toc-collapsible.js into ${path.basename(filePath)}`);
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

if (fs.existsSync(outputDir)) {
  walk(outputDir);
  console.log('✓ TOC collapsible script injection complete');
} else {
  console.log('Output directory not found:', outputDir);
}
