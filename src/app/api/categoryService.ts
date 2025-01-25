import { CategoryType } from '@/types/goods/category';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllCategories = ({
  tags,
  query,
}: {
  tags?: string[];
  query?: string;
}): Promise<CategoryType[]> => {
  try {
    return client.get({ url: `${apiCalls.categories}?${query}`, tags });
  } catch (error) {
    console.log('Fetching categories error', error);
    throw new Error('Failed to fetch categories');
  }
};

export const postNewCategory = async (
  data: Omit<CategoryType, '_id' | 'lastId' | 'owner'>,
): Promise<CategoryType> =>
  await client.post({ url: apiCalls.categories, data });

export const updateCategory = async (
  id: string,
  data: Partial<CategoryType>,
): Promise<CategoryType> =>
  await client.patch({ url: apiCalls.categoriesUpdate(id), data });
