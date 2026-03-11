-- ============================================================
-- Seed: Insert 32 products (16 sarees + 16 fabrics)
-- Image URLs are placeholders until Cloudinary upload is done
-- ============================================================

insert into public.products (code, description, image_url, category, sort_order) values
  -- Sarees (SAR1001 - SAR1016)
  ('SAR1001', 'White Elegant Saree',           'https://res.cloudinary.com/placeholder/saree1.webp',  'saree',  1),
  ('SAR1002', 'Mint Green Handloom Saree',     'https://res.cloudinary.com/placeholder/saree2.webp',  'saree',  2),
  ('SAR1003', 'Pastel Pink Soft Cotton Saree',  'https://res.cloudinary.com/placeholder/saree3.webp',  'saree',  3),
  ('SAR1004', 'Blue Cotton Handloom Saree',    'https://res.cloudinary.com/placeholder/saree4.webp',  'saree',  4),
  ('SAR1005', 'Pink Banarasi Saree',           'https://res.cloudinary.com/placeholder/saree5.webp',  'saree',  5),
  ('SAR1006', 'Yellow Linen Saree',            'https://res.cloudinary.com/placeholder/saree6.webp',  'saree',  6),
  ('SAR1007', 'Red Bridal Saree',              'https://res.cloudinary.com/placeholder/saree7.webp',  'saree',  7),
  ('SAR1008', 'Purple Designer Saree',         'https://res.cloudinary.com/placeholder/saree8.webp',  'saree',  8),
  ('SAR1009', 'Beige Classic Saree',           'https://res.cloudinary.com/placeholder/saree9.webp',  'saree',  9),
  ('SAR1010', 'Green Festive Saree',           'https://res.cloudinary.com/placeholder/saree10.webp', 'saree', 10),
  ('SAR1011', 'Ivory Chanderi Saree',          'https://res.cloudinary.com/placeholder/saree11.webp', 'saree', 11),
  ('SAR1012', 'Golden Zari Saree',             'https://res.cloudinary.com/placeholder/saree12.webp', 'saree', 12),
  ('SAR1013', 'Peach Soft Cotton Saree',       'https://res.cloudinary.com/placeholder/saree13.webp', 'saree', 13),
  ('SAR1014', 'Grey Linen Saree',              'https://res.cloudinary.com/placeholder/saree14.webp', 'saree', 14),
  ('SAR1015', 'Royal Blue Silk Saree',         'https://res.cloudinary.com/placeholder/saree15.webp', 'saree', 15),
  ('SAR1016', 'Orange Silk Wedding Saree',     'https://res.cloudinary.com/placeholder/saree16.webp', 'saree', 16),

  -- Fabrics (FAB3001 - FAB3016)
  ('FAB3001', 'Light Blue Linen Fabric',                       'https://res.cloudinary.com/placeholder/fabric1.webp',  'fabric',  1),
  ('FAB3002', 'Grey Pure Linen Fabric',                        'https://res.cloudinary.com/placeholder/fabric2.webp',  'fabric',  2),
  ('FAB3003', 'Milk White Linen Handloom Fabric',              'https://res.cloudinary.com/placeholder/fabric3.webp',  'fabric',  3),
  ('FAB3004', 'Peach Linen-Cotton Fabric',                     'https://res.cloudinary.com/placeholder/fabric4.webp',  'fabric',  4),
  ('FAB3005', 'Yellow Linen Fabric',                           'https://res.cloudinary.com/placeholder/fabric5.webp',  'fabric',  5),
  ('FAB3006', 'Chocolate Brown Linen Fabric',                  'https://res.cloudinary.com/placeholder/fabric6.webp',  'fabric',  6),
  ('FAB3007', 'Premium Pink Linen Fabric',                     'https://res.cloudinary.com/placeholder/fabric7.webp',  'fabric',  7),
  ('FAB3008', 'Lime Handloom Linen Fabric',                    'https://res.cloudinary.com/placeholder/fabric8.webp',  'fabric',  8),
  ('FAB3009', 'Orange Linen-Cotton Fabric',                    'https://res.cloudinary.com/placeholder/fabric9.webp',  'fabric',  9),
  ('FAB3010', 'Light Yellow Linen Fabric',                     'https://res.cloudinary.com/placeholder/fabric10.webp', 'fabric', 10),
  ('FAB3011', 'Light Purple Linen Fabric',                     'https://res.cloudinary.com/placeholder/fabric11.webp', 'fabric', 11),
  ('FAB3012', 'Premium Moss Green Linen-Cotton Fabric',        'https://res.cloudinary.com/placeholder/fabric12.webp', 'fabric', 12),
  ('FAB3013', 'Premium Jet Black Handloom Linen Fabric',       'https://res.cloudinary.com/placeholder/fabric13.webp', 'fabric', 13),
  ('FAB3014', 'Maroon Linen-Cotton Fabric',                    'https://res.cloudinary.com/placeholder/fabric14.webp', 'fabric', 14),
  ('FAB3015', 'Premium Sky Blue Linen Fabric',                 'https://res.cloudinary.com/placeholder/fabric15.webp', 'fabric', 15),
  ('FAB3016', 'Dark Peach Linen Fabric',                       'https://res.cloudinary.com/placeholder/fabric16.webp', 'fabric', 16);
