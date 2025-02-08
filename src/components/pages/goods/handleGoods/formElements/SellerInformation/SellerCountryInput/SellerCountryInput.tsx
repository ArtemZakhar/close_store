import { SellerType } from '@/types/goods/seller';
import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { FormType } from '../../../HandleGoods';
import { validations } from '../../formValidations';
import { styles } from './SellerCountryInput.styles';

const SellerCountryInput = ({
  fetchCountriesData,
  selectedSeller,
}: {
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedSeller: SellerType | undefined;
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<FormType>();

  const { data: countriesData, isError, isLoading } = fetchCountriesData;

  console.log('render Seller country');

  useEffect(() => {
    if (selectedSeller && countriesData) {
      const existingCountry = countriesData.find(
        (country) => country._id === selectedSeller.country,
      );
      if (existingCountry) {
        setValue('seller.country', existingCountry.name);
      }
    }
  }, []);

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
            <AutocompleteStyled
              {...field}
              value={field.value || ''}
              options={countriesData || []}
              freeSolo
              onChange={(_, newData) => field.onChange(newData)}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              onInputChange={(event, newInputValue) => {
                setValue('seller.country', newInputValue, {
                  shouldDirty: true,
                });
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
