'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  variant?: 'saree' | 'fabric' | 'heritage' | 'suit'
  showPrices?: boolean
  showWholesalePrices?: boolean
  onImageClick?: (product: Product) => void
}

export default function ProductCard({
  product,
  variant = 'saree',
  showPrices = true,
  showWholesalePrices = true,
  onImageClick,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Primary and secondary hover image
  const primaryImg = product.image_url
  let secondaryImg = product.secondary_image_url
  if (!secondaryImg && product.additional_images && product.additional_images.length > 0) {
    secondaryImg = product.additional_images[0]
  }

  // Price calculations
  const originalPrice = product.compare_at_price
  const currentPrice = product.price || 0
  const hasDiscount = Boolean(originalPrice && originalPrice > currentPrice && currentPrice > 0)
  const discountPercent = hasDiscount && originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const rating = product.rating || 4.9
  const reviewCount = product.reviews_count || 18

  const priceText = showPrices && currentPrice ? `₹${currentPrice.toLocaleString('en-IN')}` : 'Price on Request'
  const unit = product.category === 'fabric' ? '/m' : '/pc'

  const productUrl = `/products/${product.id}`

  const retailMessage = showPrices && currentPrice
    ? `Hello Linen Galaxy! I would like to order: ${product.code} (${product.title || product.description}) listed at ${priceText}. Please confirm doorstep delivery.`
    : `Hello Linen Galaxy! I would like to inquire about price and delivery for: ${product.code} (${product.title || product.description}).`

  const wholesaleMessage = `Hello Linen Galaxy! I would like a Wholesale bulk rate for: ${product.code} (${product.title || product.description}) with MOQ: ${product.min_wholesale_qty || '10 Pcs'}.`

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '6px',
        border: '1px solid #ECE7E1',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 10px 28px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Product Image Frame with Smooth Image Dissolve on Hover */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '128%', // Tall editorial aspect ratio like Linen World
          background: '#F7F5F0',
          overflow: 'hidden',
        }}
      >
        <Link
          href={productUrl}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
          }}
        >
          {/* Primary View */}
          <Image
            src={primaryImg}
            alt={product.title || product.description}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 320px"
            style={{
              objectFit: 'cover',
              transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              opacity: product.is_out_of_stock ? (isHovered && secondaryImg ? 0 : 0.75) : (isHovered && secondaryImg ? 0 : 1),
              filter: product.is_out_of_stock ? 'grayscale(70%)' : 'none',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />

          {/* Secondary Hover View (Crossfade) */}
          {secondaryImg && (
            <Image
              src={secondaryImg}
              alt={`${product.title || product.description} - Alternate View`}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 320px"
              style={{
                objectFit: 'cover',
                transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                opacity: product.is_out_of_stock ? (isHovered ? 0.75 : 0) : (isHovered ? 1 : 0),
                filter: product.is_out_of_stock ? 'grayscale(70%)' : 'none',
                transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              }}
            />
          )}
        </Link>

        {/* Minimalist Top Left Badges: OUT OF STOCK, SALE & NDD */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {/* Out of Stock Tag */}
          {product.is_out_of_stock && (
            <span
              style={{
                background: '#1C1917',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: '3px',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              OUT OF STOCK
            </span>
          )}

          {/* SALE Tag */}
          {!product.is_out_of_stock && (product.is_on_sale || hasDiscount) && (
            <span
              style={{
                background: '#DC2626',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: '3px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {discountPercent > 0 ? `${discountPercent}% OFF` : 'SALE'}
            </span>
          )}

          {/* NDD Tag */}
          {product.is_ndd && !product.is_out_of_stock && (
            <span
              style={{
                background: '#047857',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: '3px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <i className="fas fa-bolt" style={{ fontSize: '8px' }}></i>
              NDD
            </span>
          )}
        </div>

        {/* Top Right Code Tag */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              color: '#374151',
              padding: '3px 8px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              border: '1px solid #E5E7EB',
            }}
          >
            {product.code}
          </span>
        </div>
      </div>

      {/* Product Details Content */}
      <div
        style={{
          padding: '16px 16px 14px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Sub-type or Category Hint */}
          <div
            style={{
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#8A7B6D',
              marginBottom: '5px',
            }}
          >
            {product.product_type || product.category}
          </div>

          {/* Product Title (Clickable link to Product Detail Page) */}
          <Link
            href={productUrl}
            style={{ textDecoration: 'none' }}
          >
            <h4
              style={{
                fontSize: '0.98rem',
                fontWeight: 600,
                color: '#1C1917',
                lineHeight: 1.35,
                marginBottom: '8px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#B89668'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1C1917'
              }}
            >
              {product.title || product.description}
            </h4>
          </Link>

          {/* Pricing Row */}
          <div style={{ marginBottom: '14px', marginTop: '6px' }}>
            {showPrices && currentPrice > 0 ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  {hasDiscount && (
                    <span
                      style={{
                        fontSize: '0.92rem',
                        color: '#9CA3AF',
                        textDecoration: 'line-through',
                        fontWeight: 400,
                      }}
                    >
                      ₹{originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      color: hasDiscount ? '#DC2626' : '#1C1917',
                    }}
                  >
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '10.5px', color: '#8A7B6D', textTransform: 'uppercase', fontWeight: 600 }}>
                    Retail {unit}
                  </span>
                </div>

                {/* Wholesale Rate (ONLY shown if showWholesalePrices is true) */}
                {showWholesalePrices && product.wholesale_price && (
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: '#92400E',
                      fontWeight: 600,
                      marginTop: '4px',
                      background: '#FEF3C7',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      display: 'inline-block',
                    }}
                  >
                    Wholesale: ₹{product.wholesale_price.toLocaleString('en-IN')}{unit}
                    {product.min_wholesale_qty && (
                      <span style={{ fontWeight: 500, color: '#78350F', marginLeft: '4px' }}>
                        (MOQ: {product.min_wholesale_qty})
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#4B5563',
                  background: '#F3F4F6',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  display: 'inline-block',
                }}
              >
                Price on Request
              </div>
            )}
          </div>
        </div>

        {/* Clean Editorial Action Deck (Linen World Style) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            paddingTop: '10px',
            borderTop: '1px solid #ECE7E1',
          }}
        >
          {product.is_out_of_stock ? (
            <a
              href={`https://wa.me/919798141494?text=${encodeURIComponent(`Hello Linen Galaxy! Please notify me when weave [${product.code}] (${product.title || product.description}) is back in stock.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '4px',
                background: '#374151',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#111827'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#374151'
              }}
            >
              <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '13px' }}></i>
              <span>Inquire Restock</span>
            </a>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: showWholesalePrices && product.wholesale_price ? '1fr 1fr' : '1fr', gap: '6px' }}>
              {/* Primary Order via WhatsApp */}
              <a
                href={`https://wa.me/919798141494?text=${encodeURIComponent(retailMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 12px',
                  borderRadius: '4px',
                  background: '#1C1917',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1C1917'
                }}
              >
                <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '13px' }}></i>
                <span>Order</span>
              </a>

              {/* Wholesale Inquiry (Only if wholesale enabled) */}
              {showWholesalePrices && product.wholesale_price && (
                <a
                  href={`https://wa.me/919798141494?text=${encodeURIComponent(wholesaleMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '9px 8px',
                    borderRadius: '4px',
                    background: '#FAF8F5',
                    color: '#78350F',
                    border: '1px solid #FCD34D',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FEF3C7'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FAF8F5'
                  }}
                >
                  <i className="fas fa-boxes" style={{ fontSize: '11px' }}></i>
                  <span>Bulk MOQ</span>
                </a>
              )}
            </div>
          )}

          {/* View Details Link */}
          <Link
            href={productUrl}
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#8A7B6D',
              textDecoration: 'none',
              padding: '4px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1C1917'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8A7B6D'
            }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
