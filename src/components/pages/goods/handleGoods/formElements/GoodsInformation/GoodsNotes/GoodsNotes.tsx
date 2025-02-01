import TextField from '@mui/material/TextField';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { styles } from './GoodsNotes.styles';

const GoodsNotes = ({
  name,
  form,
  rows = 3,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  name: 'stored' | 'notes';
  rows?: number;
}) => {
  const { control } = form;
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
