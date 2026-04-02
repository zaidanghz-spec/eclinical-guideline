const bcrypt = require('bcryptjs');
const { query, verifyToken, createToken } = require('./_lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const action = req.query.action;

  try {
    // GET /api/auth?action=me
    if (req.method === 'GET' && action === 'me') {
      const payload = verifyToken(req.headers.authorization || null);
      if (!payload) return res.status(401).json({ error: 'Unauthorized' });

      const users = await query('SELECT id, email, name, title, institution, role FROM users WHERE id = $1', [payload.userId]);
      if (users.length === 0) return res.status(401).json({ error: 'User not found' });
      return res.status(200).json({ user: users[0] });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const body = req.body || {};

    // POST /api/auth?action=signup
    if (action === 'signup') {
      const { name, email, password, title, institution } = body;
      if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
      if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

      const normalizedEmail = email.toLowerCase().trim();

      const existing = await query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
      if (existing.length > 0) return res.status(400).json({ error: 'Email already registered' });

      const countResult = await query('SELECT COUNT(*) as count FROM users', []);
      const isFirstUser = parseInt(countResult[0].count) === 0;

      if (!isFirstUser) {
        const whitelisted = await query('SELECT id FROM whitelist WHERE email = $1', [normalizedEmail]);
        if (whitelisted.length === 0) {
          return res.status(403).json({ error: 'Email not authorized. Contact administrator to be added to whitelist.' });
        }
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const role = isFirstUser ? 'admin' : 'user';

      const result = await query(
        `INSERT INTO users (email, password_hash, name, title, institution, role)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email, name, title, institution, role, created_at`,
        [normalizedEmail, passwordHash, name, title || '', institution || '', role]
      );

      const user = result[0];
      const token = createToken(user.id, user.email, user.role);

      return res.status(200).json({
        message: isFirstUser ? 'Admin account created! You are the first user.' : 'Account created successfully.',
        access_token: token,
        user: { id: user.id, email: user.email, name: user.name, title: user.title, institution: user.institution, role: user.role }
      });
    }

    // POST /api/auth?action=signin
    if (action === 'signin') {
      const { email, password } = body;
      if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

      const normalizedEmail = email.toLowerCase().trim();
      const users = await query(
        'SELECT id, email, password_hash, name, title, institution, role FROM users WHERE email = $1',
        [normalizedEmail]
      );
      if (users.length === 0) return res.status(400).json({ error: 'Invalid email or password' });

      const user = users[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(400).json({ error: 'Invalid email or password' });

      const token = createToken(user.id, user.email, user.role);
      return res.status(200).json({
        access_token: token,
        user: { id: user.id, email: user.email, name: user.name, title: user.title, institution: user.institution, role: user.role }
      });
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error) {
    console.error('[AUTH ERROR]', error);
    return res.status(500).json({ error: 'Server error', detail: error.message, code: error.code });
  }
};
