(function () {
  // Use sessionStorage for per-tab persistence; switch to localStorage if you want across sessions.
  const store = window.sessionStorage;
  const KEY = 'tocScrollTop';

  function getToc() {
    // broaden selectors just in case
    return document.querySelector('nav.toc, nav[role="toc"], nav[aria-label="Table of Contents"], #toc, .toc');
  }

  function restore() {
    const toc = getToc();
    if (!toc) return;
    const v = store.getItem(KEY);
    if (v == null) return;
    const y = parseInt(v, 10);
    if (!Number.isNaN(y)) toc.scrollTop = y;
  }

  function save() {
    const toc = getToc();
    if (!toc) return;
    store.setItem(KEY, String(toc.scrollTop));
  }

  // Restore ASAP, and a few more times to beat late scripts that adjust the TOC.
  function robustRestore(attempts = 8) {
    restore();
    if (attempts > 0) {
      requestAnimationFrame(() => robustRestore(attempts - 1));
    }
  }

  document.addEventListener('DOMContentLoaded', () => robustRestore());
  window.addEventListener('load', () => robustRestore());

  // Handle bfcache restores (back/forward nav)
  window.addEventListener('pageshow', () => robustRestore());

  // If something mutates the TOC (e.g., sets active item), re-apply once more.
  const mo = new MutationObserver(() => restore());
  document.addEventListener('DOMContentLoaded', () => {
    const toc = getToc();
    if (toc) {
      mo.observe(toc, { childList: true, subtree: true, attributes: true });
      // Disconnect after a short settling period
      setTimeout(() => mo.disconnect(), 2000);
    }
  });

  // Save before leaving
  window.addEventListener('beforeunload', save, { capture: true });
  window.addEventListener('pagehide', save, { capture: true });

  // Also save when clicking a TOC link
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest && e.target.closest('nav.toc a, .toc a, #toc a');
    if (a) save();
  });
})();
