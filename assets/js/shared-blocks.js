/* ============================================================
   VSEODENT — блоки, спільні для головної та сторінки курсу:
   галерея «як проходить навчання» і відгуки.
   ============================================================ */
(function () {
  const { D, qs, qsa } = window.V;
  const esc = (s) => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const SHOTS = [
    'Спікер під час роботи',
    'Лікарі за робочими місцями',
    'Практична частина',
    'Обладнання',
    'Взаємодія спікера з учасниками'
  ];

  window.renderGallery = function (sel, hintSel) {
    const box = qs(sel);
    if (!box) return;
    if (D.gallery.length) {
      box.innerHTML = D.gallery.slice(0, 5).map((g, i) => `
        <figure class="gcell${i === 0 ? ' gcell--lead' : ''}">
          <img src="${esc(g.src)}" alt="${esc(g.alt || '')}" loading="lazy">
        </figure>`).join('');
    } else {
      box.innerHTML = SHOTS.map((t, i) => `
        <figure class="gcell gcell--empty${i === 0 ? ' gcell--lead' : ''}">
          <span class="gcell__ico" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7"/>
              <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" stroke-width="1.7"/>
              <path d="M4 17l4.5-4.5 3.5 3.5 3-2.5L20 17" stroke="currentColor"
                    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <figcaption>${t}</figcaption>
        </figure>`).join('');
      const hint = hintSel && qs(hintSel);
      if (hint) hint.classList.remove('hidden');
    }
  };

  window.renderReviews = function (boxSel, moreSel, hintSel) {
    const box = qs(boxSel);
    if (!box) return;
    const more = moreSel && qs(moreSel);
    const hint = hintSel && qs(hintSel);

    if (!D.reviews.length) {
      box.innerHTML = [1, 2, 3].map(() => `
        <article class="rcard rcard--empty">
          <span class="rcard__q" aria-hidden="true">”</span>
          <span class="rcard__ph"></span><span class="rcard__ph"></span>
          <span class="rcard__ph rcard__ph--short"></span>
        </article>`).join('');
      if (more) more.remove();
      return;
    }

    box.classList.add('reviews--media');
    const FIRST = 6;
    box.innerHTML = D.reviews.map((r, i) => {
      const hide = i >= FIRST ? ' is-hidden' : '';
      if (r.type === 'screenshot' || r.type === 'video') {
        return `<figure class="rcard rcard--media${hide}">
          <img src="${esc(r.src)}" alt="Відгук учасника курсу VSEODENT" loading="lazy">
        </figure>`;
      }
      return `<article class="rcard${hide}">
        <p>${esc(r.text)}</p>
        <footer><b>${esc(r.name || '')}</b>${r.city ? `<span>${esc(r.city)}</span>` : ''}</footer>
      </article>`;
    }).join('');

    if (hint) hint.remove();

    initSwipeDots(box);

    if (more) {
      if (D.reviews.length > FIRST) {
        more.textContent = `Показати всі відгуки (${D.reviews.length})`;
        more.addEventListener('click', () => {
          qsa('.rcard.is-hidden', box).forEach(el => el.classList.remove('is-hidden'));
          more.remove();
        });
      } else {
        more.remove();
      }
    }
  };
  /* крапки-індикатори для горизонтальної каруселі відгуків */
  function initSwipeDots(track) {
    const isOn = () => getComputedStyle(track).getPropertyValue('--carousel').trim() === 'on';
    let dots = track.nextElementSibling;
    if (!dots || !dots.classList.contains('swipe-dots')) {
      dots = document.createElement('div');
      dots.className = 'swipe-dots';
      track.parentNode.insertBefore(dots, track.nextSibling);
    }

    function build() {
      const items = [...track.children];
      if (!isOn() || items.length < 2) { dots.innerHTML = ''; return; }
      dots.innerHTML = items.map((_, i) =>
        `<span class="cdot${i === 0 ? ' is-on' : ''}"></span>`).join('');
    }
    function sync() {
      if (!isOn()) return;
      const items = [...track.children];
      if (!items.length) return;
      const step = items[0].offsetWidth + 12;
      const i = Math.min(items.length - 1, Math.round(track.scrollLeft / Math.max(step, 1)));
      [...dots.children].forEach((d, k) => d.classList.toggle('is-on', k === i));
    }
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', () => { build(); sync(); });
    build();
  }
})();
