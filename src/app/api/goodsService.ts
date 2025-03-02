import { FirmType } from '@/types/goods/firm';
import {
  GoodsType,
  NewGoodFormType,
  UpdateGoodsFormType,
} from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

const getAllFirms = async () =>
  await client.get<FirmType[]>({ url: apiCalls.firms });

const putNewGoods = async (data: NewGoodFormType) =>
  await client.put({ url: apiCalls.goods, data, tags: ['goods-category'] });

const patchGoods = async (data: Partial<UpdateGoodsFormType>) =>
  await client.patch({ url: apiCalls.goods, data });

const getAllGoods = async ({
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

const deleteGoods = async (id: string) => {
  try {
    client.delete({ url: `${apiCalls.goods}/${id}` });
  } catch (error) {
    console.error('Error during GET goods:', error);
    throw new Error('Error during GET goods');
  }
};

const getDataForGoodsFromCart = async (
  dataFromCart: GoodsInCartType[],
): Promise<GoodsType[]> => {
  try {
    return await client.post({ url: apiCalls.goods, data: dataFromCart });
  } catch (error) {
    console.error('Error during GET goods for cart:', error);
    throw new Error('Error during GET goods for cart');
  }
};

export default {
  deleteGoods,
  getAllGoods,
  patchGoods,
  putNewGoods,
  getAllFirms,
  getDataForGoodsFromCart,
};
