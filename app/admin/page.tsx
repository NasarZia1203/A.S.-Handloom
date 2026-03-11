import { redirect } from 'next/navigation'
import { createAuthClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createAuthClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin/dashboard')
  } else {
    redirect('/admin/login')
  }
}
