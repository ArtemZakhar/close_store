import { seasonList } from '@/helpers/seasonList';
import { PopulatedGoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Accordion from '@/components/common/accordion/Accordion';
import AccordionDetails from '@/components/common/accordion/AccordionDetails';
import AccordionSummary from '@/components/common/accordion/AccordionSummary';

import ColorSizeCountItem from './ColorSizeCountItem';
import { styles } from './GoodsDetailsInformation.styles';

const GoodsDetailsInformation = ({
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
      expanded={expanded === 'goodsInfo'}
      onChange={handleChange('goodsInfo')}
    >
      <AccordionSummary>
        <Typography variant="h4">Інформація по товару</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex">
          <Typography sx={styles.label}>Код</Typography>
          <Typography>{goodsItem.code}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Код продавця</Typography>
          <Typography>{goodsItem.sellerCode}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Категорія</Typography>
          <Typography>{goodsItem.category.name}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Підкатегорії</Typography>
          <Typography>{goodsItem.subCategory.join(', ')}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Виробник</Typography>
          <Typography>{goodsItem.firm.name}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Країна походження</Typography>
          <Typography>{goodsItem.firm.countryOfOrigin.name}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Модель</Typography>
          <Typography>{goodsItem.model}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Опис</Typography>
          <Typography>{goodsItem.description}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Сезон</Typography>
          <Typography>
            {
              seasonList.find((season) => season.name === goodsItem.season)
                ?.label
            }
          </Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Нотатки</Typography>
          <Typography>{goodsItem.notes}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Де зберігається</Typography>
          <Typography>{goodsItem.stored}</Typography>
        </Box>

        <Box display="flex">
          <Typography sx={styles.label}>Наявність</Typography>
          <>
            {Object.entries(goodsItem.goodsDetails).map(([key, value]) => {
              return <ColorSizeCountItem key={key} value={value} />;
            })}
          </>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default GoodsDetailsInformation;
