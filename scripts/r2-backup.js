#!/usr/bin/env node
/* R2 বাকেটের প্রতিটি ফাইলের একটি কপি সার্ভারে নামিয়ে রাখে।

   কেন দরকার: আগের ছবি-ভিডিও Cloudinary তে ছিল, সেই অ্যাকাউন্ট বন্ধ
   হয়ে যাওয়ায় সব হারিয়ে গেছে — ফেরানোর কোনো পথ ছিল না। R2 এর
   ক্ষেত্রে যেন সেটা আর না ঘটে।

   নিয়ম: এখান থেকে কিছু কখনও মোছা হয় না। R2 থেকে কোনো ফাইল মুছে
   গেলেও — ভুল করে হোক বা অ্যাকাউন্ট বন্ধ হয়ে — এখানকার কপিটি থেকে
   যায়। তাই --delete নেই, ইচ্ছে করেই।  */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env'), quiet: true });
const fs = require('fs');
const path = require('path');
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');

const DEST = process.env.R2_BACKUP_DIR || '/root/backups/r2';
const BUCKET = process.env.R2_BUCKET;

if (!BUCKET || !process.env.R2_ACCESS_KEY_ID) {
  console.error(stamp(), '❌ R2 এর সেটিংস পাওয়া যায়নি');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

function stamp() {
  return new Date().toISOString();
}

async function listAll() {
  const out = [];
  let token;
  do {
    const page = await s3.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      ContinuationToken: token,
    }));
    (page.Contents || []).forEach((o) => out.push(o));
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return out;
}

async function download(key, dest) {
  const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  // আগে .part এ নামে, শেষ হলে নাম বদলায় — মাঝপথে থেমে গেলে যেন
  // আধখানা ফাইল আসল নামে বসে না থাকে
  const tmp = dest + '.part';
  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(tmp);
    res.Body.pipe(w);
    res.Body.on('error', reject);
    w.on('error', reject);
    w.on('finish', resolve);
  });
  fs.renameSync(tmp, dest);
}

(async () => {
  let added = 0, skipped = 0, failed = 0, bytes = 0;

  let objects;
  try {
    objects = await listAll();
  } catch (err) {
    console.error(stamp(), '❌ বাকেটের তালিকা পাওয়া যায়নি:', err.message);
    process.exit(1);
  }

  for (const obj of objects) {
    const dest = path.join(DEST, obj.Key);
    // আকার মিলে গেলে আবার নামানোর দরকার নেই
    if (fs.existsSync(dest) && fs.statSync(dest).size === obj.Size) { skipped += 1; continue; }
    try {
      await download(obj.Key, dest);
      added += 1;
      bytes += obj.Size;
    } catch (err) {
      failed += 1;
      console.error(stamp(), '  ❌', obj.Key, '—', err.message);
    }
  }

  // কোন ফাইল কবে দেখা গিয়েছিল তার তালিকা — R2 থেকে কিছু মুছে গেলে
  // এখান থেকেই বোঝা যাবে কী ছিল
  const manifest = objects.map((o) => ({
    key: o.Key, size: o.Size, modified: o.LastModified,
  }));
  fs.mkdirSync(DEST, { recursive: true });
  fs.writeFileSync(path.join(DEST, '_manifest.json'), JSON.stringify({
    checked: stamp(), bucket: BUCKET, count: objects.length, files: manifest,
  }, null, 2));

  const mb = (bytes / 1048576).toFixed(1);
  const line = `${stamp()} ${failed ? '⚠️' : '✅'} R2 ব্যাকআপ: ${objects.length} টি ফাইল — নতুন ${added} (${mb} MB), আগেই ছিল ${skipped}` +
    (failed ? `, ব্যর্থ ${failed}` : '');
  console.log(line);
  process.exit(failed ? 1 : 0);
})();
