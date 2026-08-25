# VSEODENT Performance Site

GitHub Pages-ready preview + Vercel-ready production repository.

## Preview через GitHub Pages
Див. `GITHUB_PAGES.md`. Завантажте весь вміст папки у root repository та увімкніть Pages для `main / (root)`.

На `github.io` форма автоматично працює в demo-режимі без реальної відправки ліда.

## Production через Vercel
1. Import цього GitHub repository у Vercel.
2. Додайте environment variable `LEAD_WEBHOOK_URL`.
3. Значення — n8n/Make webhook для приймання заявок.
4. Deploy.

Форма передає курс, місто, дату, email, phone/Viber, дані курсанта, статус, БПР-поля, коментар, UTM та fbclid.

Meta Pixel helper вже закладений для `ViewContent`, `InitiateCheckout`, `Lead`; Pixel ID додаємо після отримання доступів.
