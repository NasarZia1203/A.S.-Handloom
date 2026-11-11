'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#FAF9F6',
        borderTop: '1px solid #ECE7E1',
        padding: '56px 0 28px',
        color: '#4B433E',
      }}
    >
      <div style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 3-Column Linen World Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            marginBottom: '44px',
          }}
        >
          {/* Column 1: Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1C1917',
                marginBottom: '16px',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Shop All Collections', href: '/products' },
                { label: 'Handloom Sarees', href: '/products?category=saree' },
                { label: 'Pure Linen Yardage (LEA)', href: '/products?category=fabric' },
                { label: 'Bhagalpuri DULL Chadar', href: '/products?category=chadar' },
                { label: 'Next Day Dispatch (NDD)', href: '/products?ndd=true' },
                { label: 'Clearance & Flash Sale', href: '/products?sale=true' },
                { label: 'Wholesale Manufacturing', href: '/#wholesale' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      color: '#6E6259',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1917')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#6E6259')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Customer Service (Dynamic Policy Pages) */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1C1917',
                marginBottom: '16px',
              }}
            >
              Customer Service
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Shipping & Delivery Policy', href: '/policies/shipping-delivery' },
                { label: 'Refund & Cancellation Policy', href: '/policies/refund-cancellation' },
                { label: 'Handloom Disclaimer Policy', href: '/policies/handloom-disclaimer' },
                { label: 'Privacy Policy', href: '/policies/privacy-policy' },
                { label: 'Terms of Service', href: '/policies/terms-of-service' },
              ].map((policy, i) => (
                <li key={i}>
                  <Link
                    href={policy.href}
                    style={{
                      fontSize: '13px',
                      color: '#6E6259',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1917')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#6E6259')}
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About The Enterprise */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1C1917',
                marginBottom: '10px',
              }}
            >
              A S Handloom
            </h4>
            <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#6E6259', margin: '0 0 16px' }}>
              Bhagalpur based ancestral pit-loom manufacturing house and textile enterprise (Est. 2007). We craft authentic Bhagalpuri Tussar & Desi silk sarees, certified high-count pure linen yardage, and heritage pit-loom weaves direct from our looms to retail connoisseurs and wholesale partners nationwide.
            </p>
            <div style={{ fontSize: '12.5px', color: '#1C1917', fontWeight: 600 }}>
              Direct WhatsApp Orders: <a href="https://wa.me/919798141494" target="_blank" rel="noopener noreferrer" style={{ color: '#047857', textDecoration: 'none' }}>+91 97981 41494</a>
            </div>
          </div>
        </div>

        {/* Clean Editorial Bottom Bar (No Card Companies / Payment Gateways) */}
        <div
          style={{
            paddingTop: '20px',
            borderTop: '1px solid #ECE7E1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: '#8A7B6D',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} — LINEN GALAXY BY A S HANDLOOM (EST. 2007) • ALL RIGHTS RESERVED.
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/about" style={{ color: '#8A7B6D', textDecoration: 'none' }}>
              About
            </Link>
            <span>•</span>
            <Link href="/contact" style={{ color: '#8A7B6D', textDecoration: 'none' }}>
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
