#!/usr/bin/env node
/* সাইটে যত ছবি ও ভিডিওর লিংক আছে, সবগুলো সত্যিই খোলে কি না দেখে।

   কেন দরকার: Cloudinary অ্যাকাউন্ট বন্ধ হয়ে যাওয়ার পর হোমপেজের
   আটটি ভিডিও মাসখানেক ধরে 401 দিচ্ছিল, অথচ কেউ টের পায়নি — পাতা
   দেখতে ঠিকই লাগত, শুধু ভিডিওর জায়গা কালো থাকত। সেটা যেন আর
   চুপচাপ না ঘটে।

   কিছু মেরামত করে না, কেবল জানায়। লগ:
   /var/log/server-maint/check-media.log  */

const SITE = process.env.SITE_URL || 'https://anwarispat.com';
const stamp = () => new Date().toISOString();

const urls = new Map();

const note = (u, where) => {
  if (!u || typeof u !== 'string') return;
  const s = u.trim();
  if (!s || s.startsWith('data:')) return;
  if (!/^https?:\/\//.test(s) && !s.startsWith('/')) return;
  if (!/\.(jpe?g|png|webp|gif|svg|mp4|webm|mov|avif)$/i.test(s)) return;
  const full = s.startsWith('/') ? SITE + s : s;
  if (!urls.has(full)) urls.set(full, []);
  urls.get(full).push(where);
};

const walk = (obj, where) => {
  if (typeof obj === 'string') return note(obj, where);
  if (Array.isArray(obj)) return obj.forEach((v, i) => walk(v, `${where}[${i}]`));
  if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => walk(v, where ? `${where}.${k}` : k));
  }
};

(async () => {
  try {
    const content = await fetch(`${SITE}/api/content`).then((r) => r.json());
    Object.entries(content).forEach(([page, data]) => walk(data, page));
  } catch (err) {
    console.error(stamp(), '❌ পাতার লেখা আনা গেল না:', err.message);
    process.exit(1);
  }

  for (const [ep, field] of [['products', 'image_url'], ['media', 'image_url'], ['hero', 'media_url']]) {
    try {
      const rows = await fetch(`${SITE}/api/${ep}`).then((r) => r.json());
      (Array.isArray(rows) ? rows : []).forEach((r, i) => {
        note(r[field], `${ep}[${i}]`);
        note(r.poster_url, `${ep}[${i}].poster`);
      });
    } catch (err) { /* একটি তালিকা না এলে বাকিগুলো তো দেখা যাক */ }
  }

  const bad = [];
  await Promise.all([...urls.keys()].map(async (u) => {
    try {
      const r = await fetch(u, { method: 'HEAD' });
      if (!r.ok) bad.push([r.status, u, urls.get(u)]);
    } catch (e) {
      bad.push(['unreachable', u, urls.get(u)]);
    }
  }));

  if (bad.length === 0) {
    console.log(`${stamp()} ✅ ${urls.size} টি ছবি/ভিডিওর সবগুলোই খোলে`);
    return;
  }

  console.log(`${stamp()} ⚠️  ${urls.size} টির মধ্যে ${bad.length} টি খোলে না:`);
  bad.sort().forEach(([s, u, where]) => {
    console.log(`    ${s}  ${u}`);
    console.log(`          ← ${where.slice(0, 4).join(', ')}`);
  });
  process.exitCode = 1;
})();
