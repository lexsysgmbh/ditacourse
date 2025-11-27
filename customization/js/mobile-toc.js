/**
 * Mobile TOC Burger Menu
 * Provides a hamburger menu to toggle TOC on mobile
 */

(function() {
  const isMobile = window.innerWidth <= 991;
  
  if (!isMobile) {
    return;
  }

  const tocNav = document.querySelector('nav.toc');
  const main = document.querySelector('main[role="main"]');
  
  if (!tocNav || !main) {
    return;
  }

  // Create burger button
  const burger = document.createElement('button');
  burger.className = 'toc-burger';
  burger.setAttribute('aria-label', 'Toggle navigation menu');
  burger.innerHTML = '☰';
  document.body.appendChild(burger);

  // Toggle TOC on burger click
  burger.addEventListener('click', function() {
    tocNav.classList.toggle('open');
  });

  // Close TOC when clicking a link
  tocNav.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      tocNav.classList.remove('open');
    }
  });

  // Close TOC when clicking outside
  document.addEventListener('click', function(e) {
    if (!tocNav.contains(e.target) && e.target !== burger) {
      tocNav.classList.remove('open');
    }
  });

  console.log('✓ Mobile burger menu initialized');
})();

