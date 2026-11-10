import type { SiteSettings, HomepageSectionConfig } from '@/lib/types'

export const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  {
    id: 'hero',
    heading: 'Linen Galaxy — The Handloom Textile Store',
    subheading: 'A Flagship Store by A S Handloom • Bhagalpur Silk City, Bihar',
    is_enabled: true,
    sort_order: 1,
  },
  {
    id: 'wholesale-retail',
    heading: 'Wholesale Manufacturing & Direct Retail Delivery',
    subheading: 'Two Channels • One Ancestral Pit-Loom Manufacturing House',
    is_enabled: true,
    sort_order: 2,
  },
  {
    id: 'ndd',
    heading: '⚡ Next Day Dispatch (NDD)',
    subheading: 'Ready-in-Loft Handloom Sarees & Fabrics Dispatched Within 24 Hours Across India',
    is_enabled: true,
    sort_order: 3,
  },
  {
    id: 'sale',
    heading: 'Clearance & Flash Sale',
    subheading: 'Special discounts on handloom sarees, linen fabrics, and traditional weaves',
    is_enabled: true,
    sort_order: 4,
  },
  {
    id: 'sarees',
    heading: 'Handcrafted Saree Masterpieces',
    subheading: 'Pure Desi Silk, Linen, Moonga, Organza, Viscose & Kota Handloom Sarees',
    category_slug: 'saree',
    is_enabled: true,
    sort_order: 5,
  },
  {
    id: 'fabrics',
    heading: 'Pure Running Fabrics & Yardage',
    subheading: 'Linen Shirting (80/70/60 LEA), Suiting (25/33 LEA), Cotton, Khadi, Ghiccha & Tussar',
    category_slug: 'fabric',
    is_enabled: true,
    sort_order: 6,
  },
  {
    id: 'chadar-gamcha',
    heading: 'Bhagalpuri Chadar, Gamcha & Lungis',
    subheading: 'Famous Bhagalpuri DULL Chadar, Modi Gamcha, Resham Gamcha & Pure Lungis',
    category_slug: 'chadar',
    is_enabled: true,
    sort_order: 7,
  },
  {
    id: 'suit-salwar',
    heading: 'Banarsi Suit Salwar & Dupattas',
    subheading: 'Artisanal 3-Piece Unstitched Suits & Handloom Zari Dupattas',
    category_slug: 'suit-salwar',
    is_enabled: true,
    sort_order: 8,
  },
  {
    id: 'about',
    heading: 'The 200-Year Pit-Loom Lineage',
    subheading: 'Linen Galaxy by A S Handloom • Under MD RAZA ALAM (Proprietor)',
    is_enabled: true,
    sort_order: 9,
  },
  {
    id: 'contact',
    heading: 'Online Order & Wholesale Inquiries',
    subheading: 'Direct Tracked Doorstep Delivery Across India & Global Cargo',
    is_enabled: true,
    sort_order: 10,
  },
]

