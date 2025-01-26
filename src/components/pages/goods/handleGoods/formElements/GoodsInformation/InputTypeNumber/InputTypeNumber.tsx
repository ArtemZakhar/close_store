import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../NewGoods/NewGoods';

const InputTypeNumber = ({
  form,
  name,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  name: 'incomePriceUSD' | 'incomePriceGRN' | 'outcomePrice';
}) => {
  const { control } = form;
  return (
    <Controller
      control={control}
      defaultValue=""
      name={`goods.${name}`}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {name === 'incomePriceUSD' ? '$' : '₴'}
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) =>
            field.onChange(
              event.target.value.replace(/[^\d.]+|(?<=\..*)\./g, ''),
            )
          }
          placeholder="0.00"
        />
      )}
    />
  );
};

export default InputTypeNumber;
