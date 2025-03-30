import { SoldGoodsSchema } from '@/types/goods/good';

import mongoose from 'mongoose';

const soldGoodsSchema = new mongoose.Schema<SoldGoodsSchema>(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    firm: {
      type: String,
      required: true,
    },
    sellerCode: { type: String, default: '' },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: { type: String, required: true },
    incomePriceUSD: { type: Number, required: true },
    incomePriceGRN: { type: Number, required: true },
    outcomePrice: { type: Number, required: true },
    discount: { type: Number },
    salePrice: { type: Number, required: true },
    size: { type: String, required: true },
    count: { type: Number, required: true },
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SoldGoods =
  mongoose.models.SoldGoods ||
  mongoose.model<SoldGoodsSchema>('SoldGoods', soldGoodsSchema);

export default SoldGoods;
