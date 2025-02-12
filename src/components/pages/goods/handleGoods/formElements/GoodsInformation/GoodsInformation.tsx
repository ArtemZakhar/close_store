import { GoodsType } from '@/types/goods/good';
import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import ArrivalDate from './ArrivalDate';
import BuyDate from './BuyDate';
import GoodFirm from './GoodFirm';
import GoodsDescription from './GoodsDescription';
import GoodsDetails from './GoodsDetails';
import { styles } from './GoodsInformation.styles';
import GoodsNotes from './GoodsNotes';
import GoodsSeasonAutocomplete from './GoodsSeasonAutocomplete';
import ModelName from './ModelName';

const GoodsInformation = ({
  fetchCountriesData,
  selectedGoods,
  isEditing,
}: {
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedGoods?: GoodsType | null | undefined;
  isEditing?: boolean;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Typography variant="h3">Інфорація про товар</Typography>

      <Box sx={styles.sectionWrapper}>
        <GoodFirm
          fetchCountriesData={fetchCountriesData}
          selectedFirm={selectedGoods?.firm}
        />

        <GoodsDescription />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <ModelName />
      </Box>

      <GoodsDetails selectedGoods={selectedGoods} isEditing={isEditing} />

      <Box sx={styles.sectionWrapper}>
        <GoodsSeasonAutocomplete selectedGoods={selectedGoods} />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <BuyDate />

        <ArrivalDate />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <Box width="15rem">
          <Typography marginBottom="1rem" variant="h4">
            Нотатки
          </Typography>

          <GoodsNotes name="notes" rows={5} />
        </Box>

        <Box width="15rem">
          <Typography marginBottom="1rem" variant="h4">
            Де зберігається
          </Typography>

          <GoodsNotes name="stored" />
        </Box>
      </Box>
    </Box>
  );
};

export default GoodsInformation;
