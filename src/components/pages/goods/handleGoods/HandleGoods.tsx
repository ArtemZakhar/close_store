'use client';

import { responseMessages } from '@/app/api/constants/responseMessages';
import { routePaths } from '@/constants/routePaths';
import { CategoryType } from '@/types/goods/category';
import {
  GoodsType,
  NewGoodFormType,
  UpdateGoodsFormType,
} from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';
import Box from '@mui/material/Box';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import BackButton from '@/components/common/BackButton';
import LoadingButton from '@/components/common/LoadingButton';

import { usePostNewGoods, useUpdateGoods } from '@/hooks/api/useGoods';
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

export type UpdateFormType = {
  category: CategoryType | null;
  subCategory: string[];
  seller: SellerType | null;
  goods: UpdateGoodsFormType;
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
  const form = useForm<FormType | UpdateFormType>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );

  const onCategoryChange = (data: CategoryType | null) => {
    setSelectedCategory(data);
  };

  const router = useRouter();

  const fetchCountriesData = useGetAllCountries();

  console.log('render');

  useUpdateFormState({ isEditing, form, selectedGoods });

  useEffect(() => {
    if (selectedGoods) {
      setSelectedCategory(selectedGoods.category);
    }
  }, []);

  const {
    mutate: updateGoods,
    isError: isUpdateGoodsError,
    isPending: isUpdateGoodsPending,
    isSuccess: isUpdateGoodsSuccess,
    error: updateGoodsError,
  } = useUpdateGoods();

  const {
    mutate: createNewGoods,
    isError: isCreateNewGoodsError,
    isPending: isCreateNewGoodsPending,
    isSuccess: isCreateNewGoodsSuccess,
    error,
  } = usePostNewGoods();

  const onSubmit = (data: FormType | UpdateFormType) => {
    const { category, subCategory, goods, seller } = data;

    if (!category || !seller) return;

    if (isEditing) {
      const dirty = form.formState.dirtyFields;
      console.log(dirty, form.getValues('seller'));
      const dirtyFields: Partial<NewGoodFormType> = {
        category: dirty.category ? category._id : undefined,
        subCategory: dirty.subCategory ? subCategory : undefined,
        firm: dirty.goods?.firm ? goods.firm : undefined,
        model: dirty.goods?.model ? goods.model : undefined,
        description: dirty.goods?.description ? goods.description : undefined,
        goodsDetails: goods.goodsDetails,
        stored: dirty.goods?.stored ? goods.stored : undefined,
        notes: dirty.goods?.notes ? goods.notes : undefined,
        buyDate: dirty.goods?.buyDate ? goods.buyDate : undefined,
        arrivalDate: dirty.goods?.arrivalDate ? goods.arrivalDate : undefined,
        season: dirty.goods?.season ? goods.season : undefined,
        seller: dirty.seller ? seller : undefined,
      };

      const updatedFields: Partial<NewGoodFormType> = {};

      for (const [key, value] of Object.entries(dirtyFields) as [
        keyof NewGoodFormType,
        any,
      ][]) {
        if (value) {
          updatedFields[key] = value;
        }
      }
      // console.log(JSON.stringify(updatedFields, null, 2));

      // updateGoods(updatedFields);
    } else {
      createNewGoods({
        category: category._id,
        subCategory,
        firm: goods.firm,
        model: goods.model,
        description: goods.description,
        goodsDetails: goods.goodsDetails,
        stored: goods.stored,
        notes: goods.notes,
        buyDate: goods.buyDate ?? '',
        arrivalDate: goods.arrivalDate ?? '',
        season: goods.season,
        seller,
        sizeType: goods.sizeType,
      });
    }

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
      {
        errorType: responseMessages.user.forbidden,
        message: 'У вас нема прав для цієї операції',
      },
      {
        errorType: responseMessages.goods.seller.noData,
        message: 'Відсутня електронна адреса або телефон продавця',
      },
      {
        errorType: responseMessages.goods.category.notExist,
        message: 'Створіть категорію перш ніж додавати товар',
      },
    ],
  });

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        marginTop="4rem"
      >
        <CategoryAutocomplete
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        {selectedCategory && (
          <>
            <SubCategoryAutocomplete selectedCategory={selectedCategory} />

            <SellerInformation
              fetchCountriesData={fetchCountriesData}
              selectedSeller={selectedGoods?.seller}
            />

            <GoodsInformation
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
    </FormProvider>
  );
};

export default HandleGoods;
