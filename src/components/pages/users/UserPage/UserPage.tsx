'use client';

import { canInvite } from '@/helpers/roleAccess';
import { showUserRole } from '@/helpers/showUserRole';
import { UserRole } from '@/types/users/userType';
import { UsersDataType } from '@/types/users/usersData';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TableContainer from '@mui/material/TableContainer';

import { useState } from 'react';

import InviteUser from '@/components/common/InviteUser';

import UserTable from '../UserTable';
import { styles } from './UserPage.styles';

const UserPage = ({
  role,
  users,
  visibleTab,
}: {
  role: UserRole;
  users: UsersDataType;
  visibleTab: UserRole;
}) => {
  const [tab, setTab] = useState<UserRole>(visibleTab);
  const theme = useTheme();

  const canInviteUser = canInvite(role, tab);

  const handleChange = (data: string) => {
    setTab(data as UserRole);
  };

  return (
    <>
      {canInviteUser && (
        <Box sx={{ position: 'absolute', top: '0', right: '0' }}>
          <InviteUser type={tab} />
        </Box>
      )}
      <TableContainer sx={styles.tabsContainer}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(event, newValue) => handleChange(newValue)}>
              <Tab
                label={showUserRole(UserRole.admin as UserRole)}
                key={UserRole.admin}
                value={UserRole.admin}
              />
              <Tab
                label={showUserRole(UserRole.owner as UserRole)}
                key={UserRole.owner}
                value={UserRole.owner}
              />
              <Tab
                label={showUserRole(UserRole.seller as UserRole)}
                key={UserRole.seller}
                value={UserRole.seller}
              />
              <Tab
                label={showUserRole(UserRole.buyer as UserRole)}
                key={UserRole.buyer}
                value={UserRole.buyer}
              />
            </TabList>
          </Box>

          {Object.entries(users).map(([role, data]) => (
            <Box key={role}>
              {tab === role && (
                <Box>
                  <TabPanel value={role} sx={{ padding: '0.5rem' }}>
                    <UserTable users={data.users} />
                  </TabPanel>
                </Box>
              )}
            </Box>
          ))}
        </TabContext>
      </TableContainer>
    </>
  );
};

export default UserPage;
