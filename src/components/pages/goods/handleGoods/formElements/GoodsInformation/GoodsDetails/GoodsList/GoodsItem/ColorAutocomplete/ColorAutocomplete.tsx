import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import StyledAutocomplete from '@/components/common/StyledAutocomplete';
import { FormType } from '@/components/pages/goods/HandleGoods/HandleGoods';

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

      <StyledAutocomplete
        options={colorList}
        getOptionLabel={(option) => option.label}
        onChange={(_, newValue) => handleColorChange(newValue)}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;

          return (
            <li key={option.id} {...otherProps}>
              {option.label}
            </li>
          );
        }}
        placeholder="Оберіть колір"
      />
    </Box>
  );
};

export default ColorAutocomplete;
