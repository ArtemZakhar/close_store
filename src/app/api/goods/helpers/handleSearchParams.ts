import { ObjectId } from 'mongodb';

import { getCategoryByParams } from '../categories/category.sevice';

export const handleSearchParams = async ({
  queryParams,
}: {
  queryParams: URLSearchParams;
}): Promise<{ [key: string]: string | string[] | ObjectId }> => {
  const searchParams: { [key: string]: string | string[] | ObjectId } = {};

  if (queryParams.toString()) {
    for (const [key, value] of queryParams.entries()) {
      if (key === 'id' || key === 'role' || key === 'owner') {
        continue;
      }

      if (key === 'subCategory') {
        searchParams[key] = value.split(',');
        continue;
      }

      if (key === 'category') {
        const category = await getCategoryByParams({ url: value });
        searchParams[key] = category._id;
        continue;
      }

      searchParams[key] = value;
    }
  }

  return searchParams;
};
