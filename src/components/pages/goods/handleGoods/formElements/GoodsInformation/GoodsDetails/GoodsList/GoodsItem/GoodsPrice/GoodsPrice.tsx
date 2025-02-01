import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../../../../../HandleGoods';
import InputTypeNumber from '../InputTypeNumber';

const GoodsPrice = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  return (
    <>
      <Box>
        <Typography marginBottom="1rem" variant="h4">
          Вартість в доларах (вхідна)
        </Typography>

        <InputTypeNumber form={form} name="incomePriceUSD" />
      </Box>

      <Box>
        <Typography marginBottom="1rem" variant="h4">
          Вартість в гривні (вхідна)
        </Typography>

        <InputTypeNumber form={form} name="incomePriceGRN" />
      </Box>

      <Box>
        <Typography marginBottom="1rem" variant="h4">
          Вартість в гривні (вихідна)
        </Typography>

        <InputTypeNumber form={form} name="outcomePrice" />
      </Box>
    </>
  );
};

export default GoodsPrice;
