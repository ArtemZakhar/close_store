import { CountryType } from '@/types/location/location';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';

import { FormType } from '../../../NewGoods';
import { validations } from '../../../formValidations';
import { styles } from './SellerCountryInput.styles';

const SellerCountryInput = ({
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
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Країна
      </Typography>

      <Box width="15rem">
        <Controller
          name="seller.city"
          control={control}
          rules={validations.sellerCountry}
          defaultValue=""
          render={({ field }) => (
            <Autocomplete
              {...field}
              PaperComponent={CustomPaper}
              ListboxComponent={CustomList}
              popupIcon={
                <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
              }
              value={field.value || ''}
              options={countriesData || []}
              fullWidth
              freeSolo
              onChange={(_, newData) => field.onChange(newData)}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              onClose={(e) => {
                e.stopPropagation();
                document.activeElement &&
                  (document.activeElement as HTMLElement).blur();
              }}
              loading={isFetchingCountriesLoading}
              loadingText={
                <Box paddingBlock="1rem" display="flex" justifyContent="center">
                  <CircularProgress size="2rem" />
                </Box>
              }
              noOptionsText={
                isFetchingCountriesError && (
                  <Box padding="1rem" component="p">
                    Не вдалось завантажити країни
                  </Box>
                )
              }
              renderOption={(props, option) => {
                const { key, ...otherProps } = props;

                return (
                  <li key={option._id} {...otherProps}>
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!(errors.seller && errors.seller.country)}
                  helperText={
                    errors.seller &&
                    errors.seller.country &&
                    typeof errors.seller.country.message === 'string'
                      ? errors.seller.country.message
                      : ''
                  }
                  placeholder="Зазначте країну"
                />
              )}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerCountryInput;
