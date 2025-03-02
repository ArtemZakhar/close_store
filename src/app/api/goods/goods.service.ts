import Goods from '@/models/goods/Goods';
import { GoodsSchemaType, GoodsType } from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';

export const createNewGoods = async (goods: Omit<GoodsSchemaType, '_id'>) => {
  const newGoods = await Goods.create(goods);

  await newGoods.save();

  return newGoods;
};

export const getGoodsByParams = async (
  params: Partial<GoodsType> | Partial<GoodsInCartType>[],
) => {
  const query = Array.isArray(params)
    ? {
        $or: params.map((param) => ({
          _id: param._id,
          [`goodsDetails.${param.goodsDetailsKey}.color`]: param.color,
          [`goodsDetails.${param.goodsDetailsKey}.countAndSizes`]: {
            $elemMatch: { size: param.size },
          },
        })),
      }
    : params;

  const goods = await Goods.find(query)
    .populate('seller')
    .populate('firm')
    .populate('category');

  return goods;
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
