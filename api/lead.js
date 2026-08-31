/* Приймає заявку з форми і пересилає у ваш webhook (n8n / Make / CRM).
   На Vercel додайте environment variable LEAD_WEBHOOK_URL. */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return res.status(503).json({ error: 'LEAD_WEBHOOK_URL не налаштований' });

  const body = req.body || {};
  if (!body.phone && !body.email) return res.status(400).json({ error: 'Немає контакту' });

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, ip: req.headers['x-forwarded-for'] || '', ua: req.headers['user-agent'] || '' })
    });
    if (!r.ok) return res.status(502).json({ error: 'Webhook error', status: r.status });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Lead delivery failed' });
  }
}
