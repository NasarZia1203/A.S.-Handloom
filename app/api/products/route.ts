import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getStoredProducts, upsertStoredProduct } from '@/lib/data/store-manager'
import type { Product } from '@/lib/types'

// GET — public and admin, returns products with flexible category and sub-type filtering
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const category = searchParams.get('category')
  const productType = searchParams.get('product_type')
  const limit = searchParams.get('limit')
  const admin = searchParams.get('admin') === 'true'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = parseInt(searchParams.get('per_page') || '10', 10)
  const search = searchParams.get('search') || ''
  const sortBy = searchParams.get('sort_by') || 'sort_order'
  const sortOrder = searchParams.get('sort_order') === 'desc' ? 'desc' : 'asc'

  // Load from robust store manager
  let allItems = getStoredProducts()

  // Try fetching fresh data from Supabase if available
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase.from('products').select('*')
    if (!error && data && data.length > 0) {
      // Merge with stored products to keep rich fields (price, gsm, weight)
      allItems = data.map((sbProd) => {
        const local = allItems.find((p) => p.id === sbProd.id || p.code === sbProd.code)
        return {
          ...local,
          ...sbProd,
          price: sbProd.price ?? local?.price,
          wholesale_price: sbProd.wholesale_price ?? local?.wholesale_price,
          gsm: sbProd.gsm ?? local?.gsm,
          weight: sbProd.weight ?? local?.weight,
          product_type: sbProd.product_type ?? local?.product_type,
          colors: sbProd.colors ?? local?.colors,
          sizes: sbProd.sizes ?? local?.sizes,
          variants: sbProd.variants ?? local?.variants,
        }
      })
    }
  } catch {
    // Continue with stored products
  }

  // Filter by active status
  let filtered = admin ? allItems : allItems.filter((p) => p.is_active)

  // Filter by category
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by sub-type
  if (productType && productType !== 'all') {
    filtered = filtered.filter((p) => 
      p.product_type?.toLowerCase() === productType.toLowerCase() ||
      p.description.toLowerCase().includes(productType.toLowerCase())
    )
  }

  // Filter by search query
  if (search) {
    const q = search.toLowerCase().trim()
    filtered = filtered.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.product_type && p.product_type.toLowerCase().includes(q)) ||
        (p.title && p.title.toLowerCase().includes(q))
    )
  }

  // Sorting
  filtered.sort((a, b) => {
    let aVal = (a as any)[sortBy]
    let bVal = (b as any)[sortBy]
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const total = filtered.length

  // Non-paginated public request
  if (!admin) {
    const limitNum = limit ? parseInt(limit, 10) : undefined
    const products = limitNum ? filtered.slice(0, limitNum) : filtered
    return NextResponse.json({
      products,
      total,
    })
  }

  // Paginated admin request
  const totalPages = Math.ceil(total / perPage) || 1
  const offset = (page - 1) * perPage
  const paginated = filtered.slice(offset, offset + perPage)

  return NextResponse.json({
    products: paginated,
    total,
    page,
    perPage,
    totalPages,
    hasMore: page < totalPages,
  })
}

// POST — creates or adds product with complete variant and specification support
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      code,
      title,
      description,
      image_url,
      secondary_image_url,
      additional_images,
      category,
      product_type,
      price,
      compare_at_price,
      wholesale_price,
      min_wholesale_qty,
      is_on_sale,
      is_ndd,
      is_out_of_stock,
      gsm,
      weight,
      colors,
      sizes,
      variants,
      is_active,
      sort_order,
    } = body

    if (!code || !description || !image_url || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: code, description, image_url, category' },
        { status: 400 }
      )
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      code: String(code).trim().toUpperCase(),
      title: title ? String(title).trim() : String(description).trim(),
      description: String(description).trim(),
      image_url,
      secondary_image_url: secondary_image_url ? String(secondary_image_url).trim() : undefined,
      additional_images: Array.isArray(additional_images) ? additional_images : [],
      category: String(category).trim().toLowerCase(),
      product_type: product_type ? String(product_type).trim() : undefined,
      price: price !== '' && price !== undefined ? Number(price) : undefined,
      compare_at_price: compare_at_price !== '' && compare_at_price !== undefined ? Number(compare_at_price) : undefined,
      wholesale_price: wholesale_price !== '' && wholesale_price !== undefined ? Number(wholesale_price) : undefined,
      min_wholesale_qty: min_wholesale_qty ? String(min_wholesale_qty).trim() : undefined,
      is_on_sale: Boolean(is_on_sale),
      is_ndd: Boolean(is_ndd),
      is_out_of_stock: Boolean(is_out_of_stock),
      gsm: gsm ? String(gsm).trim() : undefined,
      weight: weight ? String(weight).trim() : undefined,
      colors: Array.isArray(colors) ? colors : colors ? String(colors).split(',').map((c) => c.trim()) : undefined,
      sizes: Array.isArray(sizes) ? sizes : sizes ? String(sizes).split(',').map((s) => s.trim()) : undefined,
      variants: Array.isArray(variants) ? variants : undefined,
      is_active: is_active ?? true,
      sort_order: typeof sort_order === 'number' ? sort_order : 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Persist in store manager
    const saved = upsertStoredProduct(newProduct)

    // Also attempt write to Supabase if available
    try {
      const supabase = await createServerClient()
      await supabase.from('products').insert([
        {
          code: saved.code,
          description: saved.description,
          image_url: saved.image_url,
          category: saved.category,
          is_active: saved.is_active,
          sort_order: saved.sort_order,
        },
      ])
    } catch {
      // Supabase offline/migration fallback
    }

    return NextResponse.json(saved, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
