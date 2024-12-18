import { connectToDatabase } from '@/lib/mongoDb';
import User from '@/models/Users';
import { UserSchemaType } from '@/types/users/userType';

import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import { responseMessages } from '../../constants/responseMessages';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body: { token: string; password: string } = await request.json();

  const { token, password } = body;

  const user = await User.findOne({ token }).lean<UserSchemaType>();

  if (!user) {
    return NextResponse.json(
      {
        error: responseMessages.password.noUser,
      },
      {
        status: responseMessages.codes[403],
      },
    );
  }

  const ncryptedPassword = await bcrypt.hash(password, 10);

  await User.updateOne(
    { token },
    {
      $set: {
        password: ncryptedPassword,
        token: null,
      },
    },
  );

  return NextResponse.json({ status: responseMessages.codes[200] });
}
