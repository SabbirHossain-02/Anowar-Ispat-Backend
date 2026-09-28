/* সাইটের খোলা পাতাগুলোকে জানিয়ে দেওয়া যে প্যানেল থেকে কিছু বদলেছে।

   প্রতিটি পাতা /api/live এ একটি Server-Sent Events সংযোগ খুলে রাখে।
   প্যানেলে কিছু সংরক্ষণ হলে এখান থেকে শুধু কী বদলেছে তার নাম যায় —
   content, hero, media, products বা jobs — আর পাতাটি সেটুকু নতুন করে
   আনে। রিফ্রেশ লাগে না।

   nginx এর proxy_read_timeout ৬০ সেকেন্ড, তাই ২৫ সেকেন্ড পরপর একটি
   ফাঁকা মন্তব্য পাঠাই — নইলে চুপচাপ থাকা সংযোগ কেটে যেত। */

const clients = new Set();

const stream = (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();
  res.write('retry: 5000\n\n');

  clients.add(res);
  const beat = setInterval(() => res.write(': ping\n\n'), 25000);

  req.on('close', () => {
    clearInterval(beat);
    clients.delete(res);
  });
};

const notify = (kind) => {
  const msg = `data: ${JSON.stringify({ kind, at: Date.now() })}\n\n`;
  clients.forEach((res) => {
    try { res.write(msg); } catch (e) { clients.delete(res); }
  });
};

// কোন কোন রুটের বদল সাইটে দেখা যায়। উদ্ধৃতি, বার্তা, লগইন এর বাইরে।
const WATCHED = new Set(['content', 'hero', 'media', 'products', 'jobs', 'settings']);

// শুধু ফাইল তোলা — এতে সাইটের কিছু বদলায় না, লিংকটি পরে সংরক্ষণে যায়
const UPLOAD_ONLY = /^\/content\/upload(-video|-file)?\/?$/;

const watch = (req, res, next) => {
  if (req.method === 'GET' || req.method === 'OPTIONS') return next();
  const kind = req.path.split('/')[1];
  if (!WATCHED.has(kind) || UPLOAD_ONLY.test(req.path)) return next();
  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) notify(kind);
  });
  next();
};

module.exports = { stream, notify, watch };
