import { getAllCities, getAllCountries } from '@/app/api/locationService';
import { useQuery } from '@tanstack/react-query';

const QUERY_CITIES = 'cities';
const QUERY_COUNTRIES = 'countries';

export const useGetAllCities = () =>
  useQuery({ queryKey: [QUERY_CITIES], queryFn: getAllCities });

export const useGetAllCountries = () =>
  useQuery({ queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries });
