import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../NewGoods';
import { styles } from './GoodsDescription.styles';

const GoodsDescription = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { control } = form;
  return (
    <Box>
      <Typography marginBottom="1rem" variant="h4">
        Опис Товару
      </Typography>

      <Box position="relative">
        <Box sx={styles.textFieldWrapper}>
          <Controller
            control={control}
            name="goods.description"
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                sx={styles.textField}
                rows={6}
                placeholder="..."
                fullWidth
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GoodsDescription;
