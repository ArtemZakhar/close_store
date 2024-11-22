import { NewUserType, User } from '@/types/users/userType';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllUsers = async ({ tags }: { tags: string[] }) => {
  try {
    return await client.get<User[]>({ url: apiCalls.users, tags });
  } catch (error) {
    console.log('Fetching users error', error);
    throw new Error('Failed to fetch users');
  }
};

export const postNewUser = async ({ user }: { user: NewUserType }) => {
  try {
    return await client.post({ url: apiCalls.users, data: user });
  } catch (error) {
    console.log('Failed to create new User', error);
    throw new Error('Failed to create new User');
  }
};

export const finishRegistration = async ({
  data,
  tags,
}: {
  data: {
    password: string;
    token: string;
  };
  tags?: string[];
}) => {
  try {
    return await client.post({ url: apiCalls.finishRegistration, data, tags });
  } catch (e) {
    console.log('Failed finish registration', e);
    throw new Error('Failed finish registration');
  }
};
