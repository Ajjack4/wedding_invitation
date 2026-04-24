import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'mar']
const DEFAULT_LOCALE = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already starts with a supported locale
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocale) return NextResponse.next()

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
  }

  // For unknown locale segments, redirect to /en
  const firstSegment = pathname.split('/')[1]
  if (firstSegment && !SUPPORTED_LOCALES.includes(firstSegment)) {
    const rest = pathname.slice(firstSegment.length + 1)
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${rest}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|.*\\..*).*)'],
}
