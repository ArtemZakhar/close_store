import { getAllFirms, postNewGoods } from '@/app/api/goodsService';
import { NewGoodFormType } from '@/types/goods/good';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_CITIES, QUERY_COUNTRIES } from './useLocation';

const QUERY_FIRM = 'firms';

export const useGetAllFirms = () =>
  useQuery({
    queryKey: [QUERY_FIRM],
    queryFn: getAllFirms,
    staleTime: Infinity,
  });

export const usePostNewGoods = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: NewGoodFormType) => postNewGoods(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_FIRM],
      });
      client.invalidateQueries({
        queryKey: [QUERY_CITIES],
      });
      client.invalidateQueries({
        queryKey: [QUERY_COUNTRIES],
      });
    },
    onError: (error) => error,
  });
};
