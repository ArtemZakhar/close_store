import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { Controller, useFormContext } from 'react-hook-form';

import { FormType } from '../../../../../../HandleGoods';
import { validations } from '../../../../../formValidations';
import { styles } from './InputTypeNumber.styles';

const InputTypeNumber = ({
  name,
  id,
}: {
  name: 'incomePriceUSD' | 'incomePriceGRN' | 'outcomePrice';
  id: string;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormType>();

  const error =
    errors.goods &&
    errors.goods.goodsDetails &&
    errors.goods.goodsDetails[id] &&
    errors.goods.goodsDetails[id].outcomePrice;

  return (
    <Box height="4rem">
      <Controller
        control={control}
        name={`goods.goodsDetails.${id}.${name}`}
        rules={validations.price(id)}
        defaultValue={0}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            sx={styles.inputTypeNumber}
            value={field.value}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    {name === 'incomePriceUSD' ? '$' : '₴'}
                  </InputAdornment>
                ),
              },
              htmlInput: {
                step: '0.01',
              },
            }}
            onChange={(event) => {
              const value = event.target.value
                .replace(/[^\d.]/g, '')
                .replace(/^0+(\d)/, '$1')
                .replace(/^(\d*\.\d{0,2}).*$/, '$1');
              field.onChange(value);
            }}
            placeholder="0.00"
            error={name === 'outcomePrice' && !!error}
            helperText={name === 'outcomePrice' && error ? error.message : ''}
          />
        )}
      />
    </Box>
  );
};

export default InputTypeNumber;
