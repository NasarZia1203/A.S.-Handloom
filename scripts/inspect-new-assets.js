const sharp = require('sharp');
const path = require('path');

const logoPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794392531264_a327e054.jpg';
const modelPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794392703083_8d4555d8.jpg';

async function check() {
  const logoMeta = await sharp(logoPath).metadata();
  console.log('Logo metadata:', logoMeta);

  const modelMeta = await sharp(modelPath).metadata();
  console.log('Model metadata:', modelMeta);
}

check().catch(console.error);
