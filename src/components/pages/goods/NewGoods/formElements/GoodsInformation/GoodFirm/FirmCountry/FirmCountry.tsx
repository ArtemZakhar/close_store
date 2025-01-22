import { CountryType } from '@/types/location/location';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/StyledAutocomplete/CustomList';
import CustomPaper from '@/components/common/StyledAutocomplete/CustomPaper';

import { FormType } from '../../../../NewGoods';
import { validations } from '../../../../formValidations';
import { styles } from './FirmCountry.styles';

const FirmCountry = ({
  form,
  fetchCountriesData,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  fetchCountriesData: UseQueryResult<CountryType[], Error>;
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  const { data: countriesData, isError, isLoading } = fetchCountriesData;

  const isErrorMessage =
    errors.goods && errors.goods.firm && errors.goods.firm.countryOfOrigin;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Країна
      </Typography>

      <Box width="15rem">
        <Controller
          name="goods.firm.countryOfOrigin"
          control={control}
          rules={validations.goodsFirm.countryOfOrigin}
          render={({ field }) => (
            <Autocomplete
              {...field}
              PaperComponent={CustomPaper}
              ListboxComponent={CustomList}
              popupIcon={
                <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
              }
              value={field.value ?? ''}
              options={countriesData || []}
              fullWidth
              freeSolo
              onChange={(_, newData) =>
                typeof newData === 'string' &&
                setValue('goods.firm.countryOfOrigin', newData)
              }
              onInputChange={(event, newInputValue) => {
                setValue('goods.firm.countryOfOrigin', newInputValue);
              }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              onClose={(e) => {
                e.stopPropagation();
                document.activeElement &&
                  (document.activeElement as HTMLElement).blur();
              }}
              loading={isLoading}
              loadingText={
                <Box paddingBlock="1rem" display="flex" justifyContent="center">
                  <CircularProgress size="2rem" />
                </Box>
              }
              noOptionsText={
                isError && (
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
                  error={!!isErrorMessage}
                  helperText={
                    isErrorMessage
                      ? errors?.goods?.firm?.countryOfOrigin?.message
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

export default FirmCountry;
