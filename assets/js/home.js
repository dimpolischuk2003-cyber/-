/* ============================================================
   VSEODENT — ГОЛОВНА
   Каталог курсів картками. Сортування date ASC, минулі приховані.
   Кожна картка має дві CTA: «Забронювати місце» і «Детальніше».
   ============================================================ */
(function () {
  const { D, qs, qsa, MONTHS, MONTHS_GEN, parseDate, daysUntil, daysLabel,
          plural, formatPrice, mainPrice, upcoming, trackEvent } = window.V;

  const esc = (s) => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const list = upcoming();                 // вже відсортовано date ASC
  const state = { city: 'all' };

  /* ---------- hero ---------- */
  function initHero() {
    const cities = [...new Set(list.map(c => c.city))];
    const set = (id, v) => { const el = qs('#' + id); if (el) el.textContent = v; };
    set('statDates', list.length);
    set('statDatesLabel', plural(list.length, 'дата в розкладі', 'дати в розкладі', 'дат у розкладі'));
    set('statCities', cities.length);
    set('statCitiesLabel', plural(cities.length, 'місто', 'міста', 'міст'));

    const next = list[0];
    if (!next) return;
    const sp = D.speakers[next.speaker];
    const dt = parseDate(next.date);
    qs('#nextLabel').textContent = daysLabel(daysUntil(next.date));
    qs('#nextTitle').textContent = next.title;
    qs('#nextMeta').textContent = `${dt.getDate()} ${MONTHS_GEN[dt.getMonth()]} • ${next.city}`;
    qs('#nextBtn').addEventListener('click', () => window.openLeadForm(next.slug));
    const details = qs('#nextDetails');
    if (details) {
      const slug = encodeURIComponent(next.slug);
      const staticPreview = location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1' || location.hostname.endsWith('github.io');
      // Vercel: use the canonical rewrite /kurs/:slug. Static previews keep query URL.
      details.href = staticPreview ? `course.html?slug=${slug}` : `/kurs/${slug}`;
    }

    const ph = qs('#heroPhoto');
    if (ph) {
      ph.src = window.V.speakerPhoto(next);
      ph.alt = sp.name;
      ph.classList.remove('hero__photo--real');
    }
  }

  /* ---------- фільтр за містом ---------- */
  function initFilters() {
    const box = qs('#cityChips');
    const cities = [...new Set(list.map(c => c.city))].sort((a, b) => a.localeCompare(b, 'uk'));
    box.innerHTML =
      `<button class="citychip" aria-pressed="true" data-city="all">Усі міста</button>` +
      cities.map(c => `<button class="citychip" aria-pressed="false" data-city="${esc(c)}">${esc(c)}</button>`).join('');

    box.addEventListener('click', e => {
      const btn = e.target.closest('[data-city]');
      if (!btn) return;
      state.city = btn.dataset.city;
      qsa('[data-city]', box).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      render();
    });
  }

  function reset() {
    state.city = 'all';
    qsa('#cityChips [data-city]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.city === 'all')));
    render();
  }

  /* ---------- картка курсу ---------- */
  function card(c) {
    const sp = D.speakers[c.speaker];
    const t = D.templates[c.template];
    const dt = parseDate(c.date);
    const left = daysUntil(c.date);

    return `
      <article class="ccard">
        <div class="ccard__top">
          <img class="ccard__av" src="${esc(window.V.speakerPhoto(c))}" alt="" loading="lazy" width="44" height="44">
          <div class="ccard__who">
            <b>${esc(sp.name)}</b>
            <span>${esc(sp.short)}</span>
          </div>
        </div>

        <h3 class="ccard__title">
          <a href="course.html?slug=${esc(c.slug)}">${esc(c.title)}</a>
        </h3>
        <p class="ccard__desc">${esc(t.summary)}</p>

        <dl class="ccard__meta">
          <div><dt>Дата</dt><dd>${dt.getDate()} ${MONTHS_GEN[dt.getMonth()]} ${dt.getFullYear()}</dd>
            ${left <= 21 ? `<span class="ccard__soon">${daysLabel(left)}</span>` : ''}</div>
          <div><dt>Місто</dt><dd>${esc(c.city)}</dd></div>
          ${c.bpr ? `<div><dt>Бали БПР</dt><dd>${esc(c.bpr)}</dd></div>` : ''}

        </dl>

        <div class="ccard__actions">
          <button class="btn btn--primary btn--block" data-slug="${esc(c.slug)}">Забронювати місце</button>
          <a class="btn btn--ghost btn--block" href="course.html?slug=${esc(c.slug)}">Детальніше про курс</a>
        </div>
      </article>`;
  }

  /* ---------- рендер ---------- */
  function render() {
    const found = list.filter(c => state.city === 'all' || c.city === state.city);

    qs('#count').textContent = found.length
      ? `${found.length} ${plural(found.length, 'курс', 'курси', 'курсів')} у розкладі`
      : '';

    const box = qs('#schedule');
    if (!found.length) {
      box.innerHTML = `<div class="empty">
        <p>За цими фільтрами дат немає. Спробуйте інше місто або тему.</p>
        <button class="btn btn--ghost" id="emptyReset" type="button">Показати всі курси</button>
      </div>`;
      qs('#emptyReset').addEventListener('click', reset);
      return;
    }

    const groups = new Map();
    found.forEach(c => {
      const dt = parseDate(c.date);
      const key = `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    });

    box.innerHTML = [...groups].map(([label, items]) => `
      <section class="month">
        <h3 class="month__label">${esc(label)}</h3>
        <div class="ccards">${items.map(card).join('')}</div>
      </section>`).join('');

    qsa('[data-slug]', box).forEach(b =>
      b.addEventListener('click', () => window.openLeadForm(b.dataset.slug)));
  }

  /* ---------- спікери ---------- */
  function initSpeakers() {
    const box = qs('#speakers');
    if (!box) return;
    box.innerHTML = Object.entries(D.speakers).map(([key, sp]) => {
      const n = list.filter(c => c.speaker === key).length;
      return `<article class="speaker speaker--${key}">
        <div class="speaker__photo"><img src="${esc(sp.image)}" alt="${esc(sp.name)}" loading="lazy"></div>
        <div class="speaker__body">
          <h3>${esc(sp.name)}</h3>
          <div class="speaker__role">${esc(sp.short)}</div>
          <p>${esc(sp.bio)}</p>
          <div class="speaker__focus">${sp.focus.map(f => `<span class="tag">${esc(f)}</span>`).join('')}</div>
          <button class="speaker__link" type="button" data-speaker="${key}">
            ${n} ${plural(n, 'найближча дата', 'найближчі дати', 'найближчих дат')} →
          </button>
        </div>
      </article>`;
    }).join('');

    qsa('[data-speaker]', box).forEach(btn => btn.addEventListener('click', () => {
      reset();
      qs('#kursy').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHero(); initFilters(); render(); initSpeakers();
    window.renderBeforeAfter('#ba', D.transformHome);
    window.renderVideos('#videos', { videos: D.homeMedia.videos });
    window.renderPhotos('#photos', D.homeMedia.photos);
    window.renderReviews('#reviews', '#reviewsMore', null);
    trackEvent('ViewContent', { content_name: 'course_catalog' });
  });
})();
