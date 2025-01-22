import { routePaths } from '@/constants/routePaths';
import { getIcon } from '@/helpers/getIcon';
import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';

import { getAllCategories } from '../api/categoryService';
import { styles } from './goodsPage.styles';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Goods() {
  const session = await getSession();

  const categories = await getAllCategories(['goods-category']);

  if (!session) return;

  const { role } = session;

  const canAddGoods = role === UserRole.owner;

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
          {canAddGoods && (
            <Button
              component={Link}
              href={routePaths.newGoods}
              variant="contained"
            >
              Додати новий товар
            </Button>
          )}
        </Box>
      </SectionDescriptionStyled>

      <Box component="section" sx={styles.container}>
        <Box sx={styles.iconsWrapper}>
          {categories.map(({ _id, icon, url, name }) => (
            <Button
              key={_id}
              color="inherit"
              variant="text"
              href={`${routePaths.goods}/${url}`}
              component={Link}
              sx={styles.button}
              disableRipple
            >
              {getIcon({ fontSize: '8rem' })[icon]}

              <Typography variant="h4">{name}</Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </ContainerWithPadding>
  );
}
