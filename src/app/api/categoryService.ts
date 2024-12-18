import { CategoryType } from '@/types/goods/category';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllCategories = (): Promise<CategoryType[]> =>
  client.get({ url: apiCalls.categories });

export const postNewCategory = async (
  data: Omit<CategoryType, '_id' | 'lastId'>,
): Promise<CategoryType> =>
  await client.post({ url: apiCalls.categories, data });

export const updateCategory = async (
  id: string,
  data: Partial<CategoryType>,
): Promise<CategoryType> =>
  await client.patch({ url: apiCalls.categoriesUpdate(id), data });
