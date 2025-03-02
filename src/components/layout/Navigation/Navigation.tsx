'use client';

import { routePaths } from '@/constants/routePaths';
import { UserRole } from '@/types/users/userType';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useGoodsInCartService from '@/hooks/useGoodsInCartService';

import LogoutButton from './LogoutButton';
import { styles } from './Navigation.styles';
import { getNavLinksForRole } from './helpers/getNavigationLinks';

export const Navigation = ({ role }: { role?: UserRole }) => {
  const pathName = usePathname();

  const { goodsInCart } = useGoodsInCartService();

  const isBadgeShown = !!goodsInCart.length;

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

        <Box>
          <Button
            sx={styles.notificationButton}
            href={`/${routePaths.cart}`}
            LinkComponent={Link}
          >
            <>
              <Badge
                color="primary"
                max={9}
                badgeContent={goodsInCart.length}
                sx={styles.goodsInCart}
              >
                <ShoppingCartIcon fontSize="medium" sx={styles.icon} />
              </Badge>
            </>
          </Button>
        </Box>

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};
