import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, useFormContext } from 'react-hook-form';

import { FormType } from '../../../HandleGoods';

const SellerCode = () => {
  const { control } = useFormContext<FormType>();

  return (
    <Box marginBottom="1rem">
      <Typography marginBottom="1rem" variant="h4">
        Код продавця
      </Typography>

      <Box width="15rem">
        <Controller
          control={control}
          name="goods.sellerCode"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              placeholder="Зазначте код"
              fullWidth
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerCode;
