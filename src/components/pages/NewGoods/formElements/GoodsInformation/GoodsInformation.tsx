import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../NewGoods';
import FirmCountry from './FirmCountry';
import GoodFirm from './GoodFirm';
import { styles } from './GoodsInformation.styles';
import ModelName from './ModelName';

const GoodsInformation = ({
  form,
  countriesData,
  isFetchingCountriesError,
  isFetchingCountriesLoading,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  countriesData: CountryType[] | undefined;
  isFetchingCountriesError: boolean;
  isFetchingCountriesLoading: boolean;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Typography variant="h3">Інфорація про товар</Typography>

      <Box sx={styles.sectionWrapper}>
        <GoodFirm form={form} />

        <FirmCountry
          form={form}
          countriesData={countriesData}
          isFetchingCountriesError={isFetchingCountriesError}
          isFetchingCountriesLoading={isFetchingCountriesLoading}
        />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <ModelName form={form} />
      </Box>
    </Box>
  );
};

export default GoodsInformation;
