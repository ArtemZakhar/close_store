export type NewGoodType = {
  firm: string;
  countryOfOrigin: string;
  model: string;
  description?: string;
  goodsDetails: GoodsDetails[];
  incomePriceUSD?: string;
  incomePriceGRN?: string;
  outcomePrice?: string;
  season?: 'spring' | 'summer' | 'winter' | 'autumn';
  stored?: 'string';
  notes: 'string';
  buyDate: 'string';
};

export type GoodsDetails = {
  color: string;
  countAndSizes: GoodsQuantityAndCount[];
};

export type GoodsQuantityAndCount = {
  size: string;
  [key: string]: string;
};
