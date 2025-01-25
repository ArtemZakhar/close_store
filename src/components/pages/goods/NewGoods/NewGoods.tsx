'use client';

import { routePaths } from '@/constants/routePaths';
import { CategoryType } from '@/types/goods/category';
import { NewGoodFormType } from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import BackButton from '@/components/common/BackButton';
import LoadingButton from '@/components/common/LoadingButton';

import { usePostNewGoods } from '@/hooks/api/useGoods';
import { useGetAllCountries } from '@/hooks/api/useLocation';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

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
  const router = useRouter();

  const selectedCategory = form.watch('category');

  const fetchCountriesData = useGetAllCountries();

  const {
    mutate: createNewGoods,
    isError: isCreateNewGoodsError,
    isPending: isCreateNewGoodsPending,
    isSuccess: isCreateNewGoodsSuccess,
    error,
  } = usePostNewGoods();

  const onSubmit = ({ category, subCategory, goods, seller }: FormType) => {
    if (!category || !seller) return;

    createNewGoods({
      category: category._id,
      subCategory,
      firm: goods.firm,
      model: goods.model,
      description: goods.description,
      goodsDetails: goods.goodsDetails,
      stored: goods.stored,
      notes: goods.notes,
      buyDate: goods.buyDate,
      season: goods.season,
      seller,
      incomePriceGRN: goods.incomePriceGRN,
      incomePriceUSD: goods.incomePriceUSD,
      outcomePrice: goods.outcomePrice,
    });
  };

  useShowFetchResultMessage({
    isError: isCreateNewGoodsError,
    isSuccess: isCreateNewGoodsSuccess,
    closeFunction: () => router.push(`/${routePaths.goods}`),
    error,
  });

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
            fetchCountriesData={fetchCountriesData}
            form={form}
          />

          <GoodsInformation
            form={form}
            fetchCountriesData={fetchCountriesData}
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
              isLoading={isCreateNewGoodsPending}
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
