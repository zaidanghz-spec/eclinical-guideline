import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const payload = verifyToken(req.headers.authorization || null);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  const sql = getDb();
  const { action } = req.query;

  try {
    // GET /api/pathway — list sessions
    if (req.method === 'GET') {
      const sessions = await sql`SELECT * FROM pathway_sessions WHERE user_id = ${payload.userId} ORDER BY started_at DESC`;
      return res.status(200).json({ sessions });
    }

    // PUT /api/pathway?action=update
    if (req.method === 'PUT' && action === 'update') {
      const { sessionId, checklist, notes, currentNodeId, pathwayHistory, decisions, variations, status } = req.body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

      const existing = await sql`SELECT id FROM pathway_sessions WHERE id = ${sessionId} AND user_id = ${payload.userId}`;
      if (existing.length === 0) return res.status(404).json({ error: 'Session not found' });

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
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // POST /api/pathway?action=create
    if (action === 'create') {
      const { diseaseId, diseaseName, patientCode } = req.body;
      if (!diseaseId || !diseaseName) return res.status(400).json({ error: 'diseaseId and diseaseName are required' });

      const result = await sql`
        INSERT INTO pathway_sessions (user_id, disease_id, disease_name, patient_code)
        VALUES (${payload.userId}, ${diseaseId}, ${diseaseName}, ${patientCode || ''})
        RETURNING *
      `;
      return res.status(200).json({ session: result[0] });
    }

    // POST /api/pathway?action=complete
    if (action === 'complete') {
      const { sessionId } = req.body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

      const result = await sql`
        UPDATE pathway_sessions SET status = 'completed', completed_at = NOW(), updated_at = NOW()
        WHERE id = ${sessionId} AND user_id = ${payload.userId}
        RETURNING *
      `;
      if (result.length === 0) return res.status(404).json({ error: 'Session not found' });
      return res.status(200).json({ session: result[0] });
    }

    return res.status(400).json({ error: 'Invalid action. Use ?action=create|update|complete' });
  } catch (error: any) {
    console.error('[PATHWAY] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
