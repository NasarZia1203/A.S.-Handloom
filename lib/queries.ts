/**
 * Supabase query patterns for the products table.
 *
 * All queries assume the supabase client is imported from @/lib/supabase/client.
 * RLS handles access control automatically:
 *   - Anon users only see rows where is_active = true
 *   - Authenticated users see all rows
 */

import { createClient } from '@/lib/supabase/client'
import type { Product, ProductInsert, ProductUpdate } from './types'

function getSupabase() {
  return createClient()
}

// ──────────────────────────────────────────────
// PUBLIC PAGE QUERIES (anon role via RLS)
// ──────────────────────────────────────────────

/** Fetch active sarees ordered by sort_order (for the public saree carousel) */
export async function getActiveSarees() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'saree')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data as Product[]
}

/** Fetch active fabrics ordered by sort_order (for the public fabric carousel) */
export async function getActiveFabrics() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'fabric')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data as Product[]
}

// ──────────────────────────────────────────────
// ADMIN QUERIES (authenticated role via RLS)
// ──────────────────────────────────────────────

/** Fetch ALL products including inactive (admin dashboard) */
export async function getAllProducts() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data as Product[]
}

/** Insert a new product */
export async function insertProduct(product: ProductInsert) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

/** Update a product by id */
export async function updateProduct(id: string, updates: ProductUpdate) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

/** Hard delete a product by id */
export async function deleteProduct(id: string) {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/** Toggle is_active on a product */
export async function toggleProductActive(id: string, currentlyActive: boolean) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: !currentlyActive })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Product
}
