import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// GET — public, returns active products with optional filtering
export async function GET(request: Request) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  
  const category = searchParams.get('category')
  const limit = searchParams.get('limit')
  
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
  
  // Apply category filter if provided
  if (category) {
    query = query.eq('category', category)
  }
  
  query = query.order('sort_order', { ascending: true })
  
  const { data, error, count } = await query

  if (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }

  // Apply limit if provided
  const limitNum = limit ? parseInt(limit, 10) : undefined
  const products = limitNum && data ? data.slice(0, limitNum) : data

  return NextResponse.json({ 
    products: products || [], 
    total: count || 0 
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
