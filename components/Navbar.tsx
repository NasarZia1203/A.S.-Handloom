'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProductCategory } from '@/lib/types'
import { DEFAULT_CATEGORIES } from '@/lib/data/categories'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopMegaOpen, setShopMegaOpen] = useState(false)
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false)
  const [categories, setCategories] = useState<ProductCategory[]>(DEFAULT_CATEGORIES)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch dynamic categories from API
  useEffect(() => {
    async function loadDynamicCats() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data.filter((c: ProductCategory) => c.is_active !== false))
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic categories in Navbar:', err)
      }
    }
    loadDynamicCats()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll on mobile drawer
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleMouseEnterShop = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setShopMegaOpen(true)
  }

  const handleMouseLeaveShop = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShopMegaOpen(false)
    }, 150)
  }

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/linengalaxy') && window.location.pathname !== '/') {
          window.location.href = `/linengalaxy${href}`
          return
        }
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 85
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }
      setShopMegaOpen(false)
      setMenuOpen(false)
    },
    []
  )

  const leftNavItems = [
    { href: '/products?sale=true', label: 'CLEARANCE', isRed: true },
    { href: '/products?category=saree', label: 'BEST SELLERS' },
    { href: '/about', label: 'ABOUT US', isRoute: true },
  ]

  const rightNavItems = [
    { href: '/linengalaxy#wholesale', label: 'WHOLESALE' },
    { href: '/contact', label: 'CONTACT', isRoute: true },
    { href: '/admin/login', label: 'LOGIN', isRoute: true },
  ]

  const colHeaderStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#1C1917',
    marginBottom: '14px',
    paddingBottom: '6px',
    borderBottom: '1px solid #ECE7E1',
    display: 'block',
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#FFFFFF',
        transition: 'all 0.25s ease',
        boxShadow: scrolled ? '0 2px 12px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      {/* Top Announcement Bar (Linen World Style) */}
      <div
        style={{
          background: '#FAF8F5',
          borderBottom: '1px solid #ECE7E1',
          padding: '7px 16px',
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#6E6259',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <span>HANDWOVEN</span>
        <span style={{ opacity: 0.35 }}>•</span>
        <span>PREMIUM QUALITY</span>
        <span style={{ opacity: 0.35 }}>•</span>
        <span>BEST PRICE</span>
      </div>

      {/* Main Luxury Header Bar */}
      <nav
        style={{
          borderBottom: '1px solid #ECE7E1',
          padding: scrolled ? '8px 0' : '14px 0',
          transition: 'padding 0.25s ease',
          background: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left Column: Primary Navigation Links */}
          <div
            className="desktop-only"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '26px',
            }}
          >
            {/* SHOP Item with Mega Menu Trigger */}
            <div
              onMouseEnter={handleMouseEnterShop}
              onMouseLeave={handleMouseLeaveShop}
              style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
            >
              <Link
                href="/products"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#2D2825',
                  textDecoration: 'none',
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  borderBottom: shopMegaOpen ? '2px solid #1C1917' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>SHOP</span>
                <i className={`fas fa-chevron-${shopMegaOpen ? 'up' : 'down'}`} style={{ fontSize: '9px', opacity: 0.6 }}></i>
              </Link>
            </div>

            {leftNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: item.isRed ? '#DC2626' : '#2D2825',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '8px 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = item.isRed ? '#991B1B' : '#B89668'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = item.isRed ? '#DC2626' : '#2D2825'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Center Column: Text-Only Luxury Typography (No Image Logo) */}
          <div style={{ textAlign: 'center', flexShrink: 0, padding: '0 16px' }}>
            <Link
              href="/linengalaxy"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#1C1917',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                LINEN GALAXY
              </span>
              <span
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#8A7B6D',
                  fontWeight: 600,
                  marginTop: '3px',
                }}
              >
                WHERE STYLE MEETS HERITAGE • BY A S HANDLOOM
              </span>
            </Link>
          </div>

          {/* Right Column: Auxiliary Links & Order CTA */}
          <div
            className="desktop-only"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '22px',
            }}
          >
            {rightNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#2D2825',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '8px 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#B89668'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2D2825'
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Clean Minimalist WhatsApp Button */}
            <a
              href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20order%20handloom%20sarees%20and%20fabrics."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '4px',
                background: '#1C1917',
                color: '#FFFFFF',
                fontSize: '11.5px',
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
              <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '14px' }}></i>
              <span>Order</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: '#1C1917',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Full-Width SHOP Mega Dropdown (Linen World Exact Structure) */}
        {shopMegaOpen && (
          <div
            onMouseEnter={handleMouseEnterShop}
            onMouseLeave={handleMouseLeaveShop}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto',
              background: '#FFFFFF',
              borderBottom: '1px solid #ECE7E1',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
              padding: '24px 0 28px',
              zIndex: 999,
              animation: 'megaFadeIn 0.2s ease',
            }}
          >
            <div
              style={{
                maxWidth: '1480px',
                margin: '0 auto',
                padding: '0 28px',
                display: 'grid',
                gridTemplateColumns: '1fr 1.05fr 1fr 1.05fr 1.25fr',
                gap: '24px',
                alignItems: 'start',
              }}
            >
              {/* Column 1: Handloom Sarees */}
              <div>
                {(() => {
                  const sareeCat = categories.find((c) => c.slug === 'saree')
                  if (!sareeCat) return null
                  return (
                    <div>
                      <Link
                        href={`/products?category=${sareeCat.slug}`}
                        onClick={() => setShopMegaOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        <span style={colHeaderStyle}>{sareeCat.name.toUpperCase()}</span>
                      </Link>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Link
                          href={`/products?category=${sareeCat.slug}`}
                          onClick={() => setShopMegaOpen(false)}
                          className="mega-link"
                          style={{ fontWeight: 600 }}
                        >
                          All {sareeCat.name}
                        </Link>
                        {(sareeCat.types || []).map((type, idx) => (
                          <Link
                            key={idx}
                            href={`/products?category=${sareeCat.slug}&type=${encodeURIComponent(type.toLowerCase())}`}
                            onClick={() => setShopMegaOpen(false)}
                            className="mega-link"
                          >
                            {type}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Column 2: Pure Running Fabrics */}
              <div>
                {(() => {
                  const fabricCat = categories.find((c) => c.slug === 'fabric')
                  if (!fabricCat) return null
                  return (
                    <div>
                      <Link
                        href={`/products?category=${fabricCat.slug}`}
                        onClick={() => setShopMegaOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        <span style={colHeaderStyle}>{fabricCat.name.toUpperCase()}</span>
                      </Link>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Link
                          href={`/products?category=${fabricCat.slug}`}
                          onClick={() => setShopMegaOpen(false)}
                          className="mega-link"
                          style={{ fontWeight: 600 }}
                        >
                          All {fabricCat.name}
                        </Link>
                        {(fabricCat.types || []).map((type, idx) => (
                          <Link
                            key={idx}
                            href={`/products?category=${fabricCat.slug}&type=${encodeURIComponent(type.toLowerCase())}`}
                            onClick={() => setShopMegaOpen(false)}
                            className="mega-link"
                          >
                            {type}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Column 3: Suits, Salwars & Dupattas */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {categories
                    .filter((c) => (c.slug === 'suit-salwar' || c.slug === 'dupatta-stole') && c.is_active !== false)
                    .map((cat) => (
                      <div key={cat.id}>
                        <Link
                          href={`/products?category=${cat.slug}`}
                          onClick={() => setShopMegaOpen(false)}
                          style={{ textDecoration: 'none' }}
                        >
                          <span style={colHeaderStyle}>{cat.name.toUpperCase()}</span>
                        </Link>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <Link
                            href={`/products?category=${cat.slug}`}
                            onClick={() => setShopMegaOpen(false)}
                            className="mega-link"
                            style={{ fontWeight: 600 }}
                          >
                            All {cat.name}
                          </Link>
                          {(cat.types || []).map((type, idx) => (
                            <Link
                              key={idx}
                              href={`/products?category=${cat.slug}&type=${encodeURIComponent(type.toLowerCase())}`}
                              onClick={() => setShopMegaOpen(false)}
                              className="mega-link"
                            >
                              {type}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Column 4: Heritage Weaves (Chadar, Gamcha, Lungis & Other) */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {categories
                    .filter(
                      (c) =>
                        ['chadar', 'gamcha', 'lungi'].includes(c.slug) ||
                        (!['saree', 'fabric', 'suit-salwar', 'dupatta-stole', 'chadar', 'gamcha', 'lungi'].includes(c.slug) &&
                          c.is_active !== false)
                    )
                    .map((cat) => (
                      <div key={cat.id}>
                        <Link
                          href={`/products?category=${cat.slug}`}
                          onClick={() => setShopMegaOpen(false)}
                          style={{ textDecoration: 'none' }}
                        >
                          <span style={colHeaderStyle}>{cat.name.toUpperCase()}</span>
                        </Link>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <Link
                            href={`/products?category=${cat.slug}`}
                            onClick={() => setShopMegaOpen(false)}
                            className="mega-link"
                            style={{ fontWeight: 600 }}
                          >
                            All {cat.name}
                          </Link>
                          {(cat.types || []).map((type, idx) => (
                            <Link
                              key={idx}
                              href={`/products?category=${cat.slug}&type=${encodeURIComponent(type.toLowerCase())}`}
                              onClick={() => setShopMegaOpen(false)}
                              className="mega-link"
                            >
                              {type}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Column 5: Dual Compact Promo Showcase Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {/* Promo Card 1: Shop Sarees */}
                <Link
                  href="/products?category=saree"
                  onClick={() => setShopMegaOpen(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '3 / 4',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      background: '#F5F5F4',
                      marginBottom: '8px',
                    }}
                  >
                    <Image
                      src="/assets/images/sarees/saree1.webp"
                      alt="Shop Handloom Sarees"
                      fill
                      sizes="(max-width: 1480px) 180px, 220px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1C1917',
                      textAlign: 'center',
                    }}
                  >
                    SHOP SAREES
                  </div>
                </Link>

                {/* Promo Card 2: Shop Fabrics */}
                <Link
                  href="/products?category=fabric"
                  onClick={() => setShopMegaOpen(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '3 / 4',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      background: '#F5F5F4',
                      marginBottom: '8px',
                    }}
                  >
                    <Image
                      src="/assets/images/fabrics/fabric1.webp"
                      alt="Shop Pure Running Fabrics"
                      fill
                      sizes="(max-width: 1480px) 180px, 220px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1C1917',
                      textAlign: 'center',
                    }}
                  >
                    SHOP FABRICS
                  </div>
                </Link>
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* Mobile Slide-Out Drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28, 25, 23, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 1001,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '84%',
              maxWidth: '340px',
              height: '100%',
              background: '#FFFFFF',
              padding: '28px 22px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header with Text-Only Logo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '26px' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading), "Playfair Display", Georgia, serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    color: '#1C1917',
                    textTransform: 'uppercase',
                  }}
                >
                  LINEN GALAXY
                </div>
                <div style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7B6D', marginTop: '2px' }}>
                  BY A S HANDLOOM
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', color: '#1C1917', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Navigation Tree */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link
                href="/linengalaxy"
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1917', textDecoration: 'none' }}
              >
                Home
              </Link>

              {/* Mobile Expandable SHOP Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileShopExpanded(!mobileShopExpanded)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#1C1917',
                    cursor: 'pointer',
                  }}
                >
                  <span>Shop Categories</span>
                  <i className={`fas fa-chevron-${mobileShopExpanded ? 'up' : 'down'}`} style={{ fontSize: '10px' }}></i>
                </button>

                {mobileShopExpanded && (
                  <div style={{ paddingLeft: '12px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '2px solid #ECE7E1' }}>
                    <Link
                      href="/products"
                      onClick={() => setMenuOpen(false)}
                      style={{ fontSize: '13px', color: '#1C1917', textDecoration: 'none', fontWeight: 700 }}
                    >
                      • Browse All Collections
                    </Link>
                    {categories.map((cat) => (
                      <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Link
                          href={`/products?category=${cat.slug}`}
                          onClick={() => setMenuOpen(false)}
                          style={{ fontSize: '13px', color: '#1C1917', textDecoration: 'none', fontWeight: 600 }}
                        >
                          • {cat.name}
                        </Link>
                        {cat.types && cat.types.length > 0 && (
                          <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {cat.types.map((type, idx) => (
                              <Link
                                key={idx}
                                href={`/products?category=${cat.slug}&type=${encodeURIComponent(type.toLowerCase())}`}
                                onClick={() => setMenuOpen(false)}
                                style={{ fontSize: '12px', color: '#6E6259', textDecoration: 'none' }}
                              >
                                - {type}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/products?sale=true"
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#DC2626', textDecoration: 'none' }}
              >
                Clearance & Flash Sale
              </Link>
              <a
                href="/linengalaxy#ndd"
                onClick={handleNavClick}
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#047857', textDecoration: 'none' }}
              >
                Next Day Dispatch (NDD)
              </a>
              <a
                href="/linengalaxy#wholesale"
                onClick={handleNavClick}
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1917', textDecoration: 'none' }}
              >
                Wholesale Manufacturing
              </a>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1917', textDecoration: 'none' }}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1917', textDecoration: 'none' }}
              >
                Contact Us
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1917', textDecoration: 'none' }}
              >
                Login
              </Link>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '22px', borderTop: '1px solid #ECE7E1' }}>
              <a
                href="https://wa.me/919798141494?text=Hello%20Linen%20Galaxy!%20I%20would%20like%20to%20order%20handloom%20sarees%20and%20fabrics."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
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
                <i className="fab fa-whatsapp" style={{ color: '#25D366', fontSize: '16px' }}></i>
                <span>Direct WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
