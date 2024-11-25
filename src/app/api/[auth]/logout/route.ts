import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { responseMessages } from '../../constants/responseMessages';

export async function POST() {
  cookies().set('session', '', { expires: new Date(0) });

  return NextResponse.json({ status: responseMessages.codes[200] });
}
