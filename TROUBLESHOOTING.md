# TOC Collapsible Troubleshooting Guide

## Problem: No arrows/toggles appear in the TOC

### Step 1: Verify the JavaScript is loaded
1. Open your page in the browser
2. Press F12 to open Developer Tools
3. Go to the **Console** tab
4. You should see messages like:
   - `TOC nav found, setting up collapsible items`
   - `Total list items: 48` (or similar number)
   - `Toggles added: 7` (or similar number)

If you DON'T see these messages, the script isn't loading.

### Step 2: Check if the script tag is in the HTML
1. Press F12 → **Elements** tab
2. Press Ctrl+F (or Cmd+F)
3. Search for `toc-collapsible.js`
4. You should see a `<script src="customization/js/toc-collapsible.js"></script>` tag near the bottom of the `<body>`

If the tag is missing, the injection script didn't run or didn't work.

### Step 3: Check if the script file exists
1. Press F12 → **Network** tab
2. Refresh the page
3. Look for `toc-collapsible.js` in the network requests
4. It should show status 200 (loaded successfully)

If it shows 404 (not found), the file wasn't copied to the output.

### Step 4: Check the browser console for errors
1. Press F12 → **Console** tab
2. Look for any red error messages
3. Common errors:
   - `Failed to load resource: 404` - The script file isn't where expected
   - `ReferenceError: toggleSubmenu is not defined` - There's a syntax error in the script

### Step 5: Manually test the component
1. Open `.github/scripts/test-toc-collapsible.html` in your browser
2. You should see arrows that you can click to expand/collapse
3. The console should show success messages
4. If this works, the script is fine and the issue is with how it's being injected

### Step 6: Check the workflow logs
1. Go to GitHub repository
2. Click **Actions** tab
3. Open the latest build
4. Look for the "Inject TOC collapsible script" step
5. Check the output for:
   - "Processed X HTML files"
   - "Modified Y files"
   - Any warnings or errors

### Common Issues

**Issue: "No files were modified" warning**
- The injection script ran but didn't modify any files
- Possible causes:
  - Script tag already present (idempotent)
  - No closing `</body>` tag found
  - Output directory was empty

**Issue: Script loads but toggles don't appear**
- The script is loaded and running (check console messages)
- But toggles aren't visible
- Check:
  1. Browser console for JavaScript errors
  2. CSS file is loading (check Network tab)
  3. The TOC structure has nested lists (check Elements tab)

**Issue: Toggle appears but doesn't work**
- The arrow shows up but clicking doesn't collapse/expand
- Check:
  1. Console for JavaScript errors
  2. That the CSS has rules for `.collapsed` class
  3. That the collapse/expand CSS transitions are defined

### Debug Mode
To enable more logging, add this to the top of `toc-collapsible.js`:

```javascript
const DEBUG = true;
```

Then search for `console.log` statements and they'll be visible in the browser console.

