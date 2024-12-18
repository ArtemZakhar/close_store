import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import LoadingButton from '../LoadingButton';
import { styles } from './ConfirmationModal.styles';

const ConfirmationModal = ({
  openModal,
  handleClose,
  title,
  subTitle,
  isPending,
  confirmFunction,
}: {
  openModal: boolean;
  handleClose: () => void;
  title: string;
  subTitle?: string;
  isPending: boolean;
  confirmFunction: (data?: any) => void;
}) => {
  const theme = useTheme();

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
            sx={() => styles.modalTitle(subTitle)}
          >
            {title}
          </Typography>

          <Typography align="center" variant="body1">
            {subTitle}
          </Typography>

          <Box sx={styles.modalButtonWrapper}>
            <Button
              sx={styles.modalButtonBack}
              onClick={handleClose}
              variant="outlined"
            >
              Назад
            </Button>

            <Box sx={{ width: '50%' }}>
              <LoadingButton
                onClick={confirmFunction}
                label="Підтвердити"
                isLoading={isPending}
                type="button"
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
