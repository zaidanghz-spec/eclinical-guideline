const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');

function getDb() {
  const url = (process.env.DATABASE_URL || '')
    .replace('&channel_binding=require', '')
    .replace('?channel_binding=require&', '?')
    .replace('?channel_binding=require', '');
  return neon(url);
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

module.exports = { getDb, verifyToken, createToken };
