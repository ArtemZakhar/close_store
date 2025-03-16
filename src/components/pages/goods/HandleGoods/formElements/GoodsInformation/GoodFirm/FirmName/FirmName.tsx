import { FirmType } from '@/types/goods/firm';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { FormType } from '../../../../HandleGoods';
import { validations } from '../../../formValidations';
import { styles } from './FirmName.styles';

const FirmName = ({
  firmDataRequest,
  selectedFirm,
}: {
  firmDataRequest: UseQueryResult<FirmType[], Error>;
  selectedFirm?: FirmType;
}) => {
  const { data: firmsData, isLoading, isError } = firmDataRequest;

  const {
    control,
    formState: { errors },
    setValue,
    resetField,
    getValues,
  } = useFormContext<FormType>();

  useEffect(() => {
    if (selectedFirm && firmsData) {
      const existingData = getValues('goods.firm');

      if (existingData) {
        resetField('goods.firm', {
          defaultValue: {
            ...selectedFirm,
            countryOfOrigin: existingData.countryOfOrigin,
          },
        });
      } else {
        resetField('goods.firm', {
          defaultValue: selectedFirm,
        });
      }
    }
  }, [isLoading]);

  const isErrorMessage =
    errors.goods && errors.goods.firm && errors.goods.firm.name;

  const handleFirmChange = (
    field: ControllerRenderProps<FormType, 'goods.firm.name'>,
    newData: any,
  ) => {
    if (newData && typeof newData !== 'string') {
      field.onChange(newData.name);
      setValue('goods.firm._id', newData._id);
      setValue('goods.firm.countryOfOrigin', newData.countryOfOrigin);
    }
  };

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
            <AutocompleteStyled
              {...field}
              defaultValue={null}
              value={field.value ?? ''}
              options={firmsData || []}
              freeSolo
              onChange={(_, newData) => handleFirmChange(field, newData)}
              onInputChange={(event, newValue) => field.onChange(newValue)}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
              }
              loading={isLoading}
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
                    {`${option.name}, ${option.countryOfOrigin}`}
                  </li>
                );
              }}
              error={!!isErrorMessage}
              helperText={
                isErrorMessage ? errors.goods?.firm?.name?.message : ''
              }
              placeholder="Фірма"
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default FirmName;
