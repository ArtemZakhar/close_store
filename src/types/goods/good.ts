import { ObjectId } from 'mongodb';

import { CategoryType, CategoryTypeSchema } from './category';
import { FirmType } from './firm';
import { SellerSchemaType, SellerType } from './seller';

type BaseGoodType = {
  subCategory: string[];
  model: string;
  description?: string;
  goodsDetails: GoodsDetails[];
  stored?: string;
  notes?: string;
  buyDate: string;
};

export type GoodsSchemaType = BaseGoodType & {
  _id: string;
  owner: ObjectId;
  code: string;
  season: string;
  seller: ObjectId;
  firm: ObjectId;
  incomePriceUSD?: number;
  incomePriceGRN?: number;
  outcomePrice?: number;
  category: ObjectId;
};

export type NewGoodFormType = BaseGoodType & {
  season: SeasonListItemType;
  incomePriceUSD?: string;
  incomePriceGRN?: string;
  outcomePrice?: string;
  seller: Omit<SellerType, '_id'>;
  firm: Partial<FirmType>;
  category: string;
};

export type GoodsType = BaseGoodType & {
  _id: string;
  code: string;
  season: SeasonListItemType;
  incomePriceUSD?: number;
  owner: ObjectId;
  incomePriceGRN?: number;
  outcomePrice?: number;
  seller: SellerType;
  firm: FirmType;
  category: CategoryType;
};

export type SeasonListItemType = {
  label: string;
  name: SeasonType;
};

export type GoodsDetails = {
  color: string;
  countAndSizes: GoodsQuantityAndCount[];
};

export type GoodsQuantityAndCount = {
  size: string;
  count: number;
};

export type PostNewGoodType = {
  category: string;
  subCategory: string[];
  seller: Omit<SellerType, '_id'>;
  goods: Omit<NewGoodFormType, '_id'>;
};

export type SeasonType = 'other' | 'summer' | 'winter';
