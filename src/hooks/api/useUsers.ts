import { postNewUser } from '@/app/api/userService';
import { NewUserType } from '@/types/users/userType';

import { useEffect, useState } from 'react';

import { error } from 'console';

export const useCreateNewUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const createNewUser = async (user: NewUserType) => {
    setIsLoading(true);

    postNewUser(user)
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isError || isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isError, isSuccess]);

  return { isError, isSuccess, isLoading, createNewUser };
};
