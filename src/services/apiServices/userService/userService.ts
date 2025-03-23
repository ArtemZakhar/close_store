import { apiCalls } from '@/app/api/constants/apiCalls';
import { NewUserType, UserRole, UserType } from '@/types/users/userType';

import { client } from '@/utils/client';

export const getAllUsers = async ({
  tags,
  query,
}: {
  tags: string[];
  query: string;
}) => {
  try {
    return await client.get<UserType[]>({
      url: `${apiCalls.users}?${query}`,
      tags,
    });
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

export const deleteUser = async ({
  data,
  tags,
}: {
  data: { id: string; role: UserRole };
  tags?: string[];
}) => {
  try {
    return await client.delete({ url: apiCalls.users, data, tags });
  } catch (error) {}
};
