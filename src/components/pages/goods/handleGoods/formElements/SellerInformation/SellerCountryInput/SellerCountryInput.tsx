import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import StyledAutocomplete from '@/components/common/StyledAutocomplete';

import { FormType } from '../../../HandleGoods';
import { validations } from '../../formValidations';
import { styles } from './SellerCountryInput.styles';

const SellerCountryInput = ({
  form,
  fetchCountriesData,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  const { data: countriesData, isError, isLoading } = fetchCountriesData;

  const seller = form.watch('seller');

  useEffect(() => {
    if (seller && seller.country) {
      form.setValue('seller.country', seller.country);
    }
  }, [seller?.country]);

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Країна
      </Typography>

      <Box width="15rem">
        <Controller
          name="seller.country"
          control={control}
          rules={validations.sellerCountry}
          defaultValue=""
          render={({ field }) => (
            <StyledAutocomplete
              {...field}
              value={field.value || ''}
              options={countriesData || []}
              freeSolo
              onChange={(_, newData) => field.onChange(newData)}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              onInputChange={(event, newInputValue) => {
                setValue('seller.country', newInputValue);
              }}
              loading={isLoading}
              noOptionsText={
                isError && (
                  <Box padding="1rem" component="p">
                    Не вдалось завантажити країни
                  </Box>
                )
              }
              renderOption={(props, option) => {
                const { key, ...otherProps } = props;

                return (
                  <li key={option._id} {...otherProps}>
                    {option.name}
                  </li>
                );
              }}
              error={!!(errors.seller && errors.seller.country)}
              helperText={
                errors.seller &&
                errors.seller.country &&
                typeof errors.seller.country.message === 'string'
                  ? errors.seller.country.message
                  : ''
              }
              placeholder="Зазначте країну"
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerCountryInput;
