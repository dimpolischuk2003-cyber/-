/* ============================================================
   VSEODENT — форма реєстрації
   3 кроки замість 11. Лід відправляється вже після кроку 2,
   тож контакт не втрачається, навіть якщо людина не дійшла до кінця.
   ============================================================ */
(function () {
  const { D, qs, qsa, MONTHS, parseDate, upcoming, findCourse,
          courseLabel, getAttribution, trackEvent } = window.V;

  const STEPS = ['Курс', 'Контакти', 'Деталі'];
  let step = 0;
  let partialSent = false;

  /* ---------- список курсів, згрупований по місяцях ---------- */
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

  /* ---------- розмітка модалки ---------- */
  const html = `
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="formTitle">
    <div class="modal__head">
      <b id="formTitle">Реєстрація на курс</b>
      <button class="modal__close" type="button" data-close aria-label="Закрити">×</button>
    </div>
    <div class="stepper" id="stepper">
      ${STEPS.map((s, i) => `<div class="stepper__item" data-step="${i}">${i + 1}. ${s}</div>`).join('')}
    </div>
    <form class="form-body" id="leadForm" novalidate>

      <!-- КРОК 1 -->
      <section class="form-step">
        <h3>Який курс вас цікавить?</h3>
        <p>Оберіть дату й місто. Змінити вибір можна будь-коли.</p>
        <div class="field" data-field="course">
          <label for="f-course">Курс, місто та дата</label>
          <select id="f-course" name="course" required>
            <option value="">— оберіть зі списку —</option>
            ${courseOptions()}
            <option value="undecided">Ще не визначився — потрібна порада</option>
          </select>
          <div class="err">Оберіть курс або варіант «ще не визначився»</div>
        </div>
        <div class="chosen hidden" id="chosenBox">
          <span>Ви обрали</span><b id="chosenTitle"></b><small id="chosenMeta"></small>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn--primary" data-next>Далі</button>
        </div>
      </section>

      <!-- КРОК 2 -->
      <section class="form-step">
        <h3>Як з вами звʼязатися?</h3>
        <p>Менеджер напише у Viber, підтвердить місце та надішле деталі оплати.</p>
        <div class="field" data-field="name">
          <label for="f-name">Прізвище та імʼя</label>
          <input id="f-name" name="fullnameUa" required autocomplete="name" placeholder="Іваненко Іван">
          <div class="err">Вкажіть прізвище та імʼя</div>
        </div>
        <div class="field" data-field="phone">
          <label for="f-phone">Телефон <span class="hint">— на цьому номері має бути Viber</span></label>
          <input id="f-phone" name="phone" type="tel" required autocomplete="tel" placeholder="+380 67 123 45 67">
          <div class="err">Вкажіть номер у форматі +380 XX XXX XX XX</div>
        </div>
        <div class="field" data-field="email">
          <label for="f-email">Email</label>
          <input id="f-email" name="email" type="email" required autocomplete="email" placeholder="name@gmail.com">
          <div class="err">Перевірте адресу — схоже, у ній помилка</div>
        </div>
        <div class="field" data-field="consent">
          <label class="consent">
            <input type="checkbox" name="consent" required>
            <span>Я даю згоду на обробку персональних даних та погоджуюся з політикою конфіденційності.</span>
          </label>
          <div class="err">Без згоди ми не можемо обробити заявку</div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn--ghost" data-back>Назад</button>
          <button type="button" class="btn btn--primary" data-next>Далі</button>
        </div>
      </section>

      <!-- КРОК 3 -->
      <section class="form-step">
        <h3>Останній крок</h3>
        <p>Ці дані потрібні для сертифіката та нарахування балів БПР.</p>

        <div class="field" data-field="status">
          <label>Ваш статус</label>
          <div class="options">
            <label class="option"><input type="radio" name="status" value="Лікар" required>
              <span><b>Лікар</b><span>Практикуючий стоматолог</span></span></label>
            <label class="option"><input type="radio" name="status" value="Інтерн">
              <span><b>Інтерн</b><span>Проходжу інтернатуру</span></span></label>
            <label class="option"><input type="radio" name="status" value="Студент">
              <span><b>Студент</b><span>Навчаюсь на стом. факультеті</span></span></label>
            <label class="option"><input type="radio" name="status" value="Група">
              <span><b>Група</b><span>Реєструю кількох людей</span></span></label>
          </div>
          <div class="err">Оберіть статус</div>
        </div>

        <div class="note hidden" id="docNote">
          <b>Потрібне підтвердження статусу</b>
          Надішліть у Viber фото одного з документів: студентський квиток, квиток інтерна,
          залікова книжка, довідка чи договір про інтернатуру або диплом спеціаліста.
        </div>

        <div class="field hidden" id="groupField" data-field="groupList">
          <label for="f-group">Учасники групи <span class="hint">— кожного з нового рядка</span></label>
          <textarea id="f-group" name="groupList" placeholder="Іваненко Іван Іванович&#10;Петренко Петро Петрович"></textarea>
          <div class="err">Впишіть учасників групи</div>
        </div>

        <div class="field" data-field="bpr">
          <label for="f-bpr">Чи потрібні вам бали БПР?</label>
          <select id="f-bpr" name="bpr" required>
            <option value="">— оберіть —</option>
            <option value="Так">Так, потрібні</option>
            <option value="Ні">Ні, не потрібні</option>
          </select>
          <div class="err">Оберіть відповідь</div>
        </div>

        <div id="bprFields" class="hidden">
          <div class="note">
            <b>Провайдер БПР: <span data-bpr></span></b>
            Дані нижче потрібні для сертифіката та передачі інформації до МОЗ України.
          </div>
          <div class="fields-2">
            <div class="field" data-field="fullnameEn">
              <label for="f-name-en">ПІБ англійською</label>
              <input id="f-name-en" name="fullnameEn" placeholder="Ivanenko Ivan">
              <div class="err">Заповніть латиницею, як у документах</div>
            </div>
            <div class="field" data-field="dob">
              <label for="f-dob">Дата народження</label>
              <input id="f-dob" name="dob" type="date">
              <div class="err">Вкажіть дату народження</div>
            </div>
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
          <div class="fields-2">
            <div class="field">
              <label for="f-work">Місце роботи або навчання <span class="hint">— необовʼязково</span></label>
              <input id="f-work" name="workplace" placeholder="Клініка, лікарня, університет">
            </div>
            <div class="field">
              <label for="f-pos">Посада або факультет <span class="hint">— необовʼязково</span></label>
              <input id="f-pos" name="position" placeholder="Лікар-стоматолог">
            </div>
          </div>
        </div>

        <div class="field">
          <label for="f-comment">Коментар <span class="hint">— необовʼязково</span></label>
          <textarea id="f-comment" name="comment" placeholder="Потрібен рахунок для клініки; хочу в одну групу з колегою; є питання щодо програми…"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn--ghost" data-back>Назад</button>
          <button type="submit" class="btn btn--primary" id="submitBtn">Надіслати заявку</button>
        </div>
      </section>

      <!-- УСПІХ -->
      <section class="form-step">
        <div class="success">
          <div class="success__ico">✓</div>
          <h3>Заявку прийнято</h3>
          <p id="successText">Менеджер VSEODENT звʼяжеться з вами у Viber протягом робочого дня —
             підтвердить місце та надішле деталі оплати.</p>
          <button type="button" class="btn btn--primary" data-close>Готово</button>
        </div>
      </section>
    </form>
  </div>`;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'leadModal';
  backdrop.innerHTML = html;
  document.body.appendChild(backdrop);

  const modal = qs('.modal', backdrop);
  const form = qs('#leadForm', backdrop);
  const steps = qsa('.form-step', form);
  const courseSel = qs('[name=course]', form);

  /* ---------- показ кроку ---------- */
  function show(i) {
    step = i;
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    qsa('.stepper__item', backdrop).forEach((el, idx) => {
      el.classList.toggle('current', idx === i);
      el.classList.toggle('done', idx < i);
    });
    modal.scrollTop = 0;
    backdrop.scrollTop = 0;
  }

  /* ---------- валідація ---------- */
  const setErr = (name, on, msg) => {
    const f = qs(`[data-field="${name}"]`, form);
    if (!f) return;
    f.classList.toggle('invalid', on);
    if (msg) qs('.err', f).textContent = msg;
  };

  const digits = s => (s.match(/\d/g) || []).length;

  function validate(i) {
    let ok = true;
    const fail = (name, msg) => { setErr(name, true, msg); ok = false; };

    if (i === 0) {
      if (!courseSel.value) fail('course'); else setErr('course', false);
    }

    if (i === 1) {
      const name = form.fullnameUa.value.trim();
      if (name.length < 3 || !name.includes(' '))
        fail('name', 'Вкажіть прізвище та імʼя'); else setErr('name', false);

      if (digits(form.phone.value) < 9) fail('phone'); else setErr('phone', false);

      if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(form.email.value.trim()))
        fail('email'); else setErr('email', false);

      if (!form.consent.checked) fail('consent'); else setErr('consent', false);
    }

    if (i === 2) {
      const status = qs('[name=status]:checked', form);
      if (!status) fail('status'); else setErr('status', false);

      if (status && status.value === 'Група') {
        if (form.groupList.value.trim().length < 4) fail('groupList'); else setErr('groupList', false);
      }

      if (!form.bpr.value) fail('bpr'); else setErr('bpr', false);

      if (form.bpr.value === 'Так') {
        if (form.fullnameEn.value.trim().length < 3) fail('fullnameEn'); else setErr('fullnameEn', false);
        if (!form.dob.value) fail('dob'); else setErr('dob', false);
        if (!form.education.value) fail('education'); else setErr('education', false);
        if (!form.specialty.value) fail('specialty'); else setErr('specialty', false);
      }
    }

    if (!ok) {
      const first = qs('.invalid', steps[i]);
      if (first) {
        first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = first.querySelector('input,select,textarea');
        if (input) setTimeout(() => input.focus({ preventScroll: true }), 260);
      }
    }
    return ok;
  }

  /* ---------- дані заявки ---------- */
  function payload(stage) {
    const data = Object.fromEntries(new FormData(form).entries());
    const c = findCourse(data.course);
    return Object.assign({
      stage,
      course_slug: c ? c.slug : (data.course || ''),
      course_name: c ? c.title : 'Ще не визначився',
      course_city: c ? c.city : '',
      course_date: c ? c.date : '',
      page_url: location.href,
      created_at: new Date().toISOString()
    }, data, getAttribution());
  }

  const isStatic = () => {
    const mode = D.site.demoMode;
    if (mode === true) return true;
    if (mode === false) return false;
    return location.protocol === 'file:' ||
           location.hostname.endsWith('github.io') ||
           location.hostname === 'localhost' ||
           location.hostname === '127.0.0.1';
  };

  /* у demo-режимі показуємо позначку, щоб заявку з прев'ю
     не переплутали зі справжньою */
  if (isStatic()) {
    const badge = document.createElement('div');
    badge.className = 'demo-badge';
    badge.textContent = 'Прев’ю · заявки не відправляються';
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(badge));
  }

  async function send(stage) {
    const body = payload(stage);
    if (isStatic()) {
      console.info('[VSEODENT · demo] Заявка не відправлена, ось її вміст:', body);
      return true;
    }
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return r.ok;
    } catch (e) {
      console.warn('Lead error', e, body);
      return false;
    }
  }

  /* ---------- реакція на вибір курсу ---------- */
  function updateChosen() {
    const box = qs('#chosenBox');
    const c = findCourse(courseSel.value);
    if (!c) { box.classList.add('hidden'); return; }
    const sp = D.speakers[c.speaker];
    qs('#chosenTitle').textContent = c.title;
    qs('#chosenMeta').textContent = `${c.date} · ${c.city} · ${sp.name}`;
    box.classList.remove('hidden');
  }
  courseSel.addEventListener('change', () => { updateChosen(); setErr('course', false); });

  /* ---------- умовні поля на кроці 3 ---------- */
  function updateStep3() {
    const status = qs('[name=status]:checked', form);
    const v = status ? status.value : '';
    qs('#docNote').classList.toggle('hidden', !(v === 'Студент' || v === 'Інтерн'));
    qs('#groupField').classList.toggle('hidden', v !== 'Група');
  }
  qsa('[name=status]', form).forEach(r =>
    r.addEventListener('change', () => { updateStep3(); setErr('status', false); }));

  form.bpr.addEventListener('change', () => {
    qs('#bprFields').classList.toggle('hidden', form.bpr.value !== 'Так');
    setErr('bpr', false);
  });

  /* прибираємо підсвітку помилки, щойно людина щось виправляє */
  form.addEventListener('input', e => {
    const f = e.target.closest('[data-field]');
    if (f) f.classList.remove('invalid');
  });

  /* ---------- навігація ---------- */
  qsa('[data-next]', form).forEach(b => b.addEventListener('click', async () => {
    if (!validate(step)) return;
    if (step === 1 && !partialSent) {
      partialSent = true;
      trackEvent('Lead', {
        content_name: payload('contact').course_name,
        content_category: payload('contact').course_city
      });
      send('contact');           /* лід уже зафіксовано */
    }
    show(step + 1);
  }));

  qsa('[data-back]', form).forEach(b => b.addEventListener('click', () => show(step - 1)));

  qsa('[data-close]', backdrop).forEach(b => b.addEventListener('click', close));
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
  });

  function close() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- відправка ---------- */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate(2)) return;
    const btn = qs('#submitBtn');
    btn.disabled = true;
    btn.textContent = 'Надсилаємо…';

    const ok = await send('complete');
    btn.disabled = false;
    btn.textContent = 'Надіслати заявку';

    if (!ok && !partialSent) {
      alert('Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Viber.');
      return;
    }
    trackEvent('CompleteRegistration', {
      content_name: payload('complete').course_name,
      content_category: payload('complete').course_city
    });
    const c = findCourse(courseSel.value);
    qs('#successText').textContent = c
      ? `Ми записали вас на «${c.title}» — ${c.date}, ${c.city}. Менеджер напише у Viber протягом робочого дня.`
      : 'Менеджер VSEODENT звʼяжеться з вами у Viber і допоможе обрати курс.';
    show(3);
  });

  /* ---------- відкриття ---------- */
  window.openLeadForm = (slug = '') => {
    form.reset();
    partialSent = false;
    qsa('.invalid', form).forEach(el => el.classList.remove('invalid'));
    qs('#bprFields').classList.add('hidden');
    qs('#groupField').classList.add('hidden');
    qs('#docNote').classList.add('hidden');

    if (slug && findCourse(slug)) {
      courseSel.value = slug;
      updateChosen();
      qs('#formTitle').textContent = findCourse(slug).title;
    } else {
      qs('#chosenBox').classList.add('hidden');
      qs('#formTitle').textContent = 'Реєстрація на курс';
    }

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    show(0);
    trackEvent('InitiateCheckout', { content_name: slug || 'course_catalog' });
  };
})();
