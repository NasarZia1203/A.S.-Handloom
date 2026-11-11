'use client'

import Image from 'next/image'
import type { StoreOutlet } from '@/lib/types'
import { DEFAULT_OUTLETS } from '@/lib/data/site-settings'

interface OurShopsProps {
  heading?: string
  subheading?: string
  outlets?: StoreOutlet[]
}

export default function OurShops({
  heading = 'Our Shops & Outlets',
  subheading = 'Experience authentic Bhagalpuri pit-loom craftsmanship in person at our flagship locations.',
  outlets = DEFAULT_OUTLETS,
}: OurShopsProps) {
  const activeOutlets = (outlets && outlets.length > 0 ? outlets : DEFAULT_OUTLETS).filter(
    (o) => o.is_active !== false
  )

  return (
    <section
      id="outlets"
      style={{
        padding: '90px 0',
        background: '#FAF8F5',
        borderBottom: '1px solid #ECE7E1',
      }}
    >
      <div className="container-lux" style={{ width: '100%', maxWidth: '1480px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 54px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B38728',
              marginBottom: '12px',
            }}
          >
            <span>Visit Our Physical Hubs</span>
            <span>•</span>
            <span>Bhagalpur Silk City</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
              lineHeight: 1.15,
              fontWeight: 600,
              color: '#1C1917',
              letterSpacing: '-0.01em',
              margin: '0 0 16px',
            }}
          >
            {heading}
          </h2>

          <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#6E6259', margin: 0 }}>
            {subheading}
          </p>
        </div>

        {/* 2-Column Outlets Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {activeOutlets.map((outlet, idx) => {
            const rawPhone = (outlet.whatsapp || outlet.phone || '919798141494').replace(/[^0-9]/g, '')
            const isLinenGalaxy = outlet.id.includes('linen-galaxy')

            return (
              <div
                key={outlet.id || idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E8E2D9',
                  boxShadow: '0 10px 30px rgba(28, 25, 23, 0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 18px 40px rgba(28, 25, 23, 0.1)'
                  e.currentTarget.style.borderColor = '#C5A059'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(28, 25, 23, 0.05)'
                  e.currentTarget.style.borderColor = '#E8E2D9'
                }}
              >
                {/* Outlet Photo Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '280px',
                    background: isLinenGalaxy ? '#0F0E0D' : '#F6F3EE',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={outlet.image_url || '/assets/images/as-handloom-logo-white-bg.png'}
                    alt={outlet.name}
                    fill
                    unoptimized={Boolean(outlet.image_url && outlet.image_url.startsWith('data:'))}
                    sizes="(max-width: 768px) 100vw, 700px"
                    style={{
                      objectFit: isLinenGalaxy ? 'cover' : 'contain',
                      padding: isLinenGalaxy ? 0 : '24px',
                    }}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isLinenGalaxy
                        ? 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)'
                        : 'none',
                    }}
                  />

                  {/* Outlet Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '18px',
                      background: 'rgba(28, 25, 23, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#FAF8F5',
                      padding: '6px 14px',
                      borderRadius: '50px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(212, 175, 55, 0.55)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fas fa-map-pin" style={{ color: '#D4AF37', fontSize: '10px' }}></i>
                    <span>{outlet.badge || (idx === 0 ? 'Main Office & Depot' : 'Retail Boutique')}</span>
                  </div>
                </div>

                {/* Outlet Content Body */}
                <div
                  style={{
                    padding: '30px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#8A7B6D',
                      marginBottom: '6px',
                    }}
                  >
                    {idx === 0 ? 'Primary Manufacturing & Wholesale' : 'Exclusive Retail Experience'}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#1C1917',
                      margin: '0 0 10px',
                      lineHeight: 1.25,
                    }}
                  >
                    {outlet.name}
                  </h3>

                  {outlet.tagline && (
                    <p style={{ fontSize: '13px', color: '#6E6259', margin: '0 0 20px', lineHeight: 1.55 }}>
                      {outlet.tagline}
                    </p>
                  )}

                  {/* Details List */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '13px',
                      padding: '18px 0',
                      borderTop: '1px solid #ECE7E1',
                      borderBottom: '1px solid #ECE7E1',
                      marginBottom: '24px',
                      fontSize: '13px',
                      color: '#4B433E',
                    }}
                  >
                    {/* Address */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <i className="fas fa-location-dot" style={{ color: '#B38728', marginTop: '3px', width: '16px' }}></i>
                      <div style={{ lineHeight: 1.5 }}>
                        <strong style={{ color: '#1C1917' }}>Address: </strong>
                        <span>{outlet.address}</span>
                      </div>
                    </div>

                    {/* Phone / Contact */}
                    {outlet.phone && (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <i className="fas fa-phone" style={{ color: '#B38728', width: '16px' }}></i>
                        <div>
                          <strong style={{ color: '#1C1917' }}>Contact: </strong>
                          <a
                            href={`tel:${outlet.phone.replace(/[^0-9+]/g, '')}`}
                            style={{ color: '#1C1917', textDecoration: 'none', fontWeight: 600 }}
                          >
                            {outlet.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Hours */}
                    {outlet.hours && (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <i className="fas fa-clock" style={{ color: '#B38728', width: '16px' }}></i>
                        <div>
                          <strong style={{ color: '#1C1917' }}>Timings: </strong>
                          <span>{outlet.hours}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Highlights Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '26px' }}>
                    {(idx === 0
                      ? ['Pit-Loom House', 'Wholesale Depot', 'Bulk Fabric Rolls', 'Weaver Direct Rates']
                      : ['Retail Boutique', 'Curated Sarees', 'High-Count Linen', 'Trial & Draping Loft']
                    ).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#5C5248',
                          background: '#F6F3EE',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #EAE5DE',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                    <a
                      href={outlet.map_url || `https://maps.google.com/?q=${encodeURIComponent(outlet.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 18px',
                        borderRadius: '6px',
                        background: '#1C1917',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#000000')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#1C1917')}
                    >
                      <i className="fas fa-directions" style={{ fontSize: '11px' }}></i>
                      <span>Get Directions</span>
                    </a>

                    <a
                      href={`https://wa.me/${rawPhone}?text=${encodeURIComponent(`Hello! I would like to inquire about visiting ${outlet.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 18px',
                        borderRadius: '6px',
                        background: '#FFFFFF',
                        color: '#1C1917',
                        border: '1px solid #D7D0C6',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#1C1917'
                        e.currentTarget.style.background = '#F6F3EE'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#D7D0C6'
                        e.currentTarget.style.background = '#FFFFFF'
                      }}
                    >
                      <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '14px' }}></i>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
