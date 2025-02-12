import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';

import { FormType } from '@/components/pages/goods/HandleGoods/HandleGoods';

import { validations } from '../../../../formValidations';
import { SizesAndCountDataType } from '../../sizesData';
import { styles } from './SizesOptionList.styles';

const SizesOptionList = ({
  sizeType,
  id,
}: {
  sizeType: SizesAndCountDataType;
  id: string;
}) => {
  const {
    getValues,
    formState: { errors },
    setValue,
    control,
  } = useFormContext<FormType>();

  const handleQuantityChange = ({
    input,
    sizeIndex,
    field,
  }: {
    input: string;
    sizeIndex: number;
    field: ControllerRenderProps<
      FormType,
      `goods.goodsDetails.${string}.countAndSizes`
    >;
  }) => {
    const value = Number(input ?? 0);
    const normalizedValue = value < 0 ? 0 : value;
    const prevState = getValues(`goods.goodsDetails.${id}.countAndSizes`);

    const newState = prevState.map((item, index) =>
      sizeIndex === index ? { ...item, count: normalizedValue } : item,
    );

    field.onChange(newState);
  };

  const increaseCount = (index: number) => {
    const prevState = getValues(`goods.goodsDetails.${id}.countAndSizes`);

    const newState = prevState.map((sizeItem, sizeIndex) =>
      sizeIndex === index
        ? { ...sizeItem, count: sizeItem.count + 1 }
        : sizeItem,
    );

    setValue(`goods.goodsDetails.${id}.countAndSizes`, newState, {
      shouldDirty: true,
    });
  };

  const decreaseCount = (index: number) => {
    const prevState = getValues(`goods.goodsDetails.${id}.countAndSizes`);

    const newState = prevState.map((sizeItem, sizeIndex) => {
      if (sizeIndex === index) {
        const newValue = sizeItem.count - 1;
        return {
          ...sizeItem,
          count: newValue < 0 ? 0 : newValue,
        };
      } else {
        return sizeItem;
      }
    });

    setValue(`goods.goodsDetails.${id}.countAndSizes`, newState, {
      shouldDirty: true,
    });
  };

  const error =
    errors.goods &&
    errors.goods.goodsDetails &&
    errors.goods.goodsDetails[id] &&
    errors.goods.goodsDetails[id].countAndSizes;

  return (
    <Controller
      control={control}
      name={`goods.goodsDetails.${id}.countAndSizes`}
      rules={validations.sizeAndCounts}
      render={({ field }) => (
        <FormGroup>
          <Box sx={styles.container}>
            {sizeType.sizesAndCount.map(({ size }, sizeIndex) => {
              return (
                <Box key={size} sx={styles.itemWrapper}>
                  <Box sx={styles.sizeWrapper}>
                    <Button onClick={() => decreaseCount(sizeIndex)}>
                      <RemoveCircleOutlineIcon fontSize="small" />
                    </Button>

                    <Typography align="center">{size}</Typography>

                    <Button onClick={() => increaseCount(sizeIndex)}>
                      <ControlPointIcon fontSize="small" />
                    </Button>
                  </Box>

                  <TextField
                    {...field}
                    sx={styles.input}
                    value={field.value[sizeIndex].count}
                    onChange={(event) =>
                      handleQuantityChange({
                        input: event.target.value.replace(
                          /[^\d.]+|(?<=\..*)\./g,
                          '',
                        ),
                        sizeIndex,
                        field,
                      })
                    }
                    error={!!error}
                    placeholder="0"
                  />
                </Box>
              );
            })}
          </Box>
          <Typography align="center" variant="caption" color="error">
            {error ? error.message : ''}
          </Typography>
        </FormGroup>
      )}
    />
  );
};

export default SizesOptionList;
