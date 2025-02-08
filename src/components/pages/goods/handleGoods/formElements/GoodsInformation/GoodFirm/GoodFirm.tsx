import { CountryType } from '@/types/location/location';
import { UseQueryResult } from '@tanstack/react-query';

import { useGetAllFirms } from '@/hooks/api/useGoods';

import FirmCountry from './FirmCountry';
import FirmName from './FirmName';

const GoodFirm = ({
  fetchCountriesData,
  selectedFirm,
}: {
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedFirm?: string;
}) => {
  const firmDataRequest = useGetAllFirms();
  return (
    <>
      <FirmName firmDataRequest={firmDataRequest} selectedFirm={selectedFirm} />

      <FirmCountry fetchCountriesData={fetchCountriesData} />
    </>
  );
};

export default GoodFirm;
