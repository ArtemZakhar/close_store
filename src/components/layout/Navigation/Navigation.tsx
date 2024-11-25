'use client';

import { UserRole } from '@/types/users/userType';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LogoutButton from './LogoutButton';
import { styles } from './Navigation.styles';
import { getNavLinksForRole } from './helpers/getNavigationLinks';

export const Navigation = ({ role }: { role?: UserRole }) => {
  const pathName = usePathname();

  if (!role) return;

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Button
          color="inherit"
          variant="text"
          component={Link}
          href={'/'}
          disableRipple
        >
          <Typography variant="h2" sx={{ minWidth: '150px' }}>
            Varto
          </Typography>
        </Button>

        <Box sx={styles.wrapper}>
          <Box sx={styles.navlinksContainer}>
            {getNavLinksForRole(role, pathName.slice(1))}
          </Box>
        </Box>

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};
