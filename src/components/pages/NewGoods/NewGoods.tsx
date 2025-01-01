'use client';

import { CategoryType } from '@/types/goods/category';
import { NewGoodFormType } from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import BackButton from '@/components/common/BackButton';
import LoadingButton from '@/components/common/LoadingButton';

import { useGetAllCountries } from '@/hooks/api/useLocation';

import CategoryAutocomplete from './formElements/CategoryAutocomplete';
import GoodsInformation from './formElements/GoodsInformation';
import SellerInformation from './formElements/SellerInformation';
import SubCategoryAutocomplete from './formElements/SubCategoryAutocomplete';

export type FormType = {
  category: CategoryType | null;
  subCategory: string[];
  seller: SellerType | null;
  goods: NewGoodFormType;
};

const NewGood = () => {
  const form = useForm<FormType>();

  const selectedCategory = form.watch('category');

  const { data: countriesData, isError, isLoading } = useGetAllCountries();

  const onSubmit = (data: FormType) => {
    console.log({ data: JSON.stringify(data) });
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      marginTop="4rem"
    >
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

          <Box
            sx={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'end',
              marginBlock: '2rem',
            }}
          >
            <BackButton />

            <LoadingButton
              isLoading={false}
              sx={{ width: '13rem' }}
              label="Створити"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default NewGood;
