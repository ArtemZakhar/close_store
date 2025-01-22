import { FirmType } from '@/types/goods/firm';
import { GoodsSchemaType, NewGoodFormType } from '@/types/goods/good';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllFirms = async () =>
  await client.get<FirmType[]>({ url: apiCalls.firms });

export const postNewGoods = async (data: NewGoodFormType) =>
  await client.post({ url: apiCalls.goods, data, tags: ['goods-category'] });

export const getAllGoods = async ({
  searchParams,
  tags,
}: {
  searchParams?: string;
  tags?: string[];
}) => {
  try {
    let url = apiCalls.goods;

    if (searchParams) {
      url += `?${searchParams}`;
    }

    return client.get<GoodsSchemaType[]>({ url, tags, noCache: true });
  } catch (error) {
    console.error('Error during GET goods:', error);
    throw new Error('Error during GET goods');
  }
};
