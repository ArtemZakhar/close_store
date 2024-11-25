import { roleAccess } from '@/helpers/roleAccess';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import { styles } from './MainScreen.styles';

const MainScreen = ({ role }: { role?: UserRole }) => {
  return (
    <Box component="section" sx={styles.container}>
      <Typography variant="h1" color="primary" sx={{ mt: '25vh' }}>
        Varto
      </Typography>

      <Box sx={styles.iconsWrapper}>
        {role &&
          roleAccess[role].map(({ label, href, icon: Icon }) => (
            <Button
              key={href}
              color="inherit"
              variant="text"
              component={Link}
              href={href}
              sx={styles.button}
              disableRipple
            >
              <Icon sx={styles.icon} />
              <Typography variant="h4">{label}</Typography>
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default MainScreen;
