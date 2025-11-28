/**
 * Theme Toggle - Dark Mode Support
 * Creates a button to toggle between light and dark themes
 */

console.log('✓ theme-toggle.js loaded');

// Setup button on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ DOMContentLoaded event fired');
  
  // Create the toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
  toggleBtn.type = 'button';
  toggleBtn.innerHTML = '🌙';
  console.log('✓ Button created');

  // Update icon based on current mode
  function updateIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
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
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
