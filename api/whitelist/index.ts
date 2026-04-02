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
    const rows = await sql`SELECT id, email, added_at FROM whitelist ORDER BY added_at DESC`;

    return res.status(200).json({
      whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at }))
    });
  } catch (error: any) {
    console.error('[WHITELIST GET] Error:', error);
    return res.status(500).json({ error: 'Failed to get whitelist' });
  }
}
