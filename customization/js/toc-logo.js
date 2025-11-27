/**
 * Add Lexsys logo above TOC
 */

(function() {
  const tocNav = document.querySelector('nav.toc');
  
  if (!tocNav) {
    return;
  }

  // Create logo container
  const logoContainer = document.createElement('div');
  logoContainer.className = 'toc-logo';
  
  // Create image element
  const img = document.createElement('img');
  img.src = 'customization/img/Lexsys_Logo.svg';
  img.alt = 'Lexsys Logo';
  
  logoContainer.appendChild(img);
  
  // Insert as first child of the TOC nav element
  tocNav.insertBefore(logoContainer, tocNav.firstChild);
  
  console.log('✓ TOC logo added');
})();
