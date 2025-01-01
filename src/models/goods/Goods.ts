import { GoodType } from '@/types/goods/good';

import mongoose from 'mongoose';

const goodsQuantityAndCountSchema = new mongoose.Schema({
  size: { type: String, required: true },
  additionalFields: {
    type: Map,
    of: String,
  },
});

const goodsDetailsSchema = new mongoose.Schema({
  color: { type: String, required: true },
  countAndSizes: {
    type: [goodsQuantityAndCountSchema],
    required: true,
    default: [],
  },
});

const goodsSchema = new mongoose.Schema<GoodType>({
  category: {
    type: String,
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
    type: String,
    required: true,
  },
  firm: {
    type: String,
    required: true,
  },
  countryOfOrigin: {
    type: String,
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
  mongoose.models.Goods || mongoose.model<GoodType>('Goods', goodsSchema);

export default Goods;
