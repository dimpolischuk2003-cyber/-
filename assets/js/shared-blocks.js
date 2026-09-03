/* ============================================================
   VSEODENT — блоки, спільні для головної та сторінки курсу:
   галерея «як проходить навчання» і відгуки.
   ============================================================ */
(function () {
  const { D, qs, qsa } = window.V;
  const esc = (s) => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

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

    window.initSwipeDots(box);

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
  /* ------------------------------------------------------------
     Карусель зі сторінками (використовується блоком «Після курсу
     ви зможете»). Працює лише коли CSS вмикає --carousel: on.
     ------------------------------------------------------------ */
  window.initCarousel = function (trackSel, dotsSel, delay) {
    const track = qs(trackSel), dots = qs(dotsSel);
    if (!track || !dots || !track.children.length) return;

    const isOn = () => getComputedStyle(track).getPropertyValue('--carousel').trim() === 'on';
    const pages = () => Math.max(1, Math.round(track.scrollWidth / Math.max(track.clientWidth, 1)));
    const current = () => Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    let paused = false;

    function build() {
      const n = pages();
      if (!isOn() || n < 2) { dots.innerHTML = ''; return; }
      dots.innerHTML = Array.from({ length: n }, (_, i) =>
        `<button type="button" class="cdot${i === 0 ? ' is-on' : ''}" aria-label="Слайд ${i + 1}"></button>`).join('');
      qsa('.cdot', dots).forEach((d, i) => d.addEventListener('click', () => {
        paused = true;
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
      }));
    }
    function sync() {
      const i = current();
      qsa('.cdot', dots).forEach((d, k) => d.classList.toggle('is-on', k === i));
    }

    track.addEventListener('scroll', sync, { passive: true });
    ['pointerdown', 'touchstart', 'wheel'].forEach(ev =>
      track.addEventListener(ev, () => { paused = true; }, { passive: true }));

    build();
    if (delay > 0) {
      setInterval(() => {
        if (paused || !isOn() || document.hidden) return;
        const n = pages();
        if (n < 2) return;
        track.scrollTo({ left: ((current() + 1) % n) * track.clientWidth, behavior: 'smooth' });
      }, delay);
    }
    window.addEventListener('resize', () => { build(); sync(); });
  };

  /* крапки-індикатори для горизонтальної каруселі відгуків */
  window.initSwipeDots = function (track) {
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
  };
})();
