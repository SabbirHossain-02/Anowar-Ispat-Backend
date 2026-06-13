const router = require('express').Router();
const pool = require('../db');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  const result = await pool.query(
    'INSERT INTO products (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
    [title, description, image_url]
  );
  res.json(result.rows[0]);
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const { title, description, existing_image } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : existing_image;
  const result = await pool.query(
    'UPDATE products SET title=$1, description=$2, image_url=$3 WHERE id=$4 RETURNING *',
    [title, description, image_url, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  await pool.query('UPDATE products SET is_active=false WHERE id=$1', [req.params.id]);
  res.json({ success: true });
});
module.exports = router;
