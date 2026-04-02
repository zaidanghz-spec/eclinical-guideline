import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, createToken, corsHeaders } from '../db';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, password, title, institution } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const sql = getDb();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${normalizedEmail}`;
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if this is the first user (auto-admin)
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    const isFirstUser = parseInt(userCount[0].count) === 0;

    // If not first user, check whitelist
    if (!isFirstUser) {
      const whitelisted = await sql`SELECT id FROM whitelist WHERE email = ${normalizedEmail}`;
      if (whitelisted.length === 0) {
        return res.status(403).json({
          error: 'Email not authorized. Please contact administrator to add your email to the whitelist.'
        });
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Determine role
    const role = isFirstUser ? 'admin' : 'user';

    // Insert user
    const result = await sql`
      INSERT INTO users (email, password_hash, name, title, institution, role)
      VALUES (${normalizedEmail}, ${passwordHash}, ${name}, ${title || ''}, ${institution || ''}, ${role})
      RETURNING id, email, name, title, institution, role, created_at
    `;

    const user = result[0];

    // Generate JWT
    const token = createToken(user.id, user.email, user.role);

    return res.status(200).json({
      message: isFirstUser
        ? 'Admin account created successfully! You are the first user.'
        : 'Account created successfully. You can now sign in.',
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
    console.error('[SIGNUP] Error:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}
