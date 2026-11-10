'use client'

import { useState, useEffect } from 'react'

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 6000)
    }, 2500)

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(tooltipTimer)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.4s ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* 3D Floating Tooltip (Desktop Only, Prevents Mobile Overlap) */}
      {showTooltip && (
        <div
          className="whatsapp-desktop-tooltip"
          style={{
            background: '#FFFFFF',
            color: '#111827',
            padding: '10px 18px',
            borderRadius: '50px',
            boxShadow: '0 12px 32px rgba(17, 24, 39, 0.15)',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'float3D 4s ease-in-out infinite',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
          }} />
          <span>Online Order & Wholesale Inquiries Available</span>
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/919798141494?text=Hello%20A%20S%20Handloom%2C%20I%20would%20like%20to%20place%20an%20order%20%2F%20enquire%20about%20your%20sarees%20and%20fabrics."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with A S Handloom on WhatsApp"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          boxShadow: '0 8px 26px rgba(18, 140, 126, 0.45)',
          textDecoration: 'none',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)'
        }}
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  )
}
