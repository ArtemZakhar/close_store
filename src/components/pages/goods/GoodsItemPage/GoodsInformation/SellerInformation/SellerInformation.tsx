import { PopulatedGoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Accordion from '@/components/common/accordion/Accordion';
import AccordionDetails from '@/components/common/accordion/AccordionDetails';
import AccordionSummary from '@/components/common/accordion/AccordionSummary';

const SellerInformation = ({
  goodsItem,
  expanded,
  handleChange,
}: {
  goodsItem: PopulatedGoodsType;
  expanded: string | false;
  handleChange: (
    panel: string,
  ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
}) => {
  return (
    <Accordion
      expanded={expanded === 'sellerInfo'}
      onChange={handleChange('sellerInfo')}
    >
      <AccordionSummary>
        <Typography variant="h4">Інформація про продавця</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex">
          <Typography width="20rem">Продавець</Typography>
          <Typography>{goodsItem.seller.name}</Typography>
        </Box>

        <Box display="flex">
          <Typography width="20rem">Пошта продавця</Typography>
          <Typography>{goodsItem.seller.email}</Typography>
        </Box>

        <Box display="flex">
          <Typography width="20rem">Телефон продавця</Typography>
          <Typography>{goodsItem.seller.phone}</Typography>
        </Box>

        <Box display="flex">
          <Typography width="20rem">Країна продавця</Typography>
          <Typography>{goodsItem.seller.country.name}</Typography>
        </Box>

        <Box display="flex">
          <Typography width="20rem">Місто продавця</Typography>
          <Typography>{goodsItem.seller.city?.name}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SellerInformation;
