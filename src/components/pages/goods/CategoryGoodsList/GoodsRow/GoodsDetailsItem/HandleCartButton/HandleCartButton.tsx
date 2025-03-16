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
  itemId,
}: {
  size: string;
  color: string;
  id: string;
  itemId: string;
  goodsInCart: GoodsInCartType[] | undefined;
  addGoodsInCart: ({
    itemId,
    color,
    size,
    goodsDetailsKey,
  }: {
    color: string;
    size: string;
    goodsDetailsKey: string;
    itemId: string;
  }) => void;
  removeGoodsFromCart: ({
    itemId,
    size,
    goodsDetailsKey,
  }: {
    itemId: string;
    size: string;
    goodsDetailsKey: string;
  }) => void;
}) => {
  const isGoodsInCart = goodsInCart?.some(
    (item) => item.color === color && item.size === size,
  );

  return isGoodsInCart ? (
    <Button
      onClick={() => removeGoodsFromCart({ itemId, size, goodsDetailsKey: id })}
    >
      <DeleteForeverOutlinedIcon />
    </Button>
  ) : (
    <Button
      onClick={() =>
        addGoodsInCart({ itemId, size, color, goodsDetailsKey: id })
      }
    >
      <AddShoppingCartOutlinedIcon />
    </Button>
  );
};

export default HandleCartButton;
