import { roleAccess } from '@/helpers/roleAccess';
import { UserRole } from '@/types/users/userType';
import Button from '@mui/material/Button';

import Link from 'next/link';

import { styles } from '../Navigation.styles';

export const getNavLinksForRole = (role: UserRole, pathName: string) => {
  return roleAccess[role].map((access) => {
    const { label, href } = access;
    const isActive = href === pathName;

    return (
      <Button
        key={href}
        color="inherit"
        variant="text"
        component={Link}
        href={`/${href}`}
        sx={{
          ...styles.navButton,
          color: isActive ? 'primary.main' : 'common.black',
        }}
        disableRipple
      >
        {label}
      </Button>
    );
  });
};
