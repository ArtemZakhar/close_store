import { CityType, CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../HandleGoods';
import SellerCity from './SellerCity';
import SellerCountryInput from './SellerCountryInput';
import SellerEmailInput from './SellerEmailInput';
import { styles } from './SellerInformation.styles';
import SellerNameAutocomplete from './SellerNameAutocomplete';
import SellerPhoneInput from './SellerPhoneInput';

const SellerInformation = ({
  form,
  fetchCountriesData,
  selectedSeller,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedSeller?: string;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Typography variant="h3">Інфорація про продавця</Typography>

      <SellerNameAutocomplete form={form} selectedSeller={selectedSeller} />

      <Box sx={styles.sectionWrapper}>
        <SellerPhoneInput form={form} />

        <SellerEmailInput form={form} />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <SellerCity form={form} />

        <SellerCountryInput
          form={form}
          fetchCountriesData={fetchCountriesData}
        />
      </Box>
    </Box>
  );
};

export default SellerInformation;
