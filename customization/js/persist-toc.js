(function () {
  const KEY = 'tocScrollTop';

  function getToc() {
    return document.querySelector('nav.toc, nav[role="toc"], .toc, #toc');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const toc = getToc();
    if (!toc) return;

    // Restore last position
    const saved = sessionStorage.getItem(KEY);
    if (saved !== null) {
      const y = parseInt(saved, 10);
      if (!Number.isNaN(y)) toc.scrollTop = y;
    }

    // Save when navigating from the TOC
    toc.addEventListener('click', (e) => {
      const link = e.target && e.target.closest && e.target.closest('a');
      if (link) sessionStorage.setItem(KEY, String(toc.scrollTop));
    });

    // Also save on page unload as a fallback
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(KEY, String(toc.scrollTop));
    });
  });
})();
