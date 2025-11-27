document.addEventListener('DOMContentLoaded', function() {
    const toc = document.querySelector('nav.toc');
    const main = document.querySelector('main[role="main"]');
    const toggleBtn = document.createElement('button');
    
    toggleBtn.id = 'sidebar-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.setAttribute('aria-label', 'Toggle Sidebar');
    document.body.appendChild(toggleBtn);

    // Load state
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (isCollapsed) {
        document.body.classList.add('sidebar-collapsed');
    }

    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebar-collapsed', document.body.classList.contains('sidebar-collapsed'));
    });
});
