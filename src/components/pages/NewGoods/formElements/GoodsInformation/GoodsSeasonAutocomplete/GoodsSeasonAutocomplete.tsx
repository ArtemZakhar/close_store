import { SeasonType } from '@/types/goods/good';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';

import { FormType } from '../../../NewGoods';
import { styles } from './GoodsSeasonAutocomplete.styles';
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
          <Autocomplete
            {...field}
            fullWidth
            PaperComponent={CustomPaper}
            ListboxComponent={CustomList}
            popupIcon={<KeyboardArrowDownIcon sx={() => styles.arrow(false)} />}
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
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </Box>
  );
};

export default GoodsSeasonAutocomplete;
