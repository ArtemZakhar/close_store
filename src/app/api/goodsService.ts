import { FirmType } from '@/types/goods/firm';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllFirms = async () =>
  await client.get<FirmType[]>({ url: apiCalls.firms });
