const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

let pool;

function getPool() {
  if (!pool) {
    const connectionString = (process.env.DATABASE_URL || '')
      .replace('&channel_binding=require', '')
      .replace('?channel_binding=require&', '?')
      .replace('?channel_binding=require', '');

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 1,
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
