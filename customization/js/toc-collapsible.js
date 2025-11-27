/**
 * TOC Collapsible Navigation
 * Makes nested TOC items collapsible/expandable
 */

document.addEventListener('DOMContentLoaded', function() {
  const tocNav = document.querySelector('nav.toc');
  
  if (!tocNav) return;

  // Find all list items that have nested lists
  const listItems = tocNav.querySelectorAll('li');
  
  listItems.forEach(function(li) {
    const nestedList = li.querySelector('ul');
    
    // Only process items that have nested lists
    if (nestedList) {
      li.classList.add('parent');
      
      const link = li.querySelector('> a');
      if (link) {
        // Create toggle button
        const toggle = document.createElement('span');
        toggle.className = 'toc-toggle';
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-label', 'Toggle submenu');
        
        // Insert toggle before the link
        li.insertBefore(toggle, link);
        
        // Add click handler to toggle
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleSubmenu(nestedList, toggle);
        });
        
        // Allow keyboard interaction (Enter/Space)
        toggle.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            toggleSubmenu(nestedList, toggle);
          }
        });
        
        // Prevent link from being clickable on the toggle
        link.addEventListener('click', function(e) {
          // Allow normal link navigation
        });
      }
    }
  });

  // Expand items on page load if they contain the active link
  listItems.forEach(function(li) {
    const activeLink = li.querySelector('.active > a') || li.querySelector('a.active');
    if (activeLink) {
      // Expand all parent lists
      let parent = li.parentElement;
      while (parent && parent !== tocNav) {
        if (parent.tagName === 'UL') {
          parent.classList.remove('collapsed');
          const parentLi = parent.parentElement;
          if (parentLi) {
            const toggle = parentLi.querySelector('.toc-toggle');
            if (toggle) {
              toggle.classList.remove('collapsed');
            }
          }
        }
        parent = parent.parentElement;
      }
    }
  });
});

function toggleSubmenu(list, toggle) {
  list.classList.toggle('collapsed');
  toggle.classList.toggle('collapsed');
}
