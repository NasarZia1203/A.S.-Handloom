import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAuthClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createAuthClient()
    await supabase.auth.signOut()
  } catch {}

  const cookieStore = await cookies()
  cookieStore.set('ashandloom_admin_session', '', {
    path: '/',
    maxAge: 0,
  })

  return NextResponse.json({ success: true })
}
