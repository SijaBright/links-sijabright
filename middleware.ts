import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/config')) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/config/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/config'],
};