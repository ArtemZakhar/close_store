import Goods from '@/models/goods/Goods';
import { GoodsSchemaType, GoodsType } from '@/types/goods/good';

export const createNewGoods = async (goods: Omit<GoodsSchemaType, '_id'>) => {
  const newGoods = await Goods.create(goods);

  await newGoods.save();

  return newGoods;
};

export const getGoodsByParams = async (params: Partial<GoodsType>) => {
  const good = await Goods.find(params)
    .populate('seller')
    .populate('firm')
    .populate('category');

  return good;
};

export const findOneGoodsByParams = async (
  params: Partial<GoodsSchemaType>,
) => {
  const goods = await Goods.findOne(params);

  return goods;
};

export const updateGoods = async (
  _id: string,
  goodsToUpdate: Partial<GoodsSchemaType>,
) => {
  await Goods.findOneAndUpdate({ _id }, goodsToUpdate);
};

export const deleteGoodsById = async (id: string) => {
  await Goods.findByIdAndDelete({ _id: id });
};
