import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn, useFormContext } from 'react-hook-form';

import DateInputStyled from '@/components/common/FormComponentsStyled/DateInputStyled';

import { FormType } from '../../../HandleGoods';

const BuyDate = () => {
  const { control } = useFormContext<FormType>();

  return (
    <Box width="15rem">
      <Typography marginBottom="1rem" variant="h4">
        Дата придбання
      </Typography>

      <Controller
        control={control}
        name="goods.buyDate"
        defaultValue=""
        render={({ field }) => <DateInputStyled {...field} />}
      />
    </Box>
  );
};

export default BuyDate;
