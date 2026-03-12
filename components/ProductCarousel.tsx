'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 500) {
        setVisibleCount(1)
      } else if (width < 768) {
        setVisibleCount(2)
      } else if (width < 1200) {
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
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - visibleCount))
  }, [maxIndex, visibleCount])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + visibleCount))
  }, [maxIndex, visibleCount])

  // Auto-slide functionality
  useEffect(() => {
    if (items.length <= visibleCount) return
    
    const interval = setInterval(() => {
      if (hoveredIndex === null) {
        goToNext()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [items.length, visibleCount, hoveredIndex, goToNext])

  if (items.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05) 0%, rgba(255, 152, 0, 0.05) 100%)',
        borderRadius: '24px',
        border: '2px dashed var(--color-border)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '32px'
        }}>
          <i className={variant === 'saree' ? 'fas fa-tshirt' : 'fas fa-scroll'}></i>
        </div>
        <p style={{ 
          color: 'var(--color-text-secondary)',
          fontSize: '16px',
          fontWeight: 500
        }}>
          No {variant === 'saree' ? 'sarees' : 'fabrics'} available at the moment.
        </p>
        <p style={{ 
          color: 'var(--color-text-muted)',
          fontSize: '14px',
          marginTop: '8px'
        }}>
          Check back soon for our latest collection!
        </p>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        gap: '20px',
        minHeight: '420px'
      }}>
        {[...Array(visibleCount)].map((_, i) => (
          <div 
            key={i}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
              borderRadius: '24px',
              animation: 'shimmer 1.5s infinite'
            }}
          />
        ))}
      </div>
    )
  }

  const totalPages = Math.ceil(items.length / visibleCount)
  const currentPage = Math.floor(currentIndex / visibleCount)

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Carousel Container */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          overflow: 'hidden',
          minHeight: '420px',
          width: '100%',
          position: 'relative',
        }}
      >
        {items.slice(currentIndex, currentIndex + visibleCount).map((item, idx) => (
          <div
            className={`collection-item ${variant}-carousel-item`}
            key={item.id}
            style={{
              flex: `0 0 calc(${100 / visibleCount}% - ${(20 * (visibleCount - 1)) / visibleCount}px)`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hoveredIndex === idx ? 'translateY(-8px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`collection-placeholder ${variant}-carousel-placeholder`}>
              <Image
                src={item.image_url}
                alt={item.description}
                fill
                className={`${variant}-carousel-img`}
                style={{ 
                  objectFit: 'cover',
                  transform: hoveredIndex === idx ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.5s ease'
                }}
                priority={idx < 2}
                sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              
              {/* Product Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: 600,
                zIndex: 4,
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)'
              }}>
                {variant === 'saree' ? 'Saree' : 'Fabric'}
              </div>

              {/* Watermark */}
              <Image
                src="/assets/logowatermark.png"
                alt="AS Handloom"
                width={40}
                height={40}
                className={`${variant}-carousel-watermark`}
                style={{
                  opacity: hoveredIndex === idx ? 0.3 : 0.6
                }}
              />
            </div>
            
            {/* Product Overlay */}
            <div 
              className={`${variant}-carousel-overlay`}
              style={{
                transform: hoveredIndex === idx ? 'translateY(0)' : 'translateY(100%)'
              }}
            >
              <div className="product-code">{item.code}</div>
              <div className="product-description">{item.description}</div>
              <a
                href={`https://wa.me/919798141494?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(item.code)}%20-%20${encodeURIComponent(item.description)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  padding: '10px 18px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: '12px',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <i className="fab fa-whatsapp"></i>
                Enquire Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > visibleCount && (
        <>
          <button
            onClick={goToPrevious}
            aria-label="Previous"
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'white',
              color: '#E91E63',
              border: 'none',
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = '#E91E63'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={goToNext}
            aria-label="Next"
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'white',
              color: '#E91E63',
              border: 'none',
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = '#E91E63'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </>
      )}

      {/* Pagination Dots */}
      <div
        style={{
          marginTop: '28px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleCount)}
            aria-label={`Go to page ${index + 1}`}
            style={{
              width: index === currentPage ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: index === currentPage 
                ? 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)' 
                : 'rgba(233, 30, 99, 0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: index === currentPage 
                ? '0 2px 8px rgba(233, 30, 99, 0.3)' 
                : 'none',
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div style={{
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '14px',
        color: 'var(--color-text-secondary)'
      }}>
        Showing {currentIndex + 1}-{Math.min(currentIndex + visibleCount, items.length)} of {items.length}
      </div>
    </div>
  )
}
