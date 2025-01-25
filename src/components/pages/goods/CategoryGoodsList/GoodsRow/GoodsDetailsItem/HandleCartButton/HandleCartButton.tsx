import { GoodsInCartType } from '@/types/localStorage/goods';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Button from '@mui/material/Button';

const HandleCartButton = ({
  goodsInCart,
  addGoodsInCart,
  removeGoodsFromCart,
  size,
  color,
}: {
  size: string;
  color: string;
  goodsInCart: GoodsInCartType[] | undefined;
  addGoodsInCart: ({ color, size }: { color: string; size: string }) => void;
  removeGoodsFromCart: ({
    color,
    size,
  }: {
    color: string;
    size: string;
  }) => void;
}) => {
  const isGoodsInCart = goodsInCart?.some(
    (item) => item.color === color && item.size === size,
  );

  return isGoodsInCart ? (
    <Button onClick={() => removeGoodsFromCart({ size, color })}>
      <DeleteForeverOutlinedIcon />
    </Button>
  ) : (
    <Button onClick={() => addGoodsInCart({ size, color })}>
      <AddShoppingCartOutlinedIcon />
    </Button>
  );
};

export default HandleCartButton;
