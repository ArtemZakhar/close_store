import { routePaths } from '@/constants/routePaths';
import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';

import { redirect } from 'next/navigation';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import NewGood from '@/components/pages/NewGood';

export default async function newGood() {
  const session = await getSession();

  if (session?.role !== UserRole.admin && session?.role !== UserRole.owner) {
    redirect(`/${routePaths.goods}`);
  }

  return (
    <ContainerWithPadding>
      <SectionDescriptionStyled>
        <Box width="30rem">
          <TitleStyled label="Внести новий товар">
            Для створення нового запису заповність форму і натисніть відправити.
          </TitleStyled>
        </Box>
      </SectionDescriptionStyled>

      <NewGood />
    </ContainerWithPadding>
  );
}
