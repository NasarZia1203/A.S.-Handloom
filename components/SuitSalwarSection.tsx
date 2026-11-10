'use client'

import { useState } from 'react'
import useSWR from 'swr'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface SuitSalwarSectionProps {
  heading?: string
  subheading?: string
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function SuitSalwarSection({
  heading = 'Banarsi Suit Salwar & Dupattas',
  subheading = 'Artisanal 3-Piece Unstitched Suits & Handloom Zari Dupattas',
  showPrices = true,
  showWholesalePrices = true,
}: SuitSalwarSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'suits' | 'dupattas'>('all')

  const { data: suitData, isLoading: loadingS } = useSWR<{ products: Product[] }>('/api/products?category=suit-salwar', fetcher)
  const { data: dupattaData, isLoading: loadingD } = useSWR<{ products: Product[] }>('/api/products?category=dupatta-stole', fetcher)

  const suits = suitData?.products || []
  const dupattas = dupattaData?.products || []

  const allItems = [...suits, ...dupattas]
  const isLoading = loadingS || loadingD

  const displayedItems =
    activeTab === 'suits' ? suits : activeTab === 'dupattas' ? dupattas : allItems

  return (
    <section id="suit-salwar" className="section-lux" style={{ background: '#FAF9F6', borderBottom: '1px solid #ECE7E1' }}>
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7B6D' }}>
            Bespoke Unstitched Cuts & Silk Stoles
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: '10px 0 14px', color: '#1C1917' }}>
            {heading}
          </h2>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: '#6E6259', margin: 0 }}>
            {subheading}. Crafted with authentic Banarsi zari work on pure Tussar, Chanderi, and organza bases. Complete 3-piece sets ready for custom tailoring, alongside gossamer silk stoles.
          </p>
        </div>

        {/* Filter Pills (Only if items exist) */}
        {allItems.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { id: 'all', label: `All Suit & Stole Weaves (${allItems.length})` },
              { id: 'suits', label: `Banarsi Suit Sets (${suits.length})` },
              { id: 'dupattas', label: `Pure Dupattas & Stoles (${dupattas.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: activeTab === tab.id ? '1px solid #1C1917' : '1px solid #D7D0C6',
                  background: activeTab === tab.id ? '#1C1917' : '#FFFFFF',
                  color: activeTab === tab.id ? '#FFFFFF' : '#4B5563',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Carousel or Clean Empty State */}
        {displayedItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: '#6E6259' }}>
            <p style={{ fontSize: '15px', color: '#6E6259', margin: 0 }}>
              {isLoading ? 'Loading suit sets...' : 'No products yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="collection-carousel">
              <ProductCarousel
                items={displayedItems}
                variant="suit"
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            </div>

            {/* Direct Order Bar */}
            <div style={{ textAlign: 'center', marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20order%20Banarsi%20Suit%20Salwar%20sets."
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
                <span>Order Suit Salwar via WhatsApp</span>
              </a>

              <Link
                href="/products?category=suit-salwar"
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
                <span>View All Suits & Dupattas</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
