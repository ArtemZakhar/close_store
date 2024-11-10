import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import { authOptions } from './authOptions';

export const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default handler;
