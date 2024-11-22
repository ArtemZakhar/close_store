import { postNewUser } from '@/app/api/userService';
import { NewUserType } from '@/types/users/userType';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from './useMutation';

export const useCreateNewUser = () => {
  return useMutation({
    mutateFn: (user: { user: NewUserType }) => postNewUser(user),
  });
};
