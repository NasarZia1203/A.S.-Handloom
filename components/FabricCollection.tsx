'use client'

import useSWR from 'swr'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const fabricTypes = [
  { name: 'Pure Linen Handloom (80/70/60 LEA)', icon: 'fas fa-wind', desc: 'Ultra-breathable flax shirting & heavy 25/33 LEA suiting' },
  { name: 'Bhagalpuri Tussar & Ghiccha', icon: 'fas fa-gem', desc: 'Regal golden sheen native to Bihar’s ancestral silkworm reeling' },
  { name: 'No. 1 Khadi & Cotton Mulmul', icon: 'fas fa-leaf', desc: 'Hand-spun, organic certified yardage for daily luxury tailoring' },
]

interface FabricCollectionProps {
  heading?: string
  subheading?: string
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function FabricCollection({
  heading = 'Pure Running Fabrics & Yardage',
  subheading = 'Linen Shirting (80/70/60 LEA), Suiting (25/33 LEA), Cotton, Khadi, Ghiccha & Tussar',
  showPrices = true,
  showWholesalePrices = true,
}: FabricCollectionProps = {}) {
  const { data, isLoading } = useSWR<{ products: Product[], total: number }>('/api/products?category=fabric&limit=16', fetcher)
  
  const displayedFabrics = data?.products || []
  const totalFabrics = data?.total ?? displayedFabrics.length

  return (
    <section id="fabrics" className="section-lux" style={{ background: '#FAF9F6', borderBottom: '1px solid #ECE7E1' }}>
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7B6D' }}>
            Running Yardage & Wholesale Bolts
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: '10px 0 14px', color: '#1C1917' }}>
            {heading}
          </h2>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: '#6E6259', margin: 0 }}>
            {subheading}. Supplying India’s top couturiers, apparel boutiques, and bespoke tailors. Available by the meter or in bulk commercial rolls.
          </p>
        </div>

        {/* 3 Weave Type Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}>
          {fabricTypes.map((type, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #ECE7E1',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  background: '#F0EBE5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1C1917',
                  fontSize: '16px',
                  flexShrink: 0,
                }}
              >
                <i className={type.icon}></i>
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1C1917', margin: '0 0 2px' }}>
                  {type.name}
                </h4>
                <p style={{ fontSize: '12px', color: '#6E6259', margin: 0 }}>
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Carousel or Clean Empty State */}
        {displayedFabrics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: '#6E6259' }}>
            <p style={{ fontSize: '15px', color: '#6E6259', margin: 0 }}>
              {isLoading ? 'Loading fabric yardage...' : 'No products yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="collection-carousel">
              <ProductCarousel
                items={displayedFabrics}
                variant="fabric"
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            </div>

            {/* View All & Order Button */}
            <div style={{ textAlign: 'center', marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/products?category=fabric"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
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
                <span>View All Fabrics ({totalFabrics})</span>
                <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
              </Link>

              <a
                href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20order%20Fabric%20swatches%20or%20inquire%20about%20roll%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  color: '#1C1917',
                  border: '1px solid #D7D0C6',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                <i className="fas fa-swatchbook" style={{ color: '#8A7B6D' }}></i>
                <span>Request Swatch Book</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
