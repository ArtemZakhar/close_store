export type NewGoodType = {
  firm: string;
  countryOfOrigin: string;
  model: string;
  description?: string;
  sizes: string[];
  colors: string[];
  count: string;
  incomePriceUSD?: string;
  incomePriceGRN?: string;
  outcomePrice?: string;
  season?: 'spring' | 'summer' | 'winter' | 'autumn';
  stored?: 'string';
  notes: 'string';
  buyDate: 'string';
};
