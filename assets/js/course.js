/* ============================================================
   VSEODENT — сторінка курсу
   ============================================================ */
(function () {
  const { D, qs, qsa, MONTHS_GEN, WEEKDAYS, parseDate, daysUntil, daysLabel,
          upcoming, findCourse, trackEvent } = window.V;

  const CHECK = `<svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4.5 10.5l3.6 3.6 7.4-8" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  document.addEventListener('DOMContentLoaded', () => {
    const slug = new URLSearchParams(location.search).get('slug');
    const c = findCourse(slug) || upcoming()[0] || D.courses[0];
    const sp = D.speakers[c.speaker];
    const t = D.templates[c.template];
    const dt = parseDate(c.date);
    const left = daysUntil(c.date);

    /* --- head --- */
    document.title = `${c.title} — ${c.city}, ${c.date} | VSEODENT`;
    const desc = qs('meta[name="description"]');
    if (desc) desc.content = t.summary.slice(0, 180);

    /* --- шапка курсу --- */
    qs('#crumbTitle').textContent = c.title;
    qs('#eyebrow').textContent = t.eyebrow;
    qs('#title').textContent = c.title;
    qs('#summary').textContent = t.summary;

    const chips = [
      ['📍', `${c.city}${c.venue ? ' · ' + c.venue : ''}`],
      ['📅', `${dt.getDate()} ${MONTHS_GEN[dt.getMonth()]} ${dt.getFullYear()}, ${WEEKDAYS[dt.getDay()]}`],
      ['🎓', t.level],
      ['✳️', 'Бали БПР для лікарів']
    ];
    qs('#chips').innerHTML = chips.map(([i, txt]) =>
      `<span class="course-chip"><span aria-hidden="true">${i}</span>${txt}</span>`).join('');

    /* --- картка реєстрації --- */
    qs('#bookDate').textContent = `${String(dt.getDate()).padStart(2, '0')}.${String(dt.getMonth() + 1).padStart(2, '0')}.${dt.getFullYear()}`;
    qs('#bookCity').textContent = `${c.city}${c.venue ? ' · ' + c.venue : ''}`;
    qs('#bookCountdown').textContent = daysLabel(left);
    qs('#bookSpeakerImg').src = sp.image;
    qs('#bookSpeakerImg').alt = sp.name;
    qs('#bookSpeakerName').textContent = sp.name;
    qs('#bookSpeakerRole').textContent = sp.role;
    qs('#bookList').innerHTML = [
      `${t.level}`,
      c.price ? `${c.price} грн` : 'Вартість — уточнюємо у Viber',
      'Сертифікат учасника',
      'Бали БПР для лікарів'
    ].map(x => `<li>${CHECK}<span>${x}</span></li>`).join('');

    /* --- липка панель на мобільному --- */
    qs('#stickyDate').textContent = `${c.date} · ${c.city}`;
    qs('#stickyTitle').textContent = c.title;
    document.body.classList.add('has-sticky');

    /* --- для кого / що отримаєте --- */
    qs('#audience').innerHTML = t.audience.map(x => `<li>${x}</li>`).join('');
    qs('#outcomes').innerHTML = t.outcomes.map(x =>
      `<li>${CHECK}<span>${x}</span></li>`).join('');

    /* --- програма --- */
    if (t.program.length) {
      qs('#programList').innerHTML = t.program.map(p =>
        `<li><b>${p.title}</b><span>${p.text}</span></li>`).join('');
      qs('#programPending').remove();
    } else {
      qs('#programList').remove();
    }

    /* --- що взяти з собою --- */
    if (t.bring && t.bring.length) {
      qs('#bringList').innerHTML = t.bring.map(x => `<li>${x}</li>`).join('');
    } else {
      qs('#bringBlock').remove();
    }

    /* --- спікер --- */
    qs('#speakerImg').src = sp.image;
    qs('#speakerImg').alt = sp.name;
    qs('#speakerName').textContent = sp.name;
    qs('#speakerRole').textContent = sp.role;
    qs('#speakerBio').textContent = sp.bio;
    qs('#speakerFocus').innerHTML = sp.focus.map(f => `<span class="tag">${f}</span>`).join('');

    /* --- інші дати цього ж курсу --- */
    const others = upcoming().filter(x => x.template === c.template && x.slug !== c.slug);
    if (others.length) {
      qs('#otherDates').innerHTML = others.map(o => `
        <a class="other-date" href="course.html?slug=${o.slug}">
          <b>${o.date}</b><span>${o.city}</span>
        </a>`).join('');
    } else {
      qs('#otherBlock').remove();
    }

    /* --- CTA --- */
    qsa('[data-apply]').forEach(b => b.addEventListener('click', () => window.openLeadForm(c.slug)));

    trackEvent('ViewContent', {
      content_name: c.title, content_category: c.city, content_ids: [c.slug]
    });
  });
})();
