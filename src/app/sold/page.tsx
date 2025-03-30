import { routePaths } from '@/constants/routePaths';
import { getSession } from '@/helpers/getSession';
import { getAllCategories } from '@/services/apiServices/categoryService';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Suspense } from 'react';

import Link from 'next/link';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import SoldGoodsPage from '@/components/pages/SoldGoodsPage';
import CategoryList from '@/components/pages/goods/CategoryList';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Goods() {
  const session = await getSession();

  if (!session || session.role !== UserRole.owner) return;

  const { id, role, owner } = session;

  const canAddGoods = role === UserRole.owner;

  return (
    <ContainerWithPadding>
      <SectionDescriptionStyled>
        <Box width="30rem">
          <TitleStyled label="Продажі">
            На цій сторінці відображена статистика продажів по місяцям, сума
            спалачених податків, необхідна сума нарахування заробітної плати,
            сума податків та інше.
          </TitleStyled>
        </Box>
      </SectionDescriptionStyled>

      <ErrorBoundary>
        <Suspense fallback={<Loading height="90vh" />}>
          <SoldGoodsPage />
        </Suspense>
      </ErrorBoundary>
    </ContainerWithPadding>
  );
}
