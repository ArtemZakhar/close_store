import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';

import { useGetAllFirms } from '@/hooks/api/useGoods';

import { FormType } from '../../../NewGoods';
import { validations } from '../../../formValidations';
import { styles } from './GoodFirm.styles';

const GoodFirm = ({
  form,
}: {
  form: UseFormReturn<FormType, any, undefined>;
}) => {
  const { data: firmsData, isLoading, isError } = useGetAllFirms();

  const {
    control,
    formState: { errors },
  } = form;
  return (
    <Box sx={styles.blockWrapper}>
      <Typography marginBottom="1rem" variant="h4">
        Фірма
      </Typography>

      <Box width="15rem">
        <Controller
          name="goods.firm"
          control={control}
          defaultValue=""
          rules={validations.goodsFirm}
          render={({ field }) => (
            <Autocomplete
              {...field}
              PaperComponent={CustomPaper}
              ListboxComponent={CustomList}
              popupIcon={
                <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
              }
              value={field.value}
              options={firmsData || []}
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
                  error={!!(errors.goods && errors.goods.firm)}
                  helperText={
                    errors.goods &&
                    errors.goods.firm &&
                    typeof errors.goods.firm.message === 'string'
                      ? errors.goods?.firm.message
                      : ''
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

export default GoodFirm;
