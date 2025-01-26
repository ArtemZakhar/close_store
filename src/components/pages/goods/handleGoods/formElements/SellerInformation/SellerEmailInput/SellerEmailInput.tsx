import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ChangeEvent } from 'react';
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from 'react-hook-form';

import { FormType } from '../../../NewGoods/NewGoods';
import { validations } from '../../../formValidations';
import { styles } from './SellerEmailInput.styles';

const SellerEmailInput = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = form;

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
