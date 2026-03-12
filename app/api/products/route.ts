import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// GET — public, returns active products with optional filtering
export async function GET(request: Request) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  
  const category = searchParams.get('category')
  const limit = searchParams.get('limit')
  const admin = searchParams.get('admin') === 'true'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = parseInt(searchParams.get('per_page') || '10', 10)
  const search = searchParams.get('search') || ''
  const sortBy = searchParams.get('sort_by') || 'sort_order'
  const sortOrder = searchParams.get('sort_order') === 'desc' ? 'desc' : 'asc'
  
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
  
  // If not admin, only show active products
  if (!admin) {
    query = query.eq('is_active', true)
  }
  
  // Apply category filter if provided
  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  
  // Apply search filter if provided
  if (search) {
    query = query.or(`code.ilike.%${search}%,description.ilike.%${search}%`)
  }
  
  // Apply sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' })
  
  // For non-paginated requests (public API), use limit
  if (!admin) {
    const limitNum = limit ? parseInt(limit, 10) : undefined
    const { data, error, count } = await query

    if (error) {
      console.error('Product fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    const products = limitNum && data ? data.slice(0, limitNum) : data
    return NextResponse.json({ 
      products: products || [], 
      total: count || 0 
    })
  }
  
  // For admin dashboard, apply pagination
  const offset = (page - 1) * perPage
  query = query.range(offset, offset + perPage - 1)
  
  const { data, error, count } = await query

  if (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }

  const totalPages = Math.ceil((count || 0) / perPage)

  return NextResponse.json({ 
    products: data || [],
    total: count || 0,
    page,
    perPage,
    totalPages,
    hasMore: page < totalPages
  })
}

// POST — protected (middleware checks auth), creates product
export async function POST(request: Request) {
  const supabase = await createServerClient()

  const body = await request.json()
  const { code, description, image_url, category, is_active, sort_order } = body

  if (!code || !description || !image_url || !category) {
    return NextResponse.json(
      { error: 'Missing required fields: code, description, image_url, category' },
      { status: 400 }
    )
  }

  // Validate category against allowed values
  const ALLOWED_CATEGORIES = ['saree', 'fabric'] as const
  if (!ALLOWED_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: 'Invalid category. Allowed values: saree, fabric' },
      { status: 400 }
    )
  }

  // Validate image_url is a valid HTTPS URL
  if (typeof image_url !== 'string' || !image_url.startsWith('https://')) {
    return NextResponse.json(
      { error: 'image_url must be a valid HTTPS URL' },
      { status: 400 }
    )
  }

  // Validate and coerce sort_order to integer
  const parsedSortOrder = Number.isFinite(Number(sort_order)) ? Math.floor(Number(sort_order)) : 0

  const { data, error } = await supabase
    .from('products')
    .insert({
      code,
      description,
      image_url,
      category,
      is_active: is_active ?? true,
      sort_order: parsedSortOrder,
    })
    .select()
    .single()

  if (error) {
    console.error('Product insert error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
