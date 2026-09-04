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
    phone: '+38 068 926 06 09',                   // актуальний номер
    phoneHref: 'tel:+380689260609',               // актуальний номер
    viber: 'viber://chat?number=%2B380670000000', // TODO
    telegram: '',                                 // порожньо — кнопка ховається
    instagram: 'https://www.instagram.com/vseodent/',
    email: 'info@vseodent.com.ua',                // TODO
    bprProvider: '№2545 — ГО «АКАДЕМІЯ БЕЗПЕРЕРВНОЇ ОСВІТИ»',

    /* Куди відправляти лід після завершення реєстрації.
       Порожньо — залишити '' і перенаправлення не буде. */
    leadWebhook: '',   // TODO: URL веб-застосунку Google Apps Script

    /* Demo-режим: форма не відправляє заявку, а пише її в консоль.
       'auto' — вмикається на github.io і localhost (рекомендовано)
       true / false — примусово */
    demoMode: 'auto'
  },

  /* --- 1b. VIBER-ГРУПИ ---------------------------------------
     Взято з файлу «Реєстр посилання».
     viberGroups.byTemplate — група для курсу незалежно від міста.
     viberGroups.byCity — для курсів, де група своя в кожному місті.
     Після завершення реєстрації людину перекидає у відповідну групу. */
  viberGroups: {

    /* Первинне ендо Ноєнка — своя група в кожному місті */
    primaryEndo: {
      'Біла Церква':      'https://invite.viber.com/?g2=AQApP4Gr4Xt1xFbQ123XWLcnzBbiyUlaN1iWj97HAbzTQ8LeUlLXkqpnSEBug86L',
      'Вінниця':          'https://invite.viber.com/?g2=AQAoL9aiywfohFGakg9dxrua%2B1D1DxiBwoMUD4g5U4SXc1qz6jXYJ%2FARKG7iJQnb',
      'Дніпро':           'https://invite.viber.com/?g2=AQBScTMS28eQO1EbMttAxOurg4T5BOczu1L5qY1OFFKAf97OssysqAd%2FXh1K0r8J',
      'Житомир':          'https://invite.viber.com/?g2=AQB87nSqwc6y1VZGs0jSe9LlFVu1d2Mh16PmDIUJnTEWL3TLSDXab4p3cEV8E9%2Bx',
      'Івано-Франківськ': 'https://invite.viber.com/?g2=AQAqZ6w2IsLPolD1v6uBiv%2F8MzXxq5AXj5bYjf6LGn97v6%2BAplZUvOz5QjKacJae',
      'Київ':             'https://invite.viber.com/?g2=AQAWQB43BZ8Q61D3A0J9A9LTdXSgEjBTv5pYdiOPJqTUoewTZcVlVc%2FzX1nUUGMB',
      'Кременчук':        'https://invite.viber.com/?g2=AQBdromtbU%2F9xlHMt9Mz%2BgI%2FtjFy4Lqn5xUQZaenyfSEcx%2FbPcZSMs0YdUKpcW7Z',
      'Кропивницький':    'https://invite.viber.com/?g2=AQBbvXPrvL3qDVL7ZNFNCFuE03iF8zlkOTIV4k0AqV1GI%2BDhArgwIbGjyRfrOXD%2B',
      'Луцьк':            'https://invite.viber.com/?g2=AQBPDKquQICkX1EJGFog5twPwH2WKswWuQoYAgfkqN5SRM9t%2FiRXRXazSzb5KhzA',
      'Львів':            'https://invite.viber.com/?g2=AQAP5XB70ruJLlEv1M4CQrGqEPmW2IBQxjR5%2FHZ3StSNb3TGVBtRFKvt3goXO9vQ',
      'Одеса':            'https://invite.viber.com/?g2=AQAJy8N%2BVNXf4FDXaPH8t3mKnLWuJ%2F9sTQLmJOvJOhjgTxMeEdPmvYWafyFUe7Xk',
      'Полтава':          'https://invite.viber.com/?g2=AQASYYUUAEh%2B1FHKpzySsG%2FkRSrKZebcQGsT%2BS9zJ7zyH0smOTUNuJgc4eg%2FxfnT',
      'Рівне':            'https://invite.viber.com/?g2=AQBnRmr5LzhlmFDkPhUb2gCqQAuv5wZNzCJDLCMsXpKUygpnIBIB79sB8sBr17Gp',
      'Тернопіль':        'https://invite.viber.com/?g2=AQANsmOCeL%2BB%2BlFtWy4YB%2BHUUGDYrg58EzCIY1sWtl9cULXS%2B6RH8cgjRU0ULURE',
      'Ужгород':          'https://invite.viber.com/?g2=AQBPs5wMYEhVYlGp2qlbSvo64D4HCRCGYBHifznMeSQPqAdTBrOy3xlZLQBcPmlL',
      'Хмельницький':     'https://invite.viber.com/?g2=AQB6vzYpU7wBVVEmp1gzr%2Fjkrr7P6WsH2haPrgTER2cJBeQ%2FZuxkoe6xkUU7qcEf',
      'Черкаси':          'https://invite.viber.com/?g2=AQBLIB3w5laQqFZG%2BUhKwUShh%2BFx%2BlbkxwWi%2F%2FoksbLxQcsnuM9FhPXR6w%2F6pADd',
      'Чернівці':         'https://invite.viber.com/?g2=AQB%2Fi4i9k8Xx51L5NbelzI9o1kTznLxt4%2BlCZClGMJG2%2BY77VqtG8ov%2B5XbNXhFF'
    },

    /* Складне ендо — групи «профі» по містах */
    complexEndo: {
      'Вінниця':          'https://invite.viber.com/?g2=AQA7LUfqtuQu0FWInQzpOYhxvUPnUiLo0HMj8R%2Bl2Gy%2Fz2kpAd86O7WkIM0VXlyx',
      'Івано-Франківськ': 'https://invite.viber.com/?g2=AQA6J3A8aTvGuFU5ykwhXf4zrk5kdkEVvvFv6akUr%2F3HugGRnUJitMRHEbIGOhLt',
      'Київ':             'https://invite.viber.com/?g2=AQBRgaUMztRKwVTnklqflIa6BBZAbWjNLicfRLwmUnmmsXlC7qyYRWR7IeKB3e7f',
      'Дніпро':           'https://invite.viber.com/?g2=AQBZZBBgpbZcelUYltPrJoJSsfWr0LkHgXepOqoOzvlyhVJhoO54VJT9nOT15Xzj',
      'Кропивницький':    'https://invite.viber.com/?g2=AQAlJBiU%2Bk04T1W8zljD5k0DqSgR8FQbPr%2BoNY%2BTFZRhp5wwUGoz6u6GRoRoJ%2FYv',
      'Кременчук':        'https://invite.viber.com/?g2=AQBFZnJwkbHn0laYzGS0syYh6P1YKgEiH4yPMoFa%2FMGIytadIeT0DlCd4Tg9tx5v',
      'Луцьк':            'https://invite.viber.com/?g2=AQBo3kPTsQRHFVXmf38ZSf1Phtxvu25TiyDTF4VI6rrv0qCehaTO8Q5f%2B%2FwavdBk',
      'Львів':            'https://invite.viber.com/?g2=AQBvMbhrAFBBpVTnlCO%2BW2nKdjKDVizTD%2BL7AQ%2Bg%2FGbvgXxw3bS5sd9ki1nFhhsO',
      'Одеса':            'https://invite.viber.com/?g2=AQBgtj0wIZuIFFUYl%2BpW5DKyVeRVLuBE8%2BHcEe%2Fox5oF%2BxErPvtwyGK%2BQgSLTotW',
      'Полтава':          'https://invite.viber.com/?g2=AQBSTILcexakEVWInX8IzAvSaRS2o0D54xe0diKVI7VcHQ%2BdyWlkqexEbdno',
      'Хмельницький':     'https://invite.viber.com/?g2=AQAsPdZjomkFQFZG%2B4EfcAGspHxkghsxwCwxf992k9QKtcfz1hoTX5sipTuugPQg',
      'Чернівці':         'https://invite.viber.com/?g2=AQA15Z71CdU23VWInILUruJ%2BWFRxtZMaSaJP0yzUYzbRzFSucc7IsTFZFah1klC1'
    },

    /* Курси з однією спільною групою */
    byTemplate: {
      powerEndo:          'https://invite.viber.com/?g2=AQBdromtbU%2F9xlHMt9Mz%2BgI%2FtjFy4Lqn5xUQZaenyfSEcx%2FbPcZSMs0YdUKpcW7Z',
      retreatmentLecture: 'https://invite.viber.com/?g2=AQBA7slmEcXqZFHMqMebO5LJf3%2FhX09Ne9U1Jk3Rdl0aeSeH4Yg%2BKwK9tETF%2FDYC',
      retreatmentMicro:   'https://invite.viber.com/?g2=AQBIgWG%2FZ4MOK1HKkW7Kcxad%2FWVnK3fqrwcKhdFcR%2B8S913oxpsfYwZ0zUSZfqZ4',
      hygiene:            'https://invite.viber.com/?g2=AQBpgCThjdm67FcORF27kTDxaov2h4SvMN4zAjN4CFX5eLCRxc0dHJwgEF4ud99%2F'
    }
  },

  /* --- 2. ТЕМИ ---------------------------------------------- */
  topics: {
    endo:        { label: 'Ендодонтія' },
    powerEndo:   { label: 'Endo Power' },
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
      image: 'assets/images/noienko-1.webp',
      /* друге фото використовується на частині курсів — див. photoAlt у courses */
      imageAlt: 'assets/images/noienko-2.webp',
      role: 'Лікар-ендодонтист • Стаж 25 років',
      short: 'Лікар-ендодонтист, стаж 25 років',
      bio: 'Лікар-ендодонтист зі стажем 25 років. Має спеціалізації з терапевтичної, ортопедичної та дитячої стоматології. Головний лікар клініки «Інодент».',
      focus: ['Сучасні протоколи', 'Складна анатомія', 'Переліковування'],
      facts: [
        { title: '25 років',            text: 'стаж клінічної практики' },
        { title: 'Клініка «Інодент»',   text: 'головний лікар' },
        { title: 'Міжнародний лектор',  text: 'виступає на профільних заходах' },
        { title: 'Два журнали',         text: 'науковий редактор міжнародних стоматологічних видань' },
        { title: 'Книга з ендодонтії',  text: 'співавтор першої української книжки з теми', url: 'http://endobooks.com.ua' },
        { title: 'Понад 20 статей',     text: 'у міжнародних наукових журналах' }
      ]
    },
    tarasovska: {
      name: 'Уляна Тарасовська',
      image: 'assets/images/tarasovska.webp',
      role: 'Лікар-пародонтолог • Професійна гігієна',
      short: 'Лікар-пародонтолог',
      bio: 'Лікар-пародонтолог, член УАПО та ITI. Автор навчальних курсів для студентів.',
      focus: ['Професійна гігієна', 'Пародонтологія'],
      facts: [
        { title: 'Член УАПО та ITI',   text: 'професійні спільноти' },
        { title: 'Навчання студентів', text: 'автор навчальних курсів' },
        { title: 'Наукова робота',     text: 'співавтор статей і проєктів New Dental Generation, Perio Power Duo' }
      ]
    },
    fedak: {
      name: 'Володимир Федак',
      image: 'assets/images/fedak.webp',
      role: 'Лікар-стоматолог • Ендодонтичний напрям',
      short: 'Лікар-стоматолог, ендодонтист',
      bio: 'Лікар-стоматолог, терапевт. Автор навчальних курсів з ендодонтії «Endo Power».',
      focus: ['Endo Power', 'Практичні протоколи'],
      facts: [
        { title: 'Автор «Endo Power»', text: 'навчальні курси з ендодонтії' },
        { title: 'Голова осередку',    text: 'Чернівецький осередок Всеукраїнської Спілки Ендодонтистів' },
        { title: 'Наукові публікації', text: 'автор і співавтор наукових статей' }
      ]
    },
  },

  /* --- 4. ШАБЛОНИ КУРСІВ ------------------------------------
     h1 / subtitle — тексти для Hero сторінки курсу.
     Якщо порожні, підставляється назва курсу й короткий опис.

     program  — { theory: [], practice: [] }. Порожній масив означає,
                що відповідного заголовка на сторінці не буде.
     schedule — розклад дня: [{ time, title }]. Немає — картки немає.
     practice (рядок нижче) — ОПИС того, як проходить практика,
                для окремої нижньої секції. Не плутати з program.practice. */
  templates: {

    primaryEndo: {
      media: {
        videos: [
          { src:'assets/videos/primaryEndo-01.mp4', poster:'assets/images/posters/primaryEndo-01.webp' },
          { src:'assets/videos/primaryEndo-02.mp4', poster:'assets/images/posters/primaryEndo-02.webp' },
          { src:'assets/videos/primaryEndo-03.mp4', poster:'assets/images/posters/primaryEndo-03.webp' }
        ],
        photos: [
          'assets/images/course/primaryEndo-01.webp',
          'assets/images/course/primaryEndo-02.webp',
          'assets/images/course/primaryEndo-03.webp',
          'assets/images/course/primaryEndo-04.webp'
        ]
      },
      transform: {
        beforeTitle: 'Є знання, але немає єдиного протоколу',
        before: [
          'важко зрозуміти послідовність дій у каналі',
          'велика кількість файлів та систем тільки додає плутанини',
          'є страх сепарації інструмента',
          'складна анатомія змушує працювати менш впевнено',
          'визначення робочої довжини та апікальний контроль викликають питання',
          'обтурація часто сприймається як окремий складний етап'
        ],
        afterTitle: 'Послідовний алгоритм від скаутингу до обтурації',
        after: [
          'розумієте, що і в якій послідовності робити',
          'орієнтуєтесь у логіці вибору інструментів',
          'впевненіше працюєте ручними та ротаційними системами',
          'розумієте підхід до типової та складнішої анатомії',
          'систематизуєте роботу з робочою довжиною та апікальною частиною',
          'проходите весь протокол до фінальної обтурації'
        ],
        note: 'Не більше інструментів — більше розуміння, навіщо і коли використовувати кожен етап протоколу.'
      },
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


      program: {
        theory: [
          'Аналіз анатомії кореневих каналів.',
          'Скаутинг кореневих каналів.',
          'Корональна модифікація.',
          'Досягнення прохідності.',
          'Визначення робочої довжини.',
          'Створення килимової доріжки.',
          'Інструментальна обробка кореневих каналів.',
          'Калібрування апікального отвору.',
          'Обтурація кореневих каналів.'
        ],
        practice: [
          'Фіксація зубів у моделі.',
          'Робота ручними інструментами.',
          'Робота ротаційними файлами.',
          'Стандартний та ускладнений протоколи.',
          'Обтурація методом вертикальної конденсації.'
        ]
      },
      schedule: [
        { time: '09:30', title: 'Реєстрація' },
        { time: '10:00', title: 'Теоретична частина' },
        { time: '13:00', title: 'Обід' },
        { time: '14:00–15:30', title: 'Теоретична частина' },
        { time: '15:30–16:00', title: 'Кава-пауза' },
        { time: '16:00–19:00', title: 'Практична частина' }
      ],
      practice: 'Після теоретичного блоку учасники переходять до практичного відпрацювання ключових етапів ендодонтичного протоколу під контролем спікера.',
      bring: [
        '2–3 зуби середньої складності зі створеним ендодоступом',
        'Робочий халат',
        'Власні бінокуляри, якщо ви ними користуєтесь'
      ]
    },

    powerEndo: {
      media: {
        videos: [
          { src:'assets/videos/powerEndo-01.mp4', poster:'assets/images/posters/powerEndo-01.webp' },
          { src:'assets/videos/powerEndo-02.mp4', poster:'assets/images/posters/powerEndo-02.webp' },
          { src:'assets/videos/powerEndo-03.mp4', poster:'assets/images/posters/powerEndo-03.webp' }
        ],
        photos: [
          'assets/images/course/powerEndo-01.webp',
          'assets/images/course/powerEndo-02.webp',
          'assets/images/course/powerEndo-03.webp',
          'assets/images/course/powerEndo-04.webp'
        ]
      },
      transform: {
        beforeTitle: 'Складний випадок — багато невизначеності',
        before: [
          'не завжди зрозуміло, коли випадок варто брати в роботу',
          'складно прогнозувати, де виникне проблема',
          'є сумніви у виборі інструментів і послідовності роботи',
          'у нестандартній анатомії стандартний алгоритм перестає працювати',
          'помилка на одному етапі ускладнює весь подальший протокол',
          'складно відрізнити «технічно можливо» від «клінічно доцільно»'
        ],
        afterTitle: 'Складний випадок стає послідовністю рішень',
        after: [
          'спочатку аналізуєте клінічну ситуацію',
          'розумієте логіку подальшої тактики',
          'системніше обираєте інструментарій',
          'адаптуєте протокол під конкретну анатомію',
          'краще контролюєте ризики під час роботи',
          'приймаєте рішення на основі клінічної ситуації, а не методом спроб'
        ],
        note: 'Мета — не просто виконати маніпуляцію, а розуміти клінічну логіку кожного рішення.'
      },
      eyebrow: 'Практичний курс з ендодонтії',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Курс для лікарів, які хочуть працювати в ендодонтії швидше, впевненіше та системніше — з фокусом на робочий протокол і прийняття рішень біля крісла.',
      outcomes: [
        { title: 'Планувати ендодонтичне лікування',
          text: 'Систематизуєте діагностику, оцінку анатомії кореневих каналів і послідовність дій до початку роботи.' },
        { title: 'Обирати інструменти та протокол',
          text: 'Розберете вибір інструментів і сучасних протоколів обробки залежно від клінічної ситуації.' },
        { title: 'Контролювати робочу довжину та обробку',
          text: 'Відпрацюєте визначення робочої довжини й інструментальну обробку каналів різної анатомічної складності.' },
        { title: 'Працювати з іригацією та обтурацією',
          text: 'Систематизуєте протоколи іригації, підбір і калібрування майстер-штифта та принципи обтурації.' },
        { title: 'Відпрацювати протокол практично',
          text: 'Кожен учасник працює щонайменше на двох підготовлених зубах під час практичної частини.' }
      ],
      outcomesNote: 'Ключові етапи протоколу не лише розбираються теоретично, а й відпрацьовуються під час практичної частини.',
      audience: [
        { title: 'Лікарям-стоматологам',
          text: 'Які вже працюють з ендодонтичними пацієнтами та хочуть зробити свій протокол більш послідовним і системним.' },
        { title: 'Лікарям на початку ендодонтичної практики',
          text: 'Яким потрібен зрозумілий алгоритм від діагностики та доступу до обтурації кореневих каналів.' },
        { title: 'Лікарям, які хочуть більше практики',
          text: 'Щоб відпрацювати проходження каналів, робочу довжину, інструментальну обробку та обтурацію на підготовлених зубах.' },
        { title: 'Студентам та інтернам',
          text: 'Які хочуть систематизувати сучасний ендодонтичний протокол і відпрацювати його ключові етапи.' }
      ],
      program: {
        theory: [
          'Анатомія кореневих каналів та її особливості.',
          'Діагностика і планування ендодонтичного лікування.',
          'Вибір інструментів та сучасних протоколів обробки.',
          'Іригація кореневих каналів: розчини та протоколи.',
          'Підбір майстер-штифта та принципи обтурації.',
          'Аналіз клінічних випадків і типових помилок.'
        ],
        practice: [
          'Створення ендодонтичного доступу на підготовлених зубах.',
          'Проходження кореневих каналів різної анатомічної складності.',
          'Визначення робочої довжини.',
          'Інструментальна обробка кореневих каналів.',
          'Підбір і калібрування майстер-штифта.',
          'Обтурація каналів методом вертикальної конденсації гутаперчі.',
          'Індивідуальна робота кожного учасника на щонайменше двох зубах.'
        ]
      },
      schedule: [
        { time: '09:00', title: 'Реєстрація' },
        { time: '09:30–13:00', title: 'Теоретична частина' },
        { time: '13:00', title: 'Обід' },
        { time: '14:00–15:30', title: 'Теоретична частина' },
        { time: '15:30–16:00', title: 'Кава-пауза' },
        { time: '16:00–19:00', title: 'Практична частина' }
      ],
      practice: '',
      bring: []
    },


    hygiene: {
      media: {
        videos: [
          { src:'assets/videos/course-01.mp4', poster:'assets/images/posters/course-01.webp' },
          { src:'assets/videos/course-02.mp4', poster:'assets/images/posters/course-02.webp' },
          { src:'assets/videos/course-03.mp4', poster:'assets/images/posters/course-03.webp' },
          { src:'assets/videos/course-04.mp4', poster:'assets/images/posters/course-04.webp' }
        ],
        photos: []
      },
      transform: {
        beforeTitle: 'Профгігієна як набір окремих маніпуляцій',
        before: [
          'однакова схема для різних клінічних ситуацій',
          'незрозуміло, коли і який інструмент використовувати',
          'складно побудувати послідовність процедури',
          'робота ручними інструментами займає багато часу',
          'важко пояснити пацієнту домашній догляд так, щоб він реально його дотримувався',
          'немає впевненості у роботі зі складнішими пародонтологічними ситуаціями'
        ],
        afterTitle: 'Профгігієна як керований клінічний протокол',
        after: [
          'оцінюєте стан пацієнта до процедури',
          'підбираєте інструменти під клінічну ситуацію',
          'вибудовуєте логічну послідовність професійної гігієни',
          'впевненіше працюєте ультразвуком і ручними інструментами',
          'краще формуєте рекомендації для домашнього догляду',
          'переводите разову процедуру у системну профілактику'
        ],
        note: 'Не просто провести чистку — побудувати зрозумілий протокол від оцінки стану до рекомендацій пацієнту.'
      },
      eyebrow: 'Практичний курс з професійної гігієни',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Комплексна професійна гігієна від А до Я: послідовний протокол роботи з пацієнтом, підбір інструментів і засобів, комунікація та рекомендації після процедури.',
      outcomes: [
        { title: 'Проводити PSR-скринінг',
          text: 'Відпрацюєте базове пародонтальне обстеження, PSR-скринінг і заповнення карти.' },
        { title: 'Підбирати інструменти та матеріали',
          text: 'Систематизуєте вибір набору інструментів і матеріалів для професійної гігієни.' },
        { title: 'Працювати ультразвуком та air-flow',
          text: 'Відпрацюєте адаптацію насадок і роботу у важкодоступних зонах.' },
        { title: 'Виконувати сучасне полірування',
          text: 'Відпрацюєте полірування та роботу ручними інструментами в межах повного гігієнічного прийому.' },
        { title: 'Адаптувати протокол під різні конструкції',
          text: 'Розберете особливості професійної гігієни у пацієнтів з брекетами, коронками та імплантами.' }
      ],
      outcomesNote: 'Практична частина включає повний гігієнічний прийом на фантомах із брекетами, коронками та імплантами.',
      audience: [
        { title: 'Лікарям-стоматологам та гігієністам',
          text: 'Які проводять професійну гігієну та хочуть систематизувати послідовність прийому.' },
        { title: 'Тим, хто хоче впевненіше працювати з інструментами',
          text: 'Ультразвуком, air-flow, ручними інструментами та сучасними засобами полірування.' },
        { title: 'Тим, хто працює зі складнішими клінічними ситуаціями',
          text: 'Зокрема з пацієнтами з брекетами, коронками та імплантами.' },
        { title: 'Студентам та інтернам',
          text: 'Які хочуть відпрацювати повний алгоритм професійної гігієни на практиці.' }
      ],
      program: {
        theory: [
          'Базове пародонтальне обстеження та PSR-скринінг',
          'Вибір інструментів і матеріалів для професійної гігієни',
          'Ультразвукова технологія та повітряно-абразивна обробка',
          'Сучасне полірування та робота ручними інструментами',
          'Особливості роботи з брекетами, коронками та імплантами'
        ],
        practice: [
          'Проведення PSR-скринінгу та заповнення карти',
          'Складання індивідуального набору інструментів і матеріалів',
          'Відпрацювання ультразвуку та air-flow (адаптація насадок, робота у важкодоступних зонах)',
          'Полірування та робота ручними інструментами',
          'Повний гігієнічний прийом на фантомах (з брекетами, коронками, імплантами)'
        ]
      },
      schedule: [
        { time: '09:50', title: 'Реєстрація' },
        { time: '10:00', title: 'Теоретична частина' },
        { time: '13:00', title: 'Обід' },
        { time: '14:00–15:30', title: 'Теоретична частина' },
        { time: '15:30–16:00', title: 'Кава-пауза' },
        { time: '16:00–18:00', title: 'Практична частина' }
      ],
      practice: '',
      bring: []
    },

    complexEndo: {
      media: {
        videos: [
          { src:'assets/videos/complexEndo-01.mp4', poster:'assets/images/posters/complexEndo-01.webp' },
          { src:'assets/videos/complexEndo-02.mp4', poster:'assets/images/posters/complexEndo-02.webp' },
          { src:'assets/videos/complexEndo-03.mp4', poster:'assets/images/posters/complexEndo-03.webp' }
        ],
        photos: [
          'assets/images/course/complexEndo-01.webp',
          'assets/images/course/complexEndo-02.webp',
          'assets/images/course/complexEndo-03.webp',
          'assets/images/course/complexEndo-04.webp'
        ]
      },
      transform: {
        beforeTitle: 'Коли стандартний протокол перестає працювати',
        before: [
          'складна анатомія різко збільшує невизначеність',
          'важко передбачити ризик ще до початку лікування',
          'не завжди зрозуміло, як змінювати стандартний протокол',
          'у складному каналі легше створити додаткову проблему',
          'доводиться багато рішень приймати вже «по ходу»',
          'складно визначити межу між доцільним лікуванням та надмірним ризиком'
        ],
        afterTitle: 'Складний кейс починається з аналізу, а не з інструмента',
        after: [
          'оцінюєте складність до початку роботи',
          'визначаєте потенційні ризики',
          'адаптуєте алгоритм під конкретну анатомію',
          'розумієте, де стандартний протокол потрібно змінити',
          'краще контролюєте складні етапи лікування',
          'приймаєте більш прогнозовані клінічні рішення'
        ],
        note: 'Складний випадок не стає простим. Але ваші рішення стають значно більш системними.'
      },
      eyebrow: 'Поглиблений курс з ендодонтії',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Для лікарів, які вже працюють в ендодонтії та хочуть розібрати складні клінічні ситуації: ускладнену анатомію, ризики й рішення поза межами базового протоколу.',
      outcomes: [], outcomesNote: '',
      audience: [],
      program: {
        theory: [
          'Оцінка складності клінічного випадку та анатомії кореневих каналів.',
          'Вибір інструментів, технік і послідовності роботи.',
          'Сучасні протоколи інструментальної обробки та обтурації складних каналів.'
        ],
        practice: [
          'Створення ендодонтичного доступу та проходження складних кореневих каналів різної складності.',
          'Робота на прозорих і непрозорих фантомах із відпрацюванням тактильного контролю.',
          'Інструментальна обробка прямих, зігнутих та MB2-каналів сучасними системами.',
          'Підбір майстер-штифта, калібрування та обтурація кореневих каналів.',
          'Робота з портативним ендомотором і повним набором ендодонтичних інструментів.',
          'Індивідуальний супровід викладача та розбір кожного клінічного етапу.'
        ]
      },
      schedule: [
        { time: '09:45', title: 'Реєстрація' },
        { time: '10:00–12:00', title: 'Теоретична частина' },
        { time: '12:00–13:00', title: 'Практична частина' },
        { time: '13:00', title: 'Обід' },
        { time: '14:00–17:00', title: 'Практична частина' }
      ],
      practice: '',
      bring: []
    },

    retreatmentLecture: {
      media: {
        videos: [
          { src:'assets/videos/course-01.mp4', poster:'assets/images/posters/course-01.webp' },
          { src:'assets/videos/course-02.mp4', poster:'assets/images/posters/course-02.webp' },
          { src:'assets/videos/course-03.mp4', poster:'assets/images/posters/course-03.webp' },
          { src:'assets/videos/course-04.mp4', poster:'assets/images/posters/course-04.webp' }
        ],
        photos: []
      },
      transform: {
        beforeTitle: 'Бачите невдале первинне лікування — і виникає більше питань, ніж відповідей',
        before: [
          'чи потрібно взагалі переліковувати цей зуб',
          'який прогноз',
          'як оцінити причину попередньої невдачі',
          'що робити зі штифтом або вкладкою',
          'як працювати з уже обтурованими каналами',
          'що робити зі сходинкою, перфорацією або сепарованим інструментом',
          'коли консервативне переліковування вже не є оптимальною тактикою'
        ],
        afterTitle: 'Переліковування починається з діагностики та прогнозу',
        after: [
          'аналізуєте причину невдачі',
          'оцінюєте доцільність повторного лікування',
          'вибудовуєте послідовність переліковування',
          'розумієте логіку роботи зі старими матеріалами та конструкціями',
          'систематизуєте підхід до ускладнень',
          'можете аргументовано визначати подальшу клінічну тактику'
        ],
        note: 'Головне питання вже не «як розпломбувати?», а «чи потрібно це робити і яким шляхом отримати прогнозований результат?»'
      },
      eyebrow: 'Лекційний день',
      format: 'Теоретичне навчання',
      h1: '', subtitle: '',
      summary: 'Логіка повторного ендодонтичного лікування: діагностика, оцінка прогнозу та прийняття рішення — лікувати повторно, спостерігати чи видаляти.',
      outcomes: [], outcomesNote: '',
      audience: [],
      program: {
        theory: [
          'Причини невдач ендодонтичного лікування та сучасний погляд на їх виникнення.',
          'Intrarradicular та Extraradicular infection.',
          'Гранульома стороннього тіла та її клінічне значення.',
          'Переліковування чи апікальна хірургія: сучасні підходи до вибору тактики лікування.',
          'Сучасна класифікація перфорацій кореня, прогноз та методи лікування.',
          'Матеріали для лікування перфорацій: IRM, Super EBA, MTA (ProRoot, MTA Angelus).',
          'Протоколи видалення штифтів, вкладок, сепарованих інструментів і розпломбування кореневих каналів.',
          'Пошук і проходження каналів MB2 та MB3: анатомічні особливості та клінічні рекомендації.',
          'Сучасні методики обтурації кореневих каналів.',
          'Біль після ендодонтичного лікування: норма чи ускладнення?'
        ],
        practice: []
      },
      schedule: [
        { time: '09:30', title: 'Реєстрація' },
        { time: '10:00–13:00', title: 'Теоретична частина' },
        { time: '13:00', title: 'Обід' },
        { time: '14:00–16:30', title: 'Теоретична частина' }
      ],
      practice: '',
      bring: []
    },

    retreatmentMicro: {
      media: {
        videos: [
          { src:'assets/videos/retreatmentMicro-01.mp4', poster:'assets/images/posters/retreatmentMicro-01.webp' },
          { src:'assets/videos/retreatmentMicro-02.mp4', poster:'assets/images/posters/retreatmentMicro-02.webp' },
          { src:'assets/videos/retreatmentMicro-03.mp4', poster:'assets/images/posters/retreatmentMicro-03.webp' }
        ],
        photos: [
          'assets/images/course/retreatmentMicro-01.webp',
          'assets/images/course/retreatmentMicro-02.webp',
          'assets/images/course/retreatmentMicro-03.webp'
        ]
      },
      transform: {
        beforeTitle: 'Ви знаєте, що потрібно зробити — але технічно випадок залишається складним',
        before: [
          'обмежена видимість ускладнює контроль',
          'важко працювати зі старими матеріалами у каналі',
          'вилучення штифтів і конструкцій створює ризик додаткового пошкодження',
          'сепарований інструмент змінює весь план лікування',
          'сходинки та перфорації потребують дуже точних дій',
          'у складному кейсі важко контролювати кожен етап'
        ],
        afterTitle: 'Більше візуального та мануального контролю',
        after: [
          'системніше працюєте під збільшенням',
          'краще орієнтуєтесь у складній внутрішній анатомії',
          'відпрацьовуєте підхід до дезобтурації',
          'розбираєте роботу зі штифтами та іншими конструкціями',
          'систематизуєте підхід до сепарованих інструментів та інших ускладнень',
          'переносите алгоритм із теорії у практичну роботу'
        ],
        note: ''
      },
      eyebrow: 'Практика з мікроскопом',
      format: 'Практичне навчання',
      h1: '', subtitle: '',
      summary: 'Практичний день повторного ендодонтичного лікування з фокусом на роботу під збільшенням і контроль найскладніших етапів.',
      outcomes: [], outcomesNote: '',
      audience: [],
      program: {
        theory: [],
        practice: [
          'Робота під операційним мікроскопом та правильне позиціонування.',
          'Вилучення сепарованих інструментів із кореневих каналів.',
          'Розпломбування кореневих каналів різними методиками.',
          'Закриття перфорацій сучасними матеріалами.',
          'Усунення сходинок та відновлення прохідності кореневих каналів.',
          'Повторне проходження, підготовка та обтурація кореневих каналів.',
          'Індивідуальний розбір клінічних випадків і відпрацювання технік під контролем лектора.'
        ]
      },
      schedule: [
        { time: '09:55', title: 'Реєстрація' },
        { time: '10:00–13:00', title: 'Практична частина' },
        { time: '13:00', title: 'Обід' },
        { time: '14:00–16:30', title: 'Практична частина' }
      ],
      practice: '',
      bring: []
    }
  },

  /* --- 4b. БЛОК «ДО / ПІСЛЯ» ДЛЯ ГОЛОВНОЇ ------------------- */
  transformHome: {
    beforeTitle: 'Знання є. Системи не вистачає.',
    before: [
      'дивились вебінари та окремі лекції, але знання залишилися фрагментами',
      'знаєте декілька різних протоколів і не завжди розумієте, який обрати',
      'складніший клінічний випадок змушує сумніватися у наступному кроці',
      'новий інструмент або техніка не означає впевненості у роботі',
      'теорія часто залишається теорією без практичного відпрацювання'
    ],
    afterTitle: 'Знання перетворюються на алгоритм.',
    after: [
      'розумієте послідовність клінічних дій',
      'бачите логіку вибору інструментів і технік',
      'можете адаптувати протокол до конкретної ситуації',
      'відпрацьовуєте частину навичок практично',
      'повертаєтесь у клініку не тільки з конспектом, а зі зрозумілою системою дій'
    ],
    note: ''
  },

  /* --- 4c. МЕДІА ДЛЯ ГОЛОВНОЇ -------------------------------
     По одному найсильнішому ролику з кожного напряму. */
  homeMedia: {
    videos: [
      { src:'assets/videos/primaryEndo-01.mp4',      poster:'assets/images/posters/primaryEndo-01.webp',      caption:'Первинна ендодонтія' },
      { src:'assets/videos/powerEndo-01.mp4',        poster:'assets/images/posters/powerEndo-01.webp',        caption:'Endo Power' },
      { src:'assets/videos/complexEndo-01.mp4',      poster:'assets/images/posters/complexEndo-01.webp',      caption:'Складна ендодонтія' },
      { src:'assets/videos/retreatmentMicro-01.mp4', poster:'assets/images/posters/retreatmentMicro-01.webp', caption:'Робота під мікроскопом' }
    ],
    photos: [
      'assets/images/course/primaryEndo-01.webp',
      'assets/images/course/powerEndo-01.webp',
      'assets/images/course/complexEndo-01.webp',
      'assets/images/course/retreatmentMicro-01.webp'
    ]
  },

  /* --- 5. ВІДЕО З КУРСІВ --------------------------------------
     Реальні фрагменти з практичних курсів VSEODENT.
     Вертикальні 9:16. Підпис — тільки якщо він очевидний зі змісту.
     home: true — відео потрапляє і на головну (там показуємо три). */
  videos: [
    { src:'assets/videos/course-01.mp4', poster:'assets/images/posters/course-01.webp',
      caption:'Практична робота',          home:true  },
    { src:'assets/videos/course-03.mp4', poster:'assets/images/posters/course-03.webp',
      caption:'Навчання під мікроскопом',  home:true  },
    { src:'assets/videos/course-04.mp4', poster:'assets/images/posters/course-04.webp',
      caption:'Робота учасників',          home:true  },
    { src:'assets/videos/course-02.mp4', poster:'assets/images/posters/course-02.webp',
      caption:'Атмосфера курсу',           home:false }
  ],

  /* --- 6. ВІДГУКИ -------------------------------------------
     Скриншоти реальних відгуків учасників курсів VSEODENT. */
  reviews: [
    { type:'screenshot', src:'assets/images/reviews/01.webp' },
    { type:'screenshot', src:'assets/images/reviews/02.webp' },
    { type:'screenshot', src:'assets/images/reviews/03.webp' },
    { type:'screenshot', src:'assets/images/reviews/04.webp' },
    { type:'screenshot', src:'assets/images/reviews/05.webp' },
    { type:'screenshot', src:'assets/images/reviews/06.webp' },
    { type:'screenshot', src:'assets/images/reviews/07.webp' },
    { type:'screenshot', src:'assets/images/reviews/08.webp' },
    { type:'screenshot', src:'assets/images/reviews/09.webp' },
    { type:'screenshot', src:'assets/images/reviews/10.webp' },
    { type:'screenshot', src:'assets/images/reviews/11.webp' },
    { type:'screenshot', src:'assets/images/reviews/12.webp' },
    { type:'screenshot', src:'assets/images/reviews/13.webp' },
    { type:'screenshot', src:'assets/images/reviews/14.webp' },
    { type:'screenshot', src:'assets/images/reviews/15.webp' }
  ],

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

    { slug:'endo-if-2026-09-12', photoAlt:true, date:'12.09.2026', city:'Івано-Франківськ',
      title:'Ендодонтія. Сучасні протоколи', topic:'endo', speaker:'noienko',
      template:'primaryEndo', bpr:21, mozId:'1031925', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:null, layout:'two',
        now:{ doctors:[6400,11800], students:[4900,9100], groups:[5900,11300] } } },

    { slug:'power-endo-ternopil-2026-09-26', date:'26.09.2026', city:'Тернопіль',
      title:'Endo Power', topic:'powerEndo', speaker:'fedak',
      template:'powerEndo', bpr:21, mozId:'1021360', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:null, layout:'two',
        now:{ doctors:[6400,10500], students:[4900,9000], groups:[5900,10000] } } },

    { slug:'endo-bila-tserkva-2026-10-03', photoAlt:true, date:'03.10.2026', city:'Біла Церква',
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

    { slug:'hygiene-lviv-2026-10-18', date:'18.10.2026', city:'Львів',
      title:'Комплексна професійна гігієна: Технології, інструменти, алгоритми',
      topic:'hygiene', speaker:'tarasovska', template:'hygiene',
      bpr:18, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:null, layout:'one', oneLabel:'Курс',
        now:{ doctors:[6000], students:[5000], groups:[5700] } } },
    { slug:'complex-endo-lviv-2026-10-18', photoAlt:true, date:'18.10.2026', city:'Львів',
      title:'Складна ендодонтія', topic:'complexEndo', speaker:'noienko',
      template:'complexEndo', bpr:21, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-09-18', layout:'one', oneLabel:'Курс',
        early:{ doctors:[13000], students:[9000], groups:[12000] },
        now:  { doctors:[14000], students:[10000], groups:[13000] } } },

    { slug:'power-endo-rivne-2026-10-24', date:'24.10.2026', city:'Рівне',
      title:'Endo Power', topic:'powerEndo', speaker:'fedak',
      template:'powerEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-09-24', layout:'two',
        early:{ doctors:[5400,9500], students:[3900,8000], groups:[4900,9000] },
        now:  { doctors:[6400,10500], students:[4900,9000], groups:[5900,10000] } } },

    { slug:'endo-kyiv-2026-11-14', photoAlt:true, date:'14.11.2026', city:'Київ',
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

    { slug:'retreatment-lecture-kyiv-2026-11-28', photoAlt:true, date:'28.11.2026', city:'Київ',
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
      title:'Endo Power', topic:'powerEndo', speaker:'fedak',
      template:'powerEndo', bpr:null, mozId:'', address:'', time:'', seats:null, includes:[],
      pricing:{ changeDate:'2026-11-05', layout:'two',
        early:{ doctors:[5400,9500], students:[3900,8000], groups:[4900,9000] },
        now:  { doctors:[6400,10500], students:[4900,9000], groups:[5900,10000] } } },

    { slug:'endo-vinnytsia-2026-12-12', photoAlt:true, date:'12.12.2026', city:'Вінниця',
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
