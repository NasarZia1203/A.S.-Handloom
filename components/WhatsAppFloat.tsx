'use client'

import { useState, useEffect } from 'react'

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Show button after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
      // Hide tooltip after 5 seconds
      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

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
        gap: '12px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.4s ease',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            background: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            maxWidth: '200px',
            animation: 'slideIn 0.3s ease',
            position: 'relative'
          }}
        >
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              fontSize: '12px',
              padding: '2px'
            }}
            aria-label="Close tooltip"
          >
            <i className="fas fa-times"></i>
          </button>
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: '#1A1A2E',
            lineHeight: 1.5,
            paddingRight: '16px'
          }}>
            <strong>Need help?</strong><br />
            Chat with us on WhatsApp!
          </p>
          {/* Arrow pointing to button */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '28px',
              width: '16px',
              height: '16px',
              background: 'white',
              transform: 'rotate(45deg)',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.05)'
            }}
          ></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919798141494?text=Hello!%20I'm%20interested%20in%20your%20handloom%20products."
        className="whatsapp-float"
        target="_blank"
        aria-label="Chat on WhatsApp"
        rel="noopener noreferrer"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '28px',
          boxShadow: '0 8px 30px -5px rgba(37, 211, 102, 0.5)',
          animation: 'none',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 40px -5px rgba(37, 211, 102, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 30px -5px rgba(37, 211, 102, 0.5)'
        }}
      >
        <i className="fab fa-whatsapp"></i>
        
        {/* Pulse Ring */}
        <span
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '24px',
            border: '2px solid #25D366',
            opacity: 0,
            animation: 'pulseRing 2s infinite'
          }}
        ></span>
        
        {/* Online Indicator */}
        <span
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '14px',
            height: '14px',
            background: '#10B981',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        ></span>
      </a>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
