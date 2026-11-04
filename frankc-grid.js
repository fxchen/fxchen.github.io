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

  /* ---------- Inspect: hold ⌥ (Alt) for redlines ----------
     Boxes every visible heading with its type spec, measures the space
     around it, and samples one body paragraph. Release to hide. */

  var inspectRoot = null;
  var SPEC_SEL = 'h1, h2, h3';

  function px(v) { return Math.round(parseFloat(v)); }

  function typeSpec(node) {
    var cs = getComputedStyle(node);
    var size = parseFloat(cs.fontSize);
    var family = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    var lh = cs.lineHeight === 'normal' ? 'auto' : px(cs.lineHeight);
    var track = ((parseFloat(cs.letterSpacing) || 0) / size * 100).toFixed(1).replace('-', '−');
    return family + ' ' + cs.fontWeight + ' · ' + Math.round(size) + '/' + lh + ' · ' + track + '%';
  }

  function textBox(node) {
    var r = document.createRange();
    r.selectNodeContents(node);
    return r.getBoundingClientRect();
  }

  function visible(node) {
    if (node.closest('[aria-hidden="true"], .fg-inspect')) return false;
    var r = node.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(node).visibility !== 'hidden';
  }

  function add(parent, cls, x, y, w, h, label) {
    var d = document.createElement('div');
    d.className = cls;
    d.style.cssText = 'left:' + x + 'px;top:' + y + 'px;' + (w != null ? 'width:' + w + 'px;' : '') + 'height:' + h + 'px';
    if (label) {
      var s = document.createElement('span');
      s.className = 'fg-i-label';
      s.textContent = label;
      d.appendChild(s);
    }
    parent.appendChild(d);
  }

  function gap(parent, x, top, bottom) {
    var h = bottom - top;
    if (h >= 2) add(parent, 'fg-i-gap', x, top, null, h, String(Math.round(h)));
  }

  function drawInspect() {
    var root = document.createElement('div');
    root.className = 'fg-inspect';
    root.setAttribute('aria-hidden', 'true');
    var sx = scrollX, sy = scrollY;

    var heads = [].filter.call(document.querySelectorAll(SPEC_SEL), visible);
    heads.forEach(function (h) {
      var t = textBox(h), b = h.getBoundingClientRect();
      add(root, 'fg-i-spec', t.left + sx, t.top + sy, t.width, t.height, typeSpec(h));
      // Dimension lines hang off the right edge so they never cross a spec label
      var x = Math.min(t.right + 12, document.documentElement.clientWidth - 40) + sx;
      var next = h.nextElementSibling, prev = h.previousElementSibling;
      if (next && visible(next)) gap(root, x, b.bottom + sy, next.getBoundingClientRect().top + sy);
      if (prev && visible(prev) && h.tagName !== 'H1' && !prev.matches(SPEC_SEL)) gap(root, x, prev.getBoundingClientRect().bottom + sy, b.top + sy);
    });

    // One body-text sample: the first real paragraph on the page
    var ps = document.querySelectorAll('.blog-post p, [role="main"] p, main p, article p');
    for (var i = 0; i < ps.length; i++) {
      if (visible(ps[i]) && ps[i].textContent.trim().length > 60) {
        var t = textBox(ps[i]);
        add(root, 'fg-i-spec fg-i-body', t.left + sx, t.top + sy, t.width, t.height, typeSpec(ps[i]) + ' · ' + Math.round(t.width) + 'px measure');
        break;
      }
    }

    var badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'fg-i-badge';
    badge.textContent = matchMedia('(hover: hover)').matches ? 'Inspecting · release ⌥' : 'Inspecting · tap to close';
    badge.onclick = function () { inspect(false); };
    root.appendChild(badge);
    return root;
  }

  function inspect(on) {
    if (on === undefined) on = !inspectRoot;
    if (inspectRoot) { inspectRoot.remove(); inspectRoot = null; }
    if (on) { inspectRoot = drawInspect(); document.body.appendChild(inspectRoot); }
  }

  function editable(t) { return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)); }

  function bindInspect() {
    addEventListener('keydown', function (e) {
      if (e.key === 'Alt' && !e.repeat && !editable(e.target)) inspect(true);
      else if (inspectRoot && e.key !== 'Alt') inspect(false); // ⌥ is part of a shortcut, get out of the way
    });
    addEventListener('keyup', function (e) {
      if (e.key === 'Alt' && inspectRoot) { e.preventDefault(); inspect(false); } // preventDefault: no Windows menu-bar focus
    });
    addEventListener('blur', function () { inspect(false); });
    addEventListener('resize', function () { if (inspectRoot) inspect(true); });
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-fg-inspect]');
      if (t) { e.preventDefault(); inspect(); }
    });
  }

  window.FrankGrid = {
    enable: function (o) { if (o) for (var k in o) opts[k] = o[k]; enable(); },
    disable: disable,
    setTheme: setTheme,
    inspect: inspect,
    options: opts
  };

  function init() { ensureCSS(); setTheme(opts.theme); enable(); bindInspect(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
