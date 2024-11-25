import { responseMessages } from '@/app/api/constants/responseMessages';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useShowFetchResultMessage = ({
  isError,
  isSuccess,
  closeFunction = () => {},
  error,
  customErrorMessage,
  customMessage,
}: {
  isError: boolean;
  isSuccess: boolean;
  closeFunction?: () => void;
  error?: Error | null;
  customErrorMessage?: string;
  customMessage?: string;
}) => {
  useEffect(() => {
    if (isError) {
      toast.dismiss();
      console.log(error?.message);

      if (error?.message === responseMessages.user.noUser) {
        toast.error('Перевірте правильність електронної пошти');
        return;
      }

      if (error?.message === responseMessages.user.wrongPassword) {
        toast.error('Не правильний пароль');

        return;
      }

      if (customErrorMessage) {
        toast.error(customErrorMessage);

        return;
      }

      toast.error('Щось пішло не так, спробуйте пізніше.');
      return;
    }

    if (isSuccess) {
      if (customMessage) {
        toast.success(customMessage);

        return;
      }

      toast.dismiss();

      toast.success('Успіх!');
      closeFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
};
