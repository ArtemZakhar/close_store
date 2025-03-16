import { PopulatedGoodsType } from '@/types/goods/good';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';

import { useState } from 'react';

import GoodsDetailsInformation from './GoodsDetailsInformation';
import SellerInformation from './SellerInformation';

const GoodsInformation = ({
  goodsItem,
  role,
}: {
  goodsItem: PopulatedGoodsType | undefined;
  role: UserRole.owner | UserRole.seller;
}) => {
  const [expanded, setExpanded] = useState<string | false>('goodsInfo');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  if (!goodsItem) return;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <GoodsDetailsInformation
        goodsItem={goodsItem}
        expanded={expanded}
        handleChange={handleChange}
      />

      {role === UserRole.owner && (
        <SellerInformation
          goodsItem={goodsItem}
          expanded={expanded}
          handleChange={handleChange}
        />
      )}
    </Box>
  );
};

export default GoodsInformation;
