import Category from '@/models/goods/Categories';
import { CategoryType } from '@/types/goods/category';

export const getCategoryByParams = async (params: Partial<CategoryType>) => {
  const category = await Category.findOne(params);

  return category;
};

export const findCategoryAndUpdate = async ({
  searchParam,
  dataToUpdate,
}: {
  searchParam: Partial<CategoryType>;
  dataToUpdate: Partial<CategoryType> & {
    $inc?: Partial<Record<keyof CategoryType, number>>;
    $set?: Partial<CategoryType>;
    $push?: Partial<Record<keyof CategoryType, any>>;
    $if?: Partial<Record<keyof CategoryType, any>>;
  };
}) => {
  const category = await Category.findOneAndUpdate(searchParam, dataToUpdate, {
    new: true,
  });

  return category;
};
