'use client'

import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface NDDSectionProps {
  heading?: string
  subheading?: string
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function NDDSection({
  heading = 'Next Day Dispatch (NDD)',
  subheading = 'Ready-in-Loft Handloom Sarees & Fabrics Dispatched Within 24 Hours Across India',
  showPrices = true,
  showWholesalePrices = true,
}: NDDSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'saree' | 'fabric' | 'chadar'>('all')

  const { data, isLoading } = useSWR<{ products: Product[] }>('/api/products?limit=100', fetcher)

  const rawProducts = data?.products || []

  // Filter products marked as NDD
  const nddProducts = rawProducts.filter((p) => p.is_ndd)
  const displayedPool = nddProducts

  const filteredItems = displayedPool.filter((p) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'saree') return p.category === 'saree'
    if (activeCategory === 'fabric') return p.category === 'fabric'
    if (activeCategory === 'chadar') return ['chadar', 'gamcha', 'lungi'].includes(p.category)
    return true
  })

  return (
    <section
      id="ndd"
      className="section-lux"
      style={{
        background: '#FAFDF9',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '4px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
            <span>Ready-to-Ship Inventory Guarantee</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: '8px 0 14px', color: '#1C1917' }}>
            {heading}
          </h2>

          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: '#6E6259', margin: 0 }}>
            {subheading}. No weaving delays. These authentic Bhagalpur handloom treasures are already woven and certified in our loft, ready for courier pickup tomorrow morning.
          </p>
        </div>

        {/* 3 Quick NDD Guarantee Micro-Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {[
            {
              icon: 'fas fa-clock',
              title: '24-Hour Loft Dispatch',
              desc: 'Packed & handed to courier partners within 24 hours of order confirmation',
            },
            {
              icon: 'fas fa-plane-departure',
              title: 'Pan-India Express Air',
              desc: 'Doorstep tracked delivery in 2–3 days for metro cities, 3–5 days all pincodes',
            },
            {
              icon: 'fas fa-certificate',
              title: 'Pre-Inspected Pure Weaves',
              desc: 'Inspected for flawless pit-loom finish, certified Bhagalpur handloom authenticity',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px 20px',
                borderRadius: '6px',
                background: '#FFFFFF',
                border: '1px solid #ECE7E1',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  background: '#ECFDF5',
                  color: '#047857',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                <i className={pillar.icon}></i>
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1C1917', margin: '0 0 2px' }}>
                  {pillar.title}
                </h4>
                <p style={{ fontSize: '12px', color: '#6E6259', margin: 0, lineHeight: 1.35 }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter Pills (Only if there are NDD products) */}
        {displayedPool.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { id: 'all', label: `All Ready Stock (${displayedPool.length})` },
              { id: 'saree', label: 'NDD Sarees' },
              { id: 'fabric', label: 'NDD Fabric Rolls' },
              { id: 'chadar', label: 'NDD Chadar & Gamcha' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: activeCategory === tab.id ? '1px solid #047857' : '1px solid #D7D0C6',
                  background: activeCategory === tab.id ? '#ECFDF5' : '#FFFFFF',
                  color: activeCategory === tab.id ? '#065F46' : '#4B5563',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Products Grid or Clean Empty State */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: '#6E6259' }}>
            <p style={{ fontSize: '15px', color: '#6E6259', margin: 0 }}>
              {isLoading ? 'Checking loft stock...' : 'No products yet'}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '24px',
              marginBottom: '36px',
            }}
          >
            {filteredItems.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            ))}
          </div>
        )}

        {/* Direct Order Bar */}
        {filteredItems.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20need%20Next%20Day%20Dispatch%20(NDD)%20items%20delivered%20urgently."
              target="_blank"
              rel="noopener noreferrer"
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
              <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>
              <span>Request Immediate NDD Dispatch</span>
            </a>

            <Link
              href="/products?ndd=true"
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
              <span>Browse All NDD Weaves</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
