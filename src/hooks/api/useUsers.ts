import { deleteUser, postNewUser } from '@/app/api/userService';
import { NewUserType, UserRole, UserType } from '@/types/users/userType';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

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
