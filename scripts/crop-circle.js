const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794311335656_81775f3a.jpg';
const outPng = path.join(__dirname, '../public/assets/images/linen-galaxy-boutique.png');
const outWebp = path.join(__dirname, '../public/assets/images/linen-galaxy-boutique.webp');
const outJpg = path.join(__dirname, '../public/assets/images/linen-galaxy-boutique.jpg');

fs.copyFileSync(inputPath, outJpg);

// Circle mask: 1024x1024 with circle at center 512, 512, radius 508 for perfectly smooth antialiased golden ring
const circleSvg = Buffer.from(
  '<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="#fff" /></svg>'
);

sharp(inputPath)
  .composite([{ input: circleSvg, blend: 'dest-in' }])
  .png({ quality: 100, compressionLevel: 8 })
  .toFile(outPng)
  .then(() => {
    console.log('Successfully created circular PNG:', outPng);
    return sharp(outPng)
      .webp({ quality: 92, lossless: false })
      .toFile(outWebp);
  })
  .then(() => {
    console.log('Successfully created circular WebP:', outWebp);
  })
  .catch(err => {
    console.error('Error generating circular images:', err);
  });
