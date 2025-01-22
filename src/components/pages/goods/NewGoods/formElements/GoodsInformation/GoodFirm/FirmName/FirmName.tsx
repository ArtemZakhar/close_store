import { FirmType } from '@/types/goods/firm';
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
import { styles } from './FirmName.styles';

const FirmName = ({
  firmDataRequest,
  form,
}: {
  firmDataRequest: UseQueryResult<FirmType[], Error>;
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { data: firmsData, isLoading, isError } = firmDataRequest;

  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  const isErrorMessage =
    errors.goods && errors.goods.firm && errors.goods.firm.name;

  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Фірма
      </Typography>

      <Box width="15rem">
        <Controller
          name="goods.firm.name"
          control={control}
          rules={validations.goodsFirm.name}
          render={({ field }) => (
            <Autocomplete
              {...field}
              PaperComponent={CustomPaper}
              ListboxComponent={CustomList}
              popupIcon={
                <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
              }
              defaultValue={null}
              value={field.value ?? ''}
              options={firmsData || []}
              fullWidth
              freeSolo
              onChange={(_, newData) => {
                if (newData && typeof newData !== 'string') {
                  field.onChange(newData.name);
                  setValue('goods.firm._id', newData._id);
                  setValue(
                    'goods.firm.countryOfOrigin',
                    newData.countryOfOrigin,
                  );
                }
              }}
              onInputChange={(event, newValue) =>
                setValue('goods.firm.name', newValue)
              }
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
                    Не вдалось завантажити фірму
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
                    isErrorMessage ? errors.goods?.firm?.name?.message : ''
                  }
                  placeholder="Фірма"
                />
              )}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default FirmName;
