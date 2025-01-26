import { GoodsSchemaType, GoodsType } from '@/types/goods/good';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

import useGoodsInCartService from '@/hooks/useGoodsInCartService';

import GoodsDetailsItem from './GoodsDetailsItem';
import { styles } from './GoodsRow.styles';

const GoodsRow = ({
  item,
  selectedGoods,
  toggleSelectedGoods,
  canModify,
}: {
  item: GoodsType;
  selectedGoods: GoodsType | null;
  toggleSelectedGoods: (goods: GoodsType) => void;
  canModify: boolean;
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { goodsInCart, saveInCart, removeFromCart } = useGoodsInCartService();

  const { _id, firm, model, outcomePrice, code, goodsDetails } = item;

  const goodsInCartFiltered = goodsInCart.filter((item) => item._id === _id);

  const addGoodsInCart = ({ color, size }: { color: string; size: string }) => {
    if (!selectedGoods) return;

    saveInCart({ _id: selectedGoods._id, color, size });
  };

  const removeGoodsFromCart = ({
    color,
    size,
  }: {
    color: string;
    size: string;
  }) => {
    if (!selectedGoods) return;

    removeFromCart({ _id: selectedGoods._id, color, size });
  };

  const showConfirmationRemoveModal = () => {
    setIsRemoveModalOpen(true);
  };

  const hideConfirmationRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  return (
    <Box sx={styles.row}>
      <Box sx={styles.titleWrapper}>
        <Typography width="5rem">{code}</Typography>

        <Typography flexGrow={1}>{firm.name}</Typography>

        <Typography align="center" width="15rem">
          {model}
        </Typography>

        <Typography align="center" width="15rem">
          {outcomePrice?.toFixed(2) ?? 'Не встановлено'}
        </Typography>

        <Box width="2rem">
          <Button
            onClick={() => toggleSelectedGoods(item)}
            sx={styles.toggleButton}
          >
            {selectedGoods?._id === _id ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Button>
        </Box>
      </Box>

      {selectedGoods?._id === _id &&
        goodsDetails.map((goods) => (
          <GoodsDetailsItem
            key={goods.color}
            goods={goods}
            canModify={canModify}
            goodsInCart={goodsInCartFiltered}
            addGoodsInCart={addGoodsInCart}
            removeGoodsFromCart={removeGoodsFromCart}
            showConfirmationRemoveModal={showConfirmationRemoveModal}
            selectedGoodsId={selectedGoods._id}
          />
        ))}
    </Box>
  );
};

export default GoodsRow;
