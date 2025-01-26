import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../NewGoods/NewGoods';
import { styles } from './GoodsDetails.styles';
import GoodsList from './GoodsList';
import SizesOptionAutocomplete from './SizesOptionAutocomplete';
import { SizesAndCountDataType, sizesData } from './sizesData';

const GoodsDetails = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const [sizeType, setSizeType] = useState<SizesAndCountDataType>(sizesData[0]);

  const {
    setValue,
    getValues,
    formState: { errors },
  } = form;

  useEffect(() => {
    const prevState = getValues('goods.goodsDetails');

    if (!prevState) {
      setValue('goods.goodsDetails', [
        { color: '', countAndSizes: sizeType.sizesAndCount },
      ]);
    }
  }, []);

  const handleSizesOptionChange = (newData: SizesAndCountDataType | null) => {
    if (!newData) {
      return;
    }

    const prevState = getValues('goods.goodsDetails');

    const newState = prevState.map((item) => ({
      ...item,
      countAndSizes: newData.sizesAndCount,
    }));

    setSizeType(newData || sizesData[0]);
    setValue('goods.goodsDetails', newState);
  };

  const isError = !!errors.goods && !!errors.goods.goodsDetails;

  return (
    <Box sx={(theme) => styles.container(theme.palette, isError)}>
      <Box>
        <Typography marginBottom="1rem" variant="h4" align="center">
          Деталі по товару
        </Typography>

        <Box width="25rem">
          <SizesOptionAutocomplete
            sizeType={sizeType}
            handleSizesOptionChange={handleSizesOptionChange}
          />
        </Box>
      </Box>

      <GoodsList form={form} sizeType={sizeType} />

      <Box height="1.25rem">
        {isError && (
          <Typography variant="caption" color="error" margin="0.5rem 0 0 1rem">
            {errors.goods?.goodsDetails?.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default GoodsDetails;
