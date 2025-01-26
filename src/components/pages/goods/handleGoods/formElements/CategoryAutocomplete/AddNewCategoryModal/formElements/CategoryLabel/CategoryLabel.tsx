import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import { validations } from '@/components/pages/goods/handleGoods/formValidations';

import { NewCategoryFormType } from '../../AddNewCategoryModal';

const CategoryLabel = ({
  form,
}: {
  form: UseFormReturn<NewCategoryFormType, any, undefined>;
}) => {
  const {
    control,
    formState: { errors },
  } = form;
  return (
    <>
      <Tooltip title='Не можна вводити спеціальні симфоли, наприклад "-" на початку і вкінці рядку. Такод заборонено використовувати пробіли. Тільки англійська абетка в нижньому регістрі.'>
        <Typography marginBottom="1rem" variant="h4">
          URL адреса
        </Typography>
      </Tooltip>

      <Controller
        control={control}
        name="url"
        defaultValue=""
        rules={validations.url}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            value={field.value}
            placeholder="t-shirt, trousers, valid_endpoint123"
            error={!!errors.url}
            helperText={errors.url ? errors.url.message : ''}
          />
        )}
      />
    </>
  );
};

export default CategoryLabel;
