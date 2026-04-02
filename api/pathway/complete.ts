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
    if (!payload) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const sql = getDb();

    const result = await sql`
      UPDATE pathway_sessions SET
        status = 'completed',
        completed_at = NOW(),
        updated_at = NOW()
      WHERE id = ${sessionId} AND user_id = ${payload.userId}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    return res.status(200).json({ session: result[0] });
  } catch (error: any) {
    console.error('[COMPLETE SESSION] Error:', error);
    return res.status(500).json({ error: 'Failed to complete session' });
  }
}
