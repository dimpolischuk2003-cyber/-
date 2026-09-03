/* ============================================================
   VSEODENT — стрічка відео з курсів
   Вертикальні картки 9:16, як reels. Desktop — три в ряд,
   mobile — swipe-карусель зі snap.
   Одночасно грає лише одне відео. Звук вимкнений за замовчуванням.
   Коли блок іде за межі екрана — відео ставиться на паузу.
   ============================================================ */
(function () {
  const { D, qs, qsa } = window.V;
  const esc = (s) => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const ICON_PLAY = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>`;
  const ICON_PAUSE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="5.5" width="3.4" height="13" rx="1.1" fill="currentColor"/>
      <rect x="13.6" y="5.5" width="3.4" height="13" rx="1.1" fill="currentColor"/></svg>`;
  const ICON_MUTED = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4v-5Z" fill="currentColor"/>
      <path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`;
  const ICON_SOUND = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4v-5Z" fill="currentColor"/>
      <path d="M15.5 9c1 .9 1.6 1.9 1.6 3s-.6 2.1-1.6 3M18 6.5c1.7 1.5 2.7 3.3 2.7 5.5S19.7 16 18 17.5"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

  /* mp4 основний, webm — для браузерів без H.264 */
  const sources = (v) => {
    const webm = v.src.replace(/\.mp4$/, '.webm');
    return `<source src="${esc(v.src)}" type="video/mp4">` +
           `<source src="${esc(webm)}" type="video/webm">`;
  };

  /* фото з курсу — горизонтальна стрічка під відео */
  window.renderPhotos = function (sel, photos) {
    const box = qs(sel);
    if (!box) return;
    if (!photos || !photos.length) { box.remove(); return; }
    box.innerHTML = photos.map(src => `
      <figure class="pcell">
        <img class="pcell__bg" src="${esc(src)}" alt="" aria-hidden="true" loading="lazy">
        <img class="pcell__img" src="${esc(src)}" alt="Фото з курсу VSEODENT" decoding="async">
      </figure>`).join('');
    if (window.initSwipeDots) window.initSwipeDots(box);
    addArrows(box);
  };

  /* Стрілки гортання — щоб не залежати тільки від свайпу */
  function addArrows(track) {
    const wrap = track.parentElement;
    if (!wrap || qs('.reel-nav', wrap)) return;

    const mk = (dir, label) => {
      const btnEl = document.createElement('button');
      btnEl.type = 'button';
      btnEl.className = 'reel-nav reel-nav--' + dir;
      btnEl.setAttribute('aria-label', label);
      btnEl.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="${dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}" stroke="currentColor"
              stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      btnEl.addEventListener('click', () => {
        const step = (track.firstElementChild ? track.firstElementChild.offsetWidth : 260) + 14;
        track.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' });
      });
      return btnEl;
    };

    if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
    wrap.appendChild(mk('prev', 'Попереднє'));
    wrap.appendChild(mk('next', 'Наступне'));

    const sync = () => {
      const scrollable = track.scrollWidth - track.clientWidth > 8;
      qsa('.reel-nav', wrap).forEach(el => el.classList.toggle('hidden', !scrollable));
      qs('.reel-nav--prev', wrap).classList.toggle('is-off', track.scrollLeft < 8);
      qs('.reel-nav--next', wrap).classList.toggle('is-off',
        track.scrollLeft > track.scrollWidth - track.clientWidth - 8);
    };
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    setTimeout(sync, 100);
  }

  window.renderVideos = function (sel, opts = {}) {
    const box = qs(sel);
    if (!box) return;

    const list = opts.videos || [];
    if (!list.length) { const sec = box.closest('section'); if (sec) sec.remove(); return; }

    box.innerHTML = list.map((v, i) => `
      <article class="vcard${i === 0 ? ' is-active' : ''}" data-i="${i}">
        <div class="vcard__frame">
          <video
            ${i === 0 ? '' : 'preload="none"'}
            ${i === 0 ? 'preload="metadata"' : ''}
            muted playsinline loop
            poster="${esc(v.poster)}"
          >${i === 0 ? sources(v) : ''}</video>
          <button class="vcard__play" type="button" aria-label="Відтворити відео">${ICON_PLAY}</button>
          <button class="vcard__sound" type="button" aria-label="Увімкнути звук" aria-pressed="false">${ICON_MUTED}</button>
        </div>
        ${v.caption ? `<p class="vcard__cap">${esc(v.caption)}</p>` : ''}
      </article>`).join('');

    const cards = qsa('.vcard', box);
    const vids = cards.map(c => qs('video', c));

    /* лише одне відео грає одночасно */
    function stopOthers(except) {
      vids.forEach(v => { if (v !== except && !v.paused) v.pause(); });
      cards.forEach(c => c.classList.toggle('is-playing', qs('video', c) === except && !except.paused));
    }

    /* решта відео підвантажуються лише при першій взаємодії */
    function ensureSrc(v, i) {
      if (v.children.length) return;
      v.innerHTML = sources(list[i]);
      v.preload = 'metadata';
      v.load();
    }

    function play(v, card) {
      ensureSrc(v, cards.indexOf(card));
      stopOthers(v);
      cards.forEach(c => c.classList.toggle('is-active', c === card));
      const p = v.play();
      if (p && p.catch) p.catch(() => {});   /* браузер може заборонити — не падаємо */
    }

    cards.forEach((card, i) => {
      const v = vids[i];
      const btn = qs('.vcard__play', card);
      const snd = qs('.vcard__sound', card);

      const toggle = () => {
        if (v.paused) play(v, card);
        else { v.pause(); card.classList.remove('is-playing'); }
      };

      btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });

      /* якщо палець рухався по горизонталі — це гортання, а не тап */
      let startX = 0, moved = false;
      card.addEventListener('pointerdown', e => { startX = e.clientX; moved = false; });
      card.addEventListener('pointermove', e => {
        if (Math.abs(e.clientX - startX) > 8) moved = true;
      });
      card.addEventListener('click', () => { if (!moved) toggle(); });

      v.addEventListener('play', () => {
        card.classList.add('is-playing');
        btn.innerHTML = ICON_PAUSE;
        btn.setAttribute('aria-label', 'Пауза');
        stopOthers(v);
      });
      v.addEventListener('pause', () => {
        card.classList.remove('is-playing');
        btn.innerHTML = ICON_PLAY;
        btn.setAttribute('aria-label', 'Відтворити відео');
      });

      snd.addEventListener('click', e => {
        e.stopPropagation();
        v.muted = !v.muted;
        snd.innerHTML = v.muted ? ICON_MUTED : ICON_SOUND;
        snd.setAttribute('aria-pressed', String(!v.muted));
        snd.setAttribute('aria-label', v.muted ? 'Увімкнути звук' : 'Вимкнути звук');
        if (v.muted === false && v.paused) play(v, card);
      });
    });

    /* автозапуск активного відео, коли блок у полі зору; пауза, коли пішов */
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            const first = cards.find(c => c.classList.contains('is-active')) || cards[0];
            const v = qs('video', first);
            if (v.paused && v.muted) play(v, first);
          } else {
            vids.forEach(v => { if (!v.paused) v.pause(); });
          }
        });
      }, { threshold: 0.35 });
      io.observe(box);
    }

    function current() {
      const mid = box.scrollLeft + box.clientWidth / 2;
      let best = 0, dist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      return best;
    }
    if (window.initSwipeDots) window.initSwipeDots(box);
    addArrows(box);

    addArrows(box);

    /* на мобільному активним стає те відео, яке зупинилось по центру */
    let t = null;
    box.addEventListener('scroll', () => {
      clearTimeout(t);
      /* поки палець гортає, нічого не запускаємо — інакше стрічка смикається */
      t = setTimeout(() => {
        if (getComputedStyle(box).getPropertyValue('--carousel').trim() !== 'on') return;
        const mid = box.scrollLeft + box.clientWidth / 2;
        let best = 0, dist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < dist) { dist = d; best = i; }
        });
        const card = cards[best], v = vids[best];
        if (!card.classList.contains('is-active') || v.paused) play(v, card);
      }, 350);
    }, { passive: true });
  };
  /* стрілки для гортання стрічки на десктопі */
  function addArrows(box) {
    if (box.parentElement.classList.contains('reel-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'reel-wrap';
    box.parentNode.insertBefore(wrap, box);
    wrap.appendChild(box);

    const mk = (dir, label, path) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'reel-nav reel-nav--' + dir;
      b.setAttribute('aria-label', label);
      b.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="${path}" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      wrap.appendChild(b);
      return b;
    };
    const prev = mk('prev', 'Попередні відео', 'M15 5l-7 7 7 7');
    const next = mk('next', 'Наступні відео', 'M9 5l7 7-7 7');

    const step = () => (box.firstElementChild
      ? box.firstElementChild.offsetWidth + 18 : box.clientWidth * 0.8);
    prev.addEventListener('click', () => box.scrollBy({ left: -step() * 2, behavior: 'smooth' }));
    next.addEventListener('click', () => box.scrollBy({ left:  step() * 2, behavior: 'smooth' }));

    function sync() {
      prev.disabled = box.scrollLeft < 8;
      next.disabled = box.scrollLeft + box.clientWidth >= box.scrollWidth - 8;
    }
    box.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    setTimeout(sync, 100);
  }
})();
