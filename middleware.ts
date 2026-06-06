import { NextRequest, NextResponse } from 'next/server'
import { DEV_USER_ID, PROTECTED_ROUTES } from './lib/definitions'

const DOMAIN_API = process.env.NEXT_PUBLIC_API_URL

/**
 * Resolve user_id from the incoming host via the domain registry API.
 * Adapted from Hyperblog middleware — only the user-ID lookup, nothing else.
 */
async function getUserIdByHost(host: string): Promise<string | null> {
  try {
    const res = await fetch(`${DOMAIN_API}/api/v1/settings/user_id/${host}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.user_id ?? null
  } catch (err) {
    console.error('[Middleware] getUserIdByHost error:', err)
    return null
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const pathname = url?.pathname

  // Check authentication for admin and onboarding routes
  const isProtected = PROTECTED_ROUTES?.some(route => pathname?.startsWith(route))
  if (isProtected) {
    const token = req.cookies.get('token')?.value
    if (!token) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Prevent logged-in users from seeing the login page
  if (pathname === '/login') {
    const token = req.cookies.get('token')?.value
    if (token) {
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  const host = req.headers.get('host') || ''

  let userId: string | null

  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    userId = DEV_USER_ID
  } else {
    userId = await getUserIdByHost(host)
  }

  if (!userId) return NextResponse.next()

  const response = NextResponse.next()
  response.cookies.set({
    name: 'hd_user_id',
    value: userId,
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}

export const config = {
  matcher: ['/((?!_next|api|favicon|.*\\.).*)'],
}
