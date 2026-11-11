'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import type { Product, SiteSettings } from '@/lib/types'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
  recentlyViewed: Product[]
  settings: SiteSettings
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  recentlyViewed,
  settings,
}: ProductDetailClientProps) {
  // Collect all gallery images
  const allImages = [
    product.image_url,
    product.secondary_image_url,
    ...(product.additional_images || []),
  ].filter(Boolean) as string[]

  // Ensure at least 4 photos for the 2-column editorial gallery
  const galleryImages = allImages.length >= 2 ? allImages : [
    product.image_url,
    product.secondary_image_url || product.image_url,
    product.image_url,
    product.secondary_image_url || product.image_url,
  ]

  const [selectedImage, setSelectedImage] = useState<string>(galleryImages[0])
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id))
  }

  const showPrices = settings.show_prices !== false
  const showWholesalePrices = settings.show_wholesale_prices !== false

  const originalPrice = product.compare_at_price
  const currentPrice = product.price || 0
  const hasDiscount = Boolean(originalPrice && originalPrice > currentPrice && currentPrice > 0)
  const discountPercent = hasDiscount && originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0
  const savings = hasDiscount && originalPrice ? originalPrice - currentPrice : 0

  const unit = product.category === 'fabric' ? '/ Meter' : '/ Piece'
  const shopName = settings.business_name || 'Linen Galaxy'
  const whatsappNumber = settings.whatsapp_number?.replace(/[^0-9]/g, '') || '919798141494'

  const retailMessage = `Hello ${shopName}! I would like to order:
• Code: ${product.code}
• Product: ${product.title || product.description}
• Price: ₹${currentPrice ? currentPrice.toLocaleString('en-IN') : 'Contact'} ${unit}
Please share payment details and dispatch timeline.`

  const wholesaleMessage = `Hello ${shopName}! I am inquiring about Wholesale bulk rates for:
• Code: ${product.code}
• Product: ${product.title || product.description}
• Listed Wholesale: ₹${product.wholesale_price ? product.wholesale_price.toLocaleString('en-IN') : 'Contact'}
• Required MOQ: ${product.min_wholesale_qty || '10 Pieces'}
Please share roll/bundle availability and commercial invoice terms.`

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* Editorial Breadcrumbs */}
      <div
        style={{
          padding: '24px 0 20px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8A7B6D',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Link href="/" style={{ color: '#8A7B6D', textDecoration: 'none' }}>
          HOME
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category || 'all')}`}
          style={{ color: '#8A7B6D', textDecoration: 'none' }}
        >
          {(product.category || 'COLLECTIONS').toUpperCase()}
        </Link>
        <span>/</span>
        <span style={{ color: '#1C1917' }}>{product.code}</span>
      </div>

      {/* Main Product Showcase (Linen World 2-Column Editorial Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px',
          alignItems: 'start',
          marginBottom: '80px',
        }}
      >
        {/* Left Column: Multi-Angle Editorial Gallery */}
        <div>
          {/* Main Active Photo */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '130%',
              background: '#F7F5F0',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #ECE7E1',
              marginBottom: '16px',
            }}
          >
            <Image
              src={selectedImage}
              alt={product.title || product.description}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 680px"
              style={{ objectFit: 'cover' }}
            />

            {/* Badges Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                gap: '8px',
                zIndex: 3,
                flexWrap: 'wrap',
              }}
            >
              {product.is_out_of_stock && (
                <span
                  style={{
                    background: '#111827',
                    color: '#F9FAFB',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  Sold Out
                </span>
              )}

              {(product.is_on_sale || hasDiscount) && (
                <span
                  style={{
                    background: '#DC2626',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {discountPercent > 0 ? `${discountPercent}% OFF` : 'SALE'}
                </span>
              )}

              {product.is_ndd && (
                <span
                  style={{
                    background: '#047857',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <i className="fas fa-bolt" style={{ fontSize: '10px' }}></i>
                  NDD Ready
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Editorial Angles Grid (Linen World Exact Style) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '130%',
                  background: '#F7F5F0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: selectedImage === img ? '2px solid #1C1917' : '1px solid #ECE7E1',
                  cursor: 'pointer',
                  padding: 0,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Image
                  src={img}
                  alt={`Angle ${idx + 1}`}
                  fill
                  sizes="160px"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Product Purchase Details */}
        <div
          style={{
            position: 'sticky',
            top: '120px',
            background: '#FFFFFF',
            padding: '10px 0',
          }}
        >
          {/* Collection / Sub-type */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#8A7B6D',
              marginBottom: '8px',
            }}
          >
            {product.product_type || product.category} • CODE: {product.code}
          </div>

          {/* Product Title */}
          <h1
            style={{
              fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
              fontWeight: 600,
              color: '#1C1917',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            {product.title || product.description}
          </h1>

          {/* Star Rating & Reviews */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', color: '#D97706', fontSize: '13px', gap: '3px' }}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <span style={{ fontSize: '12.5px', color: '#4B433E', fontWeight: 600 }}>
              {product.rating || 4.9}
            </span>
            <span style={{ fontSize: '12px', color: '#8A7B6D' }}>
              ({product.reviews_count || 24} customer reviews)
            </span>
          </div>

          {/* Pricing Deck */}
          <div
            style={{
              padding: '18px 0',
              borderTop: '1px solid #ECE7E1',
              borderBottom: '1px solid #ECE7E1',
              marginBottom: '22px',
            }}
          >
            {showPrices ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: hasDiscount ? '#DC2626' : '#1C1917',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    ₹{currentPrice ? currentPrice.toLocaleString('en-IN') : 'Contact for Price'}
                  </span>

                  {hasDiscount && (
                    <span
                      style={{
                        fontSize: '1.25rem',
                        color: '#9CA3AF',
                        textDecoration: 'line-through',
                        fontWeight: 400,
                      }}
                    >
                      ₹{originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}

                  {hasDiscount && (
                    <span
                      style={{
                        background: '#FEE2E2',
                        color: '#991B1B',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '3px',
                      }}
                    >
                      Save ₹{savings.toLocaleString('en-IN')} ({discountPercent}%)
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '12px', color: '#786F66', marginTop: '6px' }}>
                  Tax included. Next Day Dispatch (NDD) available across India.
                </div>

                {/* Out of Stock Notice */}
                {product.is_out_of_stock && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '10px 14px',
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: '4px',
                      color: '#991B1B',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>
                    Currently Out of Stock on Pit-Looms. Inquire below to reserve or order from the next loom run.
                  </div>
                )}

                {/* Wholesale Pricing Tier (Displayed ONLY when enabled sitewide) */}
                {showWholesalePrices && product.wholesale_price && (
                  <div
                    style={{
                      marginTop: '14px',
                      padding: '12px 16px',
                      background: '#FFFBEB',
                      border: '1px solid #FCD34D',
                      borderRadius: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#92400E' }}>
                        Wholesale Rate (Factory Price)
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#B45309' }}>
                        MOQ: {product.min_wholesale_qty || '10 Pieces'}
                      </span>
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#92400E', marginTop: '4px' }}>
                      ₹{product.wholesale_price.toLocaleString('en-IN')}{unit}
                    </div>
                    <div style={{ fontSize: '11px', color: '#78350F', marginTop: '2px' }}>
                      Direct pit-loom weaver pricing. GST invoice and commercial bulk bills provided.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  padding: '12px 16px',
                  background: '#F3F4F6',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#374151',
                }}
              >
                Price on Request via WhatsApp
              </div>
            )}
          </div>

          {/* Quick Specifications Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div style={{ padding: '10px 14px', background: '#FAF9F6', borderRadius: '4px', border: '1px solid #ECE7E1' }}>
              <div style={{ fontSize: '10.5px', color: '#8A7B6D', textTransform: 'uppercase', fontWeight: 600 }}>
                Weave Technique
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917', marginTop: '2px' }}>
                Handloom Pit-Loom
              </div>
            </div>

            <div style={{ padding: '10px 14px', background: '#FAF9F6', borderRadius: '4px', border: '1px solid #ECE7E1' }}>
              <div style={{ fontSize: '10.5px', color: '#8A7B6D', textTransform: 'uppercase', fontWeight: 600 }}>
                Purity Certification
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917', marginTop: '2px' }}>
                100% Natural Fiber
              </div>
            </div>

            {product.gsm && (
              <div style={{ padding: '10px 14px', background: '#FAF9F6', borderRadius: '4px', border: '1px solid #ECE7E1' }}>
                <div style={{ fontSize: '10.5px', color: '#8A7B6D', textTransform: 'uppercase', fontWeight: 600 }}>
                  Weave Count / GSM
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917', marginTop: '2px' }}>
                  {product.gsm}
                </div>
              </div>
            )}

            {product.weight && (
              <div style={{ padding: '10px 14px', background: '#FAF9F6', borderRadius: '4px', border: '1px solid #ECE7E1' }}>
                <div style={{ fontSize: '10.5px', color: '#8A7B6D', textTransform: 'uppercase', fontWeight: 600 }}>
                  Drape Weight
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917', marginTop: '2px' }}>
                  {product.weight}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons Deck */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '26px' }}>
            {/* Primary Order Online (or Out of Stock Restock Inquiry) */}
            {product.is_out_of_stock ? (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${shopName}! I noticed that ${product.code} (${product.title || product.description}) is currently Out of Stock. Could you let me know when it will be re-woven on pit-looms or if an advance custom order can be placed?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '4px',
                  background: '#374151',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F2937'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#374151'
                }}
              >
                <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '18px' }}></i>
                <span>Out of Stock — Inquire Restock / Loom Run</span>
              </a>
            ) : (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(retailMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '4px',
                  background: '#1C1917',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
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
                <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '18px' }}></i>
                <span>Order via WhatsApp (Instant Checkout)</span>
              </a>
            )}

            {/* Wholesale Inquiry Button (Displayed ONLY when wholesale prices enabled) */}
            {showWholesalePrices && product.wholesale_price && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wholesaleMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  color: '#92400E',
                  border: '1px solid #F59E0B',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FEF3C7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF'
                }}
              >
                <i className="fas fa-boxes" style={{ fontSize: '13px' }}></i>
                <span>Inquire Wholesale Bulk (MOQ: {product.min_wholesale_qty || '10 Pcs'})</span>
              </a>
            )}
          </div>

          {/* Trust & Safe Checkout Line (Linen World Exact Style) */}
          <div
            style={{
              padding: '14px 0',
              borderTop: '1px solid #ECE7E1',
              borderBottom: '1px solid #ECE7E1',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: '#6E6259',
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: '10px',
              }}
            >
              <i className="fas fa-lock" style={{ color: '#059669', fontSize: '12px' }}></i>
              <span>Guaranteed safe & secure checkout</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              {['UPI', 'GPay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard', 'RuPay'].map((brand, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#6B7280',
                    background: '#F3F4F6',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Accordion Drawers (Linen World Style) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* 1. Description Accordion */}
            <div style={{ borderBottom: '1px solid #ECE7E1' }}>
              <button
                onClick={() => toggleAccordion('description')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1C1917',
                }}
              >
                <span>Description</span>
                <i className={`fas fa-${openAccordion === 'description' ? 'minus' : 'plus'}`} style={{ fontSize: '11px', color: '#8A7B6D' }}></i>
              </button>
              {openAccordion === 'description' && (
                <div style={{ paddingBottom: '16px', fontSize: '13.5px', color: '#4B433E', lineHeight: 1.7 }}>
                  <p style={{ margin: '0 0 10px' }}>
                    {product.description}
                  </p>
                  <p style={{ margin: 0 }}>
                    Handcrafted in Bhagalpur by the master pit-loom weavers of {settings.parent_company || 'A S Handloom'}. Each piece reflects ancestral textile heritage, woven with unhurried precision and natural fibers for enduring drape and timeless elegance.
                  </p>
                </div>
              )}
            </div>

            {/* 2. Fabric & Care Accordion */}
            <div style={{ borderBottom: '1px solid #ECE7E1' }}>
              <button
                onClick={() => toggleAccordion('care')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1C1917',
                }}
              >
                <span>Fabric & Specifications</span>
                <i className={`fas fa-${openAccordion === 'care' ? 'minus' : 'plus'}`} style={{ fontSize: '11px', color: '#8A7B6D' }}></i>
              </button>
              {openAccordion === 'care' && (
                <div style={{ paddingBottom: '16px', fontSize: '13px', color: '#4B433E', lineHeight: 1.7 }}>
                  <ul style={{ margin: 0, paddingLeft: '18px' }}>
                    <li><strong>Fiber:</strong> 100% Pure Natural Handloom Weave ({product.product_type || product.category})</li>
                    <li><strong>Length:</strong> 6.5 Meters (Includes matched running blouse piece)</li>
                    <li><strong>Width:</strong> 44–46 Inches standard artisan width</li>
                    <li><strong>Care:</strong> Dry clean recommended for first wash. Store wrapped in pure unbleached cotton muslin bag. Iron on silk/low setting.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* 3. Shipping & Delivery (NDD) */}
            <div style={{ borderBottom: '1px solid #ECE7E1' }}>
              <button
                onClick={() => toggleAccordion('shipping')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1C1917',
                }}
              >
                <span>Shipping & Delivery (NDD)</span>
                <i className={`fas fa-${openAccordion === 'shipping' ? 'minus' : 'plus'}`} style={{ fontSize: '11px', color: '#8A7B6D' }}></i>
              </button>
              {openAccordion === 'shipping' && (
                <div style={{ paddingBottom: '16px', fontSize: '13px', color: '#4B433E', lineHeight: 1.7 }}>
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>Next Day Dispatch (NDD):</strong> In-stock orders are packed and dispatched from our Bhagalpur loft within 24 hours.
                  </p>
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>Delivery Window:</strong> 3–5 business days across metro cities; 5–7 days for tier 2/3 cities across India.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Tracking:</strong> Complete real-time courier airway bill (AWB) sent immediately to your WhatsApp upon loft dispatch.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Wholesale Inquiries */}
            <div style={{ borderBottom: '1px solid #ECE7E1' }}>
              <button
                onClick={() => toggleAccordion('wholesale')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1C1917',
                }}
              >
                <span>Wholesale & Bulk Merchant Terms</span>
                <i className={`fas fa-${openAccordion === 'wholesale' ? 'minus' : 'plus'}`} style={{ fontSize: '11px', color: '#8A7B6D' }}></i>
              </button>
              {openAccordion === 'wholesale' && (
                <div style={{ paddingBottom: '16px', fontSize: '13px', color: '#4B433E', lineHeight: 1.7 }}>
                  <p style={{ margin: '0 0 8px' }}>
                    We supply certified handloom sarees and fabric yardage directly to boutiques, designers, and textile showrooms across India.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '18px' }}>
                    <li><strong>Minimum Order Quantity (MOQ):</strong> {product.min_wholesale_qty || '10 Pieces (or 50 Meters for yardage)'}</li>
                    <li><strong>Invoicing:</strong> Official GST billing with HSN classification (GSTIN: {settings.gstin || '10AJXPA6956B1ZD'})</li>
                    <li><strong>Custom Yardage:</strong> Custom colors and fabric lengths available on advance order.</li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Related Products: YOU MAY ALSO LIKE */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '60px 0 40px', borderTop: '1px solid #ECE7E1' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#1C1917',
              }}
            >
              You May Also Like
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#1C1917', margin: '12px auto 0' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            ))}
          </div>
        </section>
      )}

      {/* RECENTLY VIEWED */}
      {recentlyViewed.length > 0 && (
        <section style={{ padding: '40px 0 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#1C1917',
              }}
            >
              Recently Viewed
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#1C1917', margin: '12px auto 0' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {recentlyViewed.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                showPrices={showPrices}
                showWholesalePrices={showWholesalePrices}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
