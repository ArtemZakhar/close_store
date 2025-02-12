import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import { validations } from '../../../../formValidations';
import { NewCategoryFormType } from '../../AddNewCategoryModal';

const CategoryNameInput = ({
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
      <Typography marginBottom="1rem" variant="h4">
        Назва
      </Typography>

      <Controller
        control={control}
        name="name"
        defaultValue=""
        rules={validations.name}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            value={field.value}
            placeholder="Введіть назву категорії"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        )}
      />
    </>
  );
};

export default CategoryNameInput;
