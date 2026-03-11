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

        {/* Fabric Types */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {[
            { name: 'Linen', icon: 'fas fa-wind', color: '#FF9800' },
            { name: 'Silk', icon: 'fas fa-gem', color: '#E91E63' },
            { name: 'Cotton', icon: 'fas fa-leaf', color: '#4CAF50' }
          ].map((type, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                background: 'white',
                borderRadius: '50px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: `${type.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: type.color
              }}>
                <i className={type.icon}></i>
              </div>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{type.name}</span>
            </div>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="collection-carousel" style={{ padding: '0 24px' }}>
          <ProductCarousel items={displayedFabrics} variant="fabric" />
        </div>

        {/* See All Button */}
        {totalFabrics > 10 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              href="/products/fabrics"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #FF9800 0%, #FF5722 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 25px -8px rgba(255, 152, 0, 0.4)'
              }}
            >
              View All Fabrics
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 12px',
                borderRadius: '50px',
                fontSize: '14px'
              }}>
                {totalFabrics}
              </span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        )}

        {/* Trust Banner */}
        <div style={{
          marginTop: '64px',
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05) 0%, rgba(255, 152, 0, 0.05) 100%)',
          borderRadius: '24px',
          border: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: 'fas fa-truck', text: 'Pan India Delivery' },
            { icon: 'fas fa-shield-alt', text: 'Authentic Handloom' },
            { icon: 'fas fa-hand-holding-heart', text: 'Artisan Made' },
            { icon: 'fas fa-exchange-alt', text: 'Easy Returns' }
          ].map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--color-text-secondary)'
              }}
            >
              <i className={item.icon} style={{ color: '#E91E63', fontSize: '20px' }}></i>
              <span style={{ fontWeight: 500, fontSize: '14px' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
