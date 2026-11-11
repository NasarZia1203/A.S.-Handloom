const fs = require('fs');
const path = require('path');

const stateFile = path.join(__dirname, '../lib/data/store-state.json');
const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

state.settings.business_name = 'A S Handloom';
state.settings.parent_company = 'A S Handloom';
state.settings.shop_image_url = '/assets/images/hero-model-saree.webp';
state.settings.shop_description = 'Ancestral Pit-Loom Handloom & Silk Manufacturing House in the Silk City of India (Est. 2007). Direct weaver pricing for authentic Bhagalpuri silk sarees, pure linen shirting/suiting, and heritage handloom weaves.';

state.settings.outlets = [
  {
    id: 'as-handloom-main',
    name: 'A S Handloom — Main Office & Weaving Depot',
    tagline: 'Ancestral Pit-Loom Manufacturing Hub & Wholesale Sampling Depot',
    badge: 'Main Office & Depot',
    address: '85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004',
    phone: '+91 9430908657',
    whatsapp: '+91 9798141494',
    hours: 'Monday – Saturday: 9:30 AM – 8:00 PM',
    image_url: '/assets/images/as-handloom-logo.png',
    map_url: 'https://maps.google.com/?q=85+M+T+N+Ghosh+Road+Hasnabad+Champanagar+Bhagalpur+Bihar+812004',
    is_active: true,
  },
  {
    id: 'linen-galaxy-boutique',
    name: 'Linen Galaxy — Flagship Retail Boutique',
    tagline: 'House of Pure Linen & Silk • Designer Handloom Showcase',
    badge: 'Retail Boutique',
    address: '85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004',
    phone: '+91 9097914885',
    whatsapp: '+91 8210303152',
    hours: 'Monday – Sunday: 10:00 AM – 9:00 PM',
    image_url: '/assets/images/linen-galaxy-boutique.png',
    map_url: 'https://maps.google.com/?q=Linen+Galaxy+Champanagar+Bhagalpur',
    is_active: true,
  },
];

// Add 'outlets' section if not exists
if (!state.settings.homepage_sections.some(s => s.id === 'outlets')) {
  state.settings.homepage_sections.push({
    id: 'outlets',
    heading: 'Our Shops & Outlets',
    subheading: 'Experience authentic Bhagalpuri pit-loom craftsmanship in person at our flagship locations',
    is_enabled: true,
    sort_order: 9,
  });
}

// Update section titles for hero and about to A S Handloom
const heroSec = state.settings.homepage_sections.find(s => s.id === 'hero');
if (heroSec) {
  heroSec.heading = 'A S Handloom — Ancestral Pit-Loom Textile House';
  heroSec.subheading = 'Authentic Bhagalpuri Pure Silk & Certified Linen Masterpieces • Estd. 2007';
}

const aboutSec = state.settings.homepage_sections.find(s => s.id === 'about');
if (aboutSec) {
  aboutSec.subheading = 'A S Handloom Weaving House • Under MD RAZA ALAM (Proprietor)';
}

state.settings.homepage_sections.sort((a, b) => a.sort_order - b.sort_order);

fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
console.log('Successfully updated store-state.json');
