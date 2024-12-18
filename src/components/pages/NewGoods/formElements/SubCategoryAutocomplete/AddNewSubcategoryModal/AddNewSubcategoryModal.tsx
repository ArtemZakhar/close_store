import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, useForm } from 'react-hook-form';

import LoadingButton from '@/components/common/LoadingButton';

import { validations } from '../../../formValidations';
import { styles } from './AddNewSubcategoryModal.styles';

const AddNewSubcategoryModal = ({
  openModal,
  handleClose,
  isPending,
  confirmFunction,
}: {
  openModal: boolean;
  handleClose: () => void;
  isPending: boolean;
  confirmFunction: (data: string) => void;
}) => {
  const theme = useTheme();
  const form = useForm<{ subCategory: string }>();

  const onSubmit = (data: { subCategory: string }) => {
    confirmFunction(data.subCategory);
  };

  return (
    <Modal open={openModal} onClose={handleClose} disableRestoreFocus>
      <Fade in={openModal} timeout={theme.transitions.duration.standard}>
        <Box>
          <Button
            sx={styles.modalCloseButton}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon sx={{ color: 'common.black' }} />
          </Button>

          <Typography
            variant="h2"
            component="h4"
            align="center"
            sx={styles.modalTitle}
          >
            Створити нову підкатегорію
          </Typography>

          <Box onSubmit={form.handleSubmit(onSubmit)} component="form">
            <Box sx={styles.inputWrapper}>
              <Typography marginBottom="1rem" variant="h4">
                Назва
              </Typography>

              <Controller
                control={form.control}
                name="subCategory"
                defaultValue=""
                rules={validations.subCategory}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    value={field.value}
                    placeholder="Введіть назву категорії"
                    error={!!form.formState.errors.subCategory}
                    helperText={
                      form.formState.errors.subCategory
                        ? form.formState.errors.subCategory.message
                        : ''
                    }
                  />
                )}
              />
            </Box>

            <Box sx={styles.buttonWrapper}>
              <Button
                sx={styles.buttonBack}
                onClick={handleClose}
                variant="outlined"
              >
                Назад
              </Button>

              <Box sx={{ width: '50%' }}>
                <LoadingButton label="Підтвердити" isLoading={isPending} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddNewSubcategoryModal;
