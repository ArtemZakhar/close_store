import { getSession } from '@/helpers/getSession';

import ContainerWithPadding from '@/components/common/ContainerWithPadding';
import MainScreen from '@/components/pages/MainScreen';

export default async function Home() {
  const session = await getSession();

  if (!session) return;

  return (
    <ContainerWithPadding>
      <MainScreen role={session?.role} />
    </ContainerWithPadding>
  );
}
