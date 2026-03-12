'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
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

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 80
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }
      setMenuOpen(false)
    },
    []
  )

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#sarees', label: 'Sarees' },
    { href: '#fabrics', label: 'Fabrics' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a 
          href="#home" 
          className="logo" 
          onClick={handleNavClick}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(233, 30, 99, 0.2)',
            flexShrink: 0
          }}>
            <Image 
              src="/assets/images/logo.png" 
              alt="A S Handloom" 
              width={42} 
              height={42}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span style={{ 
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            A S Handloom
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link 
              href="/admin" 
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 15px -3px rgba(233, 30, 99, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 20px -3px rgba(233, 30, 99, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px -3px rgba(233, 30, 99, 0.3)'
              }}
            >
              <i className="fas fa-user-shield" style={{ fontSize: '12px' }}></i>
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            position: 'relative',
            zIndex: 1001
          }}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}
