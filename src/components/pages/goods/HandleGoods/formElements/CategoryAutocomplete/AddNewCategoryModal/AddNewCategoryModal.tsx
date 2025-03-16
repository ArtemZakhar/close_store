import { getIcon } from '@/helpers/getIcon';
import { CategoryType } from '@/types/goods/category';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@/components/common/buttons/LoadingButton';

import { styles } from './AddNewCategoryModal.styles';
import CategoryLabel from './formElements/CategoryLabel';
import CategoryNameInput from './formElements/CategoryNameInput';
import IconSelect from './formElements/IconSelect';
import UniqueIdInput from './formElements/UniqueIdInput';

export type NewCategoryFormType = {
  name: string;
  url: string;
  uniqueId: string;
  icon: { label: keyof ReturnType<typeof getIcon>; value: JSX.Element } | null;
};

const AddNewCategoryModal = ({
  openModal,
  handleClose,
  isPending,
  confirmFunction,
}: {
  openModal: boolean;
  handleClose: () => void;
  isPending: boolean;
  confirmFunction: (
    data: Omit<CategoryType, '_id' | 'lastId' | 'owner'>,
  ) => void;
}) => {
  const theme = useTheme();
  const form = useForm<NewCategoryFormType>();

  const onSubmit = (data: NewCategoryFormType) => {
    confirmFunction({
      uniqueId: Number(data.uniqueId),
      name: data.name.trim(),
      url: data.url.trim().toLowerCase(),
      icon: data.icon!.label,
      subCategory: [],
    });
  };

  const extendedFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit(onSubmit)();
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
            Створити нову категорію
          </Typography>

          <Box onSubmit={extendedFormSubmit} component="form">
            <Box sx={styles.inputContainer}>
              <Box sx={styles.inputWrapper}>
                <CategoryNameInput form={form} />
              </Box>

              <Box sx={styles.inputWrapper}>
                <CategoryLabel form={form} />
              </Box>

              <Box sx={styles.inputWrapper}>
                <UniqueIdInput form={form} />
              </Box>

              <Box sx={styles.inputWrapper}>
                <IconSelect form={form} />
              </Box>
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

export default AddNewCategoryModal;
