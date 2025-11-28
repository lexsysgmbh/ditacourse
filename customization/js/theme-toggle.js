/**
 * Theme Toggle - Dark Mode Support
 * Creates a button to toggle between light and dark themes
 */

(function() {
  // Immediate dark mode check before rendering
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark-mode');
  }
})();

// Setup button on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Create the toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
  toggleBtn.type = 'button';
  toggleBtn.innerHTML = '🌙';

  // Update icon based on current mode
  function updateIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
  }
  updateIcon();

  // Append button to body (will be positioned fixed via CSS)
  document.body.appendChild(toggleBtn);

  // Handle clicks
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcon();
  });

  // Handle keyboard navigation
  toggleBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});
