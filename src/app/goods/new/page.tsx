import { routePaths } from '@/constants/routePaths';
import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';

import { redirect } from 'next/navigation';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import NewGoods from '@/components/pages/goods/handleGoods/NewGoods';

export default async function newGood() {
  const session = await getSession();

  if (session?.role !== UserRole.owner) {
    redirect(`/${routePaths.goods.root}`);
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

      <NewGoods />
    </ContainerWithPadding>
  );
}
