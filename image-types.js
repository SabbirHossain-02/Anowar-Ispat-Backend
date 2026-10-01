const path = require('path');

// যে কোনো ধরনের ছবি নেওয়া হয়। কিছু ব্রাউজার (যেমন Windows এ iPhone এর
// HEIC) ফাইলের ধরন বলতে পারে না — তখন নামের শেষাংশ দেখে চিনি
const MIME_BY_EXT = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.jfif': 'image/jpeg', '.pjpeg': 'image/jpeg', '.pjp': 'image/jpeg',
  '.png': 'image/png', '.apng': 'image/apng', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.svg': 'image/svg+xml', '.bmp': 'image/bmp',
  '.ico': 'image/x-icon', '.cur': 'image/x-icon',
  '.heic': 'image/heic', '.heif': 'image/heif', '.tif': 'image/tiff', '.tiff': 'image/tiff',
};

const extOf = (file) => path.extname(file.originalname || '').toLowerCase();

const isImageFile = (file) => /^image\//.test(file.mimetype || '') || Boolean(MIME_BY_EXT[extOf(file)]);

// HEIC/HEIF (iPhone) আর TIFF ব্রাউজারে দেখা যায় না, তাই আপলোডের সময়
// JPEG বানিয়ে রাখি। বাকি সব ছবি যেমন ছিল তেমনই যায়।
const toWebImage = async (file) => {
  const ext = extOf(file);
  const mime = (file.mimetype || '').toLowerCase();
  if (!/^image\//.test(mime) && !MIME_BY_EXT[ext]) return file; // ভিডিও, PDF

  const isHeic = /hei[cf]/.test(mime) || ext === '.heic' || ext === '.heif';
  const isTiff = /tiff/.test(mime) || ext === '.tif' || ext === '.tiff';

  if (!isHeic && !isTiff) {
    // ধরন না জানা থাকলে নাম থেকে বসাই, নইলে R2 ভুল Content-Type দিত
    if (!/^image\//.test(mime)) return { ...file, mimetype: MIME_BY_EXT[ext] };
    return file;
  }

  // HEIC শুধু খোলা হয় heic-decode দিয়ে; JPEG বানায় sharp — এটা দ্রুত,
  // মেমরি কম নেয় আর API কে আটকে রাখে না (বড় iPhone ছবিতেও)
  const sharp = require('sharp');
  let buffer;
  if (isHeic) {
    try {
      const decode = require('heic-decode');
      const { width, height, data } = await decode({ buffer: file.buffer });
      buffer = await sharp(Buffer.from(data.buffer, data.byteOffset, data.byteLength), {
        raw: { width, height, channels: 4 },
      }).jpeg({ quality: 90 }).toBuffer();
    } catch {
      // কিছু Android ফোনের HEIF ভেতরে AV1 — ওটা sharp নিজেই পড়তে পারে
      buffer = await sharp(file.buffer).rotate().jpeg({ quality: 90 }).toBuffer();
    }
  } else {
    buffer = await sharp(file.buffer).rotate().jpeg({ quality: 90 }).toBuffer();
  }
  // নামের শেষাংশ যেমন লেখা ছিল (.HEIC বড় হাতেও হয়) তেমনই কেটে .jpg বসাই
  const name = file.originalname || 'image';
  const base = path.basename(name, path.extname(name)) || 'image';
  return { ...file, buffer, size: buffer.length, mimetype: 'image/jpeg', originalname: base + '.jpg' };
};

module.exports = { isImageFile, toWebImage };
