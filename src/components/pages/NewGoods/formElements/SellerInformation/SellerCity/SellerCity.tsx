import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';

import { useGetAllCities } from '@/hooks/api/useLocation';

import { FormType } from '../../../NewGoods';
import { styles } from './SellerCity.styles';

const SellerCity = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { data: citiesData, isError, isLoading } = useGetAllCities();

  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Місто
      </Typography>

      <Box width="15rem">
        <Controller
          name="seller.city"
          control={control}
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
              options={citiesData || []}
              fullWidth
              freeSolo
              onChange={(_, newData) => field.onChange(newData)}
              onInputChange={(event, newInputValue) => {
                setValue('seller.city', newInputValue);
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
                    Не вдалось завантажити міста
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
                  error={!!(errors.seller && errors.seller.city)}
                  helperText={
                    errors.seller &&
                    errors.seller.city &&
                    typeof errors.seller.city.message === 'string'
                      ? errors.seller.city.message
                      : ''
                  }
                  placeholder="Зазначте місто"
                />
              )}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerCity;
