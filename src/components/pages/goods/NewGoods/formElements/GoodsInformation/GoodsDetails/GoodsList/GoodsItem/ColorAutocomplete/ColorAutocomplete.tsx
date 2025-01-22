import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/StyledAutocomplete/CustomList';
import CustomPaper from '@/components/common/StyledAutocomplete/CustomPaper';
import { FormType } from '@/components/pages/goods/NewGoods/NewGoods';

import { styles } from './ColorAutocomplete.styles';
import { ColorsType, colorList } from './colorList';

const ColorAutocomplete = ({
  form,
  index,
  field,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  index: number;
  field: ControllerRenderProps<FormType, 'goods.goodsDetails'>;
}) => {
  const { getValues } = form;

  const handleColorChange = (value: ColorsType | null) => {
    const prevState = getValues('goods.goodsDetails');

    field.onChange(
      prevState.map((item, i) =>
        index === i ? { ...item, color: value?.label || null } : item,
      ),
    );
  };

  return (
    <Box width="15rem">
      <Typography marginBottom="1rem" variant="h4">
        Колір
      </Typography>

      <Autocomplete
        PaperComponent={CustomPaper}
        ListboxComponent={CustomList}
        popupIcon={<KeyboardArrowDownIcon sx={() => styles.arrow(false)} />}
        options={colorList}
        getOptionLabel={(option) => option.label}
        onChange={(_, newValue) => handleColorChange(newValue)}
        onClose={(e) => {
          e.stopPropagation();
          document.activeElement &&
            (document.activeElement as HTMLElement).blur();
        }}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;

          return (
            <li key={option.id} {...otherProps}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Оберіть колір" />
        )}
      />
    </Box>
  );
};

export default ColorAutocomplete;
