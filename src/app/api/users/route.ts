import { decrypt, encrypt } from '@/helpers/auth';
import { canDelete } from '@/helpers/roleAccess';
import { connectToDatabase } from '@/lib/mongoDb';
import User from '@/models/Users';
import { sendVerificationEmail } from '@/services/mailer';
import {
  NewUserType,
  UserRole,
  UserSchemaType,
  UserStatus,
} from '@/types/users/userType';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { responseMessages } from '../constants/responseMessages';

export async function GET() {
  await connectToDatabase();

  const users = await User.find({}, 'name email _id role').exec();

  return NextResponse.json(users, { status: responseMessages.codes[200] });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body: NewUserType = await request.json();

  const email = body.email.toLowerCase();

  const user = await User.findOne({ email }).lean<UserSchemaType>();

  if (user && user.status === UserStatus.created) {
    return NextResponse.json(
      { error: true, message: responseMessages.user.message },
      { status: responseMessages.codes[409] },
    );
  }

  const token = await encrypt({ email }, '7d from now');

  const newUser = await User.create({
    name: body.name,
    email,
    role: body.role,
    status: UserStatus.pending,
    token,
  });

  await newUser.save();

  try {
    await sendVerificationEmail(email, token);
    revalidateTag('users-list');

    return NextResponse.json(newUser, { status: responseMessages.codes[201] });
  } catch (error) {
    return NextResponse.json(
      { error: responseMessages.user.emailSendingFailed },
      { status: responseMessages.codes[500] },
    );
  }
}

export async function DELETE(request: Request) {
  await connectToDatabase();

  const body: { id: string; role: UserRole } = await request.json();
  const cookie = cookies();
  const session = cookie.get('session');

  if (!session) {
    return NextResponse.json(
      { error: responseMessages.user.forbidden },
      { status: responseMessages.codes[401] },
    );
  }

  const { role } = (await decrypt(session.value)) as { role: UserRole };

  const canDeleteUser = canDelete(role, body.role);

  if (!canDeleteUser) {
    return NextResponse.json(
      { error: responseMessages.user.forbidden },
      { status: responseMessages.codes[401] },
    );
  }

  try {
    await User.findOneAndDelete({ _id: body.id });
    revalidateTag('users-list');

    return NextResponse.json({ status: responseMessages.codes[200] });
  } catch (error) {
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
