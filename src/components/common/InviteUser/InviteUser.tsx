'use client';

import { UserRole } from '@/types/users/userType';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

import ButtonStyled from '../ButtonStyled';
import NewUserForm from '../NewUserForm';
import { styles } from './InviteUser.styles';

const InviteUser = ({ type }: { type: UserRole }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let invitee: string = '';

  if (type === UserRole.admin) {
    invitee = 'адміністратора';
  }

  if (type === UserRole.owner) {
    invitee = 'власника';
  }

  if (type === UserRole.seller) {
    invitee = 'продавця';
  }

  return (
    <Box sx={styles.container}>
      <ButtonStyled label={`Запросити ${invitee}`} handleClick={handleOpen} />

      <Modal open={open} onClose={handleClose}>
        <Fade in={open} timeout={theme.transitions.duration.standard}>
          <Box sx={styles.modalContainer}>
            <Typography variant="h6" component="h2">
              {`Запросити ${invitee}`}
            </Typography>

            <Button
              sx={styles.modalCloseButton}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon sx={{ color: 'common.black' }} />
            </Button>

            <NewUserForm handleClose={handleClose} type={type} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default InviteUser;
