import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from './helpers/auth';

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(`${process.env.BASE_URL}login`);
  }

  const parsed = await decrypt(session);

  if (parsed && parsed.exp && parsed.iat && parsed.exp <= parsed.iat) {
    return NextResponse.redirect(`${process.env.BASE_URL}login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/users'],
};
