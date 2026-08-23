const router = require('express').Router();
const pool = require('../db');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { uploadToR2, deleteFromR2 } = require('../r2');

// ফাইল আর ডিস্কে রাখি না — সরাসরি R2 তে যায়
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = file.fieldname === 'poster'
      ? /^image\//.test(file.mimetype)
      : /^(video|image)\//.test(file.mimetype);
    cb(ok ? null : new Error('Only video or image files are allowed'), ok);
  }
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

const fields = upload.fields([
  { name: 'media', maxCount: 1 },
  { name: 'poster', maxCount: 1 }
]);

// multer এর এরর (ফাইল বড়, ভুল টাইপ) যেন 500 না হয়ে বোধগম্য বার্তা দেয়
const uploadFields = (req, res, next) => fields(req, res, (err) => {
  if (!err) return next();
  const tooBig = err.code === 'LIMIT_FILE_SIZE';
  res.status(400).json({ error: tooBig ? 'File too large (max 200MB)' : err.message });
});

router.get('/', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM hero_banners WHERE is_active = true ORDER BY sort_order, id'
  );
  res.json(result.rows);
});

router.post('/', auth, uploadFields, async (req, res) => {
  const { title_prefix, title_accent, subtitle, sort_order } = req.body;
  const media = req.files?.media?.[0];
  if (!media) return res.status(400).json({ error: 'Media file is required' });

  const media_type = /^video\//.test(media.mimetype) ? 'video' : 'image';
  const media_url = await uploadToR2(media, 'hero');
  const poster_url = req.files?.poster?.[0]
    ? await uploadToR2(req.files.poster[0], 'hero/posters')
    : null;

  const result = await pool.query(
    `INSERT INTO hero_banners (media_type, media_url, poster_url, title_prefix, title_accent, subtitle, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [media_type, media_url, poster_url, title_prefix, title_accent, subtitle, parseInt(sort_order, 10) || 0]
  );
  res.json(result.rows[0]);
});

router.put('/:id', auth, uploadFields, async (req, res) => {
  const { title_prefix, title_accent, subtitle, sort_order } = req.body;
  const existing = await pool.query('SELECT * FROM hero_banners WHERE id=$1', [req.params.id]);
  if (existing.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  const row = existing.rows[0];

  const media = req.files?.media?.[0];
  const poster = req.files?.poster?.[0];
  const media_type = media ? (/^video\//.test(media.mimetype) ? 'video' : 'image') : row.media_type;
  const media_url = media ? await uploadToR2(media, 'hero') : row.media_url;
  const poster_url = poster ? await uploadToR2(poster, 'hero/posters') : row.poster_url;

  const result = await pool.query(
    `UPDATE hero_banners
        SET media_type=$1, media_url=$2, poster_url=$3, title_prefix=$4,
            title_accent=$5, subtitle=$6, sort_order=$7
      WHERE id=$8 RETURNING *`,
    [media_type, media_url, poster_url, title_prefix, title_accent, subtitle,
     parseInt(sort_order, 10) || 0, req.params.id]
  );

  // বদলে ফেলা পুরোনো ফাইল R2 থেকে সরাই, নইলে জায়গা দখল করে থাকবে
  if (media) await deleteFromR2(row.media_url);
  if (poster) await deleteFromR2(row.poster_url);

  res.json(result.rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  await pool.query('UPDATE hero_banners SET is_active=false WHERE id=$1', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
