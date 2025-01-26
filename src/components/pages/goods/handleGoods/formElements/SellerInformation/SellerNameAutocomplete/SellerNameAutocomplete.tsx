import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import StyledAutocomplete from '@/components/common/StyledAutocomplete';

import { useGetAllSellers } from '@/hooks/api/useSellers';

import { FormType } from '../../../NewGoods/NewGoods';
import { validations } from '../../../formValidations';
import { styles } from './SellerNameAutocomplete.styles';

const SellerNameAutocomplete = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { data: sellerData, isError, isLoading } = useGetAllSellers();

  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Назва продавця
      </Typography>

      <Box width="15rem">
        <Controller
          name="seller.name"
          control={control}
          defaultValue={''}
          rules={validations.sellerName}
          render={({ field }) => (
            <StyledAutocomplete
              {...field}
              options={sellerData || []}
              value={field.value || null}
              helperText={
                errors.seller && errors.seller?.name
                  ? errors.seller.name.message
                  : ''
              }
              error={!!errors.seller && !!errors.seller?.name}
              freeSolo
              onChange={(_, newData) => {
                if (typeof newData !== 'string') {
                  setValue('seller', newData);
                }
              }}
              onInputChange={(event, newInputValue) => {
                setValue('seller.name', newInputValue);
              }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              loading={isLoading}
              noOptionsText={
                isError && (
                  <Box padding="1rem" component="p">
                    Не вдалось завантажити продавців
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
              placeholder="Оберіть продавця"
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerNameAutocomplete;
