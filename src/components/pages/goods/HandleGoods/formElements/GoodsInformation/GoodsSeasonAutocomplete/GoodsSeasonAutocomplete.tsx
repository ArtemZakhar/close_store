import { GoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { seasonList } from '../../../../../../../helpers/seasonList';
import { FormType } from '../../../HandleGoods';

const GoodsSeasonAutocomplete = ({
  selectedGoods,
}: {
  selectedGoods: GoodsType | null | undefined;
}) => {
  const { control, setValue } = useFormContext<FormType>();

  useEffect(() => {
    if (selectedGoods) {
      const newSeason = seasonList.find(
        (season) => season.name === selectedGoods.season,
      );

      if (newSeason) {
        setValue('goods.season', newSeason);
      }
    }
  }, []);

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
