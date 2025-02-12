import { getIcon } from '@/helpers/getIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { validations } from '../../../../formValidations';
import { NewCategoryFormType } from '../../AddNewCategoryModal';
import { styles } from './IconSelect.styles';

const IconSelect = ({
  form,
}: {
  form: UseFormReturn<NewCategoryFormType, any, undefined>;
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  const iconsArray = Object.entries(getIcon({ fontSize: '3rem' })).map(
    ([key, value]) => {
      return { label: key, value };
    },
  );

  return (
    <>
      <Typography variant="h4" marginBottom="1rem">
        Іконка
      </Typography>

      <Box>
        <Controller
          name="icon"
          control={control}
          defaultValue={null}
          rules={validations.icon}
          render={({ field }) => (
            <AutocompleteStyled
              {...field}
              options={iconsArray}
              value={field.value || null}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                field.onChange(newValue);
              }}
              renderOption={(props, option) => {
                const { key, ...otherProps } = props;

                return (
                  <li key={option.label} {...otherProps} style={styles.list}>
                    {option.value}
                  </li>
                );
              }}
              error={!!errors.icon}
              helperText={
                errors.icon && typeof errors.icon.message === 'string'
                  ? errors.icon.message
                  : ''
              }
              placeholder="Оберіть іконку"
            />
          )}
        />
      </Box>
    </>
  );
};

export default IconSelect;
