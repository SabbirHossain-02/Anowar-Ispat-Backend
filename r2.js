const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

// Cloudflare R2 — S3 কম্প্যাটিবল, তাই AWS এর SDK ব্যবহার করা যায়
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET;
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

const isConfigured = Boolean(
  process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY && BUCKET && PUBLIC_URL
);

// একই সেকেন্ডে দুটি আপলোড হলেও যেন নাম আলাদা হয়
const buildKey = (folder, originalName) => {
  const ext = path.extname(originalName || '').toLowerCase();
  const stamp = Date.now();
  const rand = crypto.randomBytes(6).toString('hex');
  return `${folder}/${stamp}-${rand}${ext}`;
};

// multer এর memoryStorage থেকে পাওয়া ফাইল R2 তে পাঠায়, পাবলিক URL ফেরত দেয়
const uploadToR2 = async (file, folder) => {
  if (!isConfigured) throw new Error('R2 is not configured');
  const key = buildKey(folder, file.originalname);
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // এক বছর ক্যাশ — ফাইলের নাম প্রতিবার আলাদা, তাই পুরোনো ক্যাশ সমস্যা করে না
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  return `${PUBLIC_URL}/${key}`;
};

// পাবলিক URL থেকে key বের করে R2 থেকে ফাইল মোছে।
// পুরোনো /uploads/... পাথ হলে কিছু করে না — সেগুলো ডিস্কে আছে।
const deleteFromR2 = async (url) => {
  if (!isConfigured || !url || !url.startsWith(PUBLIC_URL + '/')) return;
  const key = url.slice(PUBLIC_URL.length + 1);
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (err) {
    // ফাইল মুছতে না পারলে পুরো রিকোয়েস্ট ব্যর্থ করার দরকার নেই
    console.error('R2 delete failed for', key, err.message);
  }
};

module.exports = { uploadToR2, deleteFromR2, isConfigured };
