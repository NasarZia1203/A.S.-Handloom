'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const images = [
  '/assets/images/herosec1.webp',
  '/assets/images/herosec2.webp',
  '/assets/images/herosec3.webp',
]

const stats = [
  { value: '17+', label: 'Years Experience' },
  { value: '5000+', label: 'Happy Customers' },
  { value: '1000+', label: 'Products' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToCollection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#sarees')
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      {/* Background Grid */}
      <div className="hero-bg-grid">
        {images.map((src, idx) => (
          <div className="hero-bg-cell" key={idx}>
            <Image 
              src={src} 
              alt="Traditional handloom sarees and fabrics" 
              className="hero-bg-img"
              fill
              priority={idx === 0}
              sizes="(max-width: 480px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-bg-gradient" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Badge */}
        <div 
          className="hero-badge"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.2s'
          }}
        >
          <span style={{ 
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
            animation: 'pulse 2s infinite'
          }}></span>
          Since 2007 - Bhagalpur, Bihar
        </div>

        {/* Logo */}
        <div 
          className="hero-logo"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.3s'
          }}
        >
          <Image 
            src="/assets/images/logo.png" 
            alt="A S Handloom Logo" 
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Title */}
        <h1 style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.4s'
        }}>
          A S Handloom
        </h1>

        {/* Tagline */}
        <p 
          className="hero-tagline"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.5s'
          }}
        >
          Weaving Heritage, Crafting Elegance — Exquisite Handloom Sarees & Premium Fabrics from the Heart of India
        </p>

        {/* CTA Buttons */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.6s'
          }}
        >
          <a href="#sarees" className="hero-cta" onClick={scrollToCollection}>
            Explore Collections
            <i className="fas fa-arrow-right"></i>
          </a>
          <a 
            href="https://wa.me/919798141494?text=Hello!%20I'm%20interested%20in%20your%20handloom%20products."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '18px',
              transition: 'all 0.25s ease',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <i className="fab fa-whatsapp" style={{ fontSize: '20px' }}></i>
            Chat Now
          </a>
        </div>

        {/* Stats */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '48px',
            flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.7s'
          }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              style={{ 
                textAlign: 'center',
                padding: '0 16px'
              }}
            >
              <div style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-family-heading)',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9,
                marginTop: '4px',
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: mounted ? 0.7 : 0,
          transition: 'opacity 0.6s ease 1s',
          cursor: 'pointer'
        }}
        onClick={() => {
          const target = document.querySelector('#about')
          if (target) {
            const offsetTop = (target as HTMLElement).offsetTop - 80
            window.scrollTo({ top: offsetTop, behavior: 'smooth' })
          }
        }}
      >
        <span style={{ fontSize: '12px', color: 'white', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Scroll
        </span>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px'
        }}>
          <div style={{
            width: '4px',
            height: '8px',
            background: 'white',
            borderRadius: '2px',
            animation: 'scrollBounce 1.5s infinite'
          }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  )
}
