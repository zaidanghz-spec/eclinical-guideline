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

    if (userId === payload.userId) {
      return res.status(400).json({ error: "You can't delete your own account" });
    }

    const sql = getDb();

    // Delete pathway sessions first (cascade), then user
    await sql`DELETE FROM pathway_sessions WHERE user_id = ${userId}`;
    await sql`DELETE FROM users WHERE id = ${userId}`;

    return res.status(200).json({ message: 'User deleted' });
  } catch (error: any) {
    console.error('[DELETE USER] Error:', error);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
}
