import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'

export default async function FabricCollection() {
  const supabase = await createServerClient()
  const { data: fabrics } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'fabric')
    .eq('is_active', true)
    .order('sort_order')

  // Limit to 10 items for carousel
  const displayedFabrics = (fabrics as Product[])?.slice(0, 10) || []
  const totalFabrics = fabrics?.length || 0

  return (
    <section id="fabrics" className="section fabrics-collections ">
      <div className="container-image">
        <h2 className="section-title-fabric">Fabric Collection</h2>
        <div className="collection-carousel">
          <ProductCarousel
            items={displayedFabrics}
            variant="fabric"
          />
        </div>
        {totalFabrics > 10 && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              href="/products/fabrics"
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
              See All Fabrics
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
