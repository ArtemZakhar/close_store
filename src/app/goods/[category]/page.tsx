import { getSession } from '@/helpers/getSession';
import { UserRole } from '@/types/users/userType';

import { Suspense } from 'react';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import Loading from '@/components/common/Loading';
import CategoryGoodsList from '@/components/pages/goods/CategoryGoodsList';

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

  const canModify = session.role === UserRole.owner;

  const owner = session.owner ? session.owner : session.id;
  const role = session.owner ? UserRole.seller : UserRole.owner;

  return (
    <ContainerWithPadding>
      <Suspense fallback={<Loading />}>
        <CategoryGoodsList
          canModify={canModify}
          category={category}
          owner={owner}
          role={role}
        />
      </Suspense>
    </ContainerWithPadding>
  );
}
