'use client';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Tab from '@mui/material/Tab';
import TableContainer from '@mui/material/TableContainer';

import UserTable from '../UserTable';
import { styles } from './UserPage.styles';

const UserPage = () => {
  const theme = useTheme();

  return (
    <TableContainer sx={styles.tabsContainer}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {hasAdminAccess && (
              <Tab label={t('manageUsers.admins')} value="1" />
            )}
            {hasStudiosAccess && (
              <Tab label={t('manageUsers.studious')} value="2" />
            )}

            {hasReviewerAccess && (
              <Tab label={t('manageUsers.reviewers')} value="4" />
            )}

            {hasClientsAccess && (
              <Tab label={t('manageUsers.clients')} value="3" />
            )}

            {hasContractorsAccess && (
              <Tab label={t('manageUsers.contractors')} value="5" />
            )}
          </TabList>
        </Box>
        {hasAdminAccess && (
          <Fade
            timeout={theme.transitions.duration.standard}
            in={value === '1'}
          >
            <TabPanel value="1">
              <UserTable type={UserRole.ADMIN} canInviteUser={canInviteUser} />
            </TabPanel>
          </Fade>
        )}
        {hasStudiosAccess && (
          <Fade
            timeout={theme.transitions.duration.standard}
            in={value === '2'}
          >
            <TabPanel value="2">
              <UserTable type={UserRole.STUDIO} canInviteUser={canInviteUser} />
            </TabPanel>
          </Fade>
        )}

        {hasReviewerAccess && (
          <Fade
            timeout={theme.transitions.duration.standard}
            in={value === '4'}
          >
            <TabPanel value="4">
              <UserTable
                type={UserRole.REVIEWER}
                canInviteUser={canInviteUser}
              />
            </TabPanel>
          </Fade>
        )}

        {hasClientsAccess && (
          <Fade
            timeout={theme.transitions.duration.standard}
            in={value === '3'}
          >
            <TabPanel value="3">
              <UserTable type={UserRole.CLIENT} canInviteUser={canInviteUser} />
            </TabPanel>
          </Fade>
        )}

        {hasContractorsAccess && (
          <Fade
            timeout={theme.transitions.duration.standard}
            in={value === '5'}
          >
            <TabPanel value="5">
              <UserTable
                type={UserRole.CONTRACTOR}
                canInviteUser={canInviteUser}
              />
            </TabPanel>
          </Fade>
        )}
      </TabContext>
    </TableContainer>
  );
};

export default UserPage;
