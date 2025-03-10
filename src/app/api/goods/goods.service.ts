import Goods from '@/models/goods/Goods';
import { GoodsSchemaType, GoodsType } from '@/types/goods/good';

import mongoose, { Query, QueryWithHelpers } from 'mongoose';

export const createNewGoods = async (goods: Omit<GoodsSchemaType, '_id'>) => {
  const newGoods = await Goods.create(goods);

  await newGoods.save();

  return newGoods;
};

export const getGoodsByParams = (
  params:
    | Partial<GoodsType>
    | {
        $or?: Record<string, any>[];
      },
): QueryWithHelpers<GoodsSchemaType[], GoodsSchemaType> => {
  return Goods.find(params);
};

export const getPopulatedGoods = async (
  params:
    | Partial<GoodsType>
    | {
        $or?: Record<string, any>[];
      },
) => {
  return await getGoodsByParams(params)
    .populate('seller')
    .populate('firm')
    .populate('category');
};

export const findOneGoodsByParams = async (
  params: Partial<GoodsSchemaType>,
) => {
  const goods = await Goods.findOne(params);

  return goods;
};

export const updateGoods = async (
  _id: string,
  owner: string,
  goodsToUpdate: Partial<GoodsSchemaType>,
) => {
  await Goods.findOneAndUpdate({ _id, owner }, goodsToUpdate);
};

export const updateMany = async (
  goodsToUpdate: Pick<GoodsSchemaType, '_id' | 'owner' | 'goodsDetails'>[],
  session: mongoose.ClientSession,
) => {
  console.log(goodsToUpdate);
  if (!goodsToUpdate.length) return;

  const bulkOperations = goodsToUpdate.map(({ _id, owner, goodsDetails }) => ({
    updateOne: {
      filter: { _id, owner },
      update: { $set: { goodsDetails } },
      session,
    },
  }));

  return await Goods.bulkWrite(bulkOperations);
};

export const deleteGoodsById = async (id: string) => {
  await Goods.findByIdAndDelete({ _id: id });
};
