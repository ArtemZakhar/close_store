'use client';

import { finishRegistration } from '@/app/api/userService';
import { routePaths } from '@/constants/routePaths';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import LoadingButton from '@/components/common/LoadingButton';

import { validation } from '../formValidation';
import { styles } from './FinishRegistration.styles';

type FormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const FinishRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const params = useSearchParams();
  const router = useRouter();

  const token = params.get('token');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword((prev) => !prev);
  };

  const onSubmit = async (form: FormInputs) => {
    await finishRegistration({
      password: form.password,
      token: token as string,
    });

    router.push(routePaths.root);
  };

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

        <LoadingButton isLoading={false} label="Завершити реєстрацію" />
      </Box>
    </Box>
  );
};

export default FinishRegistration;
