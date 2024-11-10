import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { styles } from './Navigation.styles';

export const Navigation = () => {
  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.wrapper}>
          <Box sx={styles.navlinksContainer}>
            {/* {getNavLinksForRole(role, pathName, locale)} */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
