import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from './helpers/auth';

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value || null;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
  console.log(origin);

  if (!session) {
    return NextResponse.redirect(new URL('/login', baseUrl));
  }

  const parsed = await decrypt(session);

  if (!parsed) {
    return NextResponse.redirect(new URL('/login', baseUrl));
  }

  if (parsed && parsed.exp && parsed.iat && parsed.exp <= parsed.iat) {
    return NextResponse.redirect(new URL('/login', baseUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/users', '/goods'],
};
