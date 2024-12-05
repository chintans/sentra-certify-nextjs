import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicPaths = ['/', '/api/auth/login', '/api/auth/callback', '/api/auth/logout'];

export default withMiddlewareAuthRequired(
  async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const path = req.nextUrl.pathname;

    // Allow access to public paths
    if (publicPaths.includes(path)) {
      return res;
    }

    return res;
  }
);

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all API routes except auth
    '/((?!_next|api/auth|favicon.ico).*)',
  ],
};
