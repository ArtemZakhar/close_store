import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';

import { useGetAllSellers } from '@/hooks/api/useSellers';

import { FormType } from '../../../NewGoods';
import { validations } from '../../../formValidations';
import { styles } from './SellerNameAutocomplete.styles';

const SellerNameAutocomplete = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { data: sellerData, isError, isLoading } = useGetAllSellers();

  const {
    control,
    formState: { errors },
  } = form;
  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Назва продавця
      </Typography>

      <Box width="15rem">
        <Controller
          name="seller"
          control={control}
          defaultValue={null}
          rules={validations.sellerName}
          render={({ field }) => (
            <Autocomplete
              {...field}
              PaperComponent={CustomPaper}
              ListboxComponent={CustomList}
              popupIcon={
                <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
              }
              value={field.value || null}
              options={sellerData || []}
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
              loading={isLoading}
              loadingText={
                <Box paddingBlock="1rem" display="flex" justifyContent="center">
                  <CircularProgress size="2rem" />
                </Box>
              }
              noOptionsText={
                isError && (
                  <Box padding="1rem" component="p">
                    Не вдалось завантажити продавців
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
                  error={!!errors.seller}
                  helperText={
                    errors.seller && typeof errors.seller.message === 'string'
                      ? errors.seller.message
                      : ''
                  }
                  placeholder="Оберіть продавця"
                />
              )}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SellerNameAutocomplete;
