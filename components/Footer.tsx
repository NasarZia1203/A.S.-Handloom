'use client'

import Image from 'next/image'
import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Sarees', href: '#sarees' },
  { label: 'Fabrics', href: '#fabrics' },
  { label: 'Contact', href: '#contact' }
]

const socialLinks = [
  { icon: 'fas fa-map-marker-alt', href: 'https://maps.app.goo.gl/hYaGfcFaaA2Jhzus5', label: 'Location' },
  { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
  { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/919798141494', label: 'WhatsApp' }
]

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = (target as HTMLElement).offsetTop - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                overflow: 'hidden',
                background: 'white'
              }}>
                <Image 
                  src="/assets/images/logo.png" 
                  alt="A S Handloom" 
                  width={48} 
                  height={48}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ 
                margin: 0,
                background: 'linear-gradient(135deg, #E91E63 0%, #FF9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '22px'
              }}>
                A S Handloom
              </h3>
            </div>
            <p style={{ marginBottom: '16px', lineHeight: 1.8 }}>
              Weaving Heritage Since 2007. We specialize in creating exquisite
              handloom sarees and premium fabrics with traditional craftsmanship
              and contemporary designs.
            </p>
            
            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '4px',
                height: '20px',
                background: 'linear-gradient(180deg, #E91E63 0%, #FF5722 100%)',
                borderRadius: '2px'
              }}></span>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <i className="fas fa-chevron-right" style={{ fontSize: '10px', color: '#E91E63' }}></i>
                  {link.label}
                </a>
              ))}
              <Link 
                href="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#94A3B8',
                  textDecoration: 'none'
                }}
              >
                <i className="fas fa-chevron-right" style={{ fontSize: '10px', color: '#E91E63' }}></i>
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '4px',
                height: '20px',
                background: 'linear-gradient(180deg, #E91E63 0%, #FF5722 100%)',
                borderRadius: '2px'
              }}></span>
              Contact Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: 0 }}>
                <i className="fas fa-user-tie" style={{ marginTop: '4px' }}></i>
                <span>
                  <strong style={{ color: 'white' }}>Proprietor:</strong><br />
                  MD RAZA ALAM
                </span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: 0 }}>
                <i className="fas fa-map-marker-alt" style={{ marginTop: '4px' }}></i>
                <span>
                  85 M T N Ghosh Road<br />
                  Bhagalpur, Bihar, India
                </span>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                <i className="fas fa-phone"></i>
                <a href="tel:+919430908657" style={{ color: '#94A3B8' }}>+91-9430908657</a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                <i className="fas fa-envelope"></i>
                <a href="mailto:ashandloombgp@gmail.com" style={{ color: '#94A3B8' }}>ashandloombgp@gmail.com</a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                <i className="fas fa-file-invoice-dollar"></i>
                <span>
                  <strong style={{ color: 'white' }}>GST:</strong> 10AJXPA6956B1ZD
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} A S Handloom. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
              <span>Made with</span>
              <i className="fas fa-heart" style={{ color: '#E91E63', fontSize: '12px' }}></i>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
