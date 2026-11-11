const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794392531264_a327e054.jpg';

async function processLogo() {
  const width = 583;
  const height = 814;
  const cx = 291.5;
  const cy = 406.5;
  const rx = 289;
  const ry = 403.5;

  // Ellipse mask with smooth antialiasing
  const maskSvg = Buffer.from(
    `<svg width="${width}" height="${height}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff" /></svg>`
  );

  // 1. Cut away black background to transparent
  const transparentOval = await sharp(logoPath)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const outTransPng = path.join(__dirname, '../public/assets/images/as-handloom-logo.png');
  const outTransWebp = path.join(__dirname, '../public/assets/images/as-handloom-logo.webp');
  fs.writeFileSync(outTransPng, transparentOval);
  await sharp(transparentOval).webp({ quality: 95 }).toFile(outTransWebp);
  console.log('Saved transparent logo:', outTransPng);

  // 2. Square version on pure white canvas (1024x1024)
  // The oval is 583x814. Let's scale it so height is 900px, width is ~645px, centered on 1024x1024 white canvas
  const squareSize = 1024;
  const targetH = 920;
  const scale = targetH / height;
  const targetW = Math.round(width * scale);

  const resizedLogo = await sharp(transparentOval)
    .resize(targetW, targetH, { fit: 'contain' })
    .png()
    .toBuffer();

  const left = Math.round((squareSize - targetW) / 2);
  const top = Math.round((squareSize - targetH) / 2);

  const whiteSquare = await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{ input: resizedLogo, left, top }])
    .png({ quality: 100 })
    .toBuffer();

  const outWhitePng = path.join(__dirname, '../public/assets/images/as-handloom-logo-white-bg.png');
  const outWhiteWebp = path.join(__dirname, '../public/assets/images/as-handloom-logo-white-bg.webp');
  const outWhiteJpg = path.join(__dirname, '../public/assets/images/as-handloom-logo-white-bg.jpg');
  fs.writeFileSync(outWhitePng, whiteSquare);
  await sharp(whiteSquare).webp({ quality: 95 }).toFile(outWhiteWebp);
  await sharp(whiteSquare).jpeg({ quality: 95 }).toFile(outWhiteJpg);
  console.log('Saved white-bg square logo:', outWhitePng);

  // Also replace old logo references so legacy paths continue to show new A S Handloom logo
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/logo.png'), whiteSquare);
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-logo-white-bg.png'), whiteSquare);
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-logo-white-bg.webp'), await sharp(whiteSquare).webp().toBuffer());
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-logo-circle.png'), whiteSquare);

  // 3. Tab icons (app/icon.png, app/apple-icon.png, favicon.ico, etc.)
  const icon512 = await sharp(whiteSquare).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../app/icon.png'), icon512);
  fs.writeFileSync(path.join(__dirname, '../public/icon.png'), icon512);

  const icon180 = await sharp(whiteSquare).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../app/apple-icon.png'), icon180);
  fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.png'), icon180);

  const favicon32 = await sharp(whiteSquare).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../app/favicon.ico'), favicon32);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), favicon32);

  // 4. Browser tab SVG
  const base64Png = icon512.toString('base64');
  const tabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <rect width="128" height="128" rx="20" fill="#ffffff"/>
  <image href="data:image/png;base64,${base64Png}" x="6" y="6" width="116" height="116"/>
</svg>`;
  fs.writeFileSync(path.join(__dirname, '../public/browser-tab-logo.svg'), tabSvg);
  console.log('Saved all browser tab icons successfully!');
}

processLogo().catch(console.error);
