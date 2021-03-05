(function() {
  // Load saved preferences
  var savedTheme = localStorage.getItem('rss-theme') || 'light';
  var savedAccent = localStorage.getItem('rss-accent') || 'red';

  // Apply immediately to prevent flash
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-accent', savedAccent);

  document.addEventListener('DOMContentLoaded', function() {
    // Intro screen (once per session)
    var intro = document.getElementById('introScreen');
    if (intro) {
      if (sessionStorage.getItem('rss-intro-seen')) {
        intro.classList.add('done');
        setTimeout(function() { intro.remove(); }, 100);
      } else {
        sessionStorage.setItem('rss-intro-seen', '1');

        // Click to skip intro
        intro.addEventListener('click', function() {
          intro.classList.add('done');
          setTimeout(function() { intro.remove(); }, 700);
        });

        // Auto-dismiss after 3.2s as fallback
        setTimeout(function() {
          intro.classList.add('done');
          setTimeout(function() { intro.remove(); }, 700);
        }, 3200);
      }
    }

    var panel = document.getElementById('themePanel');
    var darkCheckbox = document.getElementById('darkModeCheckbox');
    var swatches = document.querySelectorAll('.color-swatch');

    // Set initial state
    if (darkCheckbox) darkCheckbox.checked = savedTheme === 'dark';
    swatches.forEach(function(s) {
      if (s.getAttribute('data-color') === savedAccent) s.classList.add('active');
    });

    // Close panel on outside click
    document.addEventListener('click', function(e) {
      if (panel && !panel.contains(e.target)) {
        panel.classList.remove('open');
      }
    });

    // Dark mode toggle
    if (darkCheckbox) {
      darkCheckbox.addEventListener('change', function() {
        var theme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('rss-theme', theme);
      });
    }

    // Color swatches
    swatches.forEach(function(swatch) {
      swatch.addEventListener('click', function() {
        var color = this.getAttribute('data-color');
        document.documentElement.setAttribute('data-accent', color);
        localStorage.setItem('rss-accent', color);
        swatches.forEach(function(s) { s.classList.remove('active'); });
        this.classList.add('active');
      });
    });

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
