import { getAllGoods } from '@/app/api/goodsService';
import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';

import { Suspense } from 'react';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import Loading from '@/components/common/Loading';
import GoodsCategoryList from '@/components/pages/goods/GoodsCategoryList';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function CategoryPage({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { category } = params;
  const session = await getSession();

  if (!session) return;

  const goods = await getAllGoods({
    searchParams: `category=${category}`,
    tags: ['goods-quantity'],
  });

  const isAdmin =
    session.role === UserRole.admin || session.role === UserRole.buyer;

  return (
    <ContainerWithPadding>
      <Suspense fallback={<Loading />}>
        <GoodsCategoryList goods={goods} isAdmin={isAdmin} />
      </Suspense>
    </ContainerWithPadding>
  );
}
