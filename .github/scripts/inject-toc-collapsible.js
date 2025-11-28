const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../../out');
let filesProcessed = 0;
let filesModified = 0;

function injectScript(htmlContent) {
  if (htmlContent.includes('toc-collapsible.js') && htmlContent.includes('resizable-sidebar.js') && htmlContent.includes('toc-logo.js') && htmlContent.includes('mobile-toc.js') && htmlContent.includes('theme-toggle.js')) {
    return { modified: false, content: htmlContent };
  }
  
  // Insert scripts before closing body tag
  if (!htmlContent.includes('</body>')) {
    console.warn('⚠️  No closing </body> tag found in HTML');
    return { modified: false, content: htmlContent };
  }
  
  let updated = htmlContent;
  
  // Inject theme-toggle.js if not already present
  if (!htmlContent.includes('theme-toggle.js')) {
    updated = updated.replace('</body>', `  <script src="customization/js/theme-toggle.js"></script>\n</body>`);
  }
  
  // Inject toc-collapsible.js if not already present
  if (!htmlContent.includes('toc-collapsible.js')) {
    updated = updated.replace('</body>', `  <script src="customization/js/toc-collapsible.js"></script>\n</body>`);
  }
  
  // Inject resizable-sidebar.js if not already present
  if (!htmlContent.includes('resizable-sidebar.js')) {
    updated = updated.replace('</body>', `  <script src="customization/js/resizable-sidebar.js"></script>\n</body>`);
  }
  
  // Inject toc-logo.js if not already present
  if (!htmlContent.includes('toc-logo.js')) {
    updated = updated.replace('</body>', `  <script src="customization/js/toc-logo.js"></script>\n</body>`);
  }
  
  // Inject mobile-toc.js if not already present
  if (!htmlContent.includes('mobile-toc.js')) {
    updated = updated.replace('</body>', `  <script src="customization/js/mobile-toc.js"></script>\n</body>`);
  }
  
  return { modified: updated !== htmlContent, content: updated };
}

function processFile(filePath) {
  filesProcessed++;
  const html = fs.readFileSync(filePath, 'utf-8');
  const result = injectScript(html);
  
  if (result.modified) {
    fs.writeFileSync(filePath, result.content, 'utf-8');
    filesModified++;
    console.log(`✓ Injected toc-collapsible.js into ${path.basename(filePath)}`);
  }
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
  console.log(`📍 Processing HTML files in: ${outputDir}`);
  walk(outputDir);
  console.log(`✓ Processed ${filesProcessed} HTML files, modified ${filesModified}`);
  if (filesModified === 0) {
    console.warn('⚠️  No files were modified - the script tag may already be present or </body> tag not found');
  }
} else {
  console.error('❌ Output directory not found:', outputDir);
  process.exit(1);
}
