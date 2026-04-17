const { query, verifyToken } = require('./_lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const payload = verifyToken(req.headers.authorization || null);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  const action = req.query.action;
  const body = req.body || {};

  try {
    // GET - list sessions
    if (req.method === 'GET') {
      const sessions = await query(
        'SELECT * FROM pathway_sessions WHERE user_id = $1 ORDER BY started_at DESC',
        [payload.userId]
      );
      return res.status(200).json({ sessions });
    }

    // PUT - update session
    if (req.method === 'PUT' && action === 'update') {
      const { sessionId, checklist, notes, currentNodeId, pathwayHistory, decisions, variations, status } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

      const existing = await query('SELECT id FROM pathway_sessions WHERE id = $1 AND user_id = $2', [sessionId, payload.userId]);
      if (existing.length === 0) return res.status(404).json({ error: 'Session not found' });

      const result = await query(
        `UPDATE pathway_sessions SET
          checklist = COALESCE($1::jsonb, checklist),
          notes = COALESCE($2::jsonb, notes),
          current_node_id = COALESCE($3, current_node_id),
          pathway_history = COALESCE($4::jsonb, pathway_history),
          decisions = COALESCE($5::jsonb, decisions),
          variations = COALESCE($6::jsonb, variations),
          status = COALESCE($7, status),
          updated_at = NOW()
        WHERE id = $8 AND user_id = $9
        RETURNING *`,
        [
          checklist ? JSON.stringify(checklist) : null,
          notes ? JSON.stringify(notes) : null,
          currentNodeId || null,
          pathwayHistory ? JSON.stringify(pathwayHistory) : null,
          decisions ? JSON.stringify(decisions) : null,
          variations ? JSON.stringify(variations) : null,
          status || null,
          sessionId,
          payload.userId
        ]
      );
      return res.status(200).json({ session: result[0] });
    }

    // DELETE - delete session
    if (req.method === 'DELETE') {
      const { sessionId } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
      const result = await query(
        'DELETE FROM pathway_sessions WHERE id = $1 AND user_id = $2 RETURNING id',
        [sessionId, payload.userId]
      );
      if (result.length === 0) return res.status(404).json({ error: 'Session not found or not authorized' });
      return res.status(200).json({ deleted: true, id: sessionId });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // POST - create session
    if (action === 'create') {
      const { diseaseId, diseaseName, patientCode } = body;
      if (!diseaseId || !diseaseName) return res.status(400).json({ error: 'diseaseId and diseaseName are required' });
      const result = await query(
        'INSERT INTO pathway_sessions (user_id, disease_id, disease_name, patient_code) VALUES ($1, $2, $3, $4) RETURNING *',
        [payload.userId, diseaseId, diseaseName, patientCode || '']
      );
      return res.status(200).json({ session: result[0] });
    }

    // POST - complete session
    if (action === 'complete') {
      const { sessionId } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
      const result = await query(
        `UPDATE pathway_sessions SET status = 'completed', completed_at = NOW(), updated_at = NOW()
         WHERE id = $1 AND user_id = $2 RETURNING *`,
        [sessionId, payload.userId]
      );
      if (result.length === 0) return res.status(404).json({ error: 'Session not found' });
      return res.status(200).json({ session: result[0] });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('[PATHWAY ERROR]', error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
};
