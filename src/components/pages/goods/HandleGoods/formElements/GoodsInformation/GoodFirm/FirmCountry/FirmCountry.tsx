import { FirmType } from '@/types/goods/firm';
import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { FormType } from '../../../../HandleGoods';
import { validations } from '../../../formValidations';
import { styles } from './FirmCountry.styles';

const FirmCountry = ({
  fetchCountriesData,
  selectedFirm,
}: {
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedFirm?: FirmType;
}) => {
  const {
    control,
    formState: { errors },
    resetField,
  } = useFormContext<FormType>();

  const { data: countriesData, isError, isLoading } = fetchCountriesData;

  useEffect(() => {
    if (selectedFirm && countriesData) {
      const existingCountry = countriesData.find(
        (country) => country._id === selectedFirm.countryOfOrigin,
      );

      if (existingCountry) {
        resetField('goods.firm.countryOfOrigin', {
          defaultValue: existingCountry.name,
        });
      }
    }
  }, [isLoading]);

  const isErrorMessage =
    errors.goods && errors.goods.firm && errors.goods.firm.countryOfOrigin;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Країна
      </Typography>

      <Box width="15rem">
        <Controller
          name="goods.firm.countryOfOrigin"
          control={control}
          rules={validations.goodsFirm.countryOfOrigin}
          render={({ field }) => (
            <AutocompleteStyled
              {...field}
              value={field.value ?? ''}
              options={countriesData || []}
              freeSolo
              onChange={(_, newValue) => field.onChange(newValue)}
              onInputChange={(event, newInputValue) => {
                field.onChange(newInputValue);
              }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
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
              error={!!isErrorMessage}
              helperText={
                isErrorMessage
                  ? errors?.goods?.firm?.countryOfOrigin?.message
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

export default FirmCountry;
