// Family-state sync. Persists to Upstash Redis (Vercel Marketplace) when
// UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN env vars exist.
// Without them it reports configured:false and clients stay device-local.
const R_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const R_TOK = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

async function cmd(arr) {
  const r = await fetch(R_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${R_TOK}`, 'content-type': 'application/json' },
    body: JSON.stringify(arr),
  });
  if (!r.ok) throw new Error('kv ' + r.status);
  return (await r.json()).result;
}

module.exports = async (req, res) => {
  res.setHeader('cache-control', 'no-store');
  const configured = !!(R_URL && R_TOK);

  if (req.method === 'GET') {
    const key = String(req.query.key || '');
    if (!key) return res.status(400).json({ error: 'key required' });
    if (!configured) return res.json({ configured: false });
    const raw = await cmd(['GET', 'rw:' + key]);
    if (!raw) return res.json({ configured: true, state: null, updatedAt: 0, log: [] });
    return res.json({ configured: true, ...JSON.parse(raw) });
  }

  if (req.method === 'POST') {
    const b = req.body || {};
    if (!b.key) return res.status(400).json({ error: 'key required' });
    if (!configured) return res.json({ configured: false });
    const doc = {
      state: b.state || null,
      log: Array.isArray(b.log) ? b.log.slice(0, 150) : [],
      updatedAt: Date.now(),
    };
    await cmd(['SET', 'rw:' + b.key, JSON.stringify(doc)]);
    return res.json({ configured: true, updatedAt: doc.updatedAt });
  }

  res.status(405).json({ error: 'method not allowed' });
};
