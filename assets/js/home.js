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
  const state = { topic: 'all', city: 'all' };

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
    const ph = qs('#heroPhoto');
    if (ph) { ph.src = sp.image; ph.alt = sp.name; }
  }

  /* ---------- фільтри ---------- */
  function initFilters() {
    const box = qs('#topicFilters');
    const used = [...new Set(list.map(c => c.topic))];
    box.innerHTML = `<button class="chip" aria-pressed="true" data-topic="all">Усі теми</button>` +
      used.map(t => `<button class="chip" aria-pressed="false" data-topic="${t}">${esc(D.topics[t].label)}</button>`).join('');

    const sel = qs('#cityFilter');
    const cities = [...new Set(list.map(c => c.city))].sort((a, b) => a.localeCompare(b, 'uk'));
    sel.innerHTML = `<option value="all">Усі міста</option>` +
      cities.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');

    box.addEventListener('click', e => {
      const btn = e.target.closest('[data-topic]');
      if (!btn) return;
      state.topic = btn.dataset.topic;
      qsa('[data-topic]', box).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      render();
    });
    sel.addEventListener('change', () => { state.city = sel.value; render(); });
    qs('#resetFilters').addEventListener('click', reset);
  }

  function reset() {
    state.topic = 'all'; state.city = 'all';
    qsa('#topicFilters [data-topic]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.topic === 'all')));
    qs('#cityFilter').value = 'all';
    render();
  }

  /* ---------- картка курсу ---------- */
  function card(c) {
    const sp = D.speakers[c.speaker];
    const t = D.templates[c.template];
    const dt = parseDate(c.date);
    const left = daysUntil(c.date);
    const price = formatPrice(mainPrice(c));

    return `
      <article class="ccard">
        <div class="ccard__top">
          <img class="ccard__av" src="${esc(sp.image)}" alt="" loading="lazy" width="44" height="44">
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
          ${price ? `<div class="is-price"><dt>Для лікарів</dt><dd>${esc(price)}</dd></div>` : ''}
        </dl>

        <div class="ccard__actions">
          <button class="btn btn--primary btn--block" data-slug="${esc(c.slug)}">Забронювати місце</button>
          <a class="btn btn--ghost btn--block" href="course.html?slug=${esc(c.slug)}">Детальніше про курс</a>
        </div>
      </article>`;
  }

  /* ---------- рендер ---------- */
  function render() {
    const found = list.filter(c =>
      (state.topic === 'all' || c.topic === state.topic) &&
      (state.city === 'all' || c.city === state.city));

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
      return `<article class="speaker">
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
      const first = list.find(c => c.speaker === btn.dataset.speaker);
      if (!first) return;
      state.topic = first.topic; state.city = 'all';
      qsa('#topicFilters [data-topic]').forEach(b =>
        b.setAttribute('aria-pressed', String(b.dataset.topic === first.topic)));
      qs('#cityFilter').value = 'all';
      render();
      qs('#kursy').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHero(); initFilters(); render(); initSpeakers();
    trackEvent('ViewContent', { content_name: 'course_catalog' });
  });
})();
