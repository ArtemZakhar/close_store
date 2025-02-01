import { GoodsType } from '@/types/goods/good';
import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../HandleGoods';
import BuyDate from './BuyDate';
import GoodFirm from './GoodFirm';
import GoodsDescription from './GoodsDescription';
import GoodsDetails from './GoodsDetails';
import GoodsPrice from './GoodsDetails/GoodsList/GoodsItem/GoodsPrice';
import { styles } from './GoodsInformation.styles';
import GoodsNotes from './GoodsNotes';
import GoodsSeasonAutocomplete from './GoodsSeasonAutocomplete';
import ModelName from './ModelName';

const GoodsInformation = ({
  form,
  fetchCountriesData,
  selectedGoods,
  isEditing,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedGoods?: GoodsType | null | undefined;
  isEditing?: boolean;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Typography variant="h3">Інфорація про товар</Typography>

      <Box sx={styles.sectionWrapper}>
        <GoodFirm
          form={form}
          fetchCountriesData={fetchCountriesData}
          selectedFirm={selectedGoods?.firm._id}
        />

        <GoodsDescription form={form} />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <ModelName form={form} />
      </Box>

      <GoodsDetails
        form={form}
        selectedGoods={selectedGoods}
        isEditing={isEditing}
      />

      <Box sx={styles.sectionWrapper}>
        <GoodsSeasonAutocomplete form={form} />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <BuyDate form={form} />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <Box width="15rem">
          <Typography marginBottom="1rem" variant="h4">
            Нотатки
          </Typography>

          <GoodsNotes form={form} name="notes" rows={5} />
        </Box>

        <Box width="15rem">
          <Typography marginBottom="1rem" variant="h4">
            Де зберігається
          </Typography>

          <GoodsNotes form={form} name="stored" />
        </Box>
      </Box>
    </Box>
  );
};

export default GoodsInformation;
