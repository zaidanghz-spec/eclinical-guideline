const { getDb, verifyToken } = require('./_lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const payload = verifyToken(req.headers.authorization || null);
  if (!payload || payload.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const sql = getDb();
  const action = req.query.action;
  const body = req.body || {};

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;
      return res.status(200).json({ whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { email } = body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const normalizedEmail = email.toLowerCase().trim();

    if (action === 'add') {
      await sql`INSERT INTO whitelist (email, added_by) VALUES (${normalizedEmail}, ${payload.userId}) ON CONFLICT (email) DO NOTHING`;
      const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;
      return res.status(200).json({ message: 'Email added', whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    if (action === 'remove') {
      await sql`DELETE FROM whitelist WHERE email = ${normalizedEmail}`;
      const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;
      return res.status(200).json({ message: 'Email removed', whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('[WHITELIST ERROR]', error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
};
