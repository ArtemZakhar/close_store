import { decrypt, encrypt } from '@/helpers/auth';
import { getSession } from '@/helpers/getSession';
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
import { NextRequest, NextResponse } from 'next/server';

import mongoose from 'mongoose';

import { responseMessages } from '../constants/responseMessages';

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const newUrl = new URL(request.url);

  const query = newUrl.searchParams;

  const role = query.get('role');
  const id = query.get('id');
  const owner = query.get('owner');

  let users = [];

  if (role === UserRole.seller) {
    users = await User.find(
      {
        status: { $ne: 'deleted' },
        role: { $in: [UserRole.buyer] },
        owner,
      },
      'name email _id role',
    ).exec();
  }

  if (role === UserRole.owner) {
    console.log('here');
    users = await User.find(
      {
        status: { $ne: 'deleted' },
        role: { $in: [UserRole.seller, UserRole.buyer] },
        owner: id,
      },
      'name email _id role',
    ).exec();
  }

  if (role === UserRole.admin) {
    users = await User.find(
      { status: { $ne: 'deleted' } },
      'name email _id role',
    ).exec();
  }

  return NextResponse.json(users, { status: responseMessages.codes[200] });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body: NewUserType = await request.json();

    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: true, message: responseMessages.user.forbidden },
        {
          status: responseMessages.codes[401],
        },
      );
    }

    const email = body.email.toLowerCase();

    const user = await User.findOne({ email }).lean<UserSchemaType>();

    if (
      user &&
      (user.status === UserStatus.created || user.status === UserStatus.deleted)
    ) {
      return NextResponse.json(
        { error: true, message: responseMessages.user.message },
        { status: responseMessages.codes[409] },
      );
    }

    if (user && user.status === UserStatus.pending) {
      await sendVerificationEmail(email, user.token);
      revalidateTag('users-list');

      return NextResponse.json(user, { status: responseMessages.codes[201] });
    }

    const token = await encrypt({ email }, '7d from now');

    const userData = {
      name: body.name,
      email,
      role: body.role,
      status: UserStatus.pending,
      token,
      owner: session.role === UserRole.owner ? session.id : null,
    };

    const newUser = await User.create(userData);

    await newUser.save();

    await sendVerificationEmail(email, token);
    revalidateTag('users-list');

    return NextResponse.json(newUser, { status: responseMessages.codes[201] });
  } catch (error) {
    console.log('Failed to create new User.');
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
    await User.findOneAndUpdate(
      { _id: body.id },
      {
        $set: {
          status: UserStatus.deleted,
        },
      },
      { new: true },
    );
    revalidateTag('users-list');

    return NextResponse.json({ status: responseMessages.codes[201] });
  } catch (error) {
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
}
