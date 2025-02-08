import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ChangeEvent, useEffect } from 'react';
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { validations } from '../../formValidations';
import { styles } from './SellerEmailInput.styles';

const SellerEmailInput = () => {
  const {
    control,
    clearErrors,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormType>();

  const seller = watch('seller');

  useEffect(() => {
    if (seller && seller.email) {
      setValue('seller.email', seller.email);
    }
  }, [seller?.email]);

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormType, 'seller.email'>,
  ) => {
    field.onChange(e.target.value);

    if (errors.seller && (errors.seller.email || errors.seller?.phone)) {
      clearErrors('seller.phone');
      clearErrors('seller.email');
    }
  };

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Пошта продавця
      </Typography>

      <Box width="15rem">
        <Controller
          control={control}
          name="seller.email"
          defaultValue=""
          rules={validations.sellerEmail}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              value={field.value || ''}
              placeholder="example@com.ua"
              error={!!errors.seller?.email}
              onChange={(e) => handleEmailChange(e, field)}
              helperText={
                errors.seller?.email ? errors.seller?.email.message : ''
              }
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerEmailInput;
