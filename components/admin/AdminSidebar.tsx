'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const linkStyle = (href: string): React.CSSProperties => ({
    display: 'block',
    padding: '10px 16px',
    color: pathname === href ? '#fff' : '#ccc',
    textDecoration: 'none',
    borderRadius: '6px',
    backgroundColor: pathname === href ? 'rgba(255,255,255,0.15)' : 'transparent',
    fontWeight: pathname === href ? '600' : '400',
    fontSize: '14px',
    transition: 'background 0.2s',
  })

  return (
    <aside
      style={{
        width: '240px',
        backgroundColor: '#1f2121',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#ffd700',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        A S Handloom Admin
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <Link href="/admin/dashboard" style={linkStyle('/admin/dashboard')}>
          <i className="fas fa-tachometer-alt" style={{ marginRight: '8px' }}></i>
          Dashboard
        </Link>
        <Link
          href="/admin/dashboard/products/new"
          style={linkStyle('/admin/dashboard/products/new')}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Add Product
        </Link>
      </nav>

      <button
        onClick={handleSignOut}
        style={{
          padding: '10px 16px',
          backgroundColor: '#800020',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          marginTop: '16px',
        }}
      >
        <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
        Sign Out
      </button>
    </aside>
  )
}
