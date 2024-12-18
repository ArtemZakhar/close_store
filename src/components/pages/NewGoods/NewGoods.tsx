'use client';

import { CategoryType } from '@/types/goods/category';
import { NewGoodType } from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import { useGetAllCountries } from '@/hooks/api/useLocation';

import CategoryAutocomplete from './formElements/CategoryAutocomplete';
import GoodsInformation from './formElements/GoodsInformation';
import SellerInformation from './formElements/SellerInformation';
import SubCategoryAutocomplete from './formElements/SubCategoryAutocomplete';

export type FormType = {
  category: CategoryType | null;
  code: string;
  subCategory: string[];
  seller: SellerType | null;
  goods: NewGoodType;
};

const NewGood = () => {
  const form = useForm<FormType>();

  const selectedCategory = form.watch('category');

  const { data: countriesData, isError, isLoading } = useGetAllCountries();

  return (
    <Box component="form" marginTop="4rem">
      <CategoryAutocomplete form={form} selectedCategory={selectedCategory} />

      {selectedCategory && (
        <>
          <SubCategoryAutocomplete
            form={form}
            selectedCategory={selectedCategory}
          />

          <SellerInformation
            countriesData={countriesData}
            isFetchingCountriesError={isError}
            isFetchingCountriesLoading={isLoading}
            form={form}
          />

          <GoodsInformation
            form={form}
            countriesData={countriesData}
            isFetchingCountriesError={isError}
            isFetchingCountriesLoading={isLoading}
          />
        </>
      )}
    </Box>
  );
};

export default NewGood;
