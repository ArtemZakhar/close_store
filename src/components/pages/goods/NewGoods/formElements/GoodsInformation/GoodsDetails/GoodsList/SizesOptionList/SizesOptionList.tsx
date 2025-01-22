import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ChangeEvent } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import { count } from 'console';

import { FormType } from '@/components/pages/goods/NewGoods/NewGoods';

import { SizesAndCountDataType, sizesData } from '../../sizesData';
import { styles } from './SizesOptionList.styles';

const SizesOptionList = ({
  form,
  sizeType,
  index,
  field,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  sizeType: SizesAndCountDataType;
  index: number;
  field: ControllerRenderProps<FormType, 'goods.goodsDetails'>;
}) => {
  const {
    getValues,
    formState: { errors },
  } = form;

  const handleQuantityChange = ({
    i,
    size,
    event,
  }: {
    i: number;
    size: string;
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  }) => {
    const value = Number(event.target.value ?? 0);
    const newValue = value < 0 ? 0 : value;
    const prevState = getValues('goods.goodsDetails');

    const newState = prevState.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          countAndSizes: item.countAndSizes.map((sizeItem, sizeIndex) =>
            sizeIndex === i ? { ...sizeItem, count: newValue } : sizeItem,
          ),
        };
      } else {
        return item;
      }
    });

    field.onChange(newState);
  };

  const increaseCount = ({ size, i }: { size: string; i: number }) => {
    const prevState = getValues('goods.goodsDetails');

    const newState = prevState.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          countAndSizes: item.countAndSizes.map((sizeItem, sizeIndex) =>
            sizeIndex === i
              ? { ...sizeItem, count: sizeItem.count + 1 }
              : sizeItem,
          ),
        };
      } else {
        return item;
      }
    });

    field.onChange(newState);
  };

  const decreaseCount = ({ size, i }: { size: string; i: number }) => {
    const prevState = getValues('goods.goodsDetails');

    const newState = prevState.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          countAndSizes: item.countAndSizes.map((sizeItem, sizeIndex) => {
            if (sizeIndex === i) {
              const newValue = sizeItem.count - 1;
              return {
                ...sizeItem,
                count: newValue < 0 ? 0 : newValue,
              };
            } else {
              return sizeItem;
            }
          }),
        };
      } else {
        return item;
      }
    });

    field.onChange(newState);
  };

  return (
    <FormGroup>
      <Box sx={styles.container}>
        {sizeType.sizesAndCount.map(({ size }, sizeIndex) => {
          return (
            <Box key={size} sx={styles.itemWrapper}>
              <Box sx={styles.sizeWrapper}>
                <Button onClick={() => decreaseCount({ i: sizeIndex, size })}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </Button>

                <Typography align="center">{size}</Typography>

                <Button onClick={() => increaseCount({ i: sizeIndex, size })}>
                  <ControlPointIcon fontSize="small" />
                </Button>
              </Box>

              <TextField
                type="number"
                sx={styles.input}
                value={
                  field.value &&
                  field.value[index].countAndSizes[sizeIndex].count !== 0
                    ? String(field.value[index].countAndSizes[sizeIndex].count)
                    : ''
                }
                onChange={(event) =>
                  handleQuantityChange({ event, size, i: sizeIndex })
                }
                placeholder="0"
              />
            </Box>
          );
        })}
      </Box>
    </FormGroup>
  );
};

export default SizesOptionList;
