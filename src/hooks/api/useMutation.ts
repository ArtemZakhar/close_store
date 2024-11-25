import { useEffect, useState } from 'react';

export const useMutation = <ArgsType>({
  mutateFn,
  onSuccess = () => {},
}: {
  mutateFn: (args: ArgsType) => Promise<unknown>;
  onSuccess?: () => void;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const mutate = async (args: ArgsType) => {
    setIsPending(true);

    mutateFn(args)
      .then(() => {
        setIsSuccess(true);
        onSuccess();
      })
      .catch((e: any) => {
        setIsError(true);
        setError(e);
      })
      .finally(() => setIsPending(false));
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

  return { isError, isSuccess, isLoading: isPending, mutate, error };
};
