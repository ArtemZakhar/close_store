'use client';

import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, useForm } from 'react-hook-form';

import { useCreateNewUser } from '@/hooks/api/useUsers';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import LoadingButton from '../LoadingButton';
import { styles } from './NewUserForm.styles';
import { validation } from './formValidation';

type FormType = {
  name: string;
  email: string;
};

const NewUserForm = ({
  handleClose,
  type,
}: {
  handleClose: () => void;
  type: UserRole;
}) => {
  const {
    isError,
    isPending,
    isSuccess,
    mutate: createNewUser,
  } = useCreateNewUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  useShowFetchResultMessage({
    closeFunction: handleClose,
    isError,
    isSuccess,
  });

  const onSubmit = async (formData: FormType) => {
    createNewUser({
      user: { name: formData.name, email: formData.email, role: type },
    });
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ marginTop: '3rem' }}
      >
        <Box>
          <Typography variant="h4">Ім&apos;я</Typography>

          <Box sx={styles.inputWrapper}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={validation.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Зазначте ім'я"
                  error={!!errors.name}
                  value={field.value}
                  fullWidth
                  helperText={errors.name ? errors.name.message : ''}
                />
              )}
            />
          </Box>
        </Box>

        <Box marginTop="1rem">
          <Typography variant="h4">Електронна пошта</Typography>

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

        <Box marginTop="1rem">
          <LoadingButton isLoading={isPending} label="Запросити" />
        </Box>
      </Box>
    </>
  );
};

export default NewUserForm;
