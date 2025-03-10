import { GoodsType } from '@/types/goods/good';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType, UpdateFormType } from '../HandleGoods';

export const useUpdateFormState = ({
  form,
  isEditing,
  selectedGoods,
}: {
  form: UseFormReturn<FormType | UpdateFormType, any, undefined>;
  isEditing: boolean | undefined;
  selectedGoods: GoodsType | null | undefined;
}) => {
  const { setValue, reset } = form;
  useEffect(() => {
    if (selectedGoods) {
      if (isEditing) {
        setValue('category.lastId', selectedGoods.category.lastId - 1);
        setValue('goods.description', selectedGoods.description);
        setValue('goods.model', selectedGoods.model);
        setValue('goods.notes', selectedGoods.notes);
        setValue('goods.stored', selectedGoods.stored);
        setValue('goods.sellerCode', selectedGoods.sellerCode);
      } else {
        setValue('category.lastId', selectedGoods.category.lastId);
        setValue('goods.model', `${selectedGoods.model} (копія)`);
      }
      setValue('subCategory', selectedGoods.subCategory);
      setValue('goods.arrivalDate', selectedGoods.arrivalDate);
      setValue('goods.buyDate', selectedGoods.buyDate);
      setValue('category', selectedGoods.category);
      setValue('goods.sizeType', selectedGoods.sizeType);
    }

    return () => reset();
  }, []);
};
