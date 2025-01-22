import { GoodsSchemaType } from '@/types/goods/good';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import useLocalStorageService from '@/hooks/useLocalStorageService';

import GoodsDetailsItem from './GoodsDetailsItem';
import { styles } from './GoodsRow.styles';

const GoodsRow = ({
  item,
  selectedGoods,
  toggleSelectedGoods,
  isAdmin,
}: {
  item: GoodsSchemaType;
  selectedGoods: GoodsSchemaType | null;
  toggleSelectedGoods: (goods: GoodsSchemaType) => void;
  isAdmin: boolean;
}) => {
  const { goodsInCart, saveGoodsInCart, deleteGoodsFromCart } =
    useLocalStorageService();

  const { _id, firm, model, outcomePrice, code, goodsDetails } = item;

  const goodsInCartFiltered = goodsInCart.filter((item) => item._id === _id);

  const addGoodsInCart = ({ color, size }: { color: string; size: string }) => {
    saveGoodsInCart({ _id, color, size });
  };

  const removeGoodsFromCart = ({
    color,
    size,
  }: {
    color: string;
    size: string;
  }) => {
    deleteGoodsFromCart({ _id, color, size });
  };

  return (
    <Box sx={styles.row}>
      <Box sx={styles.titleWrapper}>
        <Typography width="5rem">{code}</Typography>

        <Typography flexGrow={1}>{firm}</Typography>

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
            isAdmin={isAdmin}
            goodsInCart={goodsInCartFiltered}
            addGoodsInCart={addGoodsInCart}
            removeGoodsFromCart={removeGoodsFromCart}
          />
        ))}
    </Box>
  );
};

export default GoodsRow;
