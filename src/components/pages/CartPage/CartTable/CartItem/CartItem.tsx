import { CartTableGoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import ChangeQuantityButton from '@/components/common/buttons/ChangeQuantityButton';

import { styles } from './CartItem.styles';

const CartItem = ({
  cartRow,
  changeQuantity,
}: {
  cartRow: CartTableGoodsType;
  changeQuantity: (id: string, action: 'decrease' | 'increase') => void;
}) => {
  const { id, goods, key, color, size, maxCount, count } = cartRow;
  const goodsPrice = goods.goodsDetails[key].outcomePrice || 0;
  return (
    <TableRow sx={(theme) => styles.row(theme.palette.action.disabled)}>
      <TableCell>{`${goods.code}`}</TableCell>
      <TableCell>{goods.firm.name}</TableCell>
      <TableCell>{goods.model}</TableCell>
      <TableCell>{color}</TableCell>
      <TableCell align="center"> {size}</TableCell>
      <TableCell>
        <Box sx={styles.quantityWrapper}>
          <ChangeQuantityButton
            type="decrease"
            disabled={count === 1}
            callBackFunction={() => changeQuantity(id, 'decrease')}
          />
          <Typography>{count}</Typography>
          <ChangeQuantityButton
            type="increase"
            disabled={maxCount === count}
            callBackFunction={() => changeQuantity(id, 'increase')}
          />
        </Box>
      </TableCell>
      <TableCell align="center">{goodsPrice * count}</TableCell>
    </TableRow>
  );
};

export default CartItem;
