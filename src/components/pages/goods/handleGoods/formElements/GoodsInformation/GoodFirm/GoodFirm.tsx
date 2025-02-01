import { CountryType } from '@/types/location/location';
import { UseQueryResult } from '@tanstack/react-query';

import { Controller, UseFormReturn } from 'react-hook-form';

import { useGetAllFirms } from '@/hooks/api/useGoods';

import { FormType } from '../../../HandleGoods';
import FirmCountry from './FirmCountry';
import FirmName from './FirmName';

const GoodFirm = ({
  form,
  fetchCountriesData,
  selectedFirm,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedFirm?: string;
}) => {
  const firmDataRequest = useGetAllFirms();
  return (
    <>
      <FirmName
        firmDataRequest={firmDataRequest}
        form={form}
        selectedFirm={selectedFirm}
      />

      <FirmCountry form={form} fetchCountriesData={fetchCountriesData} />
    </>
  );
};

export default GoodFirm;
