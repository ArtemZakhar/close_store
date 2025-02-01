import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ChangeEvent, useEffect, useRef } from 'react';
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { validations } from '../../formValidations';
import { usePhoneMask } from './usePhoneMask';

const SellerPhoneInput = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = form;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const createMask = usePhoneMask();

  const seller = form.watch('seller');

  useEffect(() => {
    if (seller && seller.phone) {
      form.setValue('seller.phone', seller.phone);
    }
  }, [seller?.phone]);

  const handlePhoneChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormType, 'seller.phone'>,
  ) => {
    const maskedValue = createMask(e.target.value, inputRef.current);

    field.onChange(maskedValue);

    if (errors.seller && (errors.seller.email || errors.seller?.phone)) {
      clearErrors('seller.phone');
      clearErrors('seller.email');
    }
  };

  return (
    <Box marginBottom="1rem">
      <Typography marginBottom="1rem" variant="h4">
        Телефон продавця
      </Typography>

      <Box width="15rem">
        <Controller
          control={control}
          name="seller.phone"
          defaultValue=""
          rules={validations.sellerPhone}
          render={({ field }) => (
            <TextField
              {...field}
              inputRef={inputRef}
              fullWidth
              value={field.value || ''}
              onFocus={() => !field.value?.length && field.onChange('+')}
              placeholder="+38 (___) ___ __ __"
              error={!!errors.seller?.phone}
              onChange={(e) => handlePhoneChange(e, field)}
              helperText={
                errors.seller?.phone ? errors.seller?.phone.message : ''
              }
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerPhoneInput;
