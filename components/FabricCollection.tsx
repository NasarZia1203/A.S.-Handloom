import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import FabricClientWrapper from '@/components/FabricClientWrapper'

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
    <section id="fabrics" className="section fabrics-collections animate">
      <div className="container-image">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#FF9800'
            }}
          >
            <i className="fas fa-scroll"></i>
            Premium Fabrics
          </div>
          <h2 className="section-title-fabric" style={{ marginBottom: '16px' }}>
            Fabric Collection
          </h2>
          <p style={{
            maxWidth: '600px',
            margin: '24px auto 0',
            color: 'var(--color-text-secondary)',
            fontSize: '18px',
            lineHeight: 1.7
          }}>
            Explore our premium range of handwoven fabrics - from luxurious Linen to elegant Silk and comfortable Cotton
          </p>
        </div>

        {/* Client-side interactive content */}
        <FabricClientWrapper 
          displayedFabrics={displayedFabrics} 
          totalFabrics={totalFabrics} 
        />
      </div>
    </section>
  )
}
