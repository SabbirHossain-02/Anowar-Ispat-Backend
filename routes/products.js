const router = require('express').Router();
const pool = require('../db');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { uploadToR2, deleteFromR2 } = require('../r2');

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
  const result = await pool.query('SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', auth, uploadImage, async (req, res) => {
  const { title, description } = req.body;
  const image_url = req.file ? await uploadToR2(req.file, 'products') : null;
  const result = await pool.query(
    'INSERT INTO products (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
    [title, description, image_url]
  );
  res.json(result.rows[0]);
});

router.put('/:id', auth, uploadImage, async (req, res) => {
  const { title, description, existing_image } = req.body;
  const image_url = req.file ? await uploadToR2(req.file, 'products') : existing_image;
  const result = await pool.query(
    'UPDATE products SET title=$1, description=$2, image_url=$3 WHERE id=$4 RETURNING *',
    [title, description, image_url, req.params.id]
  );
  // ছবি বদলে গেলে পুরোনোটা R2 থেকে সরাই
  if (req.file && existing_image) await deleteFromR2(existing_image);
  res.json(result.rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  await pool.query('UPDATE products SET is_active=false WHERE id=$1', [req.params.id]);
  res.json({ success: true });
});
module.exports = router;
