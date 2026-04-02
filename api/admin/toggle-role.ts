import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const payload = verifyToken(req.headers.authorization || null);
    if (!payload || payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Can't change own role
    if (userId === payload.userId) {
      return res.status(400).json({ error: "You can't change your own role" });
    }

    const sql = getDb();

    // Get current role
    const users = await sql`SELECT id, role FROM users WHERE id = ${userId}`;
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newRole = users[0].role === 'admin' ? 'user' : 'admin';
    await sql`UPDATE users SET role = ${newRole} WHERE id = ${userId}`;

    const updated = await sql`
      SELECT id, email, name, title, institution, role, created_at
      FROM users WHERE id = ${userId}
    `;

    return res.status(200).json({ user: updated[0] });
  } catch (error: any) {
    console.error('[TOGGLE ROLE] Error:', error);
    return res.status(500).json({ error: 'Failed to toggle role' });
  }
}
