import { SellerType } from '@/types/goods/seller';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllSellers = async () =>
  await client.get<SellerType[]>({ url: apiCalls.sellers });
