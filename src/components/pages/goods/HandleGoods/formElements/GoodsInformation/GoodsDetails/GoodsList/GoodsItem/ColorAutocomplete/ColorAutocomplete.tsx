import { GoodsDetails } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';
import { FormType } from '@/components/pages/goods/HandleGoods/HandleGoods';

import { validations } from '../../../../../formValidations';
import { NEW_PROPERTY_IN_GOODS_OBJECT } from '../../../GoodsDetails';
import { ColorsType, colorList } from './colorList';

const ColorAutocomplete = ({ id }: { id: string }) => {
  const {
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FormType>();

  const handleColorChange = (
    value: ColorsType | null,
    field: ControllerRenderProps<
      FormType,
      `goods.goodsDetails.${string}.color`
    >,
  ) => {
    if (!value) {
      field.onChange(value);
      return;
    }
    const prevState = getValues('goods.goodsDetails');

    if (prevState[value.name]) {
      toast.dismiss();
      toast('Цей колір вже присутній в списку', {
        icon: '💩',
      });
      return;
    }

    console.log(prevState[value.name], prevState);

    const newState: GoodsDetails = {};

    for (const [key, oldValue] of Object.entries(prevState)) {
      if (key === NEW_PROPERTY_IN_GOODS_OBJECT) {
        newState[value.name] = {
          ...oldValue,
          color: value.label,
        };
        continue;
      }

      if (key === id) {
        newState[value.name] = {
          ...oldValue,
          color: value.label,
        };
        continue;
      }

      newState[key] = { ...oldValue };
    }

    setValue('goods.goodsDetails', newState);
  };

  const error =
    errors.goods &&
    errors.goods.goodsDetails &&
    errors.goods.goodsDetails[id] &&
    errors.goods.goodsDetails[id].color;

  return (
    <Box width="15rem" minHeight="6rem">
      <Typography marginBottom="1rem" variant="h4">
        Колір
      </Typography>

      <Controller
        control={control}
        name={`goods.goodsDetails.${id}.color`}
        rules={validations.color}
        render={({ field }) => (
          <AutocompleteStyled
            {...field}
            options={colorList}
            value={field.value ?? ''}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.label;
            }}
            onChange={(_, newValue) => handleColorChange(newValue, field)}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;

              return (
                <li key={option.id} {...otherProps}>
                  {option.label}
                </li>
              );
            }}
            placeholder="Оберіть колір"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
    </Box>
  );
};

export default ColorAutocomplete;
