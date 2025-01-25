import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import StyledAutocomplete from '@/components/common/StyledAutocomplete';

import { FormType } from '../../../NewGoods';
import { seasonList } from './seasonList';

const GoodsSeasonAutocomplete = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { control } = form;

  return (
    <Box width="15rem">
      <Typography marginBottom="1rem" variant="h4">
        Сезон
      </Typography>

      <Controller
        control={control}
        name="goods.season"
        defaultValue={seasonList[0]}
        render={({ field }) => (
          <StyledAutocomplete
            {...field}
            options={seasonList}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;

              return (
                <li key={key} {...otherProps}>
                  {option.label}
                </li>
              );
            }}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            placeholder="Оберіть сезон"
          />
        )}
      />
    </Box>
  );
};

export default GoodsSeasonAutocomplete;
