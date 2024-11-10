import { NewUserType, User } from '@/types/users/userType';

import { axiosInstance } from '@/utils/axiosInstance';

import { apiCalls } from './constants/apiCalls';

export const getAllUsers = async () => {
  try {
    return (await axiosInstance.get<User[]>(apiCalls.users)).data;
  } catch (error) {
    console.log('Fetching users error', error);
    throw new Error('Failed to fetch users');
  }
};

export const postNewUser = async (user: NewUserType) => {
  try {
    return await axiosInstance.post(apiCalls.users, user);
  } catch (error) {
    console.log('Failed to create new User', error);
    throw new Error('Failed to create new User');
  }
};

export const finishRegistration = async (data: {
  password: string;
  token: string;
}) => {
  try {
    return await axiosInstance.post(apiCalls.finishRegistration, data);
  } catch (e) {
    console.log('Failed finish registration', e);
    throw new Error('Failed finish registration');
  }
};
