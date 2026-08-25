export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return res.status(503).json({ error: 'LEAD_WEBHOOK_URL is not configured' });
  try {
    const r = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req.body) });
    const text = await r.text();
    if (!r.ok) return res.status(502).json({ error: 'Webhook error', details: text.slice(0,500) });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Lead delivery failed' });
  }
}
