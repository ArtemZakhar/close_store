import { getAllCities, getAllCountries } from '@/app/api/locationService';
import { useQuery } from '@tanstack/react-query';

export const QUERY_CITIES = 'cities';
export const QUERY_COUNTRIES = 'countries';

export const useGetAllCities = () =>
  useQuery({
    queryKey: [QUERY_CITIES],
    queryFn: getAllCities,
    staleTime: Infinity,
  });

export const useGetAllCountries = () =>
  useQuery({
    queryKey: [QUERY_COUNTRIES],
    queryFn: getAllCountries,
    staleTime: Infinity,
  });
