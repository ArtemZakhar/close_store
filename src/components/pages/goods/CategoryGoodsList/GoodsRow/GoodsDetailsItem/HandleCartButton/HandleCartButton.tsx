import { GoodsInCartType } from '@/types/localStorage/goods';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Button from '@mui/material/Button';

const HandleCartButton = ({
  goodsInCart,
  addGoodsInCart,
  removeGoodsFromCart,
  size,
  id,
  color,
}: {
  size: string;
  color: string;
  id: string;
  goodsInCart: GoodsInCartType[] | undefined;
  addGoodsInCart: ({
    color,
    size,
    goodsDetailsKey,
  }: {
    color: string;
    size: string;
    goodsDetailsKey: string;
  }) => void;
  removeGoodsFromCart: ({
    color,
    size,
    goodsDetailsKey,
  }: {
    color: string;
    size: string;
    goodsDetailsKey: string;
  }) => void;
}) => {
  const isGoodsInCart = goodsInCart?.some(
    (item) => item.color === color && item.size === size,
  );

  return isGoodsInCart ? (
    <Button
      onClick={() => removeGoodsFromCart({ size, color, goodsDetailsKey: id })}
    >
      <DeleteForeverOutlinedIcon />
    </Button>
  ) : (
    <Button
      onClick={() => addGoodsInCart({ size, color, goodsDetailsKey: id })}
    >
      <AddShoppingCartOutlinedIcon />
    </Button>
  );
};

export default HandleCartButton;
