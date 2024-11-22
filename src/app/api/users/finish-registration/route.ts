import { decrypt } from '@/helpers/auth';
import { connectToDatabase } from '@/lib/mongoDb';
import User, { UserSchemaType } from '@/models/Users';
import { UserStatus } from '@/types/users/userType';

import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import { responseMessages } from '../../constants/responseMessages';

export async function POST(request: Request) {
  await connectToDatabase();

  const body: { token: string; password: string } = await request.json();
  const { token, password } = body;

  const user = await User.findOne({ token }).lean<UserSchemaType>();

  if (!user) {
    return NextResponse.json(
      {
        error: true,
        message: responseMessages.password.noUser,
      },
      {
        status: responseMessages.codes[403],
      },
    );
  }

  const result = (await decrypt(user.token)) as {
    email: string;
    iat: number;
    exp: number;
  };

  if (!result || result.email !== user.email) {
    return NextResponse.json(
      {
        error: true,
        message: responseMessages.token.invalid,
      },
      { status: responseMessages.codes[401] },
    );
  }

  if (result.exp <= result.iat) {
    return NextResponse.json({
      status: responseMessages.codes[401],
      message: responseMessages.token.expired,
    });
  }

  const ncryptedPassword = await bcrypt.hash(password, 10);

  await User.updateOne(
    { token },
    {
      $set: {
        password: ncryptedPassword,
        status: UserStatus.created,
        token: null,
      },
    },
  );

  revalidateTag('users-list');

  return NextResponse.json({ status: responseMessages.codes[200] });
}
