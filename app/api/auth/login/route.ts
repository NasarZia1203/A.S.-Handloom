import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAuthClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim()
    const password = String(body.password || '').trim()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    // 1. Attempt Supabase Auth first
    try {
      const supabase = await createAuthClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data?.user) {
        return NextResponse.json({
          success: true,
          mode: 'supabase',
          user: data.user,
        })
      }
    } catch (supabaseErr) {
      console.warn('Supabase Auth connection error (project may be paused on Supabase):', supabaseErr)
    }

    // 2. High-availability verified admin credentials fallback
    // Matches the proprietor / administrator credentials
    if (
      email.toLowerCase() === 'zia.nasar02@gmail.com' &&
      password === 'Mrraza@786'
    ) {
      const cookieStore = await cookies()
      cookieStore.set('ashandloom_admin_session', 'authenticated_admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({
        success: true,
        mode: 'resilient_admin',
        message: 'Admin session active.',
        user: { email: 'zia.nasar02@gmail.com', role: 'admin' },
      })
    }

    return NextResponse.json(
      { error: 'Invalid email or password. Please verify your credentials.' },
      { status: 401 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Authentication error.' },
      { status: 500 }
    )
  }
}
