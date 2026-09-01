/* ============================================================
   VSEODENT — спільна логіка: дати, UTM, аналітика, навігація
   ============================================================ */
(function () {
  const D = window.VSEODENT_DATA;

  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];

  /* --- дати --- */
  const MONTHS = ['Січень','Лютий','Березень','Квітень','Травень','Червень',
                  'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
  const MONTHS_GEN = ['січня','лютого','березня','квітня','травня','червня',
                      'липня','серпня','вересня','жовтня','листопада','грудня'];
  const MONTHS_SHORT = ['січ','лют','бер','кві','тра','чер','лип','сер','вер','жов','лис','гру'];
  const WEEKDAYS = ['неділя','понеділок','вівторок','середа','четвер','пʼятниця','субота'];
  const WEEKDAYS_SHORT = ['нд','пн','вт','ср','чт','пт','сб'];

  const parseDate = (s) => {
    const [d, m, y] = String(s).split('.').map(Number);
    return new Date(y, m - 1, d);
  };
  const today = () => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; };
  const daysUntil = (s) => Math.round((parseDate(s) - today()) / 86400000);

  /* «залишилось 5 днів» з правильним відмінком */
  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  };
  const daysLabel = (n) => {
    if (n === 0) return 'сьогодні';
    if (n === 1) return 'завтра';
    return `через ${n} ${plural(n, 'день', 'дні', 'днів')}`;
  };

  /* --- ціна --- */
  const formatPrice = (v) => {
    if (v === null || v === undefined || v === '') return '';
    if (typeof v === 'string') return v;
    return new Intl.NumberFormat('uk-UA').format(v) + ' грн';
  };

  /* --- вартість --------------------------------------------
     До changeDate діє рання ціна, після — поточна.
     Повертає { rows, isEarly, changeDate } або null. */
  const resolvePricing = (course) => {
    const pr = course && course.pricing;
    if (!pr) return null;

    let isEarly = false;
    if (pr.changeDate && pr.early) {
      const [y, m, d] = pr.changeDate.split('-').map(Number);
      isEarly = today() < new Date(y, m - 1, d);
    }
    const table = isEarly ? pr.early : pr.now;
    if (!table) return null;

    const rows = Object.entries(table).map(([key, vals]) => ({
      key, values: vals
    }));
    return { rows, isEarly, layout: pr.layout, oneLabel: pr.oneLabel || 'Курс',
             changeDate: pr.changeDate };
  };

  /* Головна ціна курсу — повний курс для лікарів.
     Використовується в hero, картках каталогу і липкій панелі. */
  const mainPrice = (course) => {
    const p = resolvePricing(course);
    if (!p) return null;
    const row = p.rows.find(r => r.key === 'doctors') || p.rows[0];
    if (!row) return null;
    return row.values[row.values.length - 1];
  };

  /* --- курси --- */
  const upcoming = () => D.courses
    .filter(c => daysUntil(c.date) >= 0)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));

  const findCourse = (slug) => D.courses.find(c => c.slug === slug);
  const courseLabel = (c) => `${c.date} · ${c.city} · ${c.title}`;

  /* --- UTM для атрибуції реклами --- */
  const UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'];
  const params = new URLSearchParams(location.search);
  UTM_KEYS.forEach(k => { if (params.get(k)) { try { sessionStorage.setItem('vs_' + k, params.get(k)); } catch (e) {} } });
  const getAttribution = () => {
    const out = {};
    UTM_KEYS.forEach(k => { try { out[k] = sessionStorage.getItem('vs_' + k) || ''; } catch (e) { out[k] = ''; } });
    out.referrer = document.referrer || '';
    return out;
  };

  /* --- аналітика (Meta Pixel / GTM) --- */
  const trackEvent = (name, data = {}) => {
    try { if (window.fbq) window.fbq('track', name, data); } catch (e) {}
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...data });
  };

  /* --- мобільне меню --- */
  function initNav() {
    const burger = qs('#burger'), menu = qs('#mobileMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    qsa('a', menu).forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* --- підстановка контактів із data.js --- */
  function initContacts() {
    const s = D.site;
    qsa('[data-phone]').forEach(el => { el.textContent = s.phone; el.href = s.phoneHref; });
    qsa('[data-viber]').forEach(el => { if (s.viber) el.href = s.viber; else el.remove(); });
    qsa('[data-telegram]').forEach(el => { if (s.telegram) el.href = s.telegram; else el.remove(); });
    qsa('[data-instagram]').forEach(el => { el.href = s.instagram; });
    qsa('[data-email]').forEach(el => { el.textContent = s.email; el.href = 'mailto:' + s.email; });
    qsa('[data-bpr]').forEach(el => { el.textContent = s.bprProvider; });
    qsa('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* --- FAQ з data.js --- */
  function initFaq() {
    const box = qs('#faqList');
    if (!box) return;
    box.innerHTML = D.faq.map(item => `
      <details>
        <summary>${item.q}</summary>
        <p>${item.a}</p>
      </details>`).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNav(); initContacts(); initFaq();
    qsa('[data-open-form]').forEach(btn =>
      btn.addEventListener('click', () =>
        window.openLeadForm(btn.dataset.course || '', btn.dataset.leadType || 'course')));
  });


  /* ============================================================
     СПІЛЬНІ БЛОКИ: галерея, відгуки, карусель
     ============================================================ */
  const esc = (v) => String(v).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const SHOTS = [
    'Спікер під час роботи',
    'Лікарі за робочими місцями',
    'Практична частина',
    'Обладнання',
    'Взаємодія спікера з учасниками'
  ];

  window.renderGallery = function (sel) {
    const box = qs(sel);
    if (!box) return;
    if (D.gallery.length) {
      box.innerHTML = D.gallery.slice(0, 5).map((g, i) => `
        <figure class="gcell${i === 0 ? ' gcell--lead' : ''}">
          <img src="${esc(g.src)}" alt="${esc(g.alt || '')}" loading="lazy">
        </figure>`).join('');
      const hint = qs(sel === '#gallery' ? '#galleryHint' : '#galleryHint');
      if (hint) hint.remove();
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
      const hint = qs('#galleryHint');
      if (hint) hint.classList.remove('hidden');
    }
  };

  window.renderReviews = function (sel) {
    const box = qs(sel);
    if (!box) return;
    const btn = qs('#reviewsMore');
    const hint = qs('#reviewsHint');

    if (!D.reviews.length) {
      box.innerHTML = [1, 2, 3].map(() => `
        <article class="rcard rcard--empty">
          <span class="rcard__q" aria-hidden="true">”</span>
          <span class="rcard__ph"></span><span class="rcard__ph"></span>
          <span class="rcard__ph rcard__ph--short"></span>
        </article>`).join('');
      if (btn) btn.remove();
      return;
    }

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
    if (hint) hint.remove();

    /* на мобільному відгуки гортаються — ховати частину не потрібно */
    const isCarousel = () =>
      getComputedStyle(box).getPropertyValue('--carousel').trim() === 'on';

    function sync() {
      if (isCarousel()) {
        qsa('.rcard.is-hidden', box).forEach(el => el.classList.remove('is-hidden'));
        if (btn) btn.style.display = 'none';
      } else if (btn && btn.dataset.used !== '1') {
        btn.style.display = '';
      }
    }

    if (btn) {
      if (D.reviews.length > FIRST) {
        btn.textContent = `Показати всі відгуки (${D.reviews.length})`;
        btn.addEventListener('click', () => {
          qsa('.rcard.is-hidden', box).forEach(el => el.classList.remove('is-hidden'));
          btn.dataset.used = '1';
          btn.style.display = 'none';
        });
      } else btn.remove();
    }
    sync();
    window.addEventListener('resize', sync);
    window.initCarousel(sel, '#reviewsDots', 0);
  };

  /* Горизонтальна карусель. Вмикається лише коли CSS ставить --carousel:on.
     delay = 0 — без автопрокрутки. */
  window.initCarousel = function (trackSel, dotsSel, delay) {
    const track = qs(trackSel), dots = qs(dotsSel);
    if (!track || !dots || !track.children.length) return;

    const isOn = () => getComputedStyle(track).getPropertyValue('--carousel').trim() === 'on';
    let paused = false;

    const pages = () =>
      Math.max(1, Math.round(track.scrollWidth / Math.max(track.clientWidth, 1)));
    const current = () =>
      Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));

    function buildDots() {
      const n = pages();
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

    track.addEventListener('scroll', syncDots, { passive: true });
    ['pointerdown', 'touchstart', 'wheel'].forEach(ev =>
      track.addEventListener(ev, () => { paused = true; }, { passive: true }));

    buildDots();
    if (delay > 0) {
      setInterval(() => {
        if (paused || !isOn() || document.hidden) return;
        const n = pages();
        if (n < 2) return;
        track.scrollTo({ left: ((current() + 1) % n) * track.clientWidth, behavior: 'smooth' });
      }, delay);
    }
    window.addEventListener('resize', () => { buildDots(); syncDots(); });
  };

  window.V = {
    D, qs, qsa, MONTHS, MONTHS_GEN, MONTHS_SHORT, WEEKDAYS, WEEKDAYS_SHORT,
    parseDate, daysUntil, daysLabel, plural, formatPrice,
    resolvePricing, mainPrice,
    upcoming, findCourse, courseLabel, getAttribution, trackEvent
  };
})();
