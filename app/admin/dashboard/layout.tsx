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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: '24px 32px',
          backgroundColor: '#f9fafb',
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  )
}
