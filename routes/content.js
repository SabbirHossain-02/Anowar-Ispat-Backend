const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { uploadToR2 } = require('../r2');
const { PAGES } = require('../content-schema');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\//.test(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
});

// multer এর এরর যেন HTML পেজ না হয়ে JSON দেয়
const uploadBanner = (req, res, next) => upload.single('image')(req, res, (err) => {
  if (!err) return next();
  const tooBig = err.code === 'LIMIT_FILE_SIZE';
  res.status(400).json({ error: tooBig ? 'Image too large (max 20MB)' : err.message });
});

// ভিডিও আলাদা: ছবির চেয়ে অনেক বড় হয়, তাই সীমাও আলাদা।
// হোম ব্যানারের স্লাইডেও একই ২০০MB চলে।
const videoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^video[/]/.test(file.mimetype);
    cb(ok ? null : new Error('Only video files are allowed'), ok);
  },
});

const uploadVideo = (req, res, next) => videoUpload.single('video')(req, res, (err) => {
  if (!err) return next();
  const tooBig = err.code === 'LIMIT_FILE_SIZE';
  res.status(400).json({ error: tooBig ? 'Video too large (max 200MB)' : err.message });
});

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

// শুধু ছবিটি R2 তে তুলে লিংক ফেরত দেয়, কিছু সংরক্ষণ করে না। তালিকার
// ভেতরের ছবির ঘরগুলো এটি ব্যবহার করে — লিংকটি ঘরে বসে, তারপর ফর্ম
// সংরক্ষণের সময় বাকি সবের সাথে একসাথে যায়।
router.post('/upload', auth, uploadBanner, async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image received' });
  try {
    const url = await uploadToR2(req.file, 'content');
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: 'Could not upload the image' });
  }
});

// তালিকার সারিতে ভিডিও — যেমন হোমপেজের মেগা প্রজেক্ট। ফাইলটি R2 তে
// যায়, লিংকটি ফেরত আসে; সারিতে বসানো হয় Save দিলে।
router.post('/upload-video', auth, uploadVideo, async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No video received' });
  try {
    const url = await uploadToR2(req.file, 'content/video');
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: 'Could not upload the video' });
  }
});

// ব্যানারের ছবি R2 তে যায়, তারপর তার লিংকটি ওই পেজের data এর
// banner.image এ বসে। বাকি লেখা অক্ষত থাকে, তাই আপলোডের জন্য পুরো
// ফর্ম আবার সংরক্ষণ করতে হয় না।
router.post('/:key/banner', auth, uploadBanner, async (req, res) => {
  const key = req.params.key;
  if (!KNOWN.has(key)) return res.status(400).json({ error: 'Unknown page' });
  if (!req.file) return res.status(400).json({ error: 'No image received' });

  try {
    const url = await uploadToR2(req.file, 'banners');
    const result = await pool.query(
      `INSERT INTO page_content (page_key, data, updated_at)
       VALUES ($1, jsonb_build_object('banner', jsonb_build_object('image', $2::text)), now())
       ON CONFLICT (page_key) DO UPDATE
         SET data = jsonb_set(
               page_content.data,
               '{banner,image}',
               to_jsonb($2::text),
               true
             ),
             updated_at = now()
       RETURNING data`,
      [key, url]
    );
    res.json({ url, data: result.rows[0].data });
  } catch (err) {
    res.status(500).json({ error: 'Could not upload the banner' });
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
