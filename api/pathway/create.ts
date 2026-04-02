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

    const { diseaseId, diseaseName, patientCode } = req.body;

    if (!diseaseId || !diseaseName) {
      return res.status(400).json({ error: 'diseaseId and diseaseName are required' });
    }

    const sql = getDb();
    const result = await sql`
      INSERT INTO pathway_sessions (user_id, disease_id, disease_name, patient_code)
      VALUES (${payload.userId}, ${diseaseId}, ${diseaseName}, ${patientCode || ''})
      RETURNING *
    `;

    return res.status(200).json({ session: result[0] });
  } catch (error: any) {
    console.error('[CREATE SESSION] Error:', error);
    return res.status(500).json({ error: 'Failed to create session' });
  }
}
