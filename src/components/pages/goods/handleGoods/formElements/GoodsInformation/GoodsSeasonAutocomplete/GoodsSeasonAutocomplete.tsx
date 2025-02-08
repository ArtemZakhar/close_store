import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Controller, useFormContext } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { FormType } from '../../../HandleGoods';
import { seasonList } from './seasonList';

const GoodsSeasonAutocomplete = () => {
  const { control } = useFormContext<FormType>();

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
          <AutocompleteStyled
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
