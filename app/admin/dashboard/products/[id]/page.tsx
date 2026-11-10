import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { getStoredProducts } from '@/lib/data/store-manager'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let product: Product | null = null

  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  try {
    const supabase = await createServerClient()
    if (UUID_REGEX.test(id)) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (!error && data) {
        product = data as Product
      }
    }

    if (!product) {
      const { data: byCode, error: errCode } = await supabase
        .from('products')
        .select('*')
        .eq('code', id)
        .maybeSingle()

      if (!errCode && byCode) {
        product = byCode as Product
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed in EditProductPage, falling back to local dataset:', err)
  }

  if (!product) {
    const stored = getStoredProducts().find((p) => p.id === id || p.code === id)
    if (stored) {
      product = stored
    }
  }

  if (!product) {
    notFound()
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link
          href="/admin/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748B',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '16px',
            transition: 'color 0.2s ease',
          }}
        >
          <i className="fas fa-arrow-left" style={{ fontSize: '11px', color: '#C5A059' }}></i>
          Back to Artisan Inventory
        </Link>
        <h1
          style={{
            fontSize: 'var(--font-size-xl, 26px)',
            fontFamily: 'var(--font-heading, "Playfair Display", serif)',
            fontWeight: 600,
            color: '#1E293B',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #C5A059 0%, #B76E79 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px -3px rgba(197, 160, 89, 0.4)',
            }}
          >
            <i className="fas fa-edit" style={{ color: 'white', fontSize: '16px' }}></i>
          </div>
          Edit Weave & Fabric Masterpiece
        </h1>
        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
          Refining design code:{' '}
          <span
            style={{
              fontWeight: 600,
              color: '#8A5A2B',
              background: 'rgba(197, 160, 89, 0.15)',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '13px',
            }}
          >
            {product.code}
          </span>
        </p>
      </div>
      
      <ProductForm
        initialValues={product}
        productId={id}
      />
    </div>
  )
}
