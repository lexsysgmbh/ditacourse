/**
 * Mobile TOC Burger Menu
 * Provides a hamburger menu to toggle TOC on mobile
 */

(function() {
  // Run on any screen size but only show on mobile
  const tocNav = document.querySelector('nav.toc');
  if (!tocNav) {
    console.log('⚠️  TOC nav not found');
    return;
  }

  // Create burger button
  const burger = document.createElement('button');
  burger.className = 'toc-burger';
  burger.setAttribute('aria-label', 'Toggle navigation menu');
  burger.textContent = '☰';
  
  // Ensure burger is visible on mobile
  if (window.innerWidth <= 991) {
    burger.style.display = 'block';
  }
  
  document.body.insertBefore(burger, document.body.firstChild);

  // Toggle TOC on burger click
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
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


