'use client';

import { routePaths } from '@/constants/routePaths';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, useForm } from 'react-hook-form';

import Link from 'next/link';

import LoadingButton from '@/components/common/LoadingButton';

import { styles } from './LoginForm.styles';

type FormType = {
  user: string;
  password: string;
};

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = () => {};

  return (
    <Box component="section" sx={styles.container}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h4">Користувач</Typography>
          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="user"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Зазначте електронну пошту користувача"
                  error={!!errors.user}
                  fullWidth
                  helperText={errors.user ? errors.user.message : ''}
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
              name="user"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Введіть пароль"
                  error={!!errors.user}
                  fullWidth
                  helperText={errors.user ? errors.user.message : ''}
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
