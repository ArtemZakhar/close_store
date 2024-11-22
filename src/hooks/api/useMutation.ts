import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

export const useMutation = ({
  mutateFn,
}: {
  mutateFn: (...args: any[]) => Promise<unknown>;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const router = useRouter();

  const mutate = async (...args: any[]) => {
    setIsPending(true);

    mutateFn(...args)
      .then(() => {
        setIsSuccess(true);
        router.refresh();
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
