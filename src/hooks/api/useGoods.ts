import goodsService from '@/app/api/goodsService';
import { NewGoodFormType, UpdateGoodsFormType } from '@/types/goods/good';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_CITIES, QUERY_COUNTRIES } from './useLocation';

const QUERY_FIRM = 'firms';
const QUERY_GOODS = 'goods';

export const useGetAllFirms = () =>
  useQuery({
    queryKey: [QUERY_FIRM],
    queryFn: goodsService.getAllFirms,
    staleTime: Infinity,
  });

export const usePostNewGoods = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: NewGoodFormType) => goodsService.putNewGoods(data),
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
      client.invalidateQueries({
        queryKey: [QUERY_GOODS],
      });
    },
    onError: (error) => error,
  });
};

export const useUpdateGoods = (category: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UpdateGoodsFormType>) =>
      goodsService.patchGoods(data),
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
      client.invalidateQueries({
        queryKey: [QUERY_GOODS, category],
      });
    },
    onError: (error) => error,
  });
};

export const useGetAllGoods = (category: string) =>
  useQuery({
    queryKey: [QUERY_GOODS, category],
    queryFn: () =>
      goodsService.getAllGoods({ searchParams: `category=${category}` }),
  });

export const useDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goodsService.deleteGoods(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_GOODS] }),
    onError: (error) => error,
  });
};
