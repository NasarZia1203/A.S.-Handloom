import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ProductDetailClient from '@/components/ProductDetailClient'
import { getProductById, getStoredProducts, getSiteSettings } from '@/lib/data/store-manager'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import Link from 'next/link'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

const CATEGORY_SLUGS = [
  'saree',
  'sarees',
  'fabric',
  'fabrics',
  'chadar',
  'gamcha',
  'lungi',
  'suit-salwar',
  'dupatta-stole',
  'dupatta',
]

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function findProduct(id: string): Promise<Product | null> {
  // 1. Try local store manager
  const local = getProductById(id)
  if (local) return local

  // 2. Try Supabase by id (if UUID) or code
  try {
    const supabase = await createServerClient()
    let data = null

    if (UUID_REGEX.test(id)) {
      const { data: byId } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      data = byId
    }

    if (!data) {
      const { data: byCode } = await supabase
        .from('products')
        .select('*')
        .eq('code', id)
        .maybeSingle()
      data = byCode
    }

    if (data) {
      return {
        id: data.id,
        code: data.code,
        title: data.title || data.description,
        description: data.description,
        image_url: data.image_url,
        secondary_image_url: data.secondary_image_url,
        category: data.category,
        product_type: data.product_type,
        price: data.price ? Number(data.price) : undefined,
        compare_at_price: data.compare_at_price ? Number(data.compare_at_price) : undefined,
        wholesale_price: data.wholesale_price ? Number(data.wholesale_price) : undefined,
        min_wholesale_qty: data.min_wholesale_qty || '10 Pieces',
        is_on_sale: Boolean(data.is_on_sale),
        is_ndd: Boolean(data.is_ndd),
        is_out_of_stock: Boolean(data.is_out_of_stock),
        gsm: data.gsm,
        weight: data.weight,
        is_active: data.is_active ?? true,
        sort_order: data.sort_order ?? 0,
      } as Product
    }
  } catch (err) {
    // Supabase query fallback
  }

  return null
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  if (CATEGORY_SLUGS.includes(id.toLowerCase())) {
    return { title: 'Collections | Linen Galaxy' }
  }

  const product = await findProduct(id)
  const settings = getSiteSettings()

  if (!product) {
    return {
      title: 'Weave Details | Linen Galaxy',
    }
  }

  const title = `${product.title || product.description} (${product.code}) | ${settings.business_name || 'Linen Galaxy'}`
  const description = `${product.description} Handcrafted handloom weaves by ${settings.parent_company || 'A S Handloom'} in Bhagalpur.`

  return {
    title,
    description,
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params

  // If the URL is actually a category alias, redirect to the catalog with category query
  const lowerId = id.toLowerCase()
  if (CATEGORY_SLUGS.includes(lowerId)) {
    const targetCat = lowerId === 'sarees' ? 'saree' : lowerId === 'fabrics' ? 'fabric' : lowerId
    redirect(`/products?category=${targetCat}`)
  }

  const product = await findProduct(id)

  if (!product) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '140px', paddingBottom: '90px', minHeight: '80vh', textAlign: 'center', background: '#FFFFFF' }}>
          <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 24px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A7B6D' }}>
              Handloom Archive
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#1C1917', margin: '12px 0 16px' }}>
              Masterpiece Not Found
            </h1>
            <p style={{ color: '#6E6259', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '28px' }}>
              The weave or fabric design with identifier <strong style={{ color: '#1C1917' }}>[{id}]</strong> is either out of catalog or has not yet been registered in the artisan inventory.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/products"
                style={{
                  padding: '12px 24px',
                  borderRadius: '4px',
                  background: '#1C1917',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Browse All Collections
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppFloat />
      </>
    )
  }

  const allProducts = getStoredProducts()
  const settings = getSiteSettings()

  // Related products from the same category
  const relatedProducts = allProducts
    .filter((p) => p.is_active && p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  // Recently viewed
  const recentlyViewed = allProducts
    .filter((p) => p.is_active && p.id !== product.id && p.category !== product.category)
    .slice(0, 4)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', background: '#FFFFFF', minHeight: '90vh' }}>
        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts}
          recentlyViewed={recentlyViewed}
          settings={settings}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
