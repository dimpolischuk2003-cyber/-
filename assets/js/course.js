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
          upcoming, findCourse, formatPrice, trackEvent } = window.V;

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
    const price = formatPrice(c.price);

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
      price ? { label: 'Вартість', value: price, strong: true } : null
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
      qs('#spFacts').innerHTML = sp.facts.map(f => `<li>${esc(f)}</li>`).join('');
    } else kill('#spFacts');

    /* ================= 8. ВІДГУКИ ================= */
    if (D.reviews.length) {
      qs('#reviews').innerHTML = D.reviews.slice(0, 6).map(r => {
        if (r.type === 'screenshot' || r.type === 'video') {
          return `<figure class="rcard rcard--media">
            <img src="${esc(r.src)}" alt="Відгук учасника курсу VSEODENT" loading="lazy">
          </figure>`;
        }
        return `<article class="rcard">
          <p>${esc(r.text)}</p>
          <footer><b>${esc(r.name || '')}</b>${r.city ? `<span>${esc(r.city)}</span>` : ''}</footer>
        </article>`;
      }).join('');
      kill('#reviewsHint');
    } else {
      qs('#reviews').innerHTML = [1, 2, 3].map(() => `
        <article class="rcard rcard--empty">
          <span class="rcard__q" aria-hidden="true">”</span>
          <span class="rcard__ph"></span>
          <span class="rcard__ph"></span>
          <span class="rcard__ph rcard__ph--short"></span>
          <footer><span class="rcard__av"></span><span class="rcard__ph rcard__ph--name"></span></footer>
        </article>`).join('');
    }

    /* ================= 9. ЩО ВХОДИТЬ У ВАРТІСТЬ ================= */
    if (c.includes && c.includes.length) {
      qs('#includes').innerHTML = c.includes.map(i => `
        <li><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.5 10.5l3.6 3.6 7.4-8" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(i)}</span></li>`).join('');
    } else kill('#secIncludes');

    /* ================= 10. ВСЕ ПЕРЕД РЕЄСТРАЦІЄЮ ================= */
    const infoCards = [
      { label: 'Дата', value: dateLong, sub: WEEKDAYS[dt.getDay()] },
      { label: 'Місто', value: c.city, sub: c.address },
      c.time ? { label: 'Час', value: c.time } : null,
      c.bpr ? { label: 'Бали БПР', value: String(c.bpr) } : null,
      price ? { label: 'Вартість', value: price, strong: true } : null
    ].filter(Boolean);

    qs('#infoCards').innerHTML = infoCards.map(i => `
      <div class="icard${i.strong ? ' icard--strong' : ''}">
        <span class="icard__l">${esc(i.label)}</span>
        <b class="icard__v">${esc(i.value)}</b>
        ${i.sub ? `<span class="icard__s">${esc(i.sub)}</span>` : ''}
      </div>`).join('');

    /* ================= 11. ІНШІ МІСТА / ДАТИ ================= */
    const others = upcoming().filter(x => x.template === c.template && x.slug !== c.slug);
    if (others.length) {
      qs('#otherDates').innerHTML = others.map(o => {
        const od = parseDate(o.date);
        const op = formatPrice(o.price);
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
    if (price) {
      qs('#stickyMain').textContent = price;
      qs('#stickySub').textContent = `${dateShort} • ${c.city}`;
    } else {
      qs('#stickyMain').textContent = dateShort;
      qs('#stickySub').textContent = c.city;
    }
    document.body.classList.add('has-sticky');

    /* ================= CTA ================= */
    qsa('[data-book]').forEach(b => b.addEventListener('click', () => window.openLeadForm(c.slug)));

    trackEvent('ViewContent', {
      content_name: c.title, content_ids: [c.slug],
      city: c.city, date: c.date
    });
  });
})();
