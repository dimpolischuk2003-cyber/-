# Як відкрити VSEODENT через GitHub Pages

1. Створіть новий GitHub repository.
2. Завантажте **весь вміст цієї папки** у корінь репозиторію. `index.html` має лежати прямо в root.
3. В GitHub відкрийте **Settings → Pages**.
4. У **Build and deployment** оберіть **Deploy from a branch**.
5. Branch: **main**, Folder: **/(root)** → **Save**.
6. Через 1–3 хвилини GitHub покаже адресу виду `https://USERNAME.github.io/REPOSITORY/`.

## На GitHub Pages працює
- головна сторінка;
- фільтри й картки курсів;
- детальна сторінка курсу;
- багатокрокова форма;
- адаптивна версія.

Форма на `github.io` працює у **demo-режимі**: UX можна пройти до кінця, але реальний лід не відправляється, бо GitHub Pages не має backend.

## Production через Vercel
Цей самий repository імпортуйте у Vercel. `/api/lead.js` почне відправляти заявки після додавання environment variable `LEAD_WEBHOOK_URL` з n8n/Make webhook.
