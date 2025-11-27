/**
 * Resizable Sidebar
 * Makes the TOC sidebar resizable by dragging the divider
 */

(function() {
  // Get the elements
  const sidebar = document.querySelector('nav.toc');
  const main = document.querySelector('main[role="main"]');
  
  if (!sidebar || !main) {
    console.log('Sidebar or main element not found');
    return;
  }

  // Create the resizer element
  const resizer = document.createElement('div');
  resizer.className = 'sidebar-resizer';
  resizer.setAttribute('title', 'Drag to resize sidebar');
  
  // Insert resizer after sidebar
  sidebar.parentNode.insertBefore(resizer, main);
  
  // State for resizing
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;
  
  // Get stored width from localStorage or use default
  const storedWidth = localStorage.getItem('sidebar-width');
  if (storedWidth) {
    sidebar.style.width = storedWidth;
    main.style.marginLeft = (parseInt(storedWidth) + 20) + 'px';
  }
  
  // Mouse down on resizer
  resizer.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = sidebar.offsetWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    resizer.classList.add('active');
  });
  
  // Mouse move
  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    
    // Calculate new width
    const diff = e.clientX - startX;
    const newWidth = startWidth + diff;
    
    // Set minimum and maximum widths (in pixels)
    const minWidth = 200;
    const maxWidth = 600;
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      sidebar.style.width = newWidth + 'px';
      main.style.marginLeft = (newWidth + 20) + 'px';
      localStorage.setItem('sidebar-width', newWidth + 'px');
    }
  });
  
  // Mouse up
  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = 'auto';
      document.body.style.userSelect = 'auto';
      resizer.classList.remove('active');
    }
  });
  
  console.log('✓ Resizable sidebar initialized');
})();
