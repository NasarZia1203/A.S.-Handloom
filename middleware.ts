import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const adminSessionCookie = request.cookies.get('ashandloom_admin_session')?.value
  const isDirectAdmin = adminSessionCookie === 'authenticated_admin'

  let user = null

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: any) {
              request.cookies.set({ name, value, ...options })
              response = NextResponse.next({
                request: { headers: request.headers },
              })
              response.cookies.set({ name, value, ...options })
            },
            remove(name: string, options: any) {
              request.cookies.set({ name, value: '', ...options })
              response = NextResponse.next({
                request: { headers: request.headers },
              })
              response.cookies.set({ name, value: '', ...options })
            },
          },
        }
      )

      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch {
      // Supabase may be paused or offline, fall back to session cookie
    }
  }

  const hasAccess = !!user || isDirectAdmin

  // Protect /admin/dashboard and all sub-routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !hasAccess) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Protect API routes under /api/products for write operations
  if (
    request.nextUrl.pathname.startsWith('/api/products') &&
    request.method !== 'GET' &&
    !hasAccess
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return response
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/products/:path*'],
}
