const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'lib', 'data', 'fallback-products.ts');
let content = fs.readFileSync(targetFile, 'utf-8');

// Pattern for items in FALLBACK_SAREES
content = content.replace(/id: 'saree-(\d+)',[\s\S]*?updated_at: '2026-01-01T00:00:00.000Z',[\s\S]*?}/g, (match, num) => {
  const i = parseInt(num, 10);
  const next = (i % 16) + 1;
  const secondary = `/assets/images/sarees/saree${next}.webp`;
  const isSale = [1, 3, 7, 11, 15].includes(i);
  const isNdd = [1, 2, 4, 5, 8, 10, 12, 14, 16].includes(i);
  
  // Extract price
  const priceMatch = match.match(/price:\s*(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1], 10) : 3500;
  const compareAt = isSale ? Math.round((price * 1.35) / 50) * 50 : null;
  const rating = (4.8 + ((i * 3) % 3) * 0.1).toFixed(1);
  const reviews = 18 + ((i * 7) % 35);

  let addition = `    secondary_image_url: '${secondary}',\n`;
  if (isSale && compareAt) {
    addition += `    is_on_sale: true,\n    compare_at_price: ${compareAt},\n`;
  }
  if (isNdd) {
    addition += `    is_ndd: true,\n`;
  }
  addition += `    rating: ${rating},\n    reviews_count: ${reviews},\n`;

  // Insert before is_active
  if (match.includes('secondary_image_url:')) return match;
  return match.replace(/is_active:/, addition + '    is_active:');
});

// Pattern for items in FALLBACK_FABRICS
content = content.replace(/id: 'fabric-(\d+)',[\s\S]*?updated_at: '2026-01-01T00:00:00.000Z',[\s\S]*?}/g, (match, num) => {
  const i = parseInt(num, 10);
  const next = (i % 16) + 1;
  const secondary = `/assets/images/fabrics/fabric${next}.webp`;
  const isSale = [1, 5, 9, 13].includes(i);
  const isNdd = [1, 2, 3, 4, 6, 7, 11, 14].includes(i);
  
  const priceMatch = match.match(/price:\s*(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1], 10) : 800;
  const compareAt = isSale ? Math.round((price * 1.38) / 50) * 50 : null;
  const rating = '4.9';
  const reviews = 15 + ((i * 5) % 25);

  let addition = `    secondary_image_url: '${secondary}',\n`;
  if (isSale && compareAt) {
    addition += `    is_on_sale: true,\n    compare_at_price: ${compareAt},\n`;
  }
  if (isNdd) {
    addition += `    is_ndd: true,\n`;
  }
  addition += `    rating: ${rating},\n    reviews_count: ${reviews},\n`;

  if (match.includes('secondary_image_url:')) return match;
  return match.replace(/is_active:/, addition + '    is_active:');
});

// Chadar, Gamcha, Lungi, Suit, Dupatta
const specials = [
  { id: 'chadar-1', sec: '/assets/images/fabrics/fabric2.webp', sale: true, comp: 1350, ndd: true, r: 5.0, rev: 42 },
  { id: 'chadar-2', sec: '/assets/images/fabrics/fabric3.webp', sale: false, comp: null, ndd: true, r: 4.8, rev: 26 },
  { id: 'gamcha-1', sec: '/assets/images/fabrics/fabric4.webp', sale: false, comp: null, ndd: true, r: 4.9, rev: 38 },
  { id: 'gamcha-2', sec: '/assets/images/fabrics/fabric5.webp', sale: false, comp: null, ndd: true, r: 4.8, rev: 22 },
  { id: 'lungi-1', sec: '/assets/images/fabrics/fabric6.webp', sale: true, comp: 680, ndd: true, r: 4.9, rev: 31 },
  { id: 'lungi-2', sec: '/assets/images/fabrics/fabric7.webp', sale: false, comp: null, ndd: true, r: 4.8, rev: 19 },
  { id: 'suit-1', sec: '/assets/images/sarees/saree5.webp', sale: true, comp: 5900, ndd: true, r: 5.0, rev: 35 },
  { id: 'suit-2', sec: '/assets/images/sarees/saree6.webp', sale: false, comp: null, ndd: true, r: 4.9, rev: 27 },
  { id: 'dupatta-1', sec: '/assets/images/sarees/saree7.webp', sale: true, comp: 2600, ndd: true, r: 4.9, rev: 29 },
  { id: 'dupatta-2', sec: '/assets/images/sarees/saree8.webp', sale: false, comp: null, ndd: true, r: 4.8, rev: 17 },
];

for (const sp of specials) {
  const reg = new RegExp(`id: '${sp.id}',[\\s\\S]*?updated_at: '2026-01-01T00:00:00.000Z',\\n  }`);
  content = content.replace(reg, (match) => {
    if (match.includes('secondary_image_url:')) return match;
    let addition = `    secondary_image_url: '${sp.sec}',\n`;
    if (sp.sale && sp.comp) {
      addition += `    is_on_sale: true,\n    compare_at_price: ${sp.comp},\n`;
    }
    if (sp.ndd) {
      addition += `    is_ndd: true,\n`;
    }
    addition += `    rating: ${sp.r},\n    reviews_count: ${sp.rev},\n`;
    return match.replace(/is_active:/, addition + '    is_active:');
  });
}

fs.writeFileSync(targetFile, content, 'utf-8');
console.log('Successfully enriched fallback products!');
