import { Suspense } from 'react';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import Loading from '@/components/common/Loading';

import { styles } from './layout.styles';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContainerWithPadding sx={styles.layout}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ContainerWithPadding>
  );
}
