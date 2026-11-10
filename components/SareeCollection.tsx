'use client'

import useSWR from 'swr'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface SareeCollectionProps {
  heading?: string
  subheading?: string
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function SareeCollection({
  heading = 'Exquisite Handloom Sarees',
  subheading = 'Pure Desi Silk, Pure Linen, Moonga Silk, Pure Organza, Viscose & Kota Sarees',
  showPrices = true,
  showWholesalePrices = true,
}: SareeCollectionProps = {}) {
  const { data, isLoading } = useSWR<{ products: Product[], total: number }>('/api/products?category=saree&limit=16', fetcher)
  
  const displayedSarees = data?.products || []
  const totalSarees = data?.total ?? displayedSarees.length

  return (
    <section id="sarees" className="section-lux" style={{ background: '#FFFFFF', borderBottom: '1px solid #ECE7E1' }}>
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7B6D' }}>
            Pure Bhagalpuri Tussar, Moonga & Banarasi Weaves
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: '10px 0 14px', color: '#1C1917' }}>
            {heading}
          </h2>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: '#6E6259', margin: 0 }}>
            {subheading}. Every saree is woven on ancestral pit-looms by Bhagalpur artisans. Available for retail purchase with doorstep delivery, or in wholesale quantities.
          </p>
        </div>

        {/* Product Carousel or Clean Empty State */}
        {displayedSarees.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: '#6E6259' }}>
            <p style={{ fontSize: '15px', color: '#6E6259', margin: 0 }}>
              {isLoading ? 'Loading handloom sarees...' : 'No products yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="collection-carousel">
              <ProductCarousel
                items={displayedSarees}
                variant="saree"
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            </div>

            {/* View All & Order Button */}
            <div style={{ textAlign: 'center', marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/products?category=saree"
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
                <span>Explore Saree Catalog ({totalSarees})</span>
                <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
              </Link>

              <a
                href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20order%20handloom%20sarees."
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
                <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
