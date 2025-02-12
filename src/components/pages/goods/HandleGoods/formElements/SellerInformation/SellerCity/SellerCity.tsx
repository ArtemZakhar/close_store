import { SellerType } from '@/types/goods/seller';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { useGetAllCities } from '@/hooks/api/useLocation';

import { FormType } from '../../../HandleGoods';
import { styles } from './SellerCity.styles';

const SellerCity = ({
  selectedSeller,
}: {
  selectedSeller: SellerType | undefined;
}) => {
  const { data: citiesData, isError, isLoading } = useGetAllCities();

  const {
    control,
    formState: { errors },
    setValue,
    resetField,
  } = useFormContext<FormType>();

  useEffect(() => {
    if (selectedSeller && citiesData) {
      const existingCity = citiesData.find(
        (city) => city._id == selectedSeller.city,
      );

      if (existingCity) {
        resetField('seller.city', { defaultValue: existingCity.name });
      }
    }
  }, [isLoading]);

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Місто
      </Typography>

      <Box width="15rem">
        <Controller
          name="seller.city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <AutocompleteStyled
              {...field}
              value={field.value || ''}
              options={citiesData || []}
              freeSolo
              onChange={(_, newData) => field.onChange(newData)}
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
                    Не вдалось завантажити міста
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
              error={!!(errors.seller && errors.seller.city)}
              helperText={
                errors.seller &&
                errors.seller.city &&
                typeof errors.seller.city.message === 'string'
                  ? errors.seller.city.message
                  : ''
              }
              placeholder="Зазначте місто"
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerCity;
