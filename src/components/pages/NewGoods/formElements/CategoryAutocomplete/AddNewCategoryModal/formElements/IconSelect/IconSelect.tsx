import { getIcon } from '@/helpers/getIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';
import { validations } from '@/components/pages/NewGoods/formValidations';

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
            <Autocomplete
              {...field}
              PaperComponent={CustomPaper}
              ListboxComponent={CustomList}
              popupIcon={
                <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
              }
              options={iconsArray}
              value={field.value || null}
              getOptionLabel={(option) => option.label}
              onClose={(e) => {
                e.stopPropagation();
                document.activeElement &&
                  (document.activeElement as HTMLElement).blur();
              }}
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.icon}
                  fullWidth
                  helperText={
                    errors.icon && typeof errors.icon.message === 'string'
                      ? errors.icon.message
                      : ''
                  }
                  placeholder="Оберіть іконку"
                />
              )}
            />
          )}
        />
      </Box>
    </>
  );
};

export default IconSelect;
