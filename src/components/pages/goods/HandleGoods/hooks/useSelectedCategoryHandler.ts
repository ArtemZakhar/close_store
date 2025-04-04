import { CategoryType } from '@/types/goods/category';
import { GoodsType, PopulatedGoodsType } from '@/types/goods/good';

import { useEffect, useState } from 'react';

export const useSelectedCategoryHandler = (
  selectedGoods: GoodsType | PopulatedGoodsType | null | undefined,
) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );

  useEffect(() => {
    if (selectedGoods) {
      setSelectedCategory(selectedGoods.category);
    }
  }, []);

  const onCategoryChange = (data: CategoryType | null) => {
    setSelectedCategory(data);
  };

  return { onCategoryChange, selectedCategory };
};
