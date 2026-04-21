const { createClient } = require('@libsql/client');
const jwt = require('jsonwebtoken');

let client;

function getClient() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

async function query(text, params) {
  // Translate Postgres dialect to SQLite minimally
  let sql = text.replace(/\$(\d+)/g, '?$1');
  sql = sql.replace(/::[a-zA-Z]+/g, '');
  sql = sql.replace(/NOW\(\)/gi, "datetime('now')");

  // Basic Postgres RETURNING polyfill handled naturally by Turso for standard INSERT/UPDATE/DELETE. 
  const turso = getClient();
  
  try {
    const result = await turso.execute({ sql, args: params || [] });
    // In libsql, row values are returned natively, so we just return the array format
    return result.rows;
  } catch (err) {
    console.error('[DB EXECUTOR ERROR] Query:', sql);
    console.error('Args:', params);
    throw err;
  }
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

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim());

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS[0]);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = { query, verifyToken, createToken, setCorsHeaders };
