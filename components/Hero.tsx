'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'
import { DEFAULT_SITE_SETTINGS } from '@/lib/data/site-settings'

interface HeroProps {
  settings?: SiteSettings
}

export default function Hero({ settings = DEFAULT_SITE_SETTINGS }: HeroProps) {
  const shopName = settings.business_name || 'Linen Galaxy'
  const parentCompany = settings.parent_company || 'A S Handloom'
  const shopImg = settings.shop_image_url || '/assets/images/linen-galaxy-boutique.png'
  const shopAddress = settings.shop_address || '85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004'
  const whatsappNumber = settings.whatsapp_number?.replace(/[^0-9]/g, '') || '919798141494'

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 90
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  const categoryHighlights = [
    { label: 'Sarees', href: '/products?category=saree', img: '/assets/images/sarees/saree1.webp', tag: 'Handloom' },
    { label: 'Fabrics (LEA)', href: '/products?category=fabric', img: '/assets/images/fabrics/fabric1.webp', tag: 'Pure Linen' },
    { label: 'NDD Dispatch', href: '/products?ndd=true', img: '/assets/images/sarees/saree2.webp', tag: '24h Dispatch' },
    { label: 'Clearance Sale', href: '/products?sale=true', img: '/assets/images/sale-circle.png', tag: 'Up to 30% Off', isSale: true },
    { label: 'Chadar & Gamcha', href: '/products?category=chadar', img: '/assets/images/fabrics/fabric2.webp', tag: 'Bhagalpuri DULL' },
    { label: 'Suit Salwar', href: '/products?category=suit-salwar', img: '/assets/images/sarees/saree4.webp', tag: 'Banarsi Cut' },
  ]

  return (
    <section
      id="home"
      style={{
        paddingTop: '115px',
        paddingBottom: '50px',
        background: '#FAF9F6',
        borderBottom: '1px solid #ECE7E1',
      }}
    >
      <div className="container-lux" style={{ width: '100%', maxWidth: '1480px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Main Editorial Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          {/* Left Editorial Copy */}
          <div style={{ maxWidth: '620px' }}>
            {/* Heritage Micro-Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#8A7B6D',
                marginBottom: '16px',
              }}
            >
              <span>{parentCompany} (Est. 2007)</span>
              <span>•</span>
              <span>Pit-Loom House</span>
            </div>

            {/* Editorial Serif Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5.2vw, 3.6rem)',
                lineHeight: 1.12,
                color: '#1C1917',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              Pure Handloom Linens & Silk Masterpieces
            </h1>

            {/* Editorial Lead Description */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.68,
                color: '#4B433E',
                marginBottom: '32px',
                maxWidth: '560px',
              }}
            >
              Direct from the ancestral looms to your wardrobe. Authentic Bhagalpuri Tussar & Desi silk sarees, certified high-count pure linen shirting and suiting fabrics, and timeless traditional weaves. Available for individual connoisseurs and wholesale partners nationwide.
            </p>

            {/* Minimalist Editorial Action Deck (Linen World Style) */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '38px' }}>
              <Link
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '4px',
                  background: '#1C1917',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
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
                <span>Explore All Collections</span>
                <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${shopName}! I would like to order handcrafted sarees and fabrics.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 24px',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  color: '#1C1917',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid #D7D0C6',
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
                <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '15px' }}></i>
                <span>Order Online</span>
              </a>

              <a
                href="#wholesale"
                onClick={scrollTo('#wholesale')}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#70645B',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1C1917'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#70645B'
                }}
              >
                Wholesale Inquiries →
              </a>
            </div>

            {/* Clean Editorial Stats Deck */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '18px',
                paddingTop: '22px',
                borderTop: '1px solid #ECE7E1',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#1C1917', lineHeight: 1 }}>
                  17+
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8A7B6D', marginTop: '4px' }}>
                  Years Crafting
                </div>
                <div style={{ fontSize: '11px', color: '#8C827A' }}>
                  Est. 2007
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#1C1917', lineHeight: 1 }}>
                  100%
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8A7B6D', marginTop: '4px' }}>
                  Natural Fibers
                </div>
                <div style={{ fontSize: '11px', color: '#8C827A' }}>
                  Pure Silk & Linen
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#1C1917', lineHeight: 1 }}>
                  24h
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8A7B6D', marginTop: '4px' }}>
                  NDD Ready
                </div>
                <div style={{ fontSize: '11px', color: '#8C827A' }}>
                  Fast Pan-India
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Showcase (Abstract Architectural Shape Container) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            
            {/* Subtle Luxury Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                width: '95%',
                height: '95%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(250, 248, 245, 0) 70%)',
                filter: 'blur(35px)',
                zIndex: 0,
              }}
            />

            {/* Asymmetrical Luxury Abstract Frame */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                aspectRatio: '1 / 1.34',
                borderRadius: '240px 240px 42px 42px',
                padding: '9px',
                background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.55) 0%, rgba(255, 255, 255, 0.98) 45%, rgba(197, 160, 89, 0.5) 100%)',
                boxShadow: '0 24px 60px rgba(28, 25, 23, 0.12), 0 0 0 1px rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                transition: 'transform 0.4s ease',
              }}
            >
              {/* Inner Sculpted Arch Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '232px 232px 34px 34px',
                  overflow: 'hidden',
                  background: '#1C1917',
                  boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Image
                  src={shopImg.includes('linen-galaxy-boutique') ? '/assets/images/hero-model-saree.webp' : shopImg}
                  alt={`${shopName} — Pure Handloom Silks & Fine Linens`}
                  fill
                  priority
                  unoptimized={Boolean(shopImg && shopImg.startsWith('data:'))}
                  sizes="(max-width: 768px) 90vw, 430px"
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                />

                {/* Floating Luxury Editorial Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(28, 25, 23, 0.92)',
                    backdropFilter: 'blur(12px)',
                    padding: '8px 20px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#FAF8F5',
                    border: '1px solid rgba(212, 175, 55, 0.6)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                    whiteSpace: 'nowrap',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37' }}></span>
                  <span>{parentCompany} Master Weave</span>
                </div>
              </div>
            </div>

            {/* Weave Heritage Details Caption */}
            <div
              style={{
                marginTop: '18px',
                textAlign: 'center',
                maxWidth: '430px',
                zIndex: 1,
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Heirloom Bhagalpuri Pit-Loom Sarees
              </div>
              <div style={{ fontSize: '11.5px', color: '#7E736A', marginTop: '4px', lineHeight: 1.5 }}>
                Authentic Desi & Tussar silk sarees with certified linen yarn & antique zari borders.
              </div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Link
                  href="/products?category=saree"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#B38728',
                    textDecoration: 'none',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    background: '#FFFFFF',
                    border: '1px solid #ECE7E1',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Explore Sarees</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: '9px' }}></i>
                </Link>
                <a
                  href="#outlets"
                  onClick={scrollTo('#outlets')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#5C5248',
                    textDecoration: 'none',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    background: '#FAF8F5',
                    border: '1px solid #ECE7E1',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i className="fas fa-store" style={{ fontSize: '10px', color: '#B38728' }}></i>
                  <span>Our Outlets</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Story Category Circles (Linen World Style) */}
        <div style={{ paddingTop: '28px', borderTop: '1px solid #ECE7E1' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#8A7B6D',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Explore Master Weaves
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
            }}
          >
            {categoryHighlights.map((cat, i) => (
              <a
                key={i}
                href={cat.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  padding: '10px 8px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #EAE5DE',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.borderColor = '#1C1917'
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = '#EAE5DE'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '10px',
                    background: (cat as any).isSale ? '#FFFFFF' : '#F0EBE5',
                    border: (cat as any).isSale ? '1.5px solid #FCA5A5' : '1px solid #E2DCD4',
                    boxShadow: (cat as any).isSale ? '0 3px 10px rgba(220, 38, 38, 0.16)' : 'none',
                  }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.label}
                    fill
                    sizes="68px"
                    style={{ objectFit: (cat as any).isSale ? 'contain' : 'cover' }}
                  />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1C1917', textAlign: 'center' }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '10px', color: '#8A7B6D', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {cat.tag}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
