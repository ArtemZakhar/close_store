'use client';

import { routePaths } from '@/constants/routePaths';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, useForm } from 'react-hook-form';

import Link from 'next/link';

import LoadingButton from '@/components/common/buttons/LoadingButton';

import { useForgotPassword } from '@/hooks/api/useAuth';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { validation } from '../formValidation';
import { styles } from './ForgotPassword.styles';

type FormType = {
  email: string;
};

const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>();

  const { mutate, isError, isPending, isSuccess, error } = useForgotPassword();

  const onSubmit = (data: FormType) => {
    mutate(data.email);
  };

  useShowFetchResultMessage({
    isError,
    isSuccess,
    error,
    customMessage: 'Перевірте вашу пошту.',
  });

  return (
    <Box component="section" sx={styles.container}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h4">Відновлення паролю.</Typography>
          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={validation.email}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Зазначте електронну пошту"
                  error={!!errors.email}
                  value={field.value}
                  fullWidth
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
          </Box>
        </Box>

        <LoadingButton isLoading={isPending} label="Відновити пароль" />

        <Box sx={styles.buttonWrapper}>
          <Typography variant="body1">Повернутись назад</Typography>
          <Link href={`${routePaths.login}`}>
            <Button variant="text" sx={{ padding: 0, minWidth: 0 }}>
              <Typography
                variant="body1"
                color="primary"
                sx={{ lineHeight: 1.75 }}
              >
                Login
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
