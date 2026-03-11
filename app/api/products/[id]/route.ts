import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// PATCH — update product (protected by middleware)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createServerClient()

  const body = await request.json()

  // Whitelist allowed fields to prevent setting arbitrary columns
  const ALLOWED_FIELDS = ['code', 'description', 'image_url', 'category', 'is_active', 'sort_order'] as const
  const sanitized: Record<string, unknown> = {}
  for (const key of ALLOWED_FIELDS) {
    if (key in body) {
      sanitized[key] = body[key]
    }
  }

  if (Object.keys(sanitized).length === 0) {
    return NextResponse.json(
      { error: 'No valid fields provided. Allowed: code, description, image_url, category, is_active, sort_order' },
      { status: 400 }
    )
  }

  // Validate category if provided
  if ('category' in sanitized) {
    const ALLOWED_CATEGORIES = ['saree', 'fabric'] as const
    if (!ALLOWED_CATEGORIES.includes(sanitized.category as any)) {
      return NextResponse.json(
        { error: 'Invalid category. Allowed values: saree, fabric' },
        { status: 400 }
      )
    }
  }

  // Validate image_url if provided
  if ('image_url' in sanitized) {
    if (typeof sanitized.image_url !== 'string' || !sanitized.image_url.startsWith('https://')) {
      return NextResponse.json(
        { error: 'image_url must be a valid HTTPS URL' },
        { status: 400 }
      )
    }
  }

  // Validate and coerce sort_order if provided
  if ('sort_order' in sanitized) {
    const parsed = Number(sanitized.sort_order)
    sanitized.sort_order = Number.isFinite(parsed) ? Math.floor(parsed) : 0
  }

  // Validate id is a valid UUID format
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('products')
    .update(sanitized)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Product update error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }

  return NextResponse.json(data)
}

// DELETE — delete product (protected by middleware)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createServerClient()

  // Validate id is a valid UUID format
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
  }

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Product delete error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
