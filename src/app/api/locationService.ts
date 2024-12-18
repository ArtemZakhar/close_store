import { CityType, CountryType } from '@/types/location/location';

import { client } from '@/utils/client';

import { apiCalls } from './constants/apiCalls';

export const getAllCities = async () =>
  await client.get<CityType[]>({ url: apiCalls.cities });

export const getAllCountries = async () =>
  await client.get<CountryType[]>({ url: apiCalls.countries });
