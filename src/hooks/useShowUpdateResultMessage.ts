import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useShowUpdateResultMessage = ({
  isError,
  isSuccess,
  closeFunction,
  dataType,
  error,
  customErrorMessage,
}: {
  isError: boolean;
  isSuccess: boolean;
  closeFunction: () => void;
  dataType?: string;
  error?: Error | null;
  customErrorMessage?: string;
}) => {
  useEffect(() => {
    if (isError) {
      toast.dismiss();

      if (customErrorMessage) {
        toast.error(customErrorMessage);

        return;
      }

      toast.error('Щось пішло не так, спробуйте пізніше.');
      return;
    }

    if (isSuccess) {
      toast.dismiss();

      toast.success('Успіх!');
      closeFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
};
