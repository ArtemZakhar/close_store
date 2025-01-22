import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../../NewGoods';
import SellerCity from './SellerCity';
import SellerCountryInput from './SellerCountryInput';
import SellerEmailInput from './SellerEmailInput';
import { styles } from './SellerInformation.styles';
import SellerNameAutocomplete from './SellerNameAutocomplete';
import SellerPhoneInput from './SellerPhoneInput';

const SellerInformation = ({
  form,
  fetchCountriesData,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Typography variant="h3">Інфорація про продавця</Typography>

      <SellerNameAutocomplete form={form} />

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
