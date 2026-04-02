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
    if (!payload) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const sql = getDb();
    const sessions = await sql`
      SELECT * FROM pathway_sessions 
      WHERE user_id = ${payload.userId}
      ORDER BY started_at DESC
    `;

    return res.status(200).json({ sessions });
  } catch (error: any) {
    console.error('[SESSIONS] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve sessions' });
  }
}
