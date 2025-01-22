import { CountryType } from '@/types/location/location';
import { UseQueryResult } from '@tanstack/react-query';

import { Controller, UseFormReturn } from 'react-hook-form';

import { useGetAllFirms } from '@/hooks/api/useGoods';

import { FormType } from '../../../NewGoods';
import FirmCountry from './FirmCountry';
import FirmName from './FirmName';

const GoodFirm = ({
  form,
  fetchCountriesData,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
}) => {
  const firmDataRequest = useGetAllFirms();
  return (
    <>
      <FirmName firmDataRequest={firmDataRequest} form={form} />

      <FirmCountry form={form} fetchCountriesData={fetchCountriesData} />
    </>
  );
};

export default GoodFirm;
