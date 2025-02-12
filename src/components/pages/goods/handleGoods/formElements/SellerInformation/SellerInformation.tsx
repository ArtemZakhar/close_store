import { SellerType } from '@/types/goods/seller';
import { CountryType } from '@/types/location/location';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import SellerCity from './SellerCity';
import SellerCountryInput from './SellerCountryInput';
import SellerEmailInput from './SellerEmailInput';
import { styles } from './SellerInformation.styles';
import SellerNameAutocomplete from './SellerNameAutocomplete';
import SellerPhoneInput from './SellerPhoneInput';

const SellerInformation = ({
  fetchCountriesData,
  selectedSeller,
}: {
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
  selectedSeller?: SellerType | undefined;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Typography variant="h3">Інфорація про продавця</Typography>

      <SellerNameAutocomplete selectedSeller={selectedSeller?._id} />

      <Box sx={styles.sectionWrapper}>
        <SellerPhoneInput />

        <SellerEmailInput />
      </Box>

      <Box sx={styles.sectionWrapper}>
        <SellerCity selectedSeller={selectedSeller} />

        <SellerCountryInput
          fetchCountriesData={fetchCountriesData}
          selectedSeller={selectedSeller}
        />
      </Box>
    </Box>
  );
};

export default SellerInformation;
