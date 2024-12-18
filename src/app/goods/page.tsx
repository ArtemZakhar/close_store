import { routePaths } from '@/constants/routePaths';
import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';

export default async function Goods() {
  const session = await getSession();

  if (!session) return;

  return (
    <ContainerWithPadding>
      <SectionDescriptionStyled>
        <Box width="30rem">
          <TitleStyled label="Товари">
            {session.role === UserRole.admin || UserRole.owner ? (
              <>
                На цій сторінці можна заводити нові товари, редагувати існуючі,
                шукати товари за кодом, продавати, вносити замітки, інформацію
                по місцезнаходженю товару в магазині, а також списувати.
              </>
            ) : (
              <>
                На цій сторінці є можливість продавати товари, вносити замітки
                по товару, а також вносити замітки по місцезнаходженю товару в
                магазині.
              </>
            )}
          </TitleStyled>
        </Box>

        <Box>
          <Button
            component={Link}
            href={routePaths.newGoods}
            variant="contained"
          >
            Додати новий товар
          </Button>
        </Box>
      </SectionDescriptionStyled>
    </ContainerWithPadding>
  );
}
