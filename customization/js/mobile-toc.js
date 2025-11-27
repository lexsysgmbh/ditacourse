/**
 * Mobile TOC Enhancement
 * Collapse TOC by default on mobile and provide toggle
 */

(function() {
  const isMobile = window.innerWidth <= 991;
  
  if (!isMobile) {
    return;
  }

  const tocNav = document.querySelector('nav.toc');
  if (!tocNav) {
    return;
  }

  // Collapse all nested lists by default on mobile
  const nestedLists = tocNav.querySelectorAll('ul ul');
  nestedLists.forEach(function(ul) {
    ul.classList.add('collapsed');
  });

  // Hide all toggle buttons except when hovering
  const toggles = tocNav.querySelectorAll('.toc-toggle');
  toggles.forEach(function(toggle) {
    // Make toggles visible and functional on mobile
    toggle.style.display = 'inline-block';
  });

  console.log('✓ Mobile TOC enhancements applied');
})();
