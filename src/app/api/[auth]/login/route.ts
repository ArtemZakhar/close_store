import { encrypt } from '@/helpers/auth';
import { connectToDatabase } from '@/lib/mongoDb';
import User from '@/models/Users';
import { UserSchemaType } from '@/types/users/userType';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import { responseMessages } from '../../constants/responseMessages';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body: { email: string; password: string } = await request.json();

  const email = body.email.toLowerCase();

  const user = await User.findOne({
    email,
  }).lean<UserSchemaType>();

  if (!user) {
    return NextResponse.json(
      {
        error: responseMessages.user.noUser,
      },
      { status: responseMessages.codes[404] },
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    user.password as string,
  );

  if (!isPasswordCorrect) {
    return NextResponse.json(
      {
        error: responseMessages.user.wrongPassword,
      },
      { status: responseMessages.codes[401] },
    );
  }

  const expires = Date.now() + 1000 * 60 * 60 * 12;

  const session = await encrypt({ id: user._id, role: user.role, expires });

  cookies().set('session', session, { expires, httpOnly: true });

  return NextResponse.json({ status: responseMessages.codes[200] });
}
