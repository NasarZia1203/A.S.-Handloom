'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    router.refresh()
    window.location.href = '/'
  }

  const navItems = [
    { href: '/admin/dashboard', icon: 'fas fa-th-large', label: 'Overview Dashboard' },
    { href: '/admin/dashboard/products/new', icon: 'fas fa-plus-circle', label: 'Add New Product' },
    { href: '/products', icon: 'fas fa-store', label: 'Live Master Catalog' },
    { href: '/products?category=saree', icon: 'fas fa-female', label: 'Saree Collection' },
    { href: '/products?category=fabric', icon: 'fas fa-scroll', label: 'Fabric Collection' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside
      style={{
        width: '280px',
        height: '100vh',
        background: '#1A1D20',
        color: '#E6E9EE',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRight: '1px solid rgba(229, 210, 184, 0.15)',
        zIndex: 50,
      }}
    >
      {/* Logo & Brand Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              position: 'relative',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '2px solid rgba(212, 175, 55, 0.75)',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
              flexShrink: 0,
            }}
          >
            <Image
              src="/assets/images/linen-galaxy-logo-white-bg.png"
              alt="Linen Galaxy"
              fill
              sizes="46px"
              style={{ objectFit: 'contain', padding: '4px' }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              Linen Galaxy
            </div>
            <div style={{ fontSize: '10.5px', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginTop: '2px' }}>
              By A S Handloom Admin
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '24px 16px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7E8694', padding: '0 12px 12px', fontWeight: 700 }}>
          Catalog & Inventory
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const active = isActive(item.href)
            const hovered = hoveredLink === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredLink(item.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#FFFFFF' : hovered ? '#FFFFFF' : '#A0AAB8',
                    background: active
                      ? 'linear-gradient(135deg, #B89668 0%, #D48C70 100%)'
                      : hovered
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    boxShadow: active ? '0 8px 20px -4px rgba(184, 111, 84, 0.4)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i className={item.icon} style={{ width: '18px', textAlign: 'center', color: active ? '#FFFFFF' : '#B89668' }}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer Info & Sign Out */}
      <div style={{ padding: '20px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRadius: '12px',
            color: '#A0AAB8',
            textDecoration: 'none',
            fontSize: '13px',
            marginBottom: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <i className="fas fa-external-link-alt" style={{ fontSize: '12px', color: '#B89668' }}></i>
          <span>View Public Storefront</span>
        </Link>

        <button
          onClick={handleSignOut}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(239, 68, 68, 0.08)',
            color: '#ef4444',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
