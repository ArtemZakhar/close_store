import ContainerWithPadding from '@/components/common/ContainerWithPadding';

import { styles } from './layout.styles';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContainerWithPadding sx={styles.layout}>{children}</ContainerWithPadding>
  );
}
