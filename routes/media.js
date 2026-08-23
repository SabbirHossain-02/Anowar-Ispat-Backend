const router = require('express').Router();
const pool = require('../db');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { uploadToR2 } = require('../r2');

// ফাইল আর ডিস্কে রাখি না — সরাসরি R2 তে যায়
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\//.test(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  }
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

// multer এর এরর (ফাইল বড়, ভুল টাইপ) যেন HTML এরর পেজ না হয়ে JSON দেয়
const uploadImage = (req, res, next) => upload.single('image')(req, res, (err) => {
  if (!err) return next();
  const tooBig = err.code === 'LIMIT_FILE_SIZE';
  res.status(400).json({ error: tooBig ? 'File too large (max 20MB)' : err.message });
});

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM media_events WHERE is_active = true ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', auth, uploadImage, async (req, res) => {
  const { title, description, event_date, category } = req.body;
  const image_url = req.file ? await uploadToR2(req.file, 'media') : null;
  const result = await pool.query(
    'INSERT INTO media_events (title, description, image_url, event_date, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, description, image_url, event_date, category]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  await pool.query('UPDATE media_events SET is_active=false WHERE id=$1', [req.params.id]);
  res.json({ success: true });
});
module.exports = router;
