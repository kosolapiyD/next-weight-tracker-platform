// Route protection proxy (replaces Next.js middleware — renamed in Next.js 16).
//
// Full implementation requires NextAuth to be installed and configured:
//   npm install next-auth@beta @auth/mongodb-adapter mongoose zod bcryptjs @types/bcryptjs
//
// Once src/lib/auth/auth.config.ts exports { auth }, replace this file with:
//
//   import { auth } from '@/lib/auth';
//   import { NextResponse } from 'next/server';
//   import type { NextRequest } from 'next/server';
//
//   export async function proxy(request: NextRequest) {
//     const session = await auth();
//     const isLoggedIn = !!session?.user;
//     const { pathname } = request.nextUrl;
//     const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
//
//     if (!isLoggedIn && !isAuthPage) {
//       return NextResponse.redirect(new URL('/sign-in', request.url));
//     }
//     if (isLoggedIn && isAuthPage) {
//       return NextResponse.redirect(new URL('/leaderboard', request.url));
//     }
//     return NextResponse.next();
//   }
//
//   export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
//   };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};
