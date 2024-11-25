'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import LoadingButton from '@/components/common/LoadingButton';

import { useNewPassword } from '@/hooks/api/useAuth';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { validation } from '../formValidation';
import { styles } from './NewPassword.styles';

type FormInputs = {
  password: string;
  repeatPassword: string;
};

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const params = useSearchParams();

  const {
    mutate: updatePassword,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useNewPassword();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  useShowFetchResultMessage({
    isError,
    isSuccess,
    error,
  });

  const token = params.get('token');

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword((prev) => !prev);
  };

  const onSubmit = async (form: FormInputs) =>
    updatePassword({ password: form.password, token: token as string });

  return (
    <Box component="section" sx={styles.container}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h4">Пароль</Typography>
          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              rules={validation.password}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Зазначте пароль"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  value={field.value}
                  fullWidth
                  helperText={errors.password ? errors.password.message : ''}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h4">Повторно пароль</Typography>
          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="repeatPassword"
              defaultValue=""
              rules={validation.repeatPassword}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Зазначте пароль повторно"
                  type={showRepeatPassword ? 'text' : 'password'}
                  error={!!errors.repeatPassword}
                  fullWidth
                  value={field.value}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowRepeatPassword}
                          >
                            {showRepeatPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  helperText={
                    errors.repeatPassword ? errors.repeatPassword.message : ''
                  }
                />
              )}
            />
          </Box>
        </Box>

        <LoadingButton isLoading={isLoading} label="Змінити пароль" />
      </Box>
    </Box>
  );
};

export default NewPassword;
