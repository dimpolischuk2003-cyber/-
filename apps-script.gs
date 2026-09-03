/* ============================================================
   Google Apps Script для таблиці лідів VSEODENT
   Встановлення:
   1. Створіть Google-таблицю, перший аркуш назвіть «Ліди».
   2. Розширення → Apps Script → вставте цей код.
   3. Розгорнути → Новий розгорнутий ресурс → Веб-застосунок:
      Виконувати від імені: я
      Хто має доступ: усі
   4. Скопіюйте URL і покладіть його у Vercel → LEAD_WEBHOOK_URL.

   Логіка: перший крок створює рядок, другий крок знаходить його
   за lead_id і доповнює. Новий рядок не створюється.
   ============================================================ */

var HEADERS = [
  'lead_id', 'Створено', 'Статус', 'Курс', 'Місто', 'Дата курсу',
  'Ім’я', 'Телефон', 'Email',
  'ПІБ українською', 'ПІБ англійською', 'Дата народження', 'Статус учасника',
  'Бали БПР', 'Освіта', 'Спеціальність', 'Місце роботи', 'Посада',
  'Група', 'Коментар', 'Viber-група',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'Сторінка'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ліди')
          || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Ліди');

    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var row = [
      d.lead_id || '',
      new Date(),
      d.stage === 'registration' ? 'Реєстрація завершена' : 'Тільки контакти',
      d.course_name || '', d.course_city || '', d.course_date || '',
      d.name || '', d.phone || '', d.email || '',
      d.fullnameUa || '', d.fullnameEn || '', d.dob || '', d.status || '',
      d.bpr || '', d.education || '', d.specialty || '',
      d.workplace || '', d.position || '',
      d.groupList || '', d.comment || '', d.viber_group || '',
      d.utm_source || '', d.utm_medium || '', d.utm_campaign || '',
      d.utm_content || '', d.utm_term || '', d.page_url || ''
    ];

    /* шукаємо існуючий рядок за lead_id */
    var ids = sh.getLastRow() > 1
      ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues()
      : [];
    var found = 0;
    for (var i = 0; i < ids.length; i++) {
      if (ids[i][0] && ids[i][0] === d.lead_id) { found = i + 2; break; }
    }

    if (found) {
      var old = sh.getRange(found, 1, 1, HEADERS.length).getValues()[0];
      /* порожні поля другого кроку не затирають те, що вже є */
      for (var k = 0; k < row.length; k++) {
        if (row[k] === '' && old[k] !== '') row[k] = old[k];
      }
      row[1] = old[1];                       // дата створення лишається початкова
      sh.getRange(found, 1, 1, HEADERS.length).setValues([row]);
    } else {
      sh.appendRow(row);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
