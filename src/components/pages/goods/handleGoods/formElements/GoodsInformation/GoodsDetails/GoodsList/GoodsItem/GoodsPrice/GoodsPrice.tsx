import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InputTypeNumber from '../InputTypeNumber';

const GoodsPrice = ({ id }: { id: string }) => {
  return (
    <>
      <Box>
        <Typography marginBottom="1rem" variant="h4">
          Вартість в доларах (вхідна)
        </Typography>

        <InputTypeNumber id={id} name="incomePriceUSD" />
      </Box>

      <Box>
        <Typography marginBottom="1rem" variant="h4">
          Вартість в гривні (вхідна)
        </Typography>

        <InputTypeNumber id={id} name="incomePriceGRN" />
      </Box>

      <Box>
        <Typography marginBottom="1rem" variant="h4">
          Вартість в гривні (вихідна)
        </Typography>

        <InputTypeNumber id={id} name="outcomePrice" />
      </Box>
    </>
  );
};

export default GoodsPrice;
