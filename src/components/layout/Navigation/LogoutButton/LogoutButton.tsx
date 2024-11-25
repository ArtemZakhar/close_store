'use client';

import { apiCalls } from '@/app/api/constants/apiCalls';
import { routePaths } from '@/constants/routePaths';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';

import { client } from '@/utils/client';

import { styles } from './LogoutButton.styles';

const LogoutButton = () => {
  const handleLogout = async () => {
    await client.post({ url: apiCalls.logout });
    window.location.href = routePaths.login;
  };
  return (
    <Button
      endIcon={<LogoutOutlinedIcon />}
      sx={styles.logoutButton}
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;
