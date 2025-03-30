import { apiCalls } from '@/app/api/constants/apiCalls';
import { FirmType } from '@/types/goods/firm';
import {
  CartTableGoodsType,
  GoodsType,
  NewGoodFormType,
  PopulatedGoodsType,
  UpdateGoodsFormType,
} from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';

import { client } from '@/utils/client';

export const getAllFirms = async () =>
  await client.get<FirmType[]>({ url: apiCalls.firms });

export const putNewGoods = async (data: NewGoodFormType) =>
  await client.put({ url: apiCalls.goods, data, tags: ['goods-category'] });

export const updateGoods = async (data: Partial<UpdateGoodsFormType>) =>
  await client.patch({ url: `${apiCalls.goods}/${data._id}`, data });

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
    return await client.delete({ url: `${apiCalls.goods}/${id}` });
  } catch (error) {
    console.error('Error during GET goods:', error);
    throw new Error('Error during GET goods');
  }
};

export const getDataForGoodsFromCart = async (
  dataFromCart: GoodsInCartType[],
): Promise<GoodsType[]> => {
  try {
    return await client.post({ url: apiCalls.goods, data: dataFromCart });
  } catch (error) {
    console.error('Error during GET goods for cart:', error);
    throw new Error('Error during GET goods for cart');
  }
};

export const sellGoods = async (data: CartTableGoodsType[]) => {
  try {
    return await client.patch({ url: apiCalls.goods, data });
  } catch (error) {
    console.error('Error during SELLING goods:', error);
    throw new Error('Error during SELLING goods');
  }
};

export const getGoodsById = async (id: string) =>
  await client.get<PopulatedGoodsType>({ url: `${apiCalls.goods}/${id}` });
