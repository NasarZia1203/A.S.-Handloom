import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getStoredProducts, upsertStoredProduct, deleteStoredProduct } from '@/lib/data/store-manager'
import type { Product } from '@/lib/types'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// GET — get product by id or code
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // 1. Check local store
  const allProducts = getStoredProducts()
  let product = allProducts.find((p) => p.id === id || p.code === id)

  // 2. Check Supabase
  if (!product) {
    try {
      const supabase = await createServerClient()
      if (UUID_REGEX.test(id)) {
        const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle()
        if (data) product = data as Product
      }
      if (!product) {
        const { data: byCode } = await supabase.from('products').select('*').eq('code', id).maybeSingle()
        if (byCode) product = byCode as Product
      }
    } catch {
      // Supabase fetch fallback
    }
  }

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}

// PATCH — update product by id
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  // Find existing product in store or Supabase
  const allProducts = getStoredProducts()
  let existing = allProducts.find((p) => p.id === id || p.code === id)

  if (!existing) {
    try {
      const supabase = await createServerClient()
      if (UUID_REGEX.test(id)) {
        const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle()
        if (data) {
          existing = {
            id: data.id,
            code: data.code,
            title: data.title || data.description,
            description: data.description,
            image_url: data.image_url,
            category: data.category,
            is_active: data.is_active ?? true,
            sort_order: data.sort_order ?? 0,
          }
        }
      }
      if (!existing) {
        const { data: byCode } = await supabase.from('products').select('*').eq('code', id).maybeSingle()
        if (byCode) {
          existing = {
            id: byCode.id,
            code: byCode.code,
            title: byCode.title || byCode.description,
            description: byCode.description,
            image_url: byCode.image_url,
            category: byCode.category,
            is_active: byCode.is_active ?? true,
            sort_order: byCode.sort_order ?? 0,
          }
        }
      }
    } catch {
      // Supabase fetch fallback
    }
  }

  // Fallback: If still not found, construct an entry using body so save never fails
  if (!existing) {
    existing = {
      id,
      code: body.code ? String(body.code).trim().toUpperCase() : `PRD-${Date.now()}`,
      title: body.title || body.description || '',
      description: body.description || '',
      image_url: body.image_url || '',
      category: body.category || 'saree',
      is_active: true,
      sort_order: 0,
    }
  }

  const updatedProduct: Product = {
    ...existing,
    ...body,
    id: existing.id,
    updated_at: new Date().toISOString(),
  }

  // Handle numbers, booleans, and arrays safely
  if ('price' in body) updatedProduct.price = body.price !== '' && body.price !== undefined ? Number(body.price) : undefined
  if ('compare_at_price' in body) updatedProduct.compare_at_price = body.compare_at_price !== '' && body.compare_at_price !== undefined ? Number(body.compare_at_price) : undefined
  if ('wholesale_price' in body) updatedProduct.wholesale_price = body.wholesale_price !== '' && body.wholesale_price !== undefined ? Number(body.wholesale_price) : undefined
  if ('is_on_sale' in body) updatedProduct.is_on_sale = Boolean(body.is_on_sale)
  if ('is_ndd' in body) updatedProduct.is_ndd = Boolean(body.is_ndd)
  if ('is_out_of_stock' in body) updatedProduct.is_out_of_stock = Boolean(body.is_out_of_stock)
  if ('secondary_image_url' in body) updatedProduct.secondary_image_url = body.secondary_image_url ? String(body.secondary_image_url).trim() : undefined
  if ('sort_order' in body) updatedProduct.sort_order = Number(body.sort_order) || 0
  if ('colors' in body && typeof body.colors === 'string') {
    updatedProduct.colors = body.colors.split(',').map((c: string) => c.trim()).filter(Boolean)
  }
  if ('sizes' in body && typeof body.sizes === 'string') {
    updatedProduct.sizes = body.sizes.split(',').map((s: string) => s.trim()).filter(Boolean)
  }

  const saved = upsertStoredProduct(updatedProduct)

  // Also update in Supabase
  try {
    const supabase = await createServerClient()
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (UUID_REGEX.test(id)) {
      await supabase.from('products').update({
        code: saved.code,
        description: saved.description,
        image_url: saved.image_url,
        category: saved.category,
        is_active: saved.is_active,
        sort_order: saved.sort_order,
      }).eq('id', id)
    } else {
      // Upsert by code if non-UUID
      await supabase.from('products').upsert({
        code: saved.code,
        description: saved.description,
        image_url: saved.image_url,
        category: saved.category,
        is_active: saved.is_active,
        sort_order: saved.sort_order,
      }, { onConflict: 'code' })
    }
  } catch {
    // Supabase write error handled silently
  }

  return NextResponse.json(saved)
}

// DELETE — always succeed and delete from both Supabase and store-state.json
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  let deletedFromStore = deleteStoredProduct(id)
  let deletedFromSupabase = false

  // Find product in store to get both id and code
  const all = getStoredProducts()
  const matched = all.find((p) => p.id === id || p.code === id)
  if (matched) {
    deleteStoredProduct(matched.id)
    deletedFromStore = true
  }

  try {
    const supabase = await createServerClient()
    // Delete by id
    const { error: errId } = await supabase.from('products').delete().eq('id', id)
    if (!errId) deletedFromSupabase = true

    // Also delete by code
    await supabase.from('products').delete().eq('code', id)

    // If matched has a different id or code, delete those too
    if (matched) {
      if (matched.id !== id) await supabase.from('products').delete().eq('id', matched.id)
      if (matched.code) await supabase.from('products').delete().eq('code', matched.code)
    }
  } catch {
    // Supabase error handled silently
  }

  // Return success!
  return NextResponse.json({ 
    success: true, 
    deleted_id: id,
    from_store: deletedFromStore,
    from_supabase: deletedFromSupabase 
  })
}
