import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from './helpers/auth';

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value || null;
  const { origin } = req.nextUrl;

  if (!session) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const parsed = await decrypt(session);

  if (!parsed) {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (parsed && parsed.exp && parsed.iat && parsed.exp <= parsed.iat) {
    return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/users', '/goods'],
};
