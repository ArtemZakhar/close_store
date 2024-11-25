import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

const CategoryAutocomplete = ({
  form,
}: {
  form: UseFormReturn<FieldValues, any, undefined>;
}) => {
  const { control } = form;

  return (
    <Box>
      <Typography variant="h4">Категорія</Typography>
      <Box>
        {/* <Controller
          name="category"
          control={control}
          render={({ field }) => <Autocomplete {...field} />}
        /> */}
      </Box>

      <Divider />
    </Box>
  );
};

export default CategoryAutocomplete;
