import { getSession } from '@/helpers/getSession';
import { showUsersByTheRole } from '@/helpers/showUserByRole';
import { getAllUsers } from '@/services/apiServices/userService';
import { UserRole, UserType } from '@/types/users/userType';
import Box from '@mui/material/Box';

import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import UserPage from '@/components/pages/UserPage';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Users() {
  const session = await getSession();

  if (!session) return;

  const { role, id, owner } = session;

  let allUsers: UserType[] = [];

  try {
    allUsers = await getAllUsers({
      tags: ['users-list'],
      query: `role=${role}&id=${id}&owner=${owner}`,
    });
  } catch (error) {
    console.log({ error });
    throw new Error('Failed to fetch users');
  }

  const users = showUsersByTheRole(allUsers, session.role);

  if (!users) {
    redirect('/');
  }

  const tab =
    session.role === UserRole.admin ? UserRole.admin : UserRole.seller;

  return (
    <ContainerWithPadding>
      <Box position="relative">
        <SectionDescriptionStyled>
          <Box width="27.4rem">
            <TitleStyled label="Користувачі">
              На цій сторінці у вас є мождивість переглядати користувачів
            </TitleStyled>
          </Box>
        </SectionDescriptionStyled>

        <Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <UserPage role={session.role} users={users} visibleTab={tab} />
          </ErrorBoundary>
        </Suspense>
      </Box>
    </ContainerWithPadding>
  );
}
