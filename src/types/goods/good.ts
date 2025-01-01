import { isObjectIdOrHexString } from 'mongoose';

import { CategoryType } from './category';
import { SellerType } from './seller';

type BaseGoodType = {
  category: string;
  subCategory: string[];
  firm: string;
  countryOfOrigin: string;
  model: string;
  description?: string;
  goodsDetails: GoodsDetails[];
  stored?: string;
  notes?: string;
  buyDate: string;
};

export type GoodType = BaseGoodType & {
  _id: string;
  code: string;
  season: string;
  seller: string;
  incomePriceUSD?: number;
  incomePriceGRN?: number;
  outcomePrice?: number;
};

export type NewGoodFormType = BaseGoodType & {
  season: SeasonListItemType;
  incomePriceUSD?: string;
  incomePriceGRN?: string;
  outcomePrice?: string;
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
  [key: string]: string;
};

export type PostNewGoodType = {
  category: string;
  subCategory: string[];
  seller: Omit<SellerType, '_id'>;
  goods: Omit<GoodType, '_id'>;
};

export type SeasonType = 'other' | 'summer' | 'winter';
