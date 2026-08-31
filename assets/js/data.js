/* ============================================================
   VSEODENT — ДАНІ САЙТУ
   Єдине джерело контенту. Правити тільки цей файл.

   ПРАВИЛО: якщо даних немає — залишайте поле порожнім ('' або []).
   Порожній блок просто не показується користувачеві.
   Нічого не вигадувати: ціни, бали БПР, адреси, час, регалії,
   відгуки, склад участі.
   ============================================================ */

window.VSEODENT_DATA = {

  /* --- 1. КОНТАКТИ ------------------------------------------ */
  site: {
    phone: '+380 67 000 00 00',                   // TODO
    phoneHref: 'tel:+380670000000',               // TODO
    viber: 'viber://chat?number=%2B380670000000', // TODO
    telegram: '',                                 // порожньо — кнопка ховається
    instagram: 'https://www.instagram.com/vseodent/',
    email: 'info@vseodent.com.ua',                // TODO
    bprProvider: '№2545 — ГО «АКАДЕМІЯ БЕЗПЕРЕРВНОЇ ОСВІТИ»',

    /* Demo-режим: форма не відправляє заявку, а пише її в консоль.
       'auto' — вмикається на github.io і localhost (рекомендовано)
       true / false — примусово */
    demoMode: 'auto'
  },

  /* --- 2. ТЕМИ ---------------------------------------------- */
  topics: {
    endo:        { label: 'Ендодонтія' },
    powerEndo:   { label: 'Power Endo' },
    complexEndo: { label: 'Складна ендодонтія' },
    retreatment: { label: 'Переліковування' },
    hygiene:     { label: 'Професійна гігієна' }
  },

  /* --- 3. СПІКЕРИ -------------------------------------------
     facts: 3–5 підтверджених фактів. Поки порожньо — блок не
     рендериться. НЕ вигадувати стаж, кількість пацієнтів, посади. */
  speakers: {
    noienko: {
      name: 'Ігор Ноєнко',
      image: 'assets/images/noienko.webp',
      role: 'Лікар-стоматолог • Ендодонтичний напрям',
      short: 'Лікар-стоматолог, ендодонтист',
      bio: 'Веде практичні курси VSEODENT з ендодонтії: сучасні протоколи первинного лікування, складна анатомія та повторне ендодонтичне лікування.',
      focus: ['Сучасні протоколи', 'Складна анатомія', 'Переліковування'],
      facts: []   // TODO: реальні факти від VSEODENT
    },
    fedak: {
      name: 'Володимир Федак',
      image: 'assets/images/fedak.webp',
      role: 'Лікар-стоматолог • Ендодонтичний напрям',
      short: 'Лікар-стоматолог, ендодонтист',
      bio: 'Автор практичного курсу Power Endo для лікарів, які хочуть працювати в ендодонтії швидше та за чіткою системою.',
      focus: ['Power Endo', 'Практичні протоколи'],
      facts: []
    },
    tarasovska: {
      name: 'Уляна Тарасовська',
      image: 'assets/images/tarasovska.webp',
      role: 'Лікар-стоматолог • Професійна гігієна',
      short: 'Лікар-стоматолог, гігієніст',
      bio: 'Автор курсу «Професійна гігієна від А до Я»: послідовний протокол роботи з пацієнтом, підбір інструментів і комунікація після процедури.',
      focus: ['Професійна гігієна', 'Протокол прийому'],
      facts: []
    }
  },

  /* --- 4. ШАБЛОНИ КУРСІВ ------------------------------------
     h1 / subtitle — тексти для Hero сторінки курсу.
     Якщо порожні, підставляється назва курсу й короткий опис. */
  templates: {

    primaryEndo: {
      eyebrow: 'Практичний курс з ендодонтії',
      format: 'Практичне навчання',
      h1: 'Від скаутингу до обтурації: сучасний протокол первинної ендодонтії',
      subtitle: 'За один курс систематизуйте весь алгоритм ендодонтичного лікування та відпрацюйте ключові етапи на практиці під керівництвом спікера.',
      summary: 'Повний протокол первинного ендодонтичного лікування: від аналізу анатомії та скаутингу до інструментальної обробки й обтурації.',

      outcomes: [
        { title: 'Працювати за послідовним протоколом',
          text: 'Систематизуєте весь алгоритм первинного ендодонтичного лікування — від первинного проходження до обтурації.' },
        { title: 'Впевненіше працювати з каналами',
          text: 'Розберете логіку скаутингу, створення килимової доріжки та подальшої інструментальної обробки.' },
        { title: 'Контролювати робочу довжину',
          text: 'Систематизуєте алгоритм визначення робочої довжини та контролю апікальної частини.' },
        { title: 'Працювати з сучасними інструментами',
          text: 'Розберете принципи роботи ротаційними та іншими інструментами, які використовуються під час ендодонтичного лікування.' },
        { title: 'Виконувати обтурацію',
          text: 'Розберете та відпрацюєте принципи обтурації кореневих каналів.' }
      ],
      outcomesNote: 'Не лише лекція — ключові етапи протоколу відпрацьовуються під час практичної частини.',

      audience: [
        { title: 'Лікарям-стоматологам',
          text: 'Які вже працюють з ендодонтичними пацієнтами та хочуть систематизувати свій протокол.' },
        { title: 'Лікарям на початку практики',
          text: 'Яким потрібен зрозумілий послідовний алгоритм роботи від доступу до обтурації.' },
        { title: 'Лікарям, які хочуть більше впевненості',
          text: 'У роботі з інструментами, визначенні робочої довжини, обробці та обтурації каналів.' },
        { title: 'Інтернам та студентам',
          text: 'Які хочуть опанувати послідовний алгоритм ендодонтичного лікування ще до початку самостійної практики.' }
      ],

      program: [
        { title: 'Анатомія кореневих каналів',        text: 'Як читати анатомію до початку лікування та планувати доступ.' },
        { title: 'Скаутинг і корональна модифікація', text: 'Первинне проходження каналу та підготовка гирлової третини.' },
        { title: 'Прохідність і робоча довжина',      text: 'Досягнення апексу, апекслокація, контроль робочої довжини.' },
        { title: 'Килимова доріжка',                  text: 'Формування glide path як умова безпечної роботи ротацією.' },
        { title: 'Інструментальна обробка',           text: 'Послідовність файлів, помилки та як їх уникнути.' },
        { title: 'Калібрування апікального отвору',   text: 'Вимірювання і підготовка апікальної ділянки до обтурації.' },
        { title: 'Обтурація та контроль результату',  text: 'Метод безперервної хвилі, оцінка якості пломбування.' }
      ],

      practice: 'Після теоретичного блоку учасники переходять до практичного відпрацювання ключових етапів ендодонтичного протоколу під контролем спікера.',
      bring: [
        '2–3 зуби середньої складності зі створеним ендодоступом',
        'Робочий халат',
        'Власні бінокуляри, якщо ви ними користуєтесь'
      ]
    },

    powerEndo: {
      eyebrow: 'Практичний курс з ендодонтії',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Курс для лікарів, які хочуть працювати в ендодонтії швидше, впевненіше та системніше — з фокусом на робочий протокол і прийняття рішень біля крісла.',
      outcomes: [], outcomesNote: '',
      audience: [], program: [],
      practice: '',
      bring: []
    },

    hygiene: {
      eyebrow: 'Практичний курс з професійної гігієни',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Професійна гігієна від А до Я: послідовний протокол роботи з пацієнтом, підбір інструментів і засобів, комунікація та рекомендації після процедури.',
      outcomes: [], outcomesNote: '',
      audience: [], program: [],
      practice: '',
      bring: []
    },

    complexEndo: {
      eyebrow: 'Поглиблений курс з ендодонтії',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Для лікарів, які вже працюють в ендодонтії та хочуть розібрати складні клінічні ситуації: ускладнену анатомію, ризики й рішення поза межами базового протоколу.',
      outcomes: [], outcomesNote: '',
      audience: [], program: [],
      practice: '',
      bring: []
    },

    retreatmentLecture: {
      eyebrow: 'Лекційний день',
      format: 'Теоретичне навчання',
      h1: '', subtitle: '',
      summary: 'Логіка повторного ендодонтичного лікування: діагностика, оцінка прогнозу та прийняття рішення — лікувати повторно, спостерігати чи видаляти.',
      outcomes: [], outcomesNote: '',
      audience: [], program: [],
      practice: '',
      bring: []
    },

    retreatmentMicro: {
      eyebrow: 'Практика з мікроскопом',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Практичний день повторного ендодонтичного лікування з фокусом на роботу під збільшенням і контроль найскладніших етапів.',
      outcomes: [], outcomesNote: '',
      audience: [], program: [],
      practice: '',
      bring: []
    }
  },

  /* --- 5. ГАЛЕРЕЯ «ЯК ПРОХОДИТЬ НАВЧАННЯ» -------------------
     Реальні фото VSEODENT з проведених курсів. Без стоку.
     Формат: { src: 'assets/images/gallery/01.webp', alt: '...' }
     Поки масив порожній — показується заглушка з підписами,
     які саме кадри потрібні. */
  gallery: [],

  /* --- 6. ВІДГУКИ -------------------------------------------
     Формат: { type: 'screenshot' | 'text' | 'video',
               src: 'assets/images/reviews/01.webp',
               name: '', city: '', text: '' }
     Поки порожньо — показується заглушка.
     Фейкові відгуки НЕ додавати. */
  reviews: [],

  /* --- 7. РОЗКЛАД -------------------------------------------
     bpr     — кількість балів БПР або null
     mozId   — № заходу в реєстрі МОЗ або ''
     pricing — вартість участі:
       changeDate — дата зміни ціни (РРРР-ММ-ДД) або null, якщо
                    вже діє поточна вартість
       layout     — 'two'  : Лекція + Повний курс
                    'one'  : один формат
       oneLabel   — підпис для layout:'one'
       early / now— { категорія: [лекція, повний] } або { категорія: [ціна] }
       Категорії: doctors, students, groups, participants
     НЕ вигадувати ціни. Якщо категорії немає в таблиці VSEODENT —
     не додавати її. */
  courses: [

    { slug:'endo-if-2026-09-12', date:'12.09.2026', city:'Івано-Франківськ',
      title:'Ендодонтія. Сучасні протоколи', topic:'endo', speaker:'noienko',
      template:'primaryEndo', bpr:21, mozId:'1031925', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:null, layout:'two',
        now:{ doctors:[6400,11800], students:[4900,9100], groups:[5900,11300] } } },

    { slug:'power-endo-ternopil-2026-09-26', date:'26.09.2026', city:'Тернопіль',
      title:'Power Endo', topic:'powerEndo', speaker:'fedak',
      template:'powerEndo', bpr:21, mozId:'1021360', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:null, layout:'two',
        now:{ doctors:[6400,10500], students:[4900,9000], groups:[5900,10000] } } },

    { slug:'hygiene-lviv-2026-09-27', date:'27.09.2026', city:'Львів',
      title:'Професійна гігієна від А до Я', topic:'hygiene', speaker:'tarasovska',
      template:'hygiene', bpr:18, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:null, layout:'one', oneLabel:'Курс',
        now:{ doctors:[6000], students:[5000], groups:[5700] } } },

    { slug:'endo-bila-tserkva-2026-10-03', date:'03.10.2026', city:'Біла Церква',
      title:'Ендодонтія. Сучасні протоколи', topic:'endo', speaker:'noienko',
      template:'primaryEndo', bpr:21, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-09-03', layout:'two',
        early:{ doctors:[5400,10800], students:[3900,8100], groups:[4900,10300] },
        now:  { doctors:[6400,11800], students:[4900,9100], groups:[5900,11300] } } },

    { slug:'endo-lviv-2026-10-17', date:'17.10.2026', city:'Львів',
      title:'Ендодонтія. Сучасні протоколи', topic:'endo', speaker:'noienko',
      template:'primaryEndo', bpr:21, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-09-17', layout:'two',
        early:{ doctors:[5400,10800], students:[3900,8100], groups:[4900,10300] },
        now:  { doctors:[6400,11800], students:[4900,9100], groups:[5900,11300] } } },

    { slug:'complex-endo-lviv-2026-10-18', date:'18.10.2026', city:'Львів',
      title:'Складна ендодонтія', topic:'complexEndo', speaker:'noienko',
      template:'complexEndo', bpr:21, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-09-18', layout:'one', oneLabel:'Курс',
        early:{ doctors:[13000], students:[9000], groups:[12000] },
        now:  { doctors:[14000], students:[10000], groups:[13000] } } },

    { slug:'power-endo-rivne-2026-10-24', date:'24.10.2026', city:'Рівне',
      title:'Power Endo', topic:'powerEndo', speaker:'fedak',
      template:'powerEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-09-24', layout:'two',
        early:{ doctors:[5400,9500], students:[3900,8000], groups:[4900,9000] },
        now:  { doctors:[6400,10500], students:[4900,9000], groups:[5900,10000] } } },

    { slug:'endo-kyiv-2026-11-14', date:'14.11.2026', city:'Київ',
      title:'Ендодонтія. Сучасні протоколи', topic:'endo', speaker:'noienko',
      template:'primaryEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-10-14', layout:'two',
        early:{ doctors:[5400,10800], students:[3900,8100], groups:[4900,10300] },
        now:  { doctors:[6400,11800], students:[4900,9100], groups:[5900,11300] } } },

    { slug:'complex-endo-kyiv-2026-11-15', date:'15.11.2026', city:'Київ',
      title:'Складна ендодонтія', topic:'complexEndo', speaker:'noienko',
      template:'complexEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-10-15', layout:'one', oneLabel:'Курс',
        early:{ doctors:[13000], students:[9000], groups:[12000] },
        now:  { doctors:[14000], students:[10000], groups:[13000] } } },

    { slug:'retreatment-lecture-kyiv-2026-11-28', date:'28.11.2026', city:'Київ',
      title:'Переліковування. Лекційний день', topic:'retreatment', speaker:'noienko',
      template:'retreatmentLecture', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-10-28', layout:'one', oneLabel:'Лекція',
        early:{ doctors:[5400], students:[3900], groups:[4900] },
        now:  { doctors:[6400], students:[4900], groups:[5900] } } },

    /* Для цього курсу VSEODENT підтвердив лише одну вартість.
       Окремих цін для студентів і груп немає — тому одна картка. */
    { slug:'retreatment-micro-kyiv-2026-11-29', date:'29.11.2026', city:'Київ',
      title:'Переліковування під мікроскопом', topic:'retreatment', speaker:'noienko',
      template:'retreatmentMicro', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-10-29', layout:'one', oneLabel:'Практичний курс',
        early:{ participants:[13500] },
        now:  { participants:[14500] } } },

    { slug:'power-endo-if-2026-12-05', date:'05.12.2026', city:'Івано-Франківськ',
      title:'Power Endo', topic:'powerEndo', speaker:'fedak',
      template:'powerEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-11-05', layout:'two',
        early:{ doctors:[5400,9500], students:[3900,8000], groups:[4900,9000] },
        now:  { doctors:[6400,10500], students:[4900,9000], groups:[5900,10000] } } },

    { slug:'endo-vinnytsia-2026-12-12', date:'12.12.2026', city:'Вінниця',
      title:'Ендодонтія. Сучасні протоколи', topic:'endo', speaker:'noienko',
      template:'primaryEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-11-12', layout:'two',
        early:{ doctors:[5400,10800], students:[3900,8100], groups:[4900,10300] },
        now:  { doctors:[6400,11800], students:[4900,9100], groups:[5900,11300] } } },

    { slug:'complex-endo-vinnytsia-2026-12-13', date:'13.12.2026', city:'Вінниця',
      title:'Складна ендодонтія', topic:'complexEndo', speaker:'noienko',
      template:'complexEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-11-13', layout:'one', oneLabel:'Курс',
        early:{ doctors:[13000], students:[9000], groups:[12000] },
        now:  { doctors:[14000], students:[10000], groups:[13000] } } }
  ],

  /* --- 7b. КАТЕГОРІЇ ВАРТОСТІ ------------------------------- */
  priceCategories: {
    doctors:      { label: 'Для лікарів', note: '' },
    students:     { label: 'Для студентів / інтернів',
                    note: 'Пільгова вартість діє після підтвердження статусу студента або інтерна.' },
    groups:       { label: 'Для груп від 3-х лікарів', note: '' },
    participants: { label: 'Для учасників', note: '' }
  },

  /* --- 8. FAQ ГОЛОВНОЇ -------------------------------------- */
  faq: [
    { q: 'Як відбувається реєстрація?',
      a: 'Залиште ім’я та номер телефону. Команда VSEODENT зв’яжеться з вами, підтвердить наявність місця та надасть наступні кроки для оформлення участі.' },
    { q: 'Я ще не визначився з курсом. Що робити?',
      a: 'Залиште контакт у блоці підбору курсу — команда VSEODENT допоможе обрати навчання за вашим напрямом, досвідом, містом та зручною датою.' },
    { q: 'Чи нараховуються бали БПР?',
      a: 'Заходи навчального центру VSEODENT передбачають нарахування балів БПР. Кількість балів для конкретного курсу уточнює команда VSEODENT під час підтвердження участі.' },
    { q: 'Чи можна зареєструвати кількох лікарів з клініки?',
      a: 'Так. Залиште заявку та вкажіть це під час підтвердження — команда VSEODENT зв’яжеться щодо оформлення участі групи.' }
  ],

  /* --- 9. FAQ СТОРІНКИ КУРСУ -------------------------------- */
  courseFaq: [
    { q: 'Чи буде на курсі практична частина?', from: 'practice' },
    { q: 'Що потрібно взяти з собою?',          from: 'bring' },
    { q: 'Чи нараховуються бали БПР?',          from: 'bpr' },
    { q: 'Як відбувається реєстрація?',
      a: 'Залиште ім’я та номер телефону. Команда VSEODENT зв’яжеться з вами, підтвердить наявність місця та надасть наступні кроки для оформлення участі.' }
  ]
};
