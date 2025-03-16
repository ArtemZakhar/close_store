import {
  GoodsDetailsItemType,
  GoodsQuantityAndCount,
  GoodsSchemaType,
} from '@/types/goods/good';

import mongoose from 'mongoose';

const goodsQuantityAndCountSchema = new mongoose.Schema<GoodsQuantityAndCount>({
  size: { type: String, required: true },
  count: { type: Number, required: true },
});

const goodsDetailsSchema = new mongoose.Schema<GoodsDetailsItemType>({
  color: { type: String, required: true },
  incomePriceUSD: Number,
  incomePriceGRN: Number,
  outcomePrice: Number,
  countAndSizes: {
    type: [goodsQuantityAndCountSchema],
    required: true,
    default: [],
  },
});

const goodsSchema = new mongoose.Schema<GoodsSchemaType>(
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
    sellerCode: { type: String, default: '' },
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
      type: Map,
      of: goodsDetailsSchema,
    },
    sizeType: {
      type: String,
      required: true,
      enum: ['clothes', 'jackets', 'jeans'],
    },
    stored: String,
    notes: String,
    buyDate: String,
    arrivalDate: String,
    season: {
      type: String,
      required: true,
      enum: ['other', 'summer', 'winter'],
    },
  },
  {
    timestamps: true,
  },
);

const Goods =
  mongoose.models.Goods ||
  mongoose.model<GoodsSchemaType>('Goods', goodsSchema);

export default Goods;
