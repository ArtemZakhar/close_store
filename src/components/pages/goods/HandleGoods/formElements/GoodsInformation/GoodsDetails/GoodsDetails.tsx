import {
  GoodsDetails as GoodsDetailsType,
  GoodsQuantityAndCount,
  GoodsType,
} from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormType } from '../../../HandleGoods';
import { styles } from './GoodsDetails.styles';
import GoodsList from './GoodsList';
import SizesOptionAutocomplete from './SizesOptionAutocomplete';
import { SizesAndCountDataType, sizesData } from './sizesData';

export const NEW_PROPERTY_IN_GOODS_OBJECT = 'new';

const GoodsDetails = ({
  selectedGoods,
  isEditing,
}: {
  selectedGoods?: GoodsType | null | undefined;
  isEditing?: boolean;
}) => {
  const sizeAndTypeInitialState = selectedGoods
    ? sizesData.find((item) => item.label === selectedGoods.sizeType) ||
      sizesData[0]
    : sizesData[0];

  const [sizeType, setSizeType] = useState<SizesAndCountDataType>(
    sizeAndTypeInitialState,
  );

  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext<FormType>();

  useEffect(() => {
    if (isEditing) {
      if (!selectedGoods) return;

      const newSizeState = sizesData.find(
        (item) => item.label === selectedGoods.sizeType,
      );

      if (newSizeState) {
        setSizeType(newSizeState);

        const newGoodsDetailsValue: GoodsDetailsType = {};

        for (const color in selectedGoods.goodsDetails) {
          const value = selectedGoods.goodsDetails[color];
          const newCountAndSizes: GoodsQuantityAndCount[] =
            newSizeState.sizesAndCount.map((size) => {
              const countValue = value.countAndSizes.find(
                (item) => item.size === size.size,
              );

              if (countValue) {
                return countValue;
              }

              return size;
            });

          newGoodsDetailsValue[color] = {
            color: value.color,
            incomePriceGRN: value.incomePriceGRN,
            outcomePrice: value.outcomePrice,
            incomePriceUSD: value.incomePriceUSD,
            countAndSizes: newCountAndSizes,
          };
        }

        setValue('goods.goodsDetails', newGoodsDetailsValue);
      }
    } else {
      setValue('goods.goodsDetails', {
        [NEW_PROPERTY_IN_GOODS_OBJECT]: {
          color: '',
          countAndSizes: sizeType.sizesAndCount,
        },
      });

      setValue('goods.sizeType', sizesData[0].label);
    }
  }, []);

  const handleSizesOptionChange = (newData: SizesAndCountDataType | null) => {
    if (!newData) {
      return;
    }

    const updatedSizeType = newData || sizesData[0];
    setSizeType(updatedSizeType);

    setValue('goods.sizeType', updatedSizeType.label);

    setValue(
      'goods.goodsDetails',
      {
        [NEW_PROPERTY_IN_GOODS_OBJECT]: {
          color: '',
          countAndSizes: newData.sizesAndCount || sizesData[0].sizesAndCount,
        },
      },
      {
        shouldDirty: true,
      },
    );
  };

  const isError = !!errors.goods && !!errors.goods.goodsDetails;

  return (
    <Box sx={(theme) => styles.container(theme.palette, isError)}>
      <Box>
        <Typography marginBottom="1rem" variant="h4" align="center">
          Деталі по товару
        </Typography>

        {!isEditing && (
          <Box width="25rem">
            <SizesOptionAutocomplete
              sizeType={sizeType}
              handleSizesOptionChange={handleSizesOptionChange}
            />
          </Box>
        )}
      </Box>

      <GoodsList sizeType={sizeType} />
    </Box>
  );
};

export default GoodsDetails;
