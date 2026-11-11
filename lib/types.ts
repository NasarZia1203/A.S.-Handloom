// Database row type for the products table with full handloom variant & specification support
export interface ProductVariant {
  id?: string;
  name: string;
  color?: string;
  size?: string;
  gsm?: string;
  weight?: string;
  price?: number;
  wholesale_price?: number;
  in_stock?: boolean;
}

export interface Product {
  id: string;
  code: string;
  title?: string;
  description: string;
  image_url: string;
  secondary_image_url?: string; // Secondary image revealed on card hover
  additional_images?: string[];
  category: string; // 'saree' | 'fabric' | 'suit-salwar' | 'dupatta-stole' | 'chadar' | 'gamcha' | 'lungi' | custom
  product_type?: string; // sub-type e.g. "pure desi silk", "linen shirting 80 LEA", "Bhagalpuri DULL chadar"
  price?: number; // Retail price in INR
  wholesale_price?: number; // Wholesale/B2B bulk price in INR
  compare_at_price?: number; // Original strike-through MRP for sale display
  is_on_sale?: boolean; // Puts product in Flash Sale / Clearance
  is_ndd?: boolean; // Next Day Dispatch (ready in loft)
  is_out_of_stock?: boolean; // Mark product as Sold Out / Out of Stock
  rating?: number; // Customer rating (e.g. 4.9)
  reviews_count?: number; // Review count (e.g. 18)
  min_wholesale_qty?: string; // e.g. "10 Pieces" or "50 Meters"
  gsm?: string; // e.g. "80 LEA", "140 GSM", "60 LEA", "33 LEA"
  weight?: string; // e.g. "450g", "600g", "250g"
  colors?: string[]; // e.g. ["Natural Gold", "Lotus Blush", "Sage Green"]
  sizes?: string[]; // e.g. ["Standard Saree 6.3m (with blouse)", "Running Yardage (54\" width)"]
  variants?: ProductVariant[];
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductInsert {
  code: string;
  title?: string;
  description: string;
  image_url: string;
  secondary_image_url?: string;
  additional_images?: string[];
  category: string;
  product_type?: string;
  price?: number;
  wholesale_price?: number;
  compare_at_price?: number;
  is_on_sale?: boolean;
  is_ndd?: boolean;
  is_out_of_stock?: boolean;
  rating?: number;
  reviews_count?: number;
  min_wholesale_qty?: string;
  gsm?: string;
  weight?: string;
  colors?: string[];
  sizes?: string[];
  variants?: ProductVariant[];
  is_active?: boolean;
  sort_order?: number;
}

export interface ProductUpdate {
  code?: string;
  title?: string;
  description?: string;
  image_url?: string;
  secondary_image_url?: string;
  additional_images?: string[];
  category?: string;
  product_type?: string;
  price?: number;
  wholesale_price?: number;
  compare_at_price?: number;
  is_on_sale?: boolean;
  is_ndd?: boolean;
  is_out_of_stock?: boolean;
  rating?: number;
  reviews_count?: number;
  min_wholesale_qty?: string;
  gsm?: string;
  weight?: string;
  colors?: string[];
  sizes?: string[];
  variants?: ProductVariant[];
  is_active?: boolean;
  sort_order?: number;
}

// Categories & Weave Types
export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  types: string[]; // List of sub-types / weaves for this category
  is_active: boolean;
  sort_order: number;
}

// Modular Homepage Section Configuration
export interface HomepageSectionConfig {
  id: string; // 'hero' | 'wholesale-retail' | 'sarees' | 'fabrics' | 'heritage-weaves' | 'suit-salwar' | 'about' | 'contact'
  heading: string;
  subheading: string;
  category_slug?: string;
  is_enabled: boolean;
  sort_order: number;
}

// Store Outlets & Physical Boutiques
export interface StoreOutlet {
  id: string;
  name: string;
  tagline?: string;
  badge?: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  hours?: string;
  image_url: string;
  map_url?: string;
  is_active: boolean;
}

// Global Website Settings
export interface SiteSettings {
  show_prices: boolean; // Website-wide price toggle!
  show_wholesale_prices: boolean;
  currency_symbol: string;
  business_name: string; // "A S Handloom"
  parent_company?: string; // "A S Handloom"
  shop_image_url?: string; // Hero shop photo url
  shop_address?: string; // Flagship shop location
  shop_description?: string; // Shop overview
  proprietor: string;
  contact_phone: string;
  whatsapp_number: string;
  gstin: string;
  homepage_sections: HomepageSectionConfig[];
  outlets?: StoreOutlet[];
  policies?: Record<string, { title: string; content: string; last_updated?: string }>;
}
