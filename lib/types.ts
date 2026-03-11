// Database row type for the products table
export interface Product {
  id: string;
  code: string;
  description: string;
  image_url: string;
  category: 'saree' | 'fabric';
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// For inserting a new product (id, created_at, updated_at are auto-generated)
export interface ProductInsert {
  code: string;
  description: string;
  image_url: string;
  category: 'saree' | 'fabric';
  is_active?: boolean;
  sort_order?: number;
}

// For updating a product (all fields optional)
export interface ProductUpdate {
  code?: string;
  description?: string;
  image_url?: string;
  category?: 'saree' | 'fabric';
  is_active?: boolean;
  sort_order?: number;
}
