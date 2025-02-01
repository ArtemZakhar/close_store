import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { validations } from '../../formValidations';
import { styles } from './ModelName.styles';

const ModelName = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Модель
      </Typography>

      <Box width="15rem">
        <Controller
          control={control}
          name="goods.model"
          defaultValue=""
          rules={validations.goodsModel}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              placeholder="Зазначте модель"
              fullWidth
              error={!!(errors.goods && errors.goods.model)}
              helperText={
                errors.goods && errors.goods.model && errors.goods.model.message
              }
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default ModelName;
