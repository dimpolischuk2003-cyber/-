/* ============================================================
   VSEODENT — ФОРМА
   STEP 1  — короткий лід: ім'я, телефон, email (optional).
             Курс визначається зі сторінки й повторно не питається.
             Тут спрацьовує Meta-подія Lead. Контакт уже збережено.
   STEP 2  — повна реєстрація (ПІБ, БПР, освіта тощо), необов'язкова.
   Окремий режим 'select' — блок «допоможіть підібрати курс».
   ============================================================ */
(function () {
  const { D, qs, qsa, MONTHS, MONTHS_GEN, parseDate, upcoming,
          findCourse, formatPrice, getAttribution, trackEvent } = window.V;

  let ctx = { course: null, leadType: 'course', leadSent: false };

  /* ---------- список курсів для випадку без контексту ---------- */
  function courseOptions() {
    const groups = new Map();
    upcoming().forEach(c => {
      const dt = parseDate(c.date);
      const key = `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    });
    return [...groups].map(([label, items]) =>
      `<optgroup label="${label}">` +
      items.map(c => `<option value="${c.slug}">${c.date} · ${c.city} · ${c.title}</option>`).join('') +
      `</optgroup>`).join('');
  }

  /* ---------- розмітка ---------- */
  const markup = `
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="fTitle">
    <button class="modal__close" type="button" data-close aria-label="Закрити">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="modal__grabber" aria-hidden="true"></div>

    <form class="modal__body" id="leadForm" novalidate>

      <!-- ===== STEP 1 — ЛІД ===== -->
      <section class="fstep active" data-step="1">
        <h3 id="fTitle">Забронюйте місце на курсі</h3>
        <p class="fstep__lead">Залиште контактні дані — команда VSEODENT зв’яжеться з вами для підтвердження участі.</p>

        <div class="fcourse hidden" id="fCourse">
          <b id="fCourseTitle"></b>
          <span id="fCourseMeta"></span>
        </div>

        <div class="field hidden" data-field="course" id="fCoursePick">
          <label for="f-course">Курс</label>
          <select id="f-course" name="course">
            <option value="">— оберіть курс —</option>
            ${courseOptions()}
            <option value="undecided">Ще не визначився — потрібна порада</option>
          </select>
          <div class="err">Оберіть курс зі списку</div>
        </div>

        <div class="field" data-field="name">
          <label for="f-name">Ім’я</label>
          <input id="f-name" name="name" autocomplete="name" placeholder="Іван" enterkeyhint="next">
          <div class="err">Вкажіть ім’я</div>
        </div>

        <div class="field" data-field="phone">
          <label for="f-phone">Телефон / Viber</label>
          <input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel"
                 placeholder="+380 67 123 45 67" enterkeyhint="next">
          <div class="err">Вкажіть номер телефону</div>
        </div>

        <div class="field" data-field="email">
          <label for="f-email">Email <span class="hint">— необов’язково</span></label>
          <input id="f-email" name="email" type="email" inputmode="email" autocomplete="email"
                 placeholder="name@gmail.com" enterkeyhint="done">
          <div class="err">Перевірте адресу — схоже, у ній помилка</div>
        </div>

        <button type="button" class="btn btn--primary btn--block btn--lg" id="leadBtn">Забронювати місце</button>
        <p class="fnote">Це займає до 1 хвилини.</p>
      </section>

      <!-- ===== STEP 2 — ОФОРМЛЕННЯ УЧАСТІ ===== -->
      <section class="fstep" data-step="2">
        <span class="fbadge">Місце попередньо заброньовано</span>
        <h3>Оформлення участі</h3>
        <p class="fstep__lead">Три поля — і ми зафіксуємо вашу участь.</p>

        <div class="field" data-field="fullnameUa">
          <label for="f-ua">ПІБ українською</label>
          <input id="f-ua" name="fullnameUa" placeholder="Іваненко Іван Іванович">
          <div class="err">Вкажіть прізвище, ім’я та по батькові</div>
        </div>

        <div class="field" data-field="status">
          <label>Ваш статус</label>
          <div class="options">
            <label class="option"><input type="radio" name="status" value="Лікар">
              <span><b>Лікар</b></span></label>
            <label class="option"><input type="radio" name="status" value="Інтерн">
              <span><b>Інтерн</b></span></label>
            <label class="option"><input type="radio" name="status" value="Студент">
              <span><b>Студент</b></span></label>
            <label class="option"><input type="radio" name="status" value="Група">
              <span><b>Група</b></span></label>
          </div>
          <div class="err">Оберіть статус</div>
        </div>

        <div class="note hidden" id="docNote">
          <b>Потрібне підтвердження статусу</b>
          Команда VSEODENT попросить фото документа: студентський квиток, квиток інтерна,
          залікова книжка, довідка чи договір про інтернатуру або диплом спеціаліста.
        </div>

        <div class="field hidden" id="groupField" data-field="groupList">
          <label for="f-group">Учасники групи <span class="hint">— кожного з нового рядка</span></label>
          <textarea id="f-group" name="groupList" placeholder="Іваненко Іван Іванович&#10;Петренко Петро Петрович"></textarea>
          <div class="err">Впишіть учасників групи</div>
        </div>

        <div class="field" data-field="bpr">
          <label for="f-bpr">Чи потрібні вам бали БПР?</label>
          <select id="f-bpr" name="bpr">
            <option value="">— оберіть —</option>
            <option value="Так">Так, потрібні</option>
            <option value="Ні">Ні, не потрібні</option>
          </select>
          <div class="err">Оберіть відповідь</div>
        </div>

        <button type="button" class="btn btn--primary btn--block btn--lg" id="step2Btn">Далі</button>
      </section>

      <!-- ===== STEP 3 — ДАНІ ДЛЯ СЕРТИФІКАТА ===== -->
      <section class="fstep" data-step="3">
        <h3>Дані для сертифіката</h3>
        <p class="fstep__lead" id="certLead">Ці дані друкуються на сертифікаті учасника.</p>

        <div class="fields-2">
          <div class="field" data-field="fullnameEn">
            <label for="f-en">ПІБ англійською</label>
            <input id="f-en" name="fullnameEn" placeholder="Ivanenko Ivan">
            <div class="err">Заповніть латиницею, як у документах</div>
          </div>
          <div class="field" data-field="dob">
            <label for="f-dob">Дата народження</label>
            <input id="f-dob" name="dob" type="date">
            <div class="err">Вкажіть дату народження</div>
          </div>
        </div>

        <div id="bprFields" class="hidden">
          <div class="note">
            <b>Провайдер БПР: <span data-bpr></span></b>
            Дані нижче передаються до МОЗ України для нарахування балів.
          </div>
          <div class="fields-2">
            <div class="field" data-field="education">
              <label for="f-edu">Освіта</label>
              <select id="f-edu" name="education">
                <option value="">— оберіть —</option>
                <option>Вища медична</option>
                <option>Незакінчена вища медична</option>
              </select>
              <div class="err">Оберіть освіту</div>
            </div>
            <div class="field" data-field="specialty">
              <label for="f-spec">Спеціальність</label>
              <select id="f-spec" name="specialty">
                <option value="">— оберіть —</option>
                <option>Стоматологія</option>
                <option>Терапевтична стоматологія</option>
                <option>Хірургічна стоматологія</option>
                <option>Ортопедична стоматологія</option>
                <option>Ортодонтія</option>
                <option>Дитяча стоматологія</option>
                <option>Пародонтологія</option>
                <option>Щелепно-лицева хірургія</option>
                <option>Гігієністи зубні</option>
              </select>
              <div class="err">Оберіть спеціальність</div>
            </div>
          </div>
        </div>

        <div class="fields-2">
          <div class="field">
            <label for="f-work">Місце роботи <span class="hint">— необов’язково</span></label>
            <input id="f-work" name="workplace" placeholder="Клініка або лікарня">
          </div>
          <div class="field">
            <label for="f-pos">Посада <span class="hint">— необов’язково</span></label>
            <input id="f-pos" name="position" placeholder="Лікар-стоматолог">
          </div>
        </div>

        <div class="field">
          <label for="f-comment">Коментар <span class="hint">— необов’язково</span></label>
          <textarea id="f-comment" name="comment" placeholder="Потрібен рахунок для клініки, питання щодо програми…"></textarea>
        </div>

        <div class="form-row">
          <button type="button" class="btn btn--ghost" data-back2>Назад</button>
          <button type="submit" class="btn btn--primary btn--lg" id="fullBtn">Завершити оформлення</button>
        </div>
      </section>

      <!-- ===== ФІНАЛ ===== -->
      <section class="fstep" data-step="final">
        <div class="fdone">
          <div class="fdone__ico" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.4"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>Готово</h3>
          <p id="finalText">Дані отримано. Команда VSEODENT зв’яжеться з вами найближчим часом.</p>
          <button type="button" class="btn btn--primary btn--block btn--lg" data-close>Закрити</button>
        </div>
      </section>
    </form>
  </div>`;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'leadModal';
  backdrop.innerHTML = markup;
  document.body.appendChild(backdrop);

  const form = qs('#leadForm', backdrop);
  const steps = qsa('.fstep', form);

  const show = (name) => {
    steps.forEach(s => s.classList.toggle('active', s.dataset.step === String(name)));
    qs('.modal', backdrop).scrollTop = 0;
    backdrop.scrollTop = 0;
  };

  /* ---------- валідація ---------- */
  const setErr = (name, on) => {
    const f = qs(`[data-field="${name}"]`, form);
    if (f) f.classList.toggle('invalid', on);
  };
  const digits = s => (s.match(/\d/g) || []).length;

  function focusFirstError(scope) {
    const bad = qs('.invalid', scope);
    if (!bad) return;
    bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const i = bad.querySelector('input,select,textarea');
    if (i) setTimeout(() => i.focus({ preventScroll: true }), 240);
  }

  function validateLead() {
    let ok = true;
    const pick = qs('#fCoursePick');
    if (!pick.classList.contains('hidden') && !form.course.value) { setErr('course', true); ok = false; }
    else setErr('course', false);

    if (form.name.value.trim().length < 2) { setErr('name', true); ok = false; } else setErr('name', false);
    if (digits(form.phone.value) < 9) { setErr('phone', true); ok = false; } else setErr('phone', false);

    const em = form.email.value.trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(em)) { setErr('email', true); ok = false; }
    else setErr('email', false);

    if (!ok) focusFirstError(qs('[data-step="1"]', form));
    return ok;
  }

  function validateStep2() {
    let ok = true;
    const nm = form.fullnameUa.value.trim();
    if (nm.length < 5 || !nm.includes(' ')) { setErr('fullnameUa', true); ok = false; }
    else setErr('fullnameUa', false);

    const st = qs('[name=status]:checked', form);
    if (!st) { setErr('status', true); ok = false; } else setErr('status', false);

    if (st && st.value === 'Група') {
      if (form.groupList.value.trim().length < 4) { setErr('groupList', true); ok = false; }
      else setErr('groupList', false);
    }
    if (!form.bpr.value) { setErr('bpr', true); ok = false; } else setErr('bpr', false);

    if (!ok) focusFirstError(qs('[data-step="2"]', form));
    return ok;
  }

  function validateStep3() {
    let ok = true;
    if (form.fullnameEn.value.trim().length < 3) { setErr('fullnameEn', true); ok = false; }
    else setErr('fullnameEn', false);
    if (!form.dob.value) { setErr('dob', true); ok = false; } else setErr('dob', false);

    if (form.bpr.value === 'Так') {
      [['education', !!form.education.value], ['specialty', !!form.specialty.value]]
        .forEach(([k, good]) => { setErr(k, !good); if (!good) ok = false; });
    }
    if (!ok) focusFirstError(qs('[data-step="3"]', form));
    return ok;
  }

  /* ---------- відправка ---------- */
  function payload(stage) {
    const d = Object.fromEntries(new FormData(form).entries());
    const c = ctx.course || findCourse(d.course);
    return Object.assign({
      stage,
      lead_type: ctx.leadType,
      course_id: c ? c.slug : (d.course || ''),
      course_name: c ? c.title : '',
      course_city: c ? c.city : '',
      course_date: c ? c.date : '',
      page_url: location.href,
      created_at: new Date().toISOString()
    }, d, getAttribution());
  }

  const isDemo = () => {
    const m = D.site.demoMode;
    if (m === true) return true;
    if (m === false) return false;
    return location.protocol === 'file:' || location.hostname.endsWith('github.io') ||
           location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  };

  async function send(stage) {
    const body = payload(stage);
    if (isDemo()) { console.info('[VSEODENT · demo] Заявка не відправлена:', body); return true; }
    try {
      const r = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return r.ok;
    } catch (e) { console.warn('Lead error', e, body); return false; }
  }

  /* ---------- умовні поля ---------- */
  qsa('[name=status]', form).forEach(r => r.addEventListener('change', () => {
    const v = r.value;
    qs('#docNote').classList.toggle('hidden', !(v === 'Студент' || v === 'Інтерн'));
    qs('#groupField').classList.toggle('hidden', v !== 'Група');
    setErr('status', false);
  }));
  form.bpr.addEventListener('change', () => {
    qs('#bprFields').classList.toggle('hidden', form.bpr.value !== 'Так');
    setErr('bpr', false);
  });
  form.addEventListener('input', e => {
    const f = e.target.closest('[data-field]');
    if (f) f.classList.remove('invalid');
  });

  /* ---------- STEP 1 ---------- */
  qs('#leadBtn').addEventListener('click', async () => {
    if (!validateLead()) return;
    const btn = qs('#leadBtn');
    btn.disabled = true; btn.textContent = 'Надсилаємо…';

    const ok = await send('lead');
    btn.disabled = false; btn.textContent = 'Забронювати місце';
    if (!ok) { alert('Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.'); return; }

    ctx.leadSent = true;
    const p = payload('lead');
    trackEvent('Lead', {
      content_name: p.course_name, content_ids: [p.course_id],
      city: p.course_city, date: p.course_date
    });

    /* для підбору курсу оформлення не потрібне */
    if (ctx.leadType === 'course_selection') {
      qs('#finalText').textContent =
        'Команда VSEODENT зв’яжеться з вами й допоможе підібрати навчання за вашим напрямом, містом і зручною датою.';
      show('final');
    } else {
      show(2);      /* одразу оформлення участі */
    }
  });

  /* крок 2 → крок 3 */
  qs('#step2Btn').addEventListener('click', () => {
    if (!validateStep2()) return;
    qs('#certLead').textContent = form.bpr.value === 'Так'
      ? 'Ці дані друкуються на сертифікаті та передаються для нарахування балів БПР.'
      : 'Ці дані друкуються на сертифікаті учасника.';
    show(3);
  });
  qsa('[data-back2]', form).forEach(b => b.addEventListener('click', () => show(2)));

  /* ---------- STEP 2 ---------- */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateStep3()) return;
    const btn = qs('#fullBtn');
    btn.disabled = true; btn.textContent = 'Надсилаємо…';
    await send('registration');
    btn.disabled = false; btn.textContent = 'Завершити оформлення';

    const p = payload('registration');
    trackEvent('CompleteRegistration', {
      content_name: p.course_name, content_ids: [p.course_id],
      city: p.course_city, date: p.course_date
    });
    qs('#finalText').textContent = ctx.course
      ? `Оформлення завершено. Команда VSEODENT підтвердить участь у курсі «${ctx.course.title}» ${ctx.course.date}, ${ctx.course.city}.`
      : 'Оформлення завершено. Команда VSEODENT зв’яжеться з вами найближчим часом.';
    show('final');
  });

  /* ---------- закриття ---------- */
  function close() {
    backdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
  qsa('[data-close]', backdrop).forEach(b => b.addEventListener('click', close));
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
  });

  /* ---------- відкриття ----------
     openLeadForm(slug)                  — бронювання конкретного курсу
     openLeadForm('', 'course_selection')— підбір курсу                */
  window.openLeadForm = (slug = '', type = 'course') => {
    form.reset();
    qsa('.invalid', form).forEach(el => el.classList.remove('invalid'));
    ['#bprFields', '#groupField', '#docNote'].forEach(s => qs(s).classList.add('hidden'));

    ctx = { course: findCourse(slug) || null, leadType: type, leadSent: false };
    const pick = qs('#fCoursePick'), card = qs('#fCourse');

    if (type === 'course_selection') {
      qs('#fTitle').textContent = 'Допоможемо підібрати курс';
      qs('.fstep__lead', form).textContent =
        'Залиште контакт — команда VSEODENT допоможе підібрати навчання за вашим напрямом, досвідом, містом та зручною датою.';
      qs('#leadBtn').textContent = 'Допоможіть підібрати курс';
      pick.classList.add('hidden'); card.classList.add('hidden');
    } else {
      qs('#fTitle').textContent = 'Забронюйте місце на курсі';
      qs('.fstep__lead', form).textContent =
        'Залиште контактні дані — команда VSEODENT зв’яжеться з вами для підтвердження участі.';
      qs('#leadBtn').textContent = 'Забронювати місце';

      if (ctx.course) {
        const dt = parseDate(ctx.course.date);
        qs('#fCourseTitle').textContent = ctx.course.title;
        qs('#fCourseMeta').textContent =
          `${dt.getDate()} ${MONTHS_GEN[dt.getMonth()]} • ${ctx.course.city}` +
          (ctx.course.price ? ` • ${formatPrice(ctx.course.price)}` : '');
        card.classList.remove('hidden'); pick.classList.add('hidden');
      } else {
        card.classList.add('hidden'); pick.classList.remove('hidden');
      }
    }

    backdrop.classList.add('open');
    document.body.classList.add('modal-open');
    show(1);
    trackEvent('InitiateCheckout', {
      content_name: ctx.course ? ctx.course.title : 'course_selection',
      content_ids: [ctx.course ? ctx.course.slug : 'none']
    });
  };
})();
