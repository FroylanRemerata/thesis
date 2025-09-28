// injectSidebar.js
// If a .sidebar element is not present, fetch /index.html and insert the site's sidebar.
(function(){
  try {
    if (document.querySelector('.sidebar')) return; // already present

    // Ensure necessary CSS for sidebar exists on standalone pages
    function ensureCss(href){
      if (!document.querySelector('link[href="'+href+'"]')){
        var l = document.createElement('link'); l.rel='stylesheet'; l.href=href; document.head.appendChild(l);
      }
    }

    fetch('/partials/sidebar.html', { cache: 'no-store' }).then(function(res){
      if (!res.ok) throw new Error('Failed to fetch index.html');
      return res.text();
    }).then(function(html){
      try {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var sidebar = doc.querySelector('.sidebar');
        if (!sidebar) return;

        // For standalone pages, ensure sidebar CSS (dashy + dashboard) is available
        ensureCss('/CSS/dashy.css');
        ensureCss('/CSS/dashboard.css');

        // clone the sidebar into this document
        var clone = document.importNode(sidebar, true);
        // insert at the top of body
        document.body.insertBefore(clone, document.body.firstChild);

        // Ensure loadPage exists: if not, fallback to location navigation
        if (typeof window.loadPage !== 'function') {
          window.loadPage = function(url, el){ window.location.href = url; };
        }

        // Set active menu item based on current path
        try {
          var current = (window.location.pathname || '').toLowerCase();
          var items = document.querySelectorAll('.sidebar .menu li');
          items.forEach(function(li){ li.classList.remove('active'); });
          var matched = null;
          items.forEach(function(li){
            try {
              var onclick = li.getAttribute('onclick') || '';
              var idx = onclick.indexOf("'/pages/");
              if (idx === -1) idx = onclick.indexOf('"/pages/');
              var path = '';
              if (idx !== -1) {
                // extract between quotes
                var m = onclick.match(/['\"](\/pages\/[^'\"]+)['\"]/);
                if (m && m[1]) path = m[1].toLowerCase();
              }
              if (path && current.indexOf(path.toLowerCase()) !== -1) matched = li;
            } catch(_){}
          });
          if (!matched) {
            // fallback: match by text
            var t = current.split('/').pop();
            items.forEach(function(li){ if (li.textContent.toLowerCase().indexOf(t) !== -1) matched = li; });
          }
          if (matched) matched.classList.add('active');
        } catch(e){/* non-fatal */}

        // If there's an initRoleMenu function (built in firebase.js), call it to populate admin menus.
        (function waitRole(){
          if (typeof window.initRoleMenu === 'function') {
            try { window.initRoleMenu(); } catch(e){ console.error('initRoleMenu error', e); }
          } else {
            // try a couple of times in case firebase is still loading
            var tries = 0;
            var t = setInterval(function(){
              tries++;
              if (typeof window.initRoleMenu === 'function') { clearInterval(t); try{ window.initRoleMenu(); }catch(e){} }
              if (tries > 20) clearInterval(t);
            }, 150);
          }
        })();

      } catch (e) { console.error('injectSidebar parse error', e); }
    }).catch(function(err){ console.error('injectSidebar error', err); });
  } catch (e) { console.error('injectSidebar init error', e); }
})();
