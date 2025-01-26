'use client';

import { GoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

import { styles } from './CategoryGoodsList.styles';
import GoodsRow from './GoodsRow';

const CategoryGoodsList = ({
  goods,
  canModify,
}: {
  goods: GoodsType[];
  canModify: boolean;
}) => {
  const [selectedGoods, setSelectedGoods] = useState<GoodsType | null>(null);

  const toggleSelectedGoods = (goods: GoodsType) => {
    if (selectedGoods?._id === goods._id) {
      setSelectedGoods(null);

      return;
    }

    setSelectedGoods(goods);
  };

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
          {goods.map((item) => (
            <GoodsRow
              key={item._id}
              item={item}
              toggleSelectedGoods={toggleSelectedGoods}
              selectedGoods={selectedGoods}
              canModify={canModify}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryGoodsList;
