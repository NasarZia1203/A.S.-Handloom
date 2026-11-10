'use client'

import { useState } from 'react'
import useSWR from 'swr'
import ProductCarousel from '@/components/ProductCarousel'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface HeritageWeavesSectionProps {
  heading?: string
  subheading?: string
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function HeritageWeavesSection({
  heading = 'Bhagalpuri Chadar, Gamcha & Lungis',
  subheading = 'World-Famous Bhagalpuri DULL Chadar, Modi Gamcha, Resham Gamcha & Pure Cotton Lungis',
  showPrices = true,
  showWholesalePrices = true,
}: HeritageWeavesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'chadar' | 'gamcha' | 'lungi'>('all')

  const { data: chadarData, isLoading: loadingC } = useSWR<{ products: Product[] }>('/api/products?category=chadar', fetcher)
  const { data: gamchaData, isLoading: loadingG } = useSWR<{ products: Product[] }>('/api/products?category=gamcha', fetcher)
  const { data: lungiData, isLoading: loadingL } = useSWR<{ products: Product[] }>('/api/products?category=lungi', fetcher)

  const chadars = chadarData?.products || []
  const gamchas = gamchaData?.products || []
  const lungis = lungiData?.products || []

  const allItems = [...chadars, ...gamchas, ...lungis]
  const isLoading = loadingC || loadingG || loadingL

  const displayedItems =
    activeTab === 'chadar'
      ? chadars
      : activeTab === 'gamcha'
      ? gamchas
      : activeTab === 'lungi'
      ? lungis
      : allItems

  return (
    <section id="heritage-weaves" className="section-lux" style={{ background: '#FFFFFF', borderBottom: '1px solid #ECE7E1' }}>
      <div className="container-lux">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7B6D' }}>
            Authentic Bhagalpur Daily Luxury & Heritage Weaves
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', margin: '10px 0 14px', color: '#1C1917' }}>
            {heading}
          </h2>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: '#6E6259', margin: 0 }}>
            {subheading}. Prized across India for the signature all-season Bhagalpuri DULL chadar (warm in winter, cool in summer), high-absorbency Modi & Resham gamchas, and ultra-soft viscose lungis.
          </p>
        </div>

        {/* Filter Pills (Only if items exist) */}
        {allItems.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { id: 'all', label: `All Heritage Weaves (${allItems.length})` },
              { id: 'chadar', label: `Bhagalpuri DULL Chadar (${chadars.length})` },
              { id: 'gamcha', label: `Modi & Resham Gamcha (${gamchas.length})` },
              { id: 'lungi', label: `Viscose & Cotton Lungi (${lungis.length})` },
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
              {isLoading ? 'Loading heritage weaves...' : 'No products yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="collection-carousel">
              <ProductCarousel
                items={displayedItems}
                variant="heritage"
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            </div>

            {/* Direct Order Bar */}
            <div style={{ textAlign: 'center', marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20order%20Bhagalpuri%20DULL%20Chadar%20or%20Gamchas."
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
                <span>Order Chadar / Gamcha via WhatsApp</span>
              </a>

              <Link
                href="/products?category=chadar"
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
                <span>View All Chadar & Gamchas</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
