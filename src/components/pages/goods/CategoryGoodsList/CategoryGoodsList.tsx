'use client';

import { routePaths } from '@/constants/routePaths';
import { GoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

import Link from 'next/link';

import ErrorMessage from '@/components/common/ErrorMessage';
import Loading from '@/components/common/Loading';

import { useGetAllGoods } from '@/hooks/api/useGoods';

import HandleGoods from '../HandleGoods';
import { styles } from './CategoryGoodsList.styles';
import GoodsRow from './GoodsRow';

const CategoryGoodsList = ({
  canModify,
  category,
}: {
  canModify: boolean;
  category: string;
}) => {
  const [selectedGoods, setSelectedGoods] = useState<GoodsType | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isCopyingMode, setIsCopyingMode] = useState(false);

  const {
    data: goods,
    isError: isGoodsFetchingError,
    isLoading: isGoodsLoading,
  } = useGetAllGoods(category);

  const startMode = (mode?: 'editing') => {
    if (mode === 'editing') {
      setIsEditingMode(true);
      return;
    }

    setIsCopyingMode(true);
  };

  const finishMode = (mode?: 'editing') => {
    if (mode === 'editing') {
      setIsEditingMode(false);
      return;
    }

    setIsCopyingMode(false);
  };

  const toggleSelectedGoods = (goods: GoodsType) => {
    if (selectedGoods?._id === goods._id) {
      setSelectedGoods(null);

      return;
    }

    setSelectedGoods(goods);
  };

  if (isEditingMode) {
    return (
      <HandleGoods
        selectedGoods={selectedGoods}
        finishMode={finishMode}
        isEditing
        key={selectedGoods?._id}
      />
    );
  }

  if (isCopyingMode) {
    return (
      <HandleGoods
        selectedGoods={selectedGoods}
        key={selectedGoods?._id}
        finishMode={finishMode}
      />
    );
  }

  if (!isGoodsFetchingError && !isGoodsLoading && !goods?.length) {
    return (
      <Box sx={styles.noGoodsWrapper}>
        <Typography variant="h3">В цій категорії ще нема товарів.</Typography>

        <Button
          component={Link}
          href={`/${routePaths.goods.new}`}
          variant="contained"
        >
          Додати новий товар
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
        <Box
          sx={(theme) => styles.titlesWrapper(theme.palette.action.disabled)}
        >
          <Typography variant="h4" width="5rem">
            Код
          </Typography>

          <Typography variant="h4" flexGrow={1}>
            Виробник
          </Typography>

          <Typography variant="h4" align="center" width="15rem">
            Модель
          </Typography>

          <Typography variant="h4" align="center" width="15rem">
            Ціна вихідна (грн.)
          </Typography>

          <Typography variant="h4" width="2rem"></Typography>
        </Box>

        <Box sx={styles.goodsWrapper}>
          {isGoodsLoading && (
            <Loading backgroundColor="transparent" height="60vh" />
          )}

          {isGoodsFetchingError && (
            <ErrorMessage message="Не вдалось завантажити товар. Спробуйте пізніше" />
          )}

          {!isGoodsLoading &&
            !isGoodsFetchingError &&
            goods?.map((item) => (
              <GoodsRow
                key={item._id}
                item={item}
                toggleSelectedGoods={toggleSelectedGoods}
                selectedGoods={selectedGoods}
                canModify={canModify}
                startMode={startMode}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryGoodsList;
