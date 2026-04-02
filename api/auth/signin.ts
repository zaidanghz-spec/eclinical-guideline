import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, createToken } from '../db';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = getDb();
    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const users = await sql`
      SELECT id, email, password_hash, name, title, institution, role
      FROM users WHERE email = ${normalizedEmail}
    `;

    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = createToken(user.id, user.email, user.role);

    return res.status(200).json({
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        title: user.title,
        institution: user.institution,
        role: user.role,
      }
    });
  } catch (error: any) {
    console.error('[SIGNIN] Error:', error);
    return res.status(500).json({ error: 'Failed to sign in' });
  }
}
