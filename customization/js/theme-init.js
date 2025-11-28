(function() {
  try {
    var savedTheme = null;
    try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* localStorage may be unavailable */ }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark-mode');
    }
  } catch (err) {
    // silent fail - shouldn't block page rendering
    console.warn('theme-init: error', err);
  }
})();
