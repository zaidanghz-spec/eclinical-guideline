const { query, verifyToken } = require('./_lib/db.cjs');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const payload = verifyToken(req.headers.authorization || null);
  if (!payload || payload.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const action = req.query.action;
  const body = req.body || {};

  try {
    if (req.method === 'GET') {
      const rows = await query('SELECT email, added_at FROM whitelist ORDER BY added_at DESC', []);
      return res.status(200).json({ whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { email } = body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const normalizedEmail = email.toLowerCase().trim();

    if (action === 'add') {
      await query('INSERT INTO whitelist (email, added_by) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', [normalizedEmail, payload.userId]);
      const rows = await query('SELECT email, added_at FROM whitelist ORDER BY added_at DESC', []);
      return res.status(200).json({ message: 'Email added', whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    if (action === 'remove') {
      await query('DELETE FROM whitelist WHERE email = $1', [normalizedEmail]);
      const rows = await query('SELECT email, added_at FROM whitelist ORDER BY added_at DESC', []);
      return res.status(200).json({ message: 'Email removed', whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('[WHITELIST ERROR]', error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
};
