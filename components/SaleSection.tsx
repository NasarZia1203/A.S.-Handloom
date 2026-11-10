'use client'

import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface SaleSectionProps {
  heading?: string
  subheading?: string
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function SaleSection({
  heading = 'Clearance & Flash Sale',
  subheading = 'Special discounts on handloom sarees, linen fabrics, and traditional weaves',
  showPrices = true,
  showWholesalePrices = true,
}: SaleSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'saree' | 'fabric' | 'heritage'>('all')

  const { data, isLoading } = useSWR<{ products: Product[] }>('/api/products?limit=100', fetcher)

  const rawProducts = data?.products || []

  // Filter products on sale or with a compare_at_price
  const saleProducts = rawProducts.filter(
    (p) => p.is_on_sale || (p.compare_at_price && p.price && p.compare_at_price > p.price)
  )

  const displayedPool = saleProducts

  const filteredItems = displayedPool.filter((p) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'saree') return p.category === 'saree'
    if (activeFilter === 'fabric') return p.category === 'fabric'
    if (activeFilter === 'heritage') return ['chadar', 'gamcha', 'lungi', 'suit-salwar', 'dupatta-stole'].includes(p.category)
    return true
  })

  return (
    <section
      id="sale"
      className="section-lux"
      style={{
        background: '#FFFDFD',
        borderTop: '1px solid #FEE2E2',
        borderBottom: '1px solid #FEE2E2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              margin: '0 auto 14px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1.5px solid #FCA5A5',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.16)',
            }}
          >
            <Image
              src="/assets/images/sale-circle.png"
              alt="Sale"
              fill
              sizes="64px"
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: '0 0 10px', color: '#1C1917' }}>
            Clearance & Flash Sale
          </h2>

          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#6E6259', margin: 0 }}>
            Special discounts and offers on sarees, linen fabrics, and traditional weaves.
          </p>
        </div>

        {/* Filter Pills (Only if there are sale products) */}
        {displayedPool.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { id: 'all', label: `All Clearance Weaves (${displayedPool.length})` },
              { id: 'saree', label: 'Clearance Sarees' },
              { id: 'fabric', label: 'Linen Yardage' },
              { id: 'heritage', label: 'Chadar, Gamcha & Suits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: activeFilter === tab.id ? '1px solid #DC2626' : '1px solid #E5E7EB',
                  background: activeFilter === tab.id ? '#FEE2E2' : '#FFFFFF',
                  color: activeFilter === tab.id ? '#991B1B' : '#4B5563',
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
              {isLoading ? 'Loading clearance offers...' : 'No products yet'}
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
              href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20inquire%20about%20Clearance%20and%20Sale%20handloom%20deals."
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
              <span>Inquire Clearance Deals on WhatsApp</span>
            </a>

            <Link
              href="/products?sale=true"
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
              <span>Explore All Clearance Cuts</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
