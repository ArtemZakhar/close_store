import { FirmType } from '@/types/goods/firm';
import {
  GoodsType,
  NewGoodFormType,
  UpdateGoodsFormType,
} from '@/types/goods/good';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllFirms = async () =>
  await client.get<FirmType[]>({ url: apiCalls.firms });

export const postNewGoods = async (data: NewGoodFormType) =>
  await client.post({ url: apiCalls.goods, data, tags: ['goods-category'] });

export const patchGoods = async (data: Partial<UpdateGoodsFormType>) =>
  await client.patch({ url: apiCalls.goods, data });

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

    return client.get<GoodsType[]>({ url, tags, noCache: true });
  } catch (error) {
    console.error('Error during GET goods:', error);
    throw new Error('Error during GET goods');
  }
};

export const deleteGoods = async (id: string) => {
  try {
    client.delete({ url: `${apiCalls.goods}/${id}` });
  } catch (error) {
    console.error('Error during DELETE goods:', error);
    throw new Error('Error during GET goods');
  }
};
