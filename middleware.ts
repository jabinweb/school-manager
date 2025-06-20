import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req: NextRequest & { auth: object | null }) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define route types
  const isAuthRoute = nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard')
  const isPublicRoute = nextUrl.pathname.startsWith('/') && 
    !nextUrl.pathname.startsWith('/auth') && 
    !nextUrl.pathname.startsWith('/dashboard')

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Redirect unauthenticated users to signin for protected routes
  if (!isLoggedIn && isProtectedRoute) {
    const callbackUrl = nextUrl.pathname + nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  // Allow access to public routes regardless of auth status
  if (isPublicRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
})

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
