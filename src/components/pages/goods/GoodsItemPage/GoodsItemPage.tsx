'use client';

import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useState } from 'react';

import ErrorMessage from '@/components/common/ErrorMessage';
import Loading from '@/components/common/Loading';
import TitleStyled from '@/components/common/TitleStyled';

import { useGetGoodsById } from '@/hooks/api/useGoods';

import HandleGoods from '../HandleGoods';
import GoodsInformation from './GoodsInformation';

const GoodsItemPage = ({
  goodsId,
  canModify,
  category,
  role,
  owner,
}: {
  goodsId: string;
  category: string;
  role: UserRole.owner | UserRole.seller;
  owner: string;
  canModify: boolean;
}) => {
  const [editMode, setEditMode] = useState(false);
  const { data: goodsItem, isLoading, isError } = useGetGoodsById(goodsId);

  const handleStartEditMode = () => setEditMode(true);
  const handleEndEditMode = () => setEditMode(false);

  if (isLoading) {
    return <Loading height="90vh" />;
  }

  if (isError) {
    return (
      <ErrorMessage message="Не вдалось завантажити товар. Спробуйте пізніше" />
    );
  }

  if (!goodsItem) return;

  if (editMode) {
    return (
      <HandleGoods
        finishMode={handleEndEditMode}
        selectedGoods={{
          ...goodsItem,
          seller: {
            ...goodsItem.seller,
            country: goodsItem.seller.country._id,
            city: goodsItem.seller.city?._id,
          },
          firm: {
            ...goodsItem.firm,
            countryOfOrigin: goodsItem.firm.countryOfOrigin._id,
          },
        }}
        isEditing
        category={goodsItem.category.name}
      />
    );
  }

  return (
    <Box component="section" marginTop="2rem" position="relative">
      <TitleStyled
        label={`${goodsItem?.code} - ${goodsItem?.firm.name} (${goodsItem?.model})`}
      >
        Детальна інформація по товару
      </TitleStyled>

      {canModify && (
        <Box sx={{ position: 'absolute', top: '0', right: '0' }}>
          <Button onClick={handleStartEditMode} variant="contained">
            Редагувати
          </Button>
        </Box>
      )}

      <GoodsInformation goodsItem={goodsItem} role={role} />
    </Box>
  );
};

export default GoodsItemPage;
