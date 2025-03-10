import SoldGoods from '@/models/goods/SoldGoods';
import { SoldGoodsSchema } from '@/types/goods/good';

import mongoose from 'mongoose';

export const sellGoods = async (
  data: SoldGoodsSchema[],
  session: mongoose.ClientSession,
) => {
  await SoldGoods.insertMany(data, { session });
};
