const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
};

router.post('/', async (req, res) => {
  const { product_name, size_mm, quantity_ton, quantity_pcs, additional_products, business_name, full_name, email, mobile, address, police_station, district, message } = req.body;
  const result = await pool.query(
    'INSERT INTO quotations (product_name,size_mm,quantity_ton,quantity_pcs,additional_products,business_name,full_name,email,mobile,address,police_station,district,message) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *',
    [product_name, size_mm, quantity_ton, quantity_pcs, additional_products, business_name, full_name, email, mobile, address, police_station, district, message]
  );
  res.json({ success: true, id: result.rows[0].id });
});

router.get('/', auth, async (req, res) => {
  const result = await pool.query('SELECT * FROM quotations ORDER BY created_at DESC');
  res.json(result.rows);
});

router.delete('/:id', auth, async (req, res) => {
  await pool.query('DELETE FROM quotations WHERE id=$1', [req.params.id]);
  res.json({ success: true });
});

router.put('/:id/status', auth, async (req, res) => {
  await pool.query('UPDATE quotations SET status=$1 WHERE id=$2', [req.body.status, req.params.id]);
  res.json({ success: true });
});
module.exports = router;
