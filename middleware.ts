import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const excludedPaths = ['/login'];

export async function middleware(req: NextRequest) {
  console.log(req);
  if (excludedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  console.log(req.cookies);

  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/users'],
};
