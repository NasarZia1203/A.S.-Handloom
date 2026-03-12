'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/admin/dashboard', icon: 'fas fa-th-large', label: 'Dashboard' },
    { href: '/admin/dashboard/products/new', icon: 'fas fa-plus-circle', label: 'Add Product' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside
      style={{
        width: '280px',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E91E63' fill-opacity='0.03'%3E%3Cpath d='m0 40 40-40h-20l-20 20v20zm40 0v-20l-20 20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Logo Section */}
      <div
        style={{
          padding: '28px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px -6px rgba(233, 30, 99, 0.4)',
            }}
          >
            <i className="fas fa-store" style={{ fontSize: '20px', color: 'white' }}></i>
          </div>
          <div>
            <div
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '18px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              A S Handloom
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2px' }}>
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '0 12px',
            marginBottom: '8px',
          }}
        >
          Menu
        </div>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredLink(item.href)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: isActive(item.href)
                ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.15), rgba(255, 87, 34, 0.15))'
                : hoveredLink === item.href
                ? 'rgba(255, 255, 255, 0.05)'
                : 'transparent',
              border: isActive(item.href)
                ? '1px solid rgba(233, 30, 99, 0.3)'
                : '1px solid transparent',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isActive(item.href) && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '24px',
                  background: 'linear-gradient(180deg, #E91E63, #FF5722)',
                  borderRadius: '0 4px 4px 0',
                }}
              />
            )}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: isActive(item.href)
                  ? 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)'
                  : 'rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <i
                className={item.icon}
                style={{
                  fontSize: '15px',
                  color: isActive(item.href) ? 'white' : 'rgba(255, 255, 255, 0.5)',
                }}
              ></i>
            </div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: isActive(item.href) ? 600 : 500,
                color: isActive(item.href) ? 'white' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {item.label}
            </span>
            {isActive(item.href) && (
              <div
                style={{
                  marginLeft: 'auto',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div
        style={{
          padding: '20px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Quick Stats */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <i className="fas fa-chart-pie" style={{ color: '#E91E63', fontSize: '14px' }}></i>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>Quick Stats</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>--</div>
              <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>Products</div>
            </div>
            <div
              style={{
                width: '1px',
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>--</div>
              <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>Active</div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
