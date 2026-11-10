const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794313298270_e1b1a445.jpg';
const outPng = path.join(__dirname, '../public/assets/images/sale-circle.png');
const outWebp = path.join(__dirname, '../public/assets/images/sale-circle.webp');
const outJpg = path.join(__dirname, '../public/assets/images/sale-circle.jpg');

// Crop square centered at (507, 383) of size 720x720
const left = 147;
const top = 23;
const width = 720;
const height = 720;

// SVG circle mask of 720x720 with radius 356
const circleSvg = Buffer.from(
  '<svg width="720" height="720"><circle cx="360" cy="360" r="356" fill="#fff" /></svg>'
);

sharp(inputPath)
  .extract({ left, top, width, height })
  .composite([{ input: circleSvg, blend: 'dest-in' }])
  .png({ quality: 100 })
  .toFile(outPng)
  .then(() => {
    console.log('Successfully created circular PNG:', outPng);
    return sharp(outPng)
      .webp({ quality: 95 })
      .toFile(outWebp);
  })
  .then(() => {
    console.log('Successfully created circular WebP:', outWebp);
    return sharp(inputPath)
      .extract({ left, top, width, height })
      .jpeg({ quality: 95 })
      .toFile(outJpg);
  })
  .then(() => {
    console.log('Successfully created square JPG:', outJpg);
  })
  .catch(err => {
    console.error('Error generating sale circle images:', err);
  });
