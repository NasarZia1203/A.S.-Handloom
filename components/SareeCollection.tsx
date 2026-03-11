import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import SareeClientWrapper from '@/components/SareeClientWrapper'

export default async function SareeCollection() {
  const supabase = await createServerClient()
  const { data: sarees } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'saree')
    .eq('is_active', true)
    .order('sort_order')

  // Limit to 10 items for carousel
  const displayedSarees = (sarees as Product[])?.slice(0, 10) || []
  const totalSarees = sarees?.length || 0

  return (
    <section id="sarees" className="section collections animate">
      <div className="container-image">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E91E63'
            }}
          >
            <i className="fas fa-star"></i>
            Premium Collection
          </div>
          <h2 className="section-title-saree" style={{ marginBottom: '16px' }}>
            Saree Collection
          </h2>
          <p style={{
            maxWidth: '600px',
            margin: '24px auto 0',
            color: 'var(--color-text-secondary)',
            fontSize: '18px',
            lineHeight: 1.7
          }}>
            Discover our exquisite range of handwoven sarees, each piece telling a unique story of tradition and elegance
          </p>
        </div>

        {/* Client-side interactive content */}
        <SareeClientWrapper 
          displayedSarees={displayedSarees} 
          totalSarees={totalSarees} 
        />
      </div>
    </section>
  )
}
