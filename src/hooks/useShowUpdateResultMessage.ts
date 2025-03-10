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
  customErrorMessage?: { errorType: string; message: string }[];
  customMessage?: string;
}) => {
  useEffect(() => {
    if (isError) {
      toast.dismiss();

      if (error && customErrorMessage) {
        for (const message of customErrorMessage) {
          if (message.errorType === error.message) {
            toast.error(message.message);

            return;
          }
        }
      }

      toast.error('Щось пішло не так, спробуйте пізніше.');
      return;
    }

    if (isSuccess) {
      if (customMessage) {
        toast.success(customMessage);
        closeFunction();

        return;
      }

      toast.dismiss();

      toast.success('Успіх!');
      closeFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
};
