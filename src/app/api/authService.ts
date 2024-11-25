import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const login = async (data: { email: string; password: string }) => {
  try {
    return await client.post({ url: apiCalls.login, data });
  } catch (error: any) {
    const errorObj = await error;
    throw Error(errorObj.error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    return await client.post({ url: apiCalls.forgotPassword, data: { email } });
  } catch (error: any) {
    const errorObj = await error;
    throw Error(errorObj.error);
  }
};

export const newPassword = async (data: {
  password: string;
  token: string;
}) => {
  try {
    return await client.post({ url: apiCalls.newPassword, data });
  } catch (error: any) {
    const errorObj = await error;
    throw Error(errorObj.error);
  }
};
