/* ============================================================
   VSEODENT — головна сторінка: розклад, фільтри, спікери
   ============================================================ */
(function () {
  const { D, qs, qsa, MONTHS, WEEKDAYS_SHORT, parseDate, daysUntil, daysLabel,
          plural, upcoming, trackEvent } = window.V;

  const list = upcoming();
  const state = { topic: 'all', city: 'all' };

  /* ---------- статистика в hero та смузі довіри ---------- */
  function initStats() {
    const cities = [...new Set(list.map(c => c.city))];
    const set = (id, v) => { const el = qs('#' + id); if (el) el.textContent = v; };
    set('statDates', list.length);
    set('statDatesLabel', plural(list.length, 'дата в розкладі', 'дати в розкладі', 'дат у розкладі'));
    set('statCities', cities.length);
    set('statCitiesLabel', plural(cities.length, 'місто', 'міста', 'міст'));
    set('statSpeakers', Object.keys(D.speakers).length);
  }

  /* ---------- картка найближчого курсу в hero ---------- */
  function initHeroNext() {
    const next = list[0];
    if (!next) return;
    const sp = D.speakers[next.speaker];
    qs('#nextLabel').textContent = daysLabel(daysUntil(next.date));
    qs('#nextTitle').textContent = next.title;
    qs('#nextMeta').textContent = `${next.date} · ${next.city}`;
    qs('#nextBtn').dataset.course = next.slug;
    qs('#nextBtn').addEventListener('click', () => window.openLeadForm(next.slug));
    const photo = qs('#heroPhoto');
    if (photo) { photo.src = sp.image; photo.alt = sp.name; }
  }

  /* ---------- фільтри ---------- */
  function initFilters() {
    const topicBox = qs('#topicFilters');
    const usedTopics = [...new Set(list.map(c => c.topic))];
    topicBox.innerHTML =
      `<button class="chip" aria-pressed="true" data-topic="all">Усі теми</button>` +
      usedTopics.map(t =>
        `<button class="chip" aria-pressed="false" data-topic="${t}">${D.topics[t].label}</button>`).join('');

    const citySel = qs('#cityFilter');
    const cities = [...new Set(list.map(c => c.city))].sort((a, b) => a.localeCompare(b, 'uk'));
    citySel.innerHTML = `<option value="all">Усі міста</option>` +
      cities.map(c => `<option value="${c}">${c}</option>`).join('');

    topicBox.addEventListener('click', e => {
      const btn = e.target.closest('[data-topic]');
      if (!btn) return;
      state.topic = btn.dataset.topic;
      qsa('[data-topic]', topicBox).forEach(b =>
        b.setAttribute('aria-pressed', String(b === btn)));
      render();
    });
    citySel.addEventListener('change', () => { state.city = citySel.value; render(); });
    qs('#resetFilters').addEventListener('click', reset);
  }

  function reset() {
    state.topic = 'all'; state.city = 'all';
    qsa('#topicFilters [data-topic]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.topic === 'all')));
    qs('#cityFilter').value = 'all';
    render();
  }

  /* ---------- рядок події ---------- */
  function eventRow(c) {
    const sp = D.speakers[c.speaker];
    const t = D.templates[c.template];
    const dt = parseDate(c.date);
    const left = daysUntil(c.date);
    const soon = left <= 14;

    return `
      <article class="event">
        <div class="event__date">
          <div class="event__day">${String(dt.getDate()).padStart(2, '0')}</div>
          <div class="event__month">${MONTHS[dt.getMonth()].slice(0, 3)}</div>
          <div class="event__weekday">${WEEKDAYS_SHORT[dt.getDay()]}</div>
        </div>
        <div class="event__body">
          <h3 class="event__title"><a href="course.html?slug=${c.slug}">${c.title}</a></h3>
          <div class="event__meta">
            <span class="event__city">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 15s5-4.4 5-8.3A5 5 0 0 0 3 6.7C3 10.6 8 15 8 15Z" stroke="currentColor" stroke-width="1.4"/>
                <circle cx="8" cy="6.6" r="1.8" stroke="currentColor" stroke-width="1.4"/>
              </svg>${c.city}</span>
            <span class="event__speaker"><img class="event__avatar" src="${sp.image}" alt="">${sp.name}</span>
            <span class="tag">${t.level}</span>
            ${soon ? `<span class="tag tag--soon">${daysLabel(left)}</span>` : ''}
          </div>
        </div>
        <div class="event__actions">
          <a class="event__link" href="course.html?slug=${c.slug}">Програма</a>
          <button class="btn btn--primary btn--sm" data-slug="${c.slug}">Зареєструватися</button>
        </div>
      </article>`;
  }

  /* ---------- рендер розкладу ---------- */
  function render() {
    const found = list.filter(c =>
      (state.topic === 'all' || c.topic === state.topic) &&
      (state.city === 'all' || c.city === state.city));

    qs('#count').textContent = found.length
      ? `${found.length} ${plural(found.length, 'курс', 'курси', 'курсів')} у розкладі`
      : 'Нічого не знайшли';

    const box = qs('#schedule');

    if (!found.length) {
      box.innerHTML = `
        <div class="empty">
          <p>За цими фільтрами дат немає. Спробуйте інше місто або тему — або залиште заявку, і ми повідомимо про нові дати.</p>
          <button class="btn btn--ghost" id="emptyReset">Показати всі курси</button>
        </div>`;
      qs('#emptyReset').addEventListener('click', reset);
      return;
    }

    /* групування по місяцях */
    const groups = new Map();
    found.forEach(c => {
      const dt = parseDate(c.date);
      const key = `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    });

    box.innerHTML = [...groups].map(([label, items]) => `
      <section class="month">
        <h3 class="month__label">${label}</h3>
        ${items.map(eventRow).join('')}
      </section>`).join('');

    qsa('[data-slug]', box).forEach(btn =>
      btn.addEventListener('click', () => window.openLeadForm(btn.dataset.slug)));
  }

  /* ---------- спікери ---------- */
  function initSpeakers() {
    const box = qs('#speakers');
    box.innerHTML = Object.entries(D.speakers).map(([key, sp]) => {
      const n = list.filter(c => c.speaker === key).length;
      return `
        <article class="speaker">
          <div class="speaker__photo"><img src="${sp.image}" alt="${sp.name}" loading="lazy"></div>
          <div class="speaker__body">
            <h3>${sp.name}</h3>
            <div class="speaker__role">${sp.role}</div>
            <p>${sp.bio}</p>
            <div class="speaker__focus">${sp.focus.map(f => `<span class="tag">${f}</span>`).join('')}</div>
            <button class="speaker__link" data-speaker="${key}" type="button">
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
      qs('#schedule').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initStats(); initHeroNext(); initFilters(); render(); initSpeakers();
    trackEvent('ViewContent', { content_type: 'course_catalog' });
  });
})();
