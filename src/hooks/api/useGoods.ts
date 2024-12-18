import { getAllFirms } from '@/app/api/goodsService';
import { useQuery } from '@tanstack/react-query';

const QUERY_FIRM = 'firms';

export const useGetAllFirms = () =>
  useQuery({ queryKey: [QUERY_FIRM], queryFn: getAllFirms });
