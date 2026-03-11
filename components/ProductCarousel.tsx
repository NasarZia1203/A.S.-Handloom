'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/lib/types'

interface ProductCarouselProps {
  items: Product[]
  variant: 'saree' | 'fabric'
}

export default function ProductCarousel({
  items,
  variant,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 464) {
        setVisibleCount(1)
      } else if (width < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (items.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
        No {variant === 'saree' ? 'sarees' : 'fabrics'} available at the moment.
      </p>
    )
  }

  if (!mounted) return null
  const maxIndex = Math.max(0, items.length - visibleCount)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  const goToDot = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Carousel Container */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'hidden',
          overflow: 'hidden',
        }}
      >
        {items.slice(currentIndex, currentIndex + visibleCount).map((item) => (
          <div
            className={`collection-item ${variant}-carousel-item`}
            key={item.id}
            style={{
              flex: `0 0 calc(100% / ${visibleCount} - ${(16 * (visibleCount - 1)) / visibleCount}px)`,
              transition: 'all 0.3s ease',
            }}
          >
            <div className={`collection-placeholder ${variant}-carousel-placeholder`}>
              <img
                src={item.image_url}
                alt={item.description}
                className={`${variant}-carousel-img`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <img
                src="/assets/logowatermark.png"
                alt="AS Handloom watermark"
                className={`${variant}-carousel-watermark`}
              />
            </div>
            <div className={`${variant}-carousel-overlay`}>
              <div className="product-code">{item.code}</div>
              <div className="product-description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > visibleCount && (
        <>
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
          >
            ›
          </button>
        </>
      )}

      {/* Dot Navigation */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {Array.from({ length: Math.ceil(items.length / visibleCount) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToDot(index)}
            style={{
              width: index === Math.min(currentIndex, Math.ceil(items.length / visibleCount) - 1) ? 10 : 5,
              height: index === Math.min(currentIndex, Math.ceil(items.length / visibleCount) - 1) ? 10 : 5,
              borderRadius: '50%',
              background:
                index === Math.min(currentIndex, Math.ceil(items.length / visibleCount) - 1)
                  ? 'var(--color-primary)'
                  : '#81002077',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.25,0.8,0.25,1)',
              boxShadow:
                index === Math.min(currentIndex, Math.ceil(items.length / visibleCount) - 1)
                  ? '0 2px 8px rgba(0,0,0,0.12)'
                  : 'none',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
