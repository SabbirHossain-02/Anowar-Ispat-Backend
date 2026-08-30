const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

// ফর্মের ফাঁকা ঘর যেন খালি স্ট্রিং না হয়ে NULL হয়ে যায় — নইলে
// ফ্রন্টএন্ডে "Location: " বসে থাকে, কিছু না দেখিয়েও জায়গা নেয়
const orNull = (v) => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s;
};

const FIELDS = ['title', 'department', 'location', 'employment_type',
  'experience', 'education', 'description', 'deadline'];

const valuesFrom = (body) => FIELDS.map((f) => orNull(body[f]));

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs WHERE is_active = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not load jobs' });
  }
});

router.post('/', auth, async (req, res) => {
  if (!orNull(req.body.title)) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO jobs (${FIELDS.join(', ')})
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      valuesFrom(req.body)
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Could not save the job' });
  }
});

// শূন্যপদের মেয়াদ বাড়ানো বা টাইপো ঠিক করা খুব সাধারণ, তাই মুছে
// আবার লেখার বদলে সরাসরি সম্পাদনা
router.put('/:id', auth, async (req, res) => {
  if (!orNull(req.body.title)) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const sets = FIELDS.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const result = await pool.query(
      `UPDATE jobs SET ${sets} WHERE id = $${FIELDS.length + 1} AND is_active = true RETURNING *`,
      [...valuesFrom(req.body), req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Could not update the job' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('UPDATE jobs SET is_active = false WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not remove the job' });
  }
});

module.exports = router;
