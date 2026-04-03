const { query, verifyToken } = require('./_lib/db');

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
      const users = await query('SELECT id, email, name, title, institution, role, created_at FROM users ORDER BY created_at DESC', []);
      return res.status(200).json({ users });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { userId } = body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    if (userId === payload.userId) return res.status(400).json({ error: "You can't modify your own account" });

    if (action === 'toggle-role') {
      const existing = await query('SELECT id, role FROM users WHERE id = $1', [userId]);
      if (existing.length === 0) return res.status(404).json({ error: 'User not found' });
      const newRole = existing[0].role === 'admin' ? 'user' : 'admin';
      await query('UPDATE users SET role = $1 WHERE id = $2', [newRole, userId]);
      const updated = await query('SELECT id, email, name, title, institution, role FROM users WHERE id = $1', [userId]);
      return res.status(200).json({ user: updated[0] });
    }

    if (action === 'delete-user') {
      await query('DELETE FROM pathway_sessions WHERE user_id = $1', [userId]);
      await query('DELETE FROM users WHERE id = $1', [userId]);
      return res.status(200).json({ message: 'User deleted' });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('[ADMIN ERROR]', error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
};
