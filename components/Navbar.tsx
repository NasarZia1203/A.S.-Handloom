'use client'

import { useEffect, useState, useCallback } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 70
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

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={handleNavClick}>
          A S Handloom
        </a>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          <li>
            <a href="#home" onClick={handleNavClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleNavClick}>
              About
            </a>
          </li>
          <li>
            <a href="#sarees" onClick={handleNavClick}>
              Sarees
            </a>
          </li>
          <li>
            <a href="#fabrics" onClick={handleNavClick}>
              Fabrics
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleNavClick}>
              Contact
            </a>
          </li>
          <li>
            <a href="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </a>
          </li>
        </ul>
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  )
}
