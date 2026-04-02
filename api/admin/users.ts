import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const payload = verifyToken(req.headers.authorization || null);
    if (!payload || payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const sql = getDb();
    const users = await sql`
      SELECT id, email, name, title, institution, role, created_at
      FROM users ORDER BY created_at DESC
    `;

    return res.status(200).json({ users });
  } catch (error: any) {
    console.error('[ADMIN USERS] Error:', error);
    return res.status(500).json({ error: 'Failed to list users' });
  }
}
