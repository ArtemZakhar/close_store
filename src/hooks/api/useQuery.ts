import { useEffect, useState } from 'react';

export const useQuery = <ArgsType>({
  queryKey,
  queryFn,
}: {
  queryKey: string[];
  queryFn: (args?: ArgsType) => Promise<unknown>;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<any | null>(null);

  queryFn()
    .then(() => {
      setIsSuccess(true);
    })
    .catch((e: any) => {
      setIsError(true);
      setError(e);
    })
    .finally(() => setIsPending(false));

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

  return { isError, isSuccess, isLoading: isPending, error };
};
