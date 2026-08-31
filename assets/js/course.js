/* ============================================================
   VSEODENT — СТОРІНКА КУРСУ
   Порядок блоків за ТЗ:
   Hero → Результати → Як проходить навчання → Для кого → Програма →
   Практика → Спікер → Відгуки → Що входить → Все перед реєстрацією →
   Інші міста → FAQ → Фінальний CTA → Інші курси
   Блок без даних не рендериться взагалі.
   ============================================================ */
(function () {
  const { D, qs, qsa, MONTHS_GEN, WEEKDAYS, parseDate, daysUntil, daysLabel,
          upcoming, findCourse, formatPrice, resolvePricing, mainPrice,
          trackEvent } = window.V;

  const esc = (s) => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const kill = (sel) => { const el = qs(sel); if (el) el.remove(); };

  document.addEventListener('DOMContentLoaded', () => {
    const slug = new URLSearchParams(location.search).get('slug');
    const c = findCourse(slug) || upcoming()[0] || D.courses[0];
    const sp = D.speakers[c.speaker];
    const t = D.templates[c.template];
    const dt = parseDate(c.date);
    const dateLong = `${dt.getDate()} ${MONTHS_GEN[dt.getMonth()]} ${dt.getFullYear()}`;
    const dateShort = `${dt.getDate()} ${MONTHS_GEN[dt.getMonth()]}`;
    const price = formatPrice(mainPrice(c));

    /* ---------- SEO / OpenGraph ---------- */
    const title = `${c.title} — ${sp.name}, ${c.city} | VSEODENT`;
    const desc = (t.subtitle || t.summary).slice(0, 180);
    document.title = title;
    const setMeta = (attr, key, val) => {
      let m = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); }
      m.setAttribute('content', val);
    };
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', location.href);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:image', location.origin +
      location.pathname.replace(/[^/]+$/, '') + sp.image);

    /* ================= 1. HERO ================= */
    qs('#crumbTitle').textContent = c.title;
    qs('#eyebrow').textContent = t.eyebrow;
    qs('#h1').textContent = t.h1 || c.title;
    qs('#subtitle').textContent = t.subtitle || t.summary;

    const facts = [
      { label: 'Місто', value: c.city },
      { label: 'Дата', value: dateLong },
      { label: 'Формат', value: t.format },
      c.bpr ? { label: 'Бали БПР', value: String(c.bpr) } : null,
      c.mozId ? { label: '№ заходу МОЗ', value: c.mozId } : null
    ].filter(Boolean);

    qs('#heroFacts').innerHTML = facts.map(f => `
      <div class="hfact${f.strong ? ' hfact--strong' : ''}">
        <span>${esc(f.label)}</span><b>${esc(f.value)}</b>
      </div>`).join('');

    qs('#heroSpeakerImg').src = sp.image;
    qs('#heroSpeakerImg').alt = sp.name;
    qs('#heroSpeakerName').textContent = sp.name;
    qs('#heroSpeakerRole').textContent = sp.role;

    const left = daysUntil(c.date);
    if (left <= 21) qs('#heroCountdown').textContent = daysLabel(left);
    else kill('#heroCountdown');

    /* ================= 2. РЕЗУЛЬТАТИ ================= */
    if (t.outcomes.length) {
      qs('#outcomes').innerHTML = t.outcomes.map((o, i) => `
        <article class="ocard">
          <span class="ocard__n">${String(i + 1).padStart(2, '0')}</span>
          <h3>${esc(o.title)}</h3>
          <p>${esc(o.text)}</p>
        </article>`).join('');
      if (t.outcomesNote) qs('#outcomesNote').textContent = t.outcomesNote;
      else kill('#outcomesNote');
    } else kill('#secOutcomes');

    /* ================= 3. ЯК ПРОХОДИТЬ НАВЧАННЯ ================= */
    const shots = [
      'Спікер під час роботи',
      'Лікарі за робочими місцями',
      'Практична частина',
      'Обладнання',
      'Взаємодія спікера з учасниками'
    ];
    if (D.gallery.length) {
      qs('#gallery').innerHTML = D.gallery.slice(0, 5).map((g, i) => `
        <figure class="gcell${i === 0 ? ' gcell--lead' : ''}">
          <img src="${esc(g.src)}" alt="${esc(g.alt || '')}" loading="lazy">
        </figure>`).join('');
    } else {
      qs('#gallery').innerHTML = shots.map((s, i) => `
        <figure class="gcell gcell--empty${i === 0 ? ' gcell--lead' : ''}">
          <span class="gcell__ico" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7"/>
              <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" stroke-width="1.7"/>
              <path d="M4 17l4.5-4.5 3.5 3.5 3-2.5L20 17" stroke="currentColor"
                    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <figcaption>${s}</figcaption>
        </figure>`).join('');
      qs('#galleryHint').classList.remove('hidden');
    }

    /* ================= 4. ДЛЯ КОГО ================= */
    if (t.audience.length) {
      qs('#audience').innerHTML = t.audience.map(a => `
        <article class="acard">
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.text)}</p>
        </article>`).join('');
    } else kill('#secAudience');

    /* ================= 5. ПРОГРАМА ================= */
    if (t.program.length) {
      qs('#programList').innerHTML = t.program.map((p, i) => `
        <article class="pmod">
          <span class="pmod__n">${String(i + 1).padStart(2, '0')}</span>
          <div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>
        </article>`).join('');
      kill('#programSoon');
    } else {
      kill('#programList');
    }

    /* ================= 6. ПРАКТИЧНА ЧАСТИНА ================= */
    if (t.practice || t.bring.length) {
      if (t.practice) qs('#practiceText').textContent = t.practice;
      else kill('#practiceText');

      if (t.bring.length) {
        qs('#bringList').innerHTML = t.bring.map(b => `<li>${esc(b)}</li>`).join('');
      } else kill('#bringCard');
    } else kill('#secPractice');

    /* ================= 7. СПІКЕР ================= */
    qs('#spImg').src = sp.image;
    qs('#spImg').alt = sp.name;
    qs('#spName').textContent = sp.name;
    qs('#spRole').textContent = sp.role;
    qs('#spBio').textContent = sp.bio;
    if (sp.facts && sp.facts.length) {
      qs('#spFacts').innerHTML = sp.facts.map(f =>
        `<article class="fact"><b>${esc(f.title)}</b><span>${esc(f.text)}</span></article>`).join('');
    } else kill('#spFacts');

    /* ================= 8. ВІДГУКИ ================= */
    if (D.reviews.length) {
      const box = qs('#reviews');
      box.classList.add('reviews--media');
      const card = (r) => (r.type === 'screenshot' || r.type === 'video')
        ? `<figure class="rcard rcard--media">
             <img src="${esc(r.src)}" alt="Відгук учасника курсу VSEODENT" loading="lazy">
           </figure>`
        : `<article class="rcard">
             <p>${esc(r.text)}</p>
             <footer><b>${esc(r.name || '')}</b>${r.city ? `<span>${esc(r.city)}</span>` : ''}</footer>
           </article>`;

      const FIRST = 6;
      box.innerHTML = D.reviews.map((r, i) =>
        card(r).replace('class="rcard', `class="rcard${i >= FIRST ? ' is-hidden' : ''}`)).join('');
      kill('#reviewsHint');

      if (D.reviews.length > FIRST) {
        const btn = qs('#reviewsMore');
        btn.textContent = `Показати всі відгуки (${D.reviews.length})`;
        btn.addEventListener('click', () => {
          qsa('.rcard.is-hidden', box).forEach(el => el.classList.remove('is-hidden'));
          btn.remove();
        });
      } else kill('#reviewsMore');
    } else {
      qs('#reviews').innerHTML = [1, 2, 3].map(() => `
        <article class="rcard rcard--empty">
          <span class="rcard__q" aria-hidden="true">”</span>
          <span class="rcard__ph"></span><span class="rcard__ph"></span>
          <span class="rcard__ph rcard__ph--short"></span>
        </article>`).join('');
      kill('#reviewsMore');
    }

    /* ================= 9. ЩО ВХОДИТЬ У ВАРТІСТЬ ================= */
    if (c.includes && c.includes.length) {
      qs('#includes').innerHTML = c.includes.map(i => `
        <li><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.5 10.5l3.6 3.6 7.4-8" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(i)}</span></li>`).join('');
    } else kill('#secIncludes');

    /* ================= 11. ІНШІ МІСТА / ДАТИ ================= */
    const others = upcoming().filter(x => x.template === c.template && x.slug !== c.slug);
    if (others.length) {
      qs('#otherDates').innerHTML = others.map(o => {
        const od = parseDate(o.date);
        const op = '';
        return `<article class="dcard">
          <b class="dcard__city">${esc(o.city)}</b>
          <span class="dcard__date">${od.getDate()} ${MONTHS_GEN[od.getMonth()]} ${od.getFullYear()}</span>
          ${op ? `<span class="dcard__price">${esc(op)}</span>` : ''}
          <a class="btn btn--ghost btn--sm btn--block" href="course.html?slug=${esc(o.slug)}">Переглянути курс</a>
        </article>`;
      }).join('');
    } else kill('#secOther');

    /* ================= 12. FAQ ================= */
    const faqItems = D.courseFaq.map(item => {
      if (item.a) return item;
      if (item.from === 'practice') {
        if (!t.practice) return null;
        return { q: item.q, a: t.practice };
      }
      if (item.from === 'bring') {
        if (!t.bring.length) return null;
        return { q: item.q, a: 'Візьміть із собою: ' + t.bring.join('; ') + '.' };
      }
      if (item.from === 'bpr') {
        return { q: item.q, a: c.bpr
          ? `Так. За участь у цьому курсі нараховується ${c.bpr} балів БПР. Провайдер — ${D.site.bprProvider}.`
          : `Заходи навчального центру VSEODENT передбачають нарахування балів БПР. Провайдер — ${D.site.bprProvider}. Кількість балів для цієї дати уточнює команда VSEODENT під час підтвердження участі.` };
      }
      return null;
    }).filter(Boolean);

    qs('#faqList').innerHTML = faqItems.map(f => `
      <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');

    /* ================= 14. ІНШІ КУРСИ ================= */
    const rest = upcoming().filter(x => x.template !== c.template).slice(0, 3);
    if (rest.length) {
      qs('#otherCourses').innerHTML = rest.map(o => {
        const od = parseDate(o.date);
        const os = D.speakers[o.speaker];
        return `<a class="mini" href="course.html?slug=${esc(o.slug)}">
          <img src="${esc(os.image)}" alt="" loading="lazy">
          <div>
            <b>${esc(o.title)}</b>
            <span>${od.getDate()} ${MONTHS_GEN[od.getMonth()]} • ${esc(o.city)}</span>
          </div>
        </a>`;
      }).join('');
    } else kill('#secOtherCourses');

    /* ================= STICKY CTA ================= */
    qs('#stickyMain').textContent = dateShort;
    qs('#stickySub').textContent = c.city;
    document.body.classList.add('has-sticky');

    /* ================= CTA ================= */
    qsa('[data-book]').forEach(b => b.addEventListener('click', () => window.openLeadForm(c.slug)));

    /* ================= ВАРТІСТЬ УЧАСТІ ================= */
    renderPricing(c);

    /* ================= ДО / ПІСЛЯ ================= */
    window.renderBeforeAfter('#ba', t.transform);

    /* ================= КАРУСЕЛІ ТА СМУГА ================= */
    initCarousel('#outcomesCarousel', '#outcomes', '#outcomesDots', 8000);
    initRail();

    trackEvent('ViewContent', {
      content_name: c.title, content_ids: [c.slug],
      city: c.city, date: c.date
    });
  });

  /* ============================================================
     ВАРТІСТЬ УЧАСТІ
     ============================================================ */
  function renderPricing(c) {
    const p = resolvePricing(c);
    if (!p) { kill('#secPricing'); return; }

    const validUntil = () => {
      if (!p.isEarly || !p.changeDate) return 'Поточна вартість';
      const [y, m, d] = p.changeDate.split('-').map(Number);
      return `Ціна актуальна до ${d} ${MONTHS_GEN[m - 1]} ${y}`;
    };

    qs('#pricing').innerHTML = p.rows.map(row => {
      const cat = D.priceCategories[row.key] || { label: row.key, note: '' };
      const v = row.values;

      const lines = (p.layout === 'two' && v.length > 1)
        ? `<div class="pline">
             <span>Лекція</span><b>${esc(formatPrice(v[0]))}</b>
           </div>
           <div class="pline pline--main">
             <span>Повний курс <i>Лекція + практика</i></span><b>${esc(formatPrice(v[1]))}</b>
           </div>`
        : `<div class="pline pline--main">
             <span>${esc(p.oneLabel)}</span><b>${esc(formatPrice(v[0]))}</b>
           </div>`;

      return `<article class="pcard">
        <h3 class="pcard__cat">${esc(cat.label)}</h3>
        <div class="pcard__lines">${lines}</div>
        ${cat.note ? `<p class="pcard__note">${esc(cat.note)}</p>` : ''}
        <p class="pcard__valid">${esc(validUntil())}</p>
      </article>`;
    }).join('');

    if (p.rows.length === 1) qs('#pricing').classList.add('pcards--single');
  }

  /* ============================================================
     КАРУСЕЛЬ (працює лише коли активний мобільний режим)
     ============================================================ */
  function initCarousel(rootSel, trackSel, dotsSel, delay) {
    const root = qs(rootSel), track = qs(trackSel), dots = qs(dotsSel);
    if (!root || !track || !track.children.length) return;

    const isOn = () => getComputedStyle(track).getPropertyValue('--carousel') .trim() === 'on';
    let timer = null, paused = false;

    function slides() { return [...track.children]; }
    function current() {
      const x = track.scrollLeft, w = track.clientWidth;
      return Math.round(x / Math.max(w, 1));
    }
    function count() {
      return Math.max(1, Math.round(track.scrollWidth / Math.max(track.clientWidth, 1)));
    }

    function buildDots() {
      const n = count();
      if (!isOn() || n < 2) { dots.innerHTML = ''; return; }
      dots.innerHTML = Array.from({ length: n }, (_, i) =>
        `<button type="button" class="cdot${i === 0 ? ' is-on' : ''}" aria-label="Слайд ${i + 1}"></button>`).join('');
      qsa('.cdot', dots).forEach((d, i) => d.addEventListener('click', () => {
        paused = true;
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
      }));
    }

    function syncDots() {
      const i = current();
      qsa('.cdot', dots).forEach((d, k) => d.classList.toggle('is-on', k === i));
    }

    function tick() {
      if (paused || !isOn() || document.hidden) return;
      const n = count();
      if (n < 2) return;
      const next = (current() + 1) % n;
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
    }

    track.addEventListener('scroll', syncDots, { passive: true });
    ['pointerdown', 'touchstart', 'wheel'].forEach(ev =>
      track.addEventListener(ev, () => { paused = true; }, { passive: true }));

    buildDots();
    timer = setInterval(tick, delay);
    window.addEventListener('resize', () => { buildDots(); syncDots(); });
  }

  /* ============================================================
     СМУГА РОЗДІЛІВ (scroll spy)
     ============================================================ */
  function initRail() {
    const rail = qs('#rail');
    const secs = qsa('[data-rail]').filter(el => el.isConnected);
    if (!rail || secs.length < 3) { if (rail) rail.remove(); return; }

    rail.innerHTML = secs.map((el, i) => `
      <button type="button" class="rail__item" data-i="${i}">
        <span class="rail__dot"></span>
        <span class="rail__label">${el.dataset.rail}</span>
      </button>`).join('');

    const items = qsa('.rail__item', rail);
    items.forEach((b, i) => b.addEventListener('click', () =>
      secs[i].scrollIntoView({ behavior: 'smooth', block: 'start' })));

    let active = -1;
    function update() {
      const y = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      secs.forEach((el, i) => { if (el.offsetTop <= y) idx = i; });
      if (idx !== active) {
        active = idx;
        items.forEach((b, i) => {
          b.classList.toggle('is-on', i === idx);
          b.classList.toggle('is-done', i < idx);
        });
      }
      rail.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    }

    /* підпис активного розділу показуємо під час гортання */
    let hideLabel = null;
    function flashLabel() {
      rail.classList.add('is-scrolling');
      clearTimeout(hideLabel);
      hideLabel = setTimeout(() => rail.classList.remove('is-scrolling'), 1100);
    }
    update();
    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      flashLabel();
      raf = requestAnimationFrame(() => { raf = null; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
  }
})();
