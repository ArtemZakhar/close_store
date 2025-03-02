'use client';

import { responseMessages } from '@/app/api/constants/responseMessages';
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

import LoadingButton from '@/components/common/buttons/LoadingButton';

import { useLogin } from '@/hooks/api/useAuth';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { validation } from '../formValidation';
import { styles } from './LoginForm.styles';

type FormType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isError, isPending, isSuccess, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  useShowFetchResultMessage({
    isError,
    isSuccess,
    closeFunction: () => {},
    error,
    customErrorMessage: [
      {
        errorType: responseMessages.user.noUser,
        message: 'Перевірте правильність електронної пошти',
      },
      {
        errorType: responseMessages.user.wrongPassword,
        message: 'Не правильний пароль',
      },
    ],
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box component="section" sx={styles.container}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h4">Користувач</Typography>
          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={validation.email}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Зазначте електронну пошту користувача"
                  error={!!errors.email}
                  value={field.value}
                  fullWidth
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h4">Пароль</Typography>
          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="password"
              rules={validation.password}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Введіть пароль"
                  error={!!errors.password}
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={field.value}
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

        <LoadingButton isLoading={isPending} label="Увійти" />

        <Box sx={styles.buttonWrapper}>
          <Typography variant="body1">Забули пароль?</Typography>
          <Link href={`${routePaths.forgotPassword}`}>
            <Button variant="text" sx={{ padding: 0, minWidth: 0 }}>
              <Typography
                variant="body1"
                color="primary"
                sx={{ lineHeight: 1.75 }}
              >
                Відновити
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
