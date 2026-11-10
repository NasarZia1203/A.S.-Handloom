const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794310691926_56925428.jpg';

async function processLogo() {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // 1. Find bounding box of the logo
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 150) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Logo bounds: X[${minX}, ${maxX}] (${maxX - minX + 1}px), Y[${minY}, ${maxY}] (${maxY - minY + 1}px)`);

  const targetSize = 1024;
  const logoWidth = maxX - minX + 1;
  const logoHeight = maxY - minY + 1;
  
  // Clean up pixels to pure white background and pure black letters with anti-aliasing
  const cleanedAlpha = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum >= 180) {
      cleanedAlpha[i] = 0; // pure background
    } else if (lum <= 30) {
      cleanedAlpha[i] = 255; // pure foreground black
    } else {
      // Smooth linear transition
      const norm = (180 - lum) / (180 - 30);
      cleanedAlpha[i] = Math.round(Math.min(255, Math.max(0, norm * 255)));
    }
  }

  // Create an RGBA buffer for the extracted logo (black letters, transparency based on cleanedAlpha)
  const extractedRgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    extractedRgba[i * 4] = 28;     // rich dark charcoal #1C1917
    extractedRgba[i * 4 + 1] = 25;
    extractedRgba[i * 4 + 2] = 23;
    extractedRgba[i * 4 + 3] = cleanedAlpha[i];
  }

  // Crop only the logo region with transparent background and encode as PNG
  const croppedLogo = await sharp(extractedRgba, {
    raw: { width, height, channels: 4 }
  })
    .extract({ left: minX, top: minY, width: logoWidth, height: logoHeight })
    .png()
    .toBuffer();

  // Resize to fit inside targetSize with padding (logo occupies ~800px)
  const maxInner = 800;
  const scale = Math.min(maxInner / logoWidth, maxInner / logoHeight);
  const fitWidth = Math.round(logoWidth * scale);
  const fitHeight = Math.round(logoHeight * scale);

  const resizedLogo = await sharp(croppedLogo)
    .resize(fitWidth, fitHeight, { fit: 'contain' })
    .png()
    .toBuffer();

  // Composite onto pure white canvas (1024x1024)
  const left = Math.round((targetSize - fitWidth) / 2);
  const top = Math.round((targetSize - fitHeight) / 2);

  const whiteCanvas = await sharp({
    create: {
      width: targetSize,
      height: targetSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{ input: resizedLogo, left, top }])
    .png({ quality: 100 })
    .toBuffer();

  // Save main logo image assets
  const outPng = path.join(__dirname, '../public/assets/images/linen-galaxy-logo-white-bg.png');
  const outWebp = path.join(__dirname, '../public/assets/images/linen-galaxy-logo-white-bg.webp');
  const outJpg = path.join(__dirname, '../public/assets/images/linen-galaxy-logo-white-bg.jpg');
  fs.writeFileSync(outPng, whiteCanvas);
  console.log('Saved:', outPng);

  await sharp(whiteCanvas).webp({ quality: 95 }).toFile(outWebp);
  console.log('Saved:', outWebp);

  await sharp(whiteCanvas).jpeg({ quality: 95 }).toFile(outJpg);
  console.log('Saved:', outJpg);

  // Next.js App Tab Icons:
  // 1. app/icon.png (512x512)
  const appIcon512 = await sharp(whiteCanvas).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../app/icon.png'), appIcon512);
  fs.writeFileSync(path.join(__dirname, '../public/icon.png'), appIcon512);
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-light-256.png'), await sharp(whiteCanvas).resize(256, 256).png().toBuffer());
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-light-128.png'), await sharp(whiteCanvas).resize(128, 128).png().toBuffer());
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-dark-256.png'), await sharp(whiteCanvas).resize(256, 256).png().toBuffer());
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-dark-128.png'), await sharp(whiteCanvas).resize(128, 128).png().toBuffer());

  // 2. app/apple-icon.png (180x180)
  const appleIcon = await sharp(whiteCanvas).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../app/apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.png'), appleIcon);

  // 3. app/favicon.ico & public/favicon.ico (32x32)
  const favicon32 = await sharp(whiteCanvas).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '../app/favicon.ico'), favicon32);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), favicon32);

  // 4. Circular badge version for round facility / avatar badge
  const circleSvg = Buffer.from(
    `<svg width="${targetSize}" height="${targetSize}"><circle cx="${targetSize/2}" cy="${targetSize/2}" r="${targetSize/2}" fill="#fff" /></svg>`
  );
  const circularLogo = await sharp(whiteCanvas)
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/assets/images/linen-galaxy-logo-circle.png'), circularLogo);
  console.log('Saved circular badge:', path.join(__dirname, '../public/assets/images/linen-galaxy-logo-circle.png'));

  // 5. Update public/browser-tab-logo.svg
  const base64Png = appIcon512.toString('base64');
  const browserSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <rect width="128" height="128" rx="20" fill="#ffffff"/>
  <image href="data:image/png;base64,${base64Png}" x="8" y="8" width="112" height="112"/>
</svg>`;
  fs.writeFileSync(path.join(__dirname, '../public/browser-tab-logo.svg'), browserSvg);
  console.log('Saved browser tab SVG logo');
}

processLogo().catch(console.error);
