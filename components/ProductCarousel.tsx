'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'

interface ProductCarouselProps {
  items: Product[]
  variant: 'saree' | 'fabric' | 'heritage' | 'suit'
  showPrices?: boolean
  showWholesalePrices?: boolean
}

export default function ProductCarousel({
  items,
  variant,
  showPrices = true,
  showWholesalePrices = true,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleCount(1)
      } else if (width < 960) {
        setVisibleCount(2)
      } else if (width < 1260) {
        setVisibleCount(3)
      } else {
        setVisibleCount(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, items.length - visibleCount)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : Math.max(0, prev - 1)))
  }, [maxIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  if (items.length === 0) {
    return (
      <div className="pastel-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
        <p style={{ color: 'var(--ink-secondary)', fontSize: '1.1rem' }}>
          Catalog items are updating. Please check back or contact Linen Galaxy directly on WhatsApp.
        </p>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div style={{ display: 'flex', gap: '20px', minHeight: '440px' }}>
        {[...Array(visibleCount)].map((_, i) => (
          <div key={i} className="shimmer" style={{ flex: 1, borderRadius: '24px', minHeight: '440px' }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Top-Bar Navigation Controls (Zero overlap with cards) */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span 
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#6B7280',
            }}
          >
            Displaying <strong style={{ color: '#111827' }}>{currentIndex + 1}–{Math.min(items.length, currentIndex + visibleCount)}</strong> of {items.length} weaves
          </span>
        </div>

        {items.length > visibleCount && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={goToPrevious}
              aria-label="Previous Slide"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                color: '#B38728',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(17, 24, 39, 0.08)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFF9E6'
                e.currentTarget.style.borderColor = '#B38728'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <i className="fas fa-chevron-left" style={{ fontSize: '13px' }}></i>
            </button>

            <button
              onClick={goToNext}
              aria-label="Next Slide"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                color: '#B38728',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(17, 24, 39, 0.08)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFF9E6'
                e.currentTarget.style.borderColor = '#B38728'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <i className="fas fa-chevron-right" style={{ fontSize: '13px' }}></i>
            </button>
          </div>
        )}
      </div>

      {/* Cards Deck Container */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          overflow: 'hidden',
          padding: '12px 2px 24px',
        }}
      >
        {items.slice(currentIndex, currentIndex + visibleCount).map((item) => (
          <div
            key={item.id}
            style={{
              flex: `0 0 calc(${100 / visibleCount}% - ${(24 * (visibleCount - 1)) / visibleCount}px)`,
              minWidth: '260px',
            }}
          >
            <ProductCard
              product={item}
              variant={variant}
              showPrices={showPrices}
              showWholesalePrices={showWholesalePrices}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
