import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import {
  onlyDigitsRegExp,
  validations,
} from '@/components/pages/NewGoods/formValidations';

import { NewCategoryFormType } from '../../AddNewCategoryModal';

const UniqueIdInput = ({
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
        Ідентифікатор
      </Typography>

      <Controller
        control={control}
        name="uniqueId"
        rules={validations.uniqueId}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            value={field.value}
            placeholder="Введіть унікальний ідентифікатор"
            error={!!errors.uniqueId}
            onChange={(event) =>
              field.onChange(event.target.value.replace(onlyDigitsRegExp, ''))
            }
            helperText={errors.uniqueId ? errors.uniqueId.message : ''}
          />
        )}
      />
    </>
  );
};

export default UniqueIdInput;
