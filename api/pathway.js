const { query, verifyToken, setCorsHeaders } = require('./_lib/db');

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  const payload = verifyToken(req.headers.authorization || null);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  const action = req.query.action;
  const body = req.body || {};

  // Fix #21: Jangan expose error.message ke client di production
  const isDev = process.env.NODE_ENV !== 'production';

  try {
    // GET - list sessions (hanya milik user yang login)
    if (req.method === 'GET') {
      const sessions = await query(
        'SELECT * FROM pathway_sessions WHERE user_id = $1 ORDER BY started_at DESC',
        [payload.userId]
      );
      return res.status(200).json({ sessions });
    }

    // PUT - update session (save draft)
    if (req.method === 'PUT' && action === 'update') {
      const { sessionId, checklist, notes, currentNodeId, pathwayHistory, decisions, variations, status } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

      // Collaborative: allow any user with valid token to update if session exists
      const existing = await query('SELECT id FROM pathway_sessions WHERE id = $1', [sessionId]);
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
        WHERE id = $8
        RETURNING *`,
        [
          checklist ? JSON.stringify(checklist) : null,
          notes ? JSON.stringify(notes) : null,
          currentNodeId || null,
          pathwayHistory ? JSON.stringify(pathwayHistory) : null,
          decisions ? JSON.stringify(decisions) : null,
          variations ? JSON.stringify(variations) : null,
          status || null,
          sessionId
        ]
      );
      return res.status(200).json({ session: result[0] });
    }

    // PUT - perawat lapor ke dokter
    if (req.method === 'PUT' && action === 'report') {
      const { sessionId, nurseNote } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });

      const result = await query(
        `UPDATE pathway_sessions SET
          consultation_status = 'waiting_doctor',
          nurse_note = COALESCE($1, nurse_note),
          reported_at = NOW(),
          updated_at = NOW()
        WHERE id = $2
        RETURNING *`,
        [nurseNote || null, sessionId]
      );
      if (result.length === 0) return res.status(404).json({ error: 'Session not found' });
      return res.status(200).json({ session: result[0] });
    }

    // PUT - dokter mengisi instruksi/resep
    if (req.method === 'PUT' && action === 'doctor-order') {
      const { sessionId, doctorOrders } = body;
      if (!sessionId || !doctorOrders) return res.status(400).json({ error: 'sessionId and doctorOrders are required' });

      const result = await query(
        `UPDATE pathway_sessions SET
          doctor_orders = $1::jsonb,
          consultation_status = 'doctor_responded',
          doctor_id = $2,
          updated_at = NOW()
        WHERE id = $3
        RETURNING *`,
        [JSON.stringify(doctorOrders), payload.userId, sessionId]
      );
      if (result.length === 0) return res.status(404).json({ error: 'Session not found' });
      return res.status(200).json({ session: result[0] });
    }

    // DELETE - delete session
    // Fix #3: Tambahkan user_id check agar hanya pemilik yang bisa delete
    if (req.method === 'DELETE') {
      const { sessionId } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
      const result = await query(
        'DELETE FROM pathway_sessions WHERE id = $1 AND user_id = $2 RETURNING id',
        [sessionId, payload.userId] // ← fix: tambah ownership check
      );
      if (result.length === 0) return res.status(404).json({ error: 'Session not found or not owned by you' });
      return res.status(200).json({ deleted: true, id: sessionId });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // POST - create session
    if (action === 'create') {
      const { diseaseId, diseaseName, patientCode } = body;
      if (!diseaseId || !diseaseName) return res.status(400).json({ error: 'diseaseId and diseaseName are required' });

      // Collaborative Resuming: if a session with this code exists and is in_progress, JOIN it
      if (patientCode && patientCode.trim()) {
        const trimmedCode = patientCode.trim();
        const existing = await query(
          "SELECT * FROM pathway_sessions WHERE disease_id = $1 AND patient_code = $2 AND status = 'in_progress' LIMIT 1",
          [diseaseId, trimmedCode]
        );
        if (existing.length > 0) {
          return res.status(200).json({ session: existing[0], resumed: true });
        }
      }

      const crypto = require('crypto');
      const newId = crypto.randomUUID();

      const result = await query(
        'INSERT INTO pathway_sessions (id, user_id, disease_id, disease_name, patient_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [newId, payload.userId, diseaseId, diseaseName, patientCode || '']
      );
      return res.status(200).json({ session: result[0] });
    }

    // POST - complete session
    if (action === 'complete') {
      const { sessionId } = body;
      if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
      const result = await query(
        `UPDATE pathway_sessions SET status = 'completed', completed_at = NOW(), updated_at = NOW()
         WHERE id = $1 RETURNING *`,
        [sessionId]
      );
      if (result.length === 0) return res.status(404).json({ error: 'Session not found' });
      return res.status(200).json({ session: result[0] });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('[PATHWAY ERROR]', error);
    // Fix #21: error.message hanya dikirim ke dev, production hanya generic message
    return res.status(500).json({
      error: 'Server error',
      detail: isDev ? error.message : undefined,
    });
  }
};
