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

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const sql = getDb();
    const normalizedEmail = email.toLowerCase().trim();

    await sql`DELETE FROM whitelist WHERE email = ${normalizedEmail}`;

    // Return updated list
    const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;

    return res.status(200).json({
      message: 'Email removed from whitelist',
      whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at }))
    });
  } catch (error: any) {
    console.error('[WHITELIST REMOVE] Error:', error);
    return res.status(500).json({ error: 'Failed to remove email' });
  }
}
