'use client'

import Link from 'next/link'
import ThreeDTilt from '@/components/ThreeDTilt'

interface WholesaleRetailBannerProps {
  heading?: string
  subheading?: string
}

export default function WholesaleRetailBanner({
  heading = 'Wholesale Manufacturing & Direct Retail Delivery',
  subheading = 'Whether you are an individual patron seeking a timeless saree or a fashion brand requiring commercial bolts of linen, we deliver authentic Bhagalpur craftsmanship direct to your doorstep.',
}: WholesaleRetailBannerProps = {}) {
  return (
    <section 
      id="wholesale" 
      className="section-lux" 
      style={{ 
        background: '#FAF8F5', 
        borderTop: '1px solid rgba(197, 160, 89, 0.25)', 
        borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
        padding: '90px 0',
      }}
    >
      <div className="container-lux">
        {/* Section Header with Golden Ratio typography */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px' }}>
          <span className="golden-eyebrow" style={{ color: '#B38728' }}>
            Two Channels • One Master Handloom House
          </span>
          <h2 className="golden-h1" style={{ margin: '14px 0 16px', color: '#111827' }}>
            {heading}
          </h2>
          <p className="golden-lead" style={{ color: '#4B5563' }}>
            {subheading}
          </p>
        </div>

        {/* 3D Dual Tier Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
        }}>
          {/* Card 1: Retail Patrons */}
          <ThreeDTilt intensity={8}>
            <div
              className="pastel-card"
              style={{
                padding: '42px 36px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                borderRadius: '28px',
                border: '1.5px solid rgba(194, 89, 106, 0.25)',
                boxShadow: '0 14px 38px -10px rgba(17, 24, 39, 0.08)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: '#FDF2F4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C2596A',
                      fontSize: '24px',
                      boxShadow: '0 4px 12px rgba(194, 89, 106, 0.15)',
                    }}
                  >
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                  <span className="pastel-badge pastel-badge-rose">
                    Retail Orders (B2C)
                  </span>
                </div>

                <h3 style={{ fontSize: '1.65rem', marginBottom: '12px', color: '#111827', fontWeight: 700 }}>
                  Individual & Bridal Sarees
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '26px' }}>
                  Curated handwoven sarees and fabric cuts for private patrons. Delivered in artisan-pressed presentation packaging with authentic weave certification.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                  {[
                    'No minimum order: Purchase single sarees or meterage',
                    'Direct online delivery to all Indian pincodes in 3–5 days',
                    'Worldwide air shipping with live tracking & courier updates',
                    'Instant WhatsApp styling consultation & video previews',
                  ].map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem', color: '#374151' }}>
                      <i className="fas fa-check-circle" style={{ color: '#C2596A', marginTop: '3px', fontSize: '15px' }}></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/products"
                  className="btn-pastel-primary"
                  style={{
                    width: '100%',
                    background: '#1C1917',
                    boxShadow: 'none',
                    padding: '16px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <i className="fas fa-layer-group"></i>
                  <span>Browse All Retail Collections</span>
                </Link>
              </div>
            </div>
          </ThreeDTilt>

          {/* Card 2: Wholesale & Bulk Orders */}
          <ThreeDTilt intensity={8}>
            <div
              className="pastel-card"
              style={{
                padding: '42px 36px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                borderRadius: '28px',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 14px 38px -10px rgba(17, 24, 39, 0.08)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: '#FFF9E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#D4AF37',
                      fontSize: '24px',
                      boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    <i className="fas fa-industry"></i>
                  </div>
                  <span className="pastel-badge pastel-badge-gold">
                    Wholesale & Manufacturing (B2B)
                  </span>
                </div>

                <h3 style={{ fontSize: '1.65rem', marginBottom: '12px', color: '#111827', fontWeight: 700 }}>
                  Bulk Fabric Rolls & Boutique Supply
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '26px' }}>
                  Direct pit-loom enterprise pricing for clothing brands, boutique owners, garment manufacturers, and international textile exporters.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                  {[
                    'Full rolls & bolts from 50m to 5,000+ meters',
                    'Custom Pantone dyeing, yarn blend selection & weaving specs',
                    'Free fabric swatch kit for registered business accounts',
                    'Commercial GST tax invoices (GSTIN 10AJXPA6956B1ZD) with freight dispatch',
                  ].map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem', color: '#374151' }}>
                      <i className="fas fa-check-circle" style={{ color: '#B38728', marginTop: '3px', fontSize: '15px' }}></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href="https://wa.me/919798141494?text=Hello%20A%20S%20Handloom%2C%20I%20am%20interested%20in%20Wholesale%20%2F%20Bulk%20Fabric%20purchases.%20Please%20share%20wholesale%20rate%20card."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pastel-primary"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #B38728 0%, #D4AF37 50%, #C59B27 100%)',
                    boxShadow: '0 8px 25px -4px rgba(197, 155, 39, 0.45)',
                    padding: '16px',
                  }}
                >
                  <i className="fas fa-file-invoice-dollar"></i>
                  <span>Request Wholesale Rate Card</span>
                </a>
              </div>
            </div>
          </ThreeDTilt>
        </div>
      </div>
    </section>
  )
}
