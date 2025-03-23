import { routePaths } from '@/constants/routePaths';
import { getSession } from '@/helpers/getSession';
import { getAllCategories } from '@/services/apiServices/categoryService';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from 'next/link';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import CategoryList from '@/components/pages/goods/CategoryList';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Goods() {
  const session = await getSession();

  if (!session) return;

  const { id, role, owner } = session;

  const categories = await getAllCategories({
    tags: ['goods-category'],
    query: `id=${id}&role=${role}&owner=${owner}`,
  });

  const canAddGoods = role === UserRole.owner;

  const filteredCategories = categories.filter(
    (category) => category.owner === id,
  );

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
              href={`/${routePaths.goods.new}`}
              variant="contained"
            >
              Додати новий товар
            </Button>
          )}
        </Box>
      </SectionDescriptionStyled>

      <CategoryList categories={filteredCategories} />
    </ContainerWithPadding>
  );
}
