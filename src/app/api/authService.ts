import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const login = async (data: { email: string; password: string }) => {
  try {
    return await client.post({ url: apiCalls.login, data });
  } catch (error) {
    console.log('Failed to login', error);
    throw new Error('Failed to login');
  }
};
