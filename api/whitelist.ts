import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from './_lib/db';

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
    // GET /api/whitelist — list all
    if (req.method === 'GET') {
      const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;
      return res.status(200).json({ whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const normalizedEmail = email.toLowerCase().trim();

    // POST /api/whitelist?action=add
    if (action === 'add') {
      const existing = await sql`SELECT id FROM whitelist WHERE email = ${normalizedEmail}`;
      if (existing.length === 0) {
        await sql`INSERT INTO whitelist (email, added_by) VALUES (${normalizedEmail}, ${payload.userId})`;
      }
      const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;
      return res.status(200).json({ message: 'Email added', whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    // POST /api/whitelist?action=remove
    if (action === 'remove') {
      await sql`DELETE FROM whitelist WHERE email = ${normalizedEmail}`;
      const rows = await sql`SELECT email, added_at FROM whitelist ORDER BY added_at DESC`;
      return res.status(200).json({ message: 'Email removed', whitelist: rows.map(r => ({ email: r.email, addedAt: r.added_at })) });
    }

    return res.status(400).json({ error: 'Invalid action. Use ?action=add|remove' });
  } catch (error: any) {
    console.error('[WHITELIST] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
