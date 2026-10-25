// Mobile menu toggle
(function () {
  var toggle = document.querySelector('.nav__toggle');
  var list = document.getElementById('nav-list');
  if (!toggle || !list) return;
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    list.setAttribute('data-open', String(open));
  }
  setOpen(false);
  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// Special events list. Reads events.json, which is refreshed from the
// SwinGallery Facebook page's events, and shows the next few upcoming ones.
// With no upcoming events (or no file), the "See events on Facebook" link stays.
(function () {
  var slot = document.querySelector('[data-events]');
  if (!slot) return;
  var limit = Number(slot.getAttribute('data-events')) || 4;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }
  function time(d) {
    var h = d.getHours(), m = d.getMinutes();
    return (h % 12 || 12) + (m ? ':' + String(m).padStart(2, '0') : '') + (h < 12 ? ' am' : ' pm');
  }

  fetch('events.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (events) {
      var now = new Date();
      var upcoming = (events || [])
        .filter(function (e) { return new Date(e.end || e.start) >= now; })
        .sort(function (a, b) { return new Date(a.start) - new Date(b.start); })
        .slice(0, limit);
      if (!upcoming.length) return;

      var list = el('ul', 'special-list');
      upcoming.forEach(function (e) {
        var start = new Date(e.start);
        var item = el('li');
        var link = el('a', 'special');
        link.href = e.url || 'https://www.facebook.com/SwinGallery/events';
        var date = el('span', 'date-block date-block--sm');
        date.appendChild(el('span', 'date-block__month', MONTHS[start.getMonth()]));
        date.appendChild(el('span', 'date-block__day', String(start.getDate())));
        var body = el('span', 'special__body');
        body.appendChild(el('span', 'special__title', e.title));
        body.appendChild(el('span', 'meta', DAYS[start.getDay()] + ' · ' + time(start) + (e.end ? '–' + time(new Date(e.end)) : '')));
        link.appendChild(date);
        link.appendChild(body);
        item.appendChild(link);
        list.appendChild(item);
      });
      var fallback = slot.querySelector('.fb-fallback');
      if (fallback) fallback.hidden = true;
      slot.appendChild(list);
    })
    .catch(function () {});
})();

// Bio pop-ups on the About page
(function () {
  document.querySelectorAll('[data-bio]').forEach(function (btn) {
    var dialog = document.getElementById(btn.getAttribute('data-bio'));
    if (!dialog || typeof dialog.showModal !== 'function') return;
    btn.addEventListener('click', function () { dialog.showModal(); });
    dialog.querySelector('.bio-dialog__close').addEventListener('click', function () { dialog.close(); });
    // Close when clicking the dimmed area outside the box
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () { btn.focus(); });
  });
})();
