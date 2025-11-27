document.addEventListener('DOMContentLoaded', function() {
  // 1. Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark-mode');
  }

  // 2. Create the toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.ariaLabel = 'Toggle Dark Mode';
  toggleBtn.innerHTML = '🌙'; // Default icon, will update

  // Function to update button icon
  function updateIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
  }
  updateIcon();

  // 3. Inject the button
  // Try to find the TOC container first
  const toc = document.querySelector('nav.toc');
  if (toc) {
    // Insert at the top of the TOC
    toc.insertBefore(toggleBtn, toc.firstChild);
  } else {
    // Fallback: append to body (e.g. mobile or no TOC)
    document.body.appendChild(toggleBtn);
  }

  // 4. Handle click
  toggleBtn.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcon();
  });
});
