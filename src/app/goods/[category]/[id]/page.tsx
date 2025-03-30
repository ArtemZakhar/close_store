import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';

import { Suspense } from 'react';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import Loading from '@/components/common/Loading';
import GoodsItemPage from '@/components/pages/goods/GoodsItemPage';

export default async function CategoryPage({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { category, id } = params;
  const session = await getSession();

  if (!session) return;

  const canModify = session.role === UserRole.owner;

  const owner = session.owner ? session.owner : session.id;
  const role = session.owner ? UserRole.seller : UserRole.owner;

  return (
    <ContainerWithPadding>
      <Suspense fallback={<Loading />}>
        <GoodsItemPage
          owner={owner}
          role={role}
          canModify={canModify}
          category={category}
          goodsId={id}
        />
      </Suspense>
    </ContainerWithPadding>
  );
}
