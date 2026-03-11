import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'

export default async function SareeCollection() {
  const supabase = await createServerClient()
  const { data: sarees } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'saree')
    .eq('is_active', true)
    .order('sort_order')

  console.log('[SareeCollection] Fetched sarees:', sarees?.length || 0)
  if (sarees?.length) {
    console.log('[SareeCollection] First saree:', sarees[0])
  }

  // Limit to 10 items for carousel
  const displayedSarees = (sarees as Product[])?.slice(0, 10) || []
  const totalSarees = sarees?.length || 0

  return (
    <section id="sarees" className="section collections animate">
      <div className="container-image">
        <h2 className="section-title-saree">Saree Collection</h2>
        <div className="collection-carousel">
          <ProductCarousel items={displayedSarees} variant="saree" />
        </div>
        {totalSarees > 10 && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              href="/products/sarees"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'background 0.3s',
              }}
            >
              See All Sarees
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
