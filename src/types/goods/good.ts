import { ObjectId } from 'mongodb';

import { CategoryType, CategoryTypeSchema } from './category';
import { FirmType } from './firm';
import { SellerType } from './seller';

type BaseGoodType = {
  subCategory: string[];
  model: string;
  description?: string;
  sizeType: 'clothes' | 'jackets' | 'jeans';
  goodsDetails: GoodsDetails;
  stored?: string;
  notes?: string;
  buyDate?: string;
  arrivalDate?: string;
};

export type GoodsSchemaType = BaseGoodType & {
  _id: string;
  owner: ObjectId;
  code: string;
  season: string;
  seller: ObjectId;
  firm: ObjectId;
  category: ObjectId;
};

export type NewGoodFormType = BaseGoodType & {
  season: SeasonListItemType;
  seller: Omit<SellerType, '_id'>;
  firm: Partial<FirmType>;
  category: string;
};

export type UpdateGoodsFormType = BaseGoodType & {
  season: SeasonListItemType;
  seller: SellerType;
  firm: Partial<FirmType>;
  category: string;
};

export type GoodsType = BaseGoodType & {
  _id: string;
  code: string;
  season: SeasonListItemType;
  owner: string;
  seller: SellerType;
  firm: FirmType;
  category: CategoryType;
};

export type SeasonListItemType = {
  label: string;
  name: SeasonType;
};

export type GoodsDetails = {
  [key: string]: GoodsDetailsItemType;
};

export type GoodsDetailsItemType = {
  color: string;
  incomePriceUSD?: number;
  incomePriceGRN?: number;
  outcomePrice?: number;
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
