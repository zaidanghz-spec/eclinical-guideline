module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    has_db: !!process.env.DATABASE_URL,
    has_jwt: !!process.env.JWT_SECRET,
    db_prefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'NOT SET',
    node_version: process.version,
  });
};
