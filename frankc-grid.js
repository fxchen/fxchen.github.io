/* frankc-grid.js — injects the blueprint-grid background (glow + masked dots)
   and edge rulers. Vanilla, no deps, safe to include twice.
   Options (data-* on this <script>): data-dots, data-rulers, data-glow,
   data-accent ("true"/"false"), data-theme ("auto"|"light"|"dark"). */
(function () {
  'use strict';
  if (window.FrankGrid) return; // idempotent: already loaded

  var script = document.currentScript;
  var ds = (script && script.dataset) || {};
  function flag(v, dflt) { return v == null ? dflt : v !== 'false' && v !== '0'; }
  var opts = {
    dots:   flag(ds.dots, true),
    rulers: flag(ds.rulers, true),
    glow:   flag(ds.glow, true),
    accent: flag(ds.accent, false),
    theme:  ds.theme || 'auto'
  };
  var nodes = [];

  // Add the stylesheet next to this script unless it's already on the page
  function ensureCSS() {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (/frankc-grid(\.min)?\.css/.test(links[i].href)) return;
    }
    if (document.getElementById('fg-css')) return;
    var href = 'frankc-grid.css';
    if (script && script.src) href = new URL('frankc-grid.css', script.src).href;
    var l = document.createElement('link');
    l.id = 'fg-css'; l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  }

  function el(cls, parent) {
    var d = document.createElement('div');
    d.className = cls;
    d.setAttribute('aria-hidden', 'true');
    (parent || document.body).appendChild(d);
    return d;
  }

  function enable() {
    disable();
    if (opts.glow || opts.dots) {
      var bg = el('fg-layer fg-bg');
      bg.setAttribute('data-fg', '');
      if (opts.glow) el('fg-glow', bg);
      if (opts.dots) el('fg-dots', bg);
      nodes.push(bg);
    }
    if (opts.rulers) {
      nodes.push(el('fg-layer fg-edge-top fg-ruler-x'),
                 el('fg-layer fg-edge-left fg-ruler-y'),
                 el('fg-layer fg-edge-right fg-ruler-y fg-right'));
    }
    if (opts.accent) nodes.push(el('fg-layer fg-edge-accent fg-accent-line'));
  }

  function disable() {
    nodes.forEach(function (n) { n.remove(); });
    nodes = [];
  }

  // Uses data-fg-theme so it never clobbers a site's own data-theme attribute
  function setTheme(t) {
    opts.theme = t;
    var root = document.documentElement;
    if (t === 'light' || t === 'dark') root.setAttribute('data-fg-theme', t);
    else root.removeAttribute('data-fg-theme');
  }

  window.FrankGrid = {
    enable: function (o) { if (o) for (var k in o) opts[k] = o[k]; enable(); },
    disable: disable,
    setTheme: setTheme,
    options: opts
  };

  function init() { ensureCSS(); setTheme(opts.theme); enable(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
