import { connectToDatabase } from '@/lib/mongoDb';
import User, { UserSchemaType } from '@/models/Users';
import { sendVerificationEmail } from '@/services/mailer';
import { NewUserType, UserStatus } from '@/types/users/userType';

import { NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';

import { responseMessages } from '../constants/responseMessages';

export async function POST(request: Request) {
  await connectToDatabase();

  const body: NewUserType = await request.json();

  const user = await User.findOne({ email: body.email }).lean<UserSchemaType>();

  if (user && user.status !== UserStatus.deleted) {
    return NextResponse.json(
      { error: true, message: responseMessages.user.message },
      { status: responseMessages.codes[409] },
    );
  }

  const token = jwt.sign(
    { email: body.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    role: body.role,
    status: UserStatus.pending,
    token,
  });

  await newUser.save();

  try {
    await sendVerificationEmail(body.email, token);
    return NextResponse.json(newUser, { status: responseMessages.codes[201] });
  } catch (error) {
    return NextResponse.json(
      { error: responseMessages.user.emailSendingFailed },
      { status: responseMessages.codes[500] },
    );
  }
}

export async function GET() {
  await connectToDatabase();

  const users = await User.find({}, 'name email _id role').exec();

  return NextResponse.json(users, { status: responseMessages.codes[200] });
}
