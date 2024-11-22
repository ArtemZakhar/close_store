import { decrypt } from '@/helpers/auth';
import { SessionType } from '@/types/session/session';

import { cookies } from 'next/headers';

export const getSession = async (): Promise<Promise<SessionType> | null> => {
  const session = cookies().get('session')?.value;

  if (!session) return null;

  return (await decrypt(session)) as SessionType;
};
