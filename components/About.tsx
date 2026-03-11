'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const features = [
  {
    icon: 'fas fa-award',
    title: 'Premium Quality',
    description: 'Finest materials and craftsmanship'
  },
  {
    icon: 'fas fa-heart',
    title: 'Traditional Art',
    description: 'Preserving heritage techniques'
  },
  {
    icon: 'fas fa-leaf',
    title: 'Sustainable',
    description: 'Eco-friendly materials & processes'
  }
]

const highlights = [
  { icon: 'fas fa-map-marker-alt', text: 'Bhagalpur, Bihar' },
  { icon: 'fas fa-clock', text: 'Est. 2007' },
  { icon: 'fas fa-gem', text: 'Linen, Silk & Cotton' }
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
              padding: '8px 20px',
              borderRadius: '50px',
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E91E63'
            }}
          >
            <i className="fas fa-info-circle"></i>
            Our Story
          </div>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>About Us</h2>
          <p style={{
            maxWidth: '600px',
            margin: '24px auto 0',
            color: 'var(--color-text-secondary)',
            fontSize: '18px',
            lineHeight: 1.7
          }}>
            Crafting timeless elegance through the art of handloom weaving
          </p>
        </div>

        {/* Highlight Tags */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s'
          }}
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                padding: '12px 20px',
                borderRadius: '50px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                border: '1px solid var(--color-border)',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <i className={item.icon} style={{ color: '#E91E63' }}></i>
              {item.text}
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="about-content">
          {/* Text Content */}
          <div 
            className="about-text"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.6s ease 0.2s'
            }}
          >
            <p style={{ fontSize: '18px', color: 'var(--color-text)', lineHeight: 1.8 }}>
              Founded in <strong style={{ color: '#E91E63' }}>2007</strong>, A S Handloom is based in Bhagalpur, Bihar — 
              a renowned hub for fine handloom textiles. We specialize in creating exquisite sarees 
              and premium fabrics including <strong>Linen, Silk, and Cotton</strong>, combining 
              traditional craftsmanship with contemporary designs.
            </p>
            <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              Our skilled artisans bring decades of expertise to every piece, ensuring that each 
              product reflects the rich heritage of Indian handloom while meeting modern quality 
              standards. Every thread tells a story of tradition, passion, and excellence.
            </p>

            {/* Feature Cards */}
            <div className="about-features">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${0.3 + index * 0.1}s`
                  }}
                >
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ marginTop: '32px' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 8px 25px -8px rgba(233, 30, 99, 0.4)'
                }}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector('#contact')
                  if (target) {
                    const offsetTop = (target as HTMLElement).offsetTop - 80
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px -8px rgba(233, 30, 99, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(233, 30, 99, 0.4)'
                }}
              >
                Get in Touch
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Images */}
          <div
            className="about-image-grid"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: '600px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.6s ease 0.3s'
            }}
          >
            <div 
              className="about-image" 
              style={{ 
                flex: 1, 
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)'
              }}
            >
              <Image
                src="/assets/ASHandloomWorkshop.webp"
                alt="Our Workshop - Traditional handloom weaving"
                fill
                style={{
                  objectFit: 'cover',
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Image Badge */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '10px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-text)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <i className="fas fa-industry" style={{ color: '#E91E63' }}></i>
                Our Workshop
              </div>
            </div>
            <div 
              className="about-image" 
              style={{ 
                flex: 1, 
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)'
              }}
            >
              <Image
                src="/assets/ASHandloomOffice.webp"
                alt="Our Office - A S Handloom headquarters"
                fill
                style={{
                  objectFit: 'cover',
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Image Badge */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '10px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-text)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <i className="fas fa-building" style={{ color: '#E91E63' }}></i>
                Our Office
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
