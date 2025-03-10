import goodsService from '@/app/api/goodsService';
import {
  CartTableGoodsType,
  NewGoodFormType,
  UpdateGoodsFormType,
} from '@/types/goods/good';
import { UserRole } from '@/types/users/userType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_CITIES, QUERY_COUNTRIES } from './useLocation';
import { QUERY_SELLERS } from './useSellers';

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
      goodsService.updateGoods(data),
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
      client.invalidateQueries({
        queryKey: [QUERY_SELLERS],
      });
    },
    onError: (error) => error,
  });
};

export const useGetAllGoods = ({
  category,
  owner,
  role,
}: {
  category: string;
  owner: string;
  role: UserRole.seller | UserRole.owner;
}) =>
  useQuery({
    queryKey: [QUERY_GOODS, category],
    queryFn: () =>
      goodsService.getAllGoods({
        searchParams: `category=${category}&owner=${owner}&role=${role}`,
      }),
  });

export const useDeleteGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goodsService.deleteGoods(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_GOODS] });
    },
    onError: (error) => error,
  });
};

export const useSellGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CartTableGoodsType[]) => goodsService.sellGoods(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_GOODS] });
    },
    onError: (error) => error,
  });
};
