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
        setValue('category', selectedGoods.category);
        setValue('category.lastId', selectedGoods.category.lastId - 1);
        setValue('goods.buyDate', selectedGoods.buyDate);
        setValue('goods.arrivalDate', selectedGoods.arrivalDate);
        setValue('goods.description', selectedGoods.description);
        setValue('subCategory', selectedGoods.subCategory);
        setValue('goods.model', selectedGoods.model);
        setValue('goods.notes', selectedGoods.notes);
        setValue('goods.stored', selectedGoods.stored);
      } else {
        setValue('category', selectedGoods.category);
        setValue('category.lastId', selectedGoods.category.lastId);
        setValue('goods.buyDate', selectedGoods.buyDate);
        setValue('goods.arrivalDate', selectedGoods.arrivalDate);
        setValue('subCategory', selectedGoods.subCategory);
        setValue('goods.model', `${selectedGoods.model} (копія)`);
      }
    }

    return () => reset();
  }, []);
};
