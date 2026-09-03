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

  /* --- viber-група для курсу -------------------------------
     Спочатку шукаємо групу по місту, потім спільну для курсу. */
  const viberGroup = (course) => {
    if (!course) return '';
    const g = D.viberGroups || {};
    const byCity = g[course.template];
    if (byCity && byCity[course.city]) return byCity[course.city];
    return (g.byTemplate && g.byTemplate[course.template]) || '';
  };

  /* --- фото спікера для конкретної дати --------------------
     У Ноєнка два фото — вони чергуються між курсами. */
  const speakerPhoto = (course) => {
    const sp = D.speakers[course.speaker];
    if (!sp) return '';
    return (course.photoAlt && sp.imageAlt) ? sp.imageAlt : sp.image;
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

  window.V = {
    D, qs, qsa, MONTHS, MONTHS_GEN, MONTHS_SHORT, WEEKDAYS, WEEKDAYS_SHORT,
    parseDate, daysUntil, daysLabel, plural, formatPrice,
    resolvePricing, mainPrice, viberGroup, speakerPhoto,
    upcoming, findCourse, courseLabel, getAttribution, trackEvent
  };
})();
