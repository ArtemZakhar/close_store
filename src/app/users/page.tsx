import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Suspense } from 'react';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import InviteUser from '@/components/common/InviteUser';
import Loading from '@/components/common/Loading';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import { canInvite } from '@/components/layout/Navigation/roleAccess';
import UserTable from '@/components/pages/users/UserTable';

import { getAllUsers } from '../api/userService';

export default async function Users() {
  const users = await getAllUsers();

  const canInviteUser = canInvite(UserRole.admin, UserRole.owner);

  return (
    <ContainerWithPadding>
      <SectionDescriptionStyled>
        <Box width="27.4rem">
          <TitleStyled label="Користувачі">
            На цій сторінці у вас є мождивість переглядати користувачів
          </TitleStyled>
        </Box>

        {canInviteUser && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <InviteUser type={UserRole.owner} />
          </Box>
        )}
      </SectionDescriptionStyled>

      <Box height="80vh">
        <Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <UserTable users={users} />
          </ErrorBoundary>
        </Suspense>
      </Box>
    </ContainerWithPadding>
  );
}
