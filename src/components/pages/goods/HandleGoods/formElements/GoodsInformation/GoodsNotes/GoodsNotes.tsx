import TextField from '@mui/material/TextField';

import { Controller, UseFormReturn, useFormContext } from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { styles } from './GoodsNotes.styles';

const GoodsNotes = ({
  name,
  rows = 3,
}: {
  name: 'stored' | 'notes';
  rows?: number;
}) => {
  const { control } = useFormContext<FormType>();
  return (
    <Controller
      control={control}
      name={`goods.${name}`}
      render={({ field }) => (
        <TextField
          {...field}
          sx={styles.textField}
          multiline
          rows={rows}
          placeholder="..."
          fullWidth
        />
      )}
    />
  );
};

export default GoodsNotes;
