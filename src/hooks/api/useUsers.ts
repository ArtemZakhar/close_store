import {
  deleteUser,
  getAllUsers,
  postNewUser,
} from '@/services/apiServices/userService';
import { NewUserType, UserRole, UserType } from '@/types/users/userType';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

const USERS_KEY = 'users';

export const useCreateNewUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (user: { user: NewUserType }) => postNewUser(user),
    onSuccess: () => router.refresh(),
  });
};

export const useDeleteUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { id: string; role: UserRole }) => deleteUser({ data }),
    onSuccess: () => router.refresh(),
  });
};

export const useGetAllUsers = (query: string, enabled = true) =>
  useQuery({
    queryKey: [USERS_KEY],
    queryFn: () => getAllUsers({ query }),
    enabled,
  });
