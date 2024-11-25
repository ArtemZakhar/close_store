import { getAllCategories } from '@/app/api/categoryService';

import { useQuery } from './useQuery';

const CATEGORY_KEY = 'Category';

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: () => getAllCategories(),
  });
};
