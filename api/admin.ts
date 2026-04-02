import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const payload = verifyToken(req.headers.authorization || null);
  if (!payload || payload.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const sql = getDb();
  const { action } = req.query;

  try {
    // GET /api/admin — list users
    if (req.method === 'GET') {
      const users = await sql`SELECT id, email, name, title, institution, role, created_at FROM users ORDER BY created_at DESC`;
      return res.status(200).json({ users });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    if (userId === payload.userId) return res.status(400).json({ error: "You can't modify your own account" });

    // POST /api/admin?action=toggle-role
    if (action === 'toggle-role') {
      const users = await sql`SELECT id, role FROM users WHERE id = ${userId}`;
      if (users.length === 0) return res.status(404).json({ error: 'User not found' });

      const newRole = users[0].role === 'admin' ? 'user' : 'admin';
      await sql`UPDATE users SET role = ${newRole} WHERE id = ${userId}`;
      const updated = await sql`SELECT id, email, name, title, institution, role, created_at FROM users WHERE id = ${userId}`;
      return res.status(200).json({ user: updated[0] });
    }

    // POST /api/admin?action=delete-user
    if (action === 'delete-user') {
      await sql`DELETE FROM pathway_sessions WHERE user_id = ${userId}`;
      await sql`DELETE FROM users WHERE id = ${userId}`;
      return res.status(200).json({ message: 'User deleted' });
    }

    return res.status(400).json({ error: 'Invalid action. Use ?action=toggle-role|delete-user' });
  } catch (error: any) {
    console.error('[ADMIN] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
