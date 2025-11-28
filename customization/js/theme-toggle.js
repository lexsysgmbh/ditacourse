/**
 * Theme Toggle - Dark Mode Support
 * Creates a button to toggle between light and dark themes
 */

console.log('✓ theme-toggle.js loaded');

// Simple inline SVGs for moon and sun (filled) so we can color them via CSS
const svgMoon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
const svgSun = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.59 1.59 1.79 1.79 1.6-1.59zM11 1h2v3h-2V1zm7.24 3.84l1.59-1.59-1.8-1.79-1.59 1.59 1.79 1.79zM20 11h3v2h-3v-2zM17.24 19.16l1.59 1.59 1.8-1.79-1.59-1.59-1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>';

// Setup button on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ DOMContentLoaded event fired');
  
  // Create the toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
  toggleBtn.type = 'button';
  // icon set by updateIcon()
  console.log('✓ Button created');

  // Update icon based on current mode
  function updateIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    toggleBtn.innerHTML = isDark ? svgSun : svgMoon;
    // update accessible label/title
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggleBtn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  updateIcon();

  // Try to find article first (DITA main content)
  let parent = document.querySelector('article');
  console.log('article found:', !!parent);
  
  // Fallback to main role
  if (!parent) {
    parent = document.querySelector('[role="main"]');
    console.log('[role="main"] found:', !!parent);
  }
  
  // Final fallback to body
  if (!parent) {
    parent = document.body;
    console.log('using document.body');
  }

  // Insert at the beginning of the parent
  if (parent && parent.firstChild) {
    parent.insertBefore(toggleBtn, parent.firstChild);
    console.log('✓ Button inserted before first child');
  } else if (parent) {
    parent.appendChild(toggleBtn);
    console.log('✓ Button appended to parent');
  }

  // Handle clicks
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (err) { /* ignore */ }
    updateIcon();
    console.log('✓ Dark mode toggled:', isDark);
  });

  // Handle keyboard navigation
  toggleBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});
