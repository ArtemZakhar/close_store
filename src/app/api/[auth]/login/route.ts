import { encrypt } from '@/helper/login';
import { connectToDatabase } from '@/lib/mongoDb';
import User, { UserSchemaType } from '@/models/Users';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import { responseMessages } from '../../constants/responseMessages';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body: { email: string; password: string } = await request.json();

  const user = await User.findOne({ email: body.email }).lean<UserSchemaType>();

  if (!user) {
    return NextResponse.json(
      {
        error: true,
        message: responseMessages.user.noUser,
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
        error: true,
        message: responseMessages.user.wrongPassword,
      },
      { status: responseMessages.codes[401] },
    );
  }

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 12);

  const session = await encrypt({ id: user._id, role: user.role, expires });

  cookies().set('session', session, { expires, httpOnly: true });
}
