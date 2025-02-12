import { encrypt } from '@/helpers/auth';
import { connectToDatabase } from '@/lib/mongoDb';
import { sendPasswordReminder } from '@/services/mailer';

import { NextRequest, NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';
import { findOneUser, updateUser } from '../../users/users.service';

export const httpUpdatePassword = async (request: NextRequest) => {
  await connectToDatabase();

  const body: { email: string } = await request.json();

  const email = body.email.toLowerCase();

  const user = await findOneUser({ email });

  if (!user) {
    return NextResponse.json(
      {
        error: responseMessages.user.noUser,
      },
      { status: responseMessages.codes[404] },
    );
  }

  const token = await encrypt({ email }, '7d from now');

  await updateUser({
    searchParam: { email },
    dataToUpdate: {
      $set: {
        token,
      },
    },
  });

  sendPasswordReminder({ email, token });

  return NextResponse.json({ status: responseMessages.codes[200] });
};
