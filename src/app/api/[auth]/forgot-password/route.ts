import { encrypt } from '@/helpers/auth';
import { connectToDatabase } from '@/lib/mongoDb';
import User, { UserSchemaType } from '@/models/Users';
import { sendPasswordReminder } from '@/services/mailer';

import { NextRequest, NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body: { email: string } = await request.json();

  const email = body.email.toLowerCase();

  const user = await User.findOne({ email }).lean<UserSchemaType>();

  if (!user) {
    return NextResponse.json(
      {
        error: responseMessages.user.noUser,
      },
      { status: responseMessages.codes[404] },
    );
  }

  const token = await encrypt({ email }, '7d from now');

  await User.updateOne(
    { email },
    {
      $set: {
        token,
      },
    },
  );

  sendPasswordReminder({ email, token });

  return NextResponse.json({ status: responseMessages.codes[200] });
}
