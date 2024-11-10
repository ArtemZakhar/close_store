import { connectToDatabase } from '@/lib/mongoDb';
import User, { UserSchemaType } from '@/models/Users';
import { UserStatus } from '@/types/users/userType';

import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

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

  try {
    jwt.verify(user.token, process.env.JWT_SECRET as string);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      await User.updateOne({ token }, { $set: { status: UserStatus.expired } });

      return NextResponse.json({
        status: responseMessages.codes[401],
        message: responseMessages.token.expired,
      });
    }
    return NextResponse.json({
      status: responseMessages.codes[401],
      message: responseMessages.token.invalid,
    });
  }

  const ncryptedPassword = await bcrypt.hash(password, 10);

  await User.updateOne(
    { token },
    { $set: { password: ncryptedPassword, status: UserStatus.created } },
  );

  return NextResponse.json({ status: responseMessages.codes[200] });
}
