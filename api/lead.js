/* ============================================================
   Приймає заявку і пересилає у Google-таблицю (Apps Script)
   або у будь-який інший webhook.

   На Vercel додайте environment variable LEAD_WEBHOOK_URL.

   Важливо: обидва кроки форми надсилають один і той самий lead_id.
   Скрипт таблиці має шукати рядок за lead_id і доповнювати його,
   а не створювати новий (див. README).
   ============================================================ */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return res.status(503).json({ error: 'LEAD_WEBHOOK_URL не налаштований' });

  const body = req.body || {};
  if (!body.phone && !body.email) return res.status(400).json({ error: 'Немає контакту' });
  if (!body.lead_id) return res.status(400).json({ error: 'Немає lead_id' });

  /* Необов'язковий секрет. Якщо задати LEAD_WEBHOOK_SECRET, він піде
     заголовком і n8n зможе відкидати чужі запити (Header Auth). */
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.LEAD_WEBHOOK_SECRET) {
    headers['X-Vseodent-Secret'] = process.env.LEAD_WEBHOOK_SECRET;
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...body,
        ip: req.headers['x-forwarded-for'] || '',
        ua: req.headers['user-agent'] || ''
      })
    });
    if (!r.ok) return res.status(502).json({ error: 'Webhook error', status: r.status });
    return res.status(200).json({ ok: true, lead_id: body.lead_id });
  } catch (e) {
    return res.status(500).json({ error: 'Lead delivery failed' });
  }
}
