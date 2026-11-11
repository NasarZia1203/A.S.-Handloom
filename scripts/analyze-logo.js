const sharp = require('sharp');

const logoPath = 'C:/Users/nasar/.gemini/antigravity/brain/b3ea9c6a-9b3e-4241-a70a-4d8e54c6389e/.user_uploaded/media_1794392531264_a327e054.jpg';

async function analyzeLogo() {
  const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's sample corners (0,0), (width-1, 0), (0, height-1), (width-1, height-1)
  const getPixel = (x, y) => {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx+1], data[idx+2]];
  };

  console.log('Top-left (0,0):', getPixel(0, 0));
  console.log('Top-right (w-1,0):', getPixel(width - 1, 0));
  console.log('Bottom-left (0,h-1):', getPixel(0, height - 1));
  console.log('Bottom-right (w-1,h-1):', getPixel(width - 1, height - 1));

  // Find center pixel
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  console.log('Center:', getPixel(cx, cy));

  // Sample vertical line through center
  let topY = 0, bottomY = height - 1;
  for (let y = 0; y < height; y++) {
    const [r, g, b] = getPixel(cx, y);
    if (r > 30 || g > 30 || b > 30) {
      topY = y;
      break;
    }
  }
  for (let y = height - 1; y >= 0; y--) {
    const [r, g, b] = getPixel(cx, y);
    if (r > 30 || g > 30 || b > 30) {
      bottomY = y;
      break;
    }
  }

  // Sample horizontal line through center
  let leftX = 0, rightX = width - 1;
  for (let x = 0; x < width; x++) {
    const [r, g, b] = getPixel(x, cy);
    if (r > 30 || g > 30 || b > 30) {
      leftX = x;
      break;
    }
  }
  for (let x = width - 1; x >= 0; x--) {
    const [r, g, b] = getPixel(x, cy);
    if (r > 30 || g > 30 || b > 30) {
      rightX = x;
      break;
    }
  }

  console.log(`Oval span: X[${leftX}, ${rightX}] (${rightX - leftX + 1}px, center ${(leftX + rightX)/2}), Y[${topY}, ${bottomY}] (${bottomY - topY + 1}px, center ${(topY + bottomY)/2})`);
}

analyzeLogo().catch(console.error);