export const DEFAULT_POLICIES: Record<string, { title: string; content: string; last_updated?: string }> = {
  'shipping-delivery': {
    title: 'Shipping & Delivery Policy',
    last_updated: 'November 2026',
    content: `At Linen Galaxy by A S Handloom, we take utmost care to ensure that your handloom sarees and fabric yardage reach you safely and promptly across India and abroad.

Dispatch Timeframe:
• Next Day Dispatch (NDD) items: Packed and handed over to express courier partners within 24 hours of order confirmation.
• Standard catalog weaves: Dispatched within 2 to 3 business days direct from our Bhagalpur loft.
• Custom woven bulk rolls: Production timelines communicated directly upon loom scheduling.

Delivery Estimates:
• Metro Cities: 2 to 4 business days.
• Rest of India: 4 to 6 business days.
• Remote & Northeast Pincodes: 5 to 7 business days.

Tracking & Packaging:
Once your parcel is dispatched, you will receive real-time tracking details via WhatsApp. All sarees and fabrics are packed in weather-sealed artisan boxes to preserve handloom texture during transit.

All orders are shipped via Blue Dart, DTDC, Delhivery, or Speed Post. For commercial wholesale orders, dedicated freight cargo services are arranged with GST e-way bills.`,
  },
  'refund-cancellation': {
    title: 'Refund & Cancellation Policy',
    last_updated: 'November 2026',
    content: `Our commitment is to deliver authentic, heirloom-quality handloom textiles. We stand behind every weave crafted at our pit-looms.

Cancellations:
• You may request cancellation of an order before it has been dispatched from our loft by contacting our WhatsApp support at +91 97981 41494.
• Once an order has been dispatched and handed to the courier partner, cancellation is no longer possible.

Returns & Replacements:
• In the rare event that you receive a damaged piece, transit defect, or incorrect weave, please notify us within 48 hours of delivery with unboxing photos or video.
• Approved returns will be replaced with an identical weave or a full refund issued to your bank account / UPI within 3 to 5 business days.
• Items must be in unwashed, unworn, original fold condition with all tags and packaging intact.
• Custom-cut fabric yardage (meter cuts from running bolts) and custom-dyed batches are prepared to specification and cannot be returned once cut.`,
  },
  'handloom-disclaimer': {
    title: 'Handloom Disclaimer Policy',
    last_updated: 'November 2026',
    content: `Handcrafted Authenticity:
Every saree, chadar, and meter of fabric at Linen Galaxy is woven by skilled artisans on traditional wooden pit-looms. Unlike mass-manufactured powerloom cloth, authentic handloom textiles naturally exhibit slight variations in weave density, subtle yarn slubs, texture nuances, and hand-block or hand-print positioning.

These characteristics are not defects; they are the proud hallmarks of human touch, heritage craftsmanship, and centuries-old weaving discipline.

Color Accuracy:
We photograph our weaves under natural balanced daylight to represent colors as faithfully as possible. However, subtle tone variations may occur across different smartphone or laptop screens due to display calibration.

Washing & Care Instructions:
• Pure Silk & Organza: Strictly Dry Clean recommended.
• Pure Linen & Khadi: Gentle hand wash in cold water using mild liquid detergent. Dry in shade.
• Dark or naturally dyed fabrics: May release excess surface dye during first wash. Wash separately.`,
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    last_updated: 'November 2026',
    content: `Linen Galaxy (A Unit of A S Handloom, Est. 2007) respects your privacy and is committed to protecting your personal information.

Information We Collect:
• Contact Information: Name, delivery address, phone number, and email address provided during order placement or WhatsApp inquiries.
• Transaction History: Details of products ordered and delivery status.

How We Use Your Information:
• To fulfill, dispatch, and track your orders.
• To provide customer service, order updates, and respond to your queries.
• We do NOT sell, rent, or trade your personal data with any third-party advertisers.

Data Security:
All customer records are securely stored and accessible only to authorized staff for fulfillment purposes. For any privacy queries or data deletion requests, contact us at ashandloombgp@gmail.com or +91 97981 41494.`,
  },
  'terms-of-service': {
    title: 'Terms of Service',
    last_updated: 'November 2026',
    content: `Welcome to Linen Galaxy. By accessing our website (ashandloom.in/linengalaxy) and ordering our handcrafted handloom textiles, you agree to these Terms of Service.

1. Artisan Production:
All items listed are crafted by handloom weavers. Specifications such as GSM, weight, and meterage are measured with care but may carry minor artisan tolerances.

2. Pricing & Commercials:
• Retail prices shown are inclusive of applicable taxes unless specified.
• Wholesale and B2B pricing is subject to Minimum Order Quantity (MOQ) and commercial GST invoicing (GSTIN 10AJXPA6956B1ZD).
• We reserve the right to revise prices or discontinue products based on raw silk and flax yarn market rates.

3. Intellectual Property:
All product photography, logo branding, weave descriptions, and editorial text are the exclusive property of Linen Galaxy by A S Handloom.

4. Governing Law:
Any legal disputes arising from transactions shall be subject to the exclusive jurisdiction of the competent courts in Bhagalpur, Bihar, India.`,
  },
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  show_prices: true,
  show_wholesale_prices: true,
  currency_symbol: '₹',
  business_name: 'Linen Galaxy',
  parent_company: 'A S Handloom',
  shop_image_url: '/assets/images/linen-galaxy-boutique.png',
  shop_address: '85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004',
  shop_description: 'Flagship Handloom & Linen Textile Store in the Silk City of India. Retail boutique & wholesale depot for pure sarees, linen shirting/suiting, and heritage pit-loom fabrics.',
  proprietor: 'MD RAZA ALAM',
  contact_phone: '+91 9430908657',
  whatsapp_number: '+91 9798141494',
  gstin: '10AJXPA6956B1ZD',
  homepage_sections: DEFAULT_HOMEPAGE_SECTIONS,
  policies: DEFAULT_POLICIES,
}
