'use client';

import { responseMessages } from '@/app/api/constants/responseMessages';
import { routePaths } from '@/constants/routePaths';
import { CategoryType } from '@/types/goods/category';
import { GoodsType, NewGoodFormType } from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import BackButton from '@/components/common/BackButton';
import LoadingButton from '@/components/common/LoadingButton';

import { usePostNewGoods } from '@/hooks/api/useGoods';
import { useGetAllCountries } from '@/hooks/api/useLocation';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { styles } from './HandleGoods.styles';
import CategoryAutocomplete from './formElements/CategoryAutocomplete';
import GoodsInformation from './formElements/GoodsInformation';
import SellerInformation from './formElements/SellerInformation';
import SubCategoryAutocomplete from './formElements/SubCategoryAutocomplete';
import { useUpdateFormState } from './hooks/useUpdateFormState';

export type FormType = {
  category: CategoryType | null;
  subCategory: string[];
  seller: SellerType | null;
  goods: NewGoodFormType;
};

const HandleGoods = ({
  finishMode = () => {},
  selectedGoods,
  isEditing,
}: {
  finishMode?: (mode?: 'editing') => void;
  selectedGoods?: GoodsType | null;
  isEditing?: boolean;
}) => {
  const form = useForm<FormType>();
  const router = useRouter();

  const selectedCategory = form.watch('category');

  const fetchCountriesData = useGetAllCountries();

  useUpdateFormState({ isEditing, form, selectedGoods });

  const {
    mutate: createNewGoods,
    isError: isCreateNewGoodsError,
    isPending: isCreateNewGoodsPending,
    isSuccess: isCreateNewGoodsSuccess,
    error,
  } = usePostNewGoods();

  const onSubmit = ({ category, subCategory, goods, seller }: FormType) => {
    if (!category || !seller) return;

    console.log({
      category: category._id,
      subCategory,
      firm: goods.firm,
      model: goods.model,
      description: goods.description,
      goodsDetails: goods.goodsDetails.map((good) => ({
        ...good,
        countAndSizes: good.countAndSizes.filter((item) => item.count > 0),
      })),
      stored: goods.stored,
      notes: goods.notes,
      buyDate: goods.buyDate ?? '',
      season: goods.season,
      seller,
      sizeType: goods.sizeType,
    });

    // createNewGoods({
    //   category: category._id,
    //   subCategory,
    //   firm: goods.firm,
    //   model: goods.model,
    //   description: goods.description,
    //   goodsDetails: goods.goodsDetails.map((good) => ({
    //     ...good,
    //     countAndSizes: good.countAndSizes.filter((item) => item.count > 0),
    //   })),
    //   stored: goods.stored,
    //   notes: goods.notes,
    //   buyDate: goods.buyDate ?? '',
    //   season: goods.season,
    //   seller,
    //   sizeType: goods.sizeType,
    // });

    // if (selectedGoods) {
    //   if (isEditing) {
    //     finishMode('editing');
    //   } else {
    //     finishMode();
    //   }
    // }
  };

  useShowFetchResultMessage({
    isError: isCreateNewGoodsError,
    isSuccess: isCreateNewGoodsSuccess,
    closeFunction: () => router.push(`/${routePaths.goods.root}`),
    error,
    customErrorMessage: [
      {
        errorType: responseMessages.goods.exist,
        message: 'Ця модель у даного продавця вже існує',
      },
    ],
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
            selectedSeller={selectedGoods?.seller._id}
          />

          <GoodsInformation
            form={form}
            fetchCountriesData={fetchCountriesData}
            selectedGoods={selectedGoods}
            isEditing={isEditing}
          />

          <Box sx={styles.buttonsWrapper}>
            <BackButton
              {...(selectedGoods && {
                onBack: () =>
                  isEditing ? finishMode('editing') : finishMode(),
              })}
            />

            <LoadingButton
              isLoading={isCreateNewGoodsPending}
              sx={{ width: '13rem' }}
              label={isEditing ? 'Оновити' : 'Створити'}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default HandleGoods;
