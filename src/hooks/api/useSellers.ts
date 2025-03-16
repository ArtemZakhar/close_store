import { getAllSellers } from '@/app/api/sellerService';
import { useQuery } from '@tanstack/react-query';

export const QUERY_SELLERS = 'sellers';

export const useGetAllSellers = () =>
  useQuery({ queryKey: [QUERY_SELLERS], queryFn: getAllSellers });
