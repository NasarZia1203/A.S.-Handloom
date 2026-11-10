import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createAuthClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const hasLocalAdmin = cookieStore.get('ashandloom_admin_session')?.value === 'authenticated_admin'

  let user = null
  try {
    const supabase = await createAuthClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {}

  if (!user && !hasLocalAdmin) {
    redirect('/admin/login')
  }

  const userEmail = user?.email || 'zia.nasar02@gmail.com'

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
                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
              Catalog System Live
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 12px',
                background: '#f8fafc',
                borderRadius: '50px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #B38728 0%, #D4AF37 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>
                {userEmail}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '32px' }}>{children}</div>
      </main>
    </div>
  )
}
