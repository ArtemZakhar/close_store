import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllCategories = () => client.get({ url: apiCalls.categories });
