const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const modelPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794392703083_8d4555d8.jpg';

async function processHeroModel() {
  const outJpg = path.join(__dirname, '../public/assets/images/hero-model-saree.jpg');
  const outWebp = path.join(__dirname, '../public/assets/images/hero-model-saree.webp');
  const outPng = path.join(__dirname, '../public/assets/images/hero-model-saree.png');

  fs.copyFileSync(modelPath, outJpg);
  await sharp(modelPath).webp({ quality: 92 }).toFile(outWebp);
  await sharp(modelPath).png().toFile(outPng);

  console.log('Saved hero model saree images:', outWebp);
}

processHeroModel().catch(console.error);
