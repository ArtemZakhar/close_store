import { getSession } from '@/helpers/getSession';

import { Suspense } from 'react';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';
import CartPage from '@/components/pages/CartPage';

export const dynamic = 'auto';
export const dynamicParams = true;

export default async function Users() {
  const session = await getSession();

  if (!session) return;

  return (
    <ContainerWithPadding>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <CartPage
            session={{
              id: session.id,
              owner: session.owner,
              role: session.role,
            }}
          />
        </ErrorBoundary>
      </Suspense>
    </ContainerWithPadding>
  );
}
