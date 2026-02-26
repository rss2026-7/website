(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar
    var sidebarToggle = document.getElementById('navToggle');
    var sidebar = document.getElementById('mobileSidebar');
    var overlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
      });
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    }

    if (overlay) overlay.addEventListener('click', closeSidebar);
    var sidebarLinks = sidebar ? sidebar.querySelectorAll('a') : [];
    sidebarLinks.forEach(function(link) {
      link.addEventListener('click', closeSidebar);
    });
  });
})();
