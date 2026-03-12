import { redirect } from 'next/navigation'
import { createAuthClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createAuthClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1a' }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          marginLeft: '280px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          overflowY: 'auto',
          position: 'relative',
          height: '100vh',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
              }}
            />
            <span style={{ fontSize: '13px', color: '#64748b' }}>System Online</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <i className="fas fa-external-link-alt" style={{ fontSize: '11px' }}></i>
              View Site
            </a>
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
