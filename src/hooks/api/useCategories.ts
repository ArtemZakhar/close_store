import {
  getAllCategories,
  postNewCategory,
  updateCategory,
} from '@/app/api/categoryService';
import { CategoryType } from '@/types/goods/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const CATEGORY_KEY = 'Category';

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: () => getAllCategories({}),
  });
};

export const usePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CategoryType,
    unknown,
    Omit<CategoryType, '_id' | 'lastId' | 'owner'>
  >({
    mutationFn: (data) => postNewCategory(data),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEY],
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CategoryType,
    unknown,
    { id: string; data: Partial<CategoryType> }
  >({
    mutationFn: (data) => updateCategory(data.id, data.data),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEY],
      });
    },
  });
};
