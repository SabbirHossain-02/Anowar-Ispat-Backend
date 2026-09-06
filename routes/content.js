const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const { PAGES } = require('../content-schema');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

const KNOWN = new Set(PAGES.map((p) => p.key));

// অ্যাডমিনের ফর্ম এখান থেকেই তৈরি হয়
router.get('/schema', (req, res) => res.json(PAGES));

// একবারে সব পেজ — ফ্রন্টএন্ড একটি অনুরোধেই সবটা নেয়, প্রতি পেজে
// আলাদা কল করলে রুট বদলালেই ঝিলিক দিত
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT page_key, data FROM page_content');
    const out = {};
    result.rows.forEach((r) => { out[r.page_key] = r.data; });
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: 'Could not load content' });
  }
});

router.get('/:key', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT data FROM page_content WHERE page_key = $1', [req.params.key]
    );
    res.json(result.rows[0]?.data || {});
  } catch (err) {
    res.status(500).json({ error: 'Could not load content' });
  }
});

router.put('/:key', auth, async (req, res) => {
  const key = req.params.key;
  if (!KNOWN.has(key)) return res.status(400).json({ error: 'Unknown page' });
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Content must be an object' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO page_content (page_key, data, updated_at)
       VALUES ($1, $2, now())
       ON CONFLICT (page_key)
       DO UPDATE SET data = EXCLUDED.data, updated_at = now()
       RETURNING page_key, data, updated_at`,
      [key, req.body]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Could not save content' });
  }
});

// সারি মুছে দিলে পেজটি কোডের মূল লেখায় ফিরে যায়
router.delete('/:key', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM page_content WHERE page_key = $1', [req.params.key]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not reset the page' });
  }
});

module.exports = router;
