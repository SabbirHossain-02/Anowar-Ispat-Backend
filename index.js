const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// প্যানেলে সংরক্ষণ হলে খোলা পাতাগুলো সাথে সাথে জানতে পারে
const live = require('./live');
app.get('/api/live', live.stream);
app.use('/api', live.watch);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/media', require('./routes/media'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/quotations', require('./routes/quotations'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/content', require('./routes/content'));
app.use('/api/messages', require('./routes/messages'));

// কোনো রুটে ধরা না পড়া এরর HTML পাতা না হয়ে JSON আসে, যাতে প্যানেল
// কারণটা দেখাতে পারে (যেমন পড়া যায় না এমন ছবি)
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error(err);
  res.status(err.status || 500).json({ error: err.expose ? err.message : 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Anwar Ispat Backend running on port ${PORT}`);
});
