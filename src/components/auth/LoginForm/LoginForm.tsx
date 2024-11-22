'use client';

import { login } from '@/app/api/authService';
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
import { useRouter } from 'next/navigation';

import LoadingButton from '@/components/common/LoadingButton';

import { styles } from './LoginForm.styles';

type FormType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    await login({
      email: data.email,
      password: data.password,
    });

    router.push(routePaths.users);
  };

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

        <LoadingButton isLoading={false} label="Увійти" />

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
