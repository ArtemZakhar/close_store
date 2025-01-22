import { GoodsSchemaType } from '@/types/goods/good';

import mongoose from 'mongoose';

const goodsQuantityAndCountSchema = new mongoose.Schema({
  size: { type: String, required: true },
  count: { type: Number, required: true },
});

const goodsDetailsSchema = new mongoose.Schema({
  color: { type: String, required: true },
  countAndSizes: {
    type: [goodsQuantityAndCountSchema],
    required: true,
    default: [],
  },
});

const goodsSchema = new mongoose.Schema<GoodsSchemaType>({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
    required: true,
    default: [],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: String,
  goodsDetails: {
    type: [goodsDetailsSchema],
    required: true,
    default: [],
  },
  stored: String,
  notes: String,
  buyDate: {
    type: String,
    required: true,
  },
  incomePriceUSD: Number,
  incomePriceGRN: Number,
  outcomePrice: Number,
  season: {
    type: String,
    required: true,
    enum: ['other', 'summer', 'winter'],
  },
});

const Goods =
  mongoose.models.Goods ||
  mongoose.model<GoodsSchemaType>('Goods', goodsSchema);

export default Goods;
