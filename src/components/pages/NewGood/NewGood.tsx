'use client';

import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import CategoryAutocomplete from './formElements/CategoryAutocomplete';

export type FormType = {
  category: string;
  code: string;
  subCategory: string;
  firm: string;
  country: string;
  countryOfOrigin: string;
  seller: {
    name: string;
    phone?: string;
    email?: string;
    country: string;
    city?: string;
  };
  good: {
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
};

const NewGood = () => {
  const form = useForm();

  return (
    <Box component="form" marginTop="4rem">
      <CategoryAutocomplete form={form} />
    </Box>
  );
};

export default NewGood;
