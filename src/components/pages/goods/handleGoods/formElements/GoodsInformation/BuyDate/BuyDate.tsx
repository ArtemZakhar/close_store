import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { styles } from './BuyDate.styles';

const BuyDate = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { control } = form;

  return (
    <Box width="15rem">
      <Typography marginBottom="1rem" variant="h4">
        Дата придбання
      </Typography>

      <Controller
        control={control}
        name="goods.buyDate"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            value={field.value}
            fullWidth
            sx={styles.calendar}
          />
        )}
      />
    </Box>
  );
};

export default BuyDate;
