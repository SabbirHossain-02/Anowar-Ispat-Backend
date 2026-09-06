const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

const orNull = (v) => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s;
};

// লম্বা লেখা কেটে রাখা হয় — কেউ মেগাবাইট পাঠালে টেবিল ফুলে যেত
const clip = (v, max) => {
  const s = orNull(v);
  return s === null ? null : s.slice(0, max);
};

// কে পাঠাল বোঝার জন্য: পপ-আপ না কি Contact Form পাতা
const SOURCES = ['modal', 'form'];

router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY created_at DESC LIMIT 500'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not load messages' });
  }
});

// দর্শকের ফর্ম — এখানে টোকেন লাগে না
router.post('/', async (req, res) => {
  const name = clip(req.body.name, 120);
  const email = clip(req.body.email, 160);
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO messages (name, email, phone, subject, body, source)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        name,
        email,
        clip(req.body.phone, 40),
        clip(req.body.subject, 200),
        clip(req.body.body, 5000),
        SOURCES.includes(req.body.source) ? req.body.source : 'form',
      ]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Could not send the message' });
  }
});

// পড়া হয়েছে বলে চিহ্নিত করা
router.put('/:id/read', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE messages SET is_read = true WHERE id = $1 RETURNING id',
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not update the message' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete the message' });
  }
});

module.exports = router;
