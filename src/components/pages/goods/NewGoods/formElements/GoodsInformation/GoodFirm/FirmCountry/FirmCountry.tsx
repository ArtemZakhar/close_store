import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { Controller, UseFormReturn } from 'react-hook-form';

import StyledAutocomplete from '@/components/common/StyledAutocomplete';

import { FormType } from '../../../../NewGoods';
import { validations } from '../../../../formValidations';
import { styles } from './FirmCountry.styles';

const FirmCountry = ({
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
            <StyledAutocomplete
              {...field}
              value={field.value ?? ''}
              options={countriesData || []}
              freeSolo
              onChange={(_, newValue) => field.onChange(newValue)}
              onInputChange={(event, newInputValue) => {
                setValue('goods.firm.countryOfOrigin', newInputValue);
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
