import { apiCalls } from '@/app/api/constants/apiCalls';
import { SellerType } from '@/types/goods/seller';

import { client } from '@/utils/client';

export const getAllSellers = async () =>
  await client.get<SellerType[]>({ url: apiCalls.sellers });
