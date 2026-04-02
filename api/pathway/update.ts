import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const payload = verifyToken(req.headers.authorization || null);
    if (!payload) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { sessionId, checklist, notes, currentNodeId, pathwayHistory, decisions, variations, status } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const sql = getDb();

    // Verify ownership
    const existing = await sql`
      SELECT id FROM pathway_sessions WHERE id = ${sessionId} AND user_id = ${payload.userId}
    `;
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Build dynamic update
    const result = await sql`
      UPDATE pathway_sessions SET
        checklist = COALESCE(${JSON.stringify(checklist || null)}::jsonb, checklist),
        notes = COALESCE(${JSON.stringify(notes || null)}::jsonb, notes),
        current_node_id = COALESCE(${currentNodeId || null}, current_node_id),
        pathway_history = COALESCE(${JSON.stringify(pathwayHistory || null)}::jsonb, pathway_history),
        decisions = COALESCE(${JSON.stringify(decisions || null)}::jsonb, decisions),
        variations = COALESCE(${JSON.stringify(variations || null)}::jsonb, variations),
        status = COALESCE(${status || null}, status),
        updated_at = NOW()
      WHERE id = ${sessionId} AND user_id = ${payload.userId}
      RETURNING *
    `;

    return res.status(200).json({ session: result[0] });
  } catch (error: any) {
    console.error('[UPDATE SESSION] Error:', error);
    return res.status(500).json({ error: 'Failed to update session' });
  }
}
