const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

let pool;

function getPool() {
  if (!pool) {
    const connectionString = (process.env.DATABASE_URL || '')
      .replace('&channel_binding=require', '')
      .replace('?channel_binding=require&', '?')
      .replace('?channel_binding=require', '');

    // Fix #19: SSL rejectUnauthorized only disabled in local dev
    // Fix #20: Pool size raised from 1 → 5 to handle concurrent nurse+doctor requests
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: true }
        : { rejectUnauthorized: false },
      max: parseInt(process.env.DB_POOL_MAX || '5', 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('[DB] Unexpected pool error:', err);
    });
  }
  return pool;
}

async function query(text, params) {
  const client = getPool();
  const result = await client.query(text, params);
  return result.rows;
}

function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(authHeader.substring(7), process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

function createToken(userId, email, role) {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

module.exports = { query, verifyToken, createToken };
