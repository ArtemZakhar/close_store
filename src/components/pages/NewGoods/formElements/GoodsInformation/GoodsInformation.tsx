import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../NewGoods';
import FirmCountry from './FirmCountry';
import GoodFirm from './GoodFirm';
import GoodsDescription from './GoodsDescription';
import GoodsDetails from './GoodsDetails';
import { styles } from './GoodsInformation.styles';
import InputTypeNumber from './InputTypeNumber';
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

        <GoodsDescription form={form} />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <ModelName form={form} />
      </Box>

      <GoodsDetails form={form} />

      <Box sx={styles.sectionWrapper}>
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
      </Box>
    </Box>
  );
};

export default GoodsInformation;
