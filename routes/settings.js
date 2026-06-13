const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

router.get('/theme', async (req, res) => {
  const result = await pool.query("SELECT value FROM settings WHERE key='default_theme'");
  res.json({ theme: result.rows[0]?.value || 'dark' });
});

router.post('/theme', auth, async (req, res) => {
  const { theme } = req.body;
  await pool.query("INSERT INTO settings (key,value) VALUES ('default_theme',$1) ON CONFLICT (key) DO UPDATE SET value=$1", [theme]);
  res.json({ success: true, theme });
});

module.exports = router;
