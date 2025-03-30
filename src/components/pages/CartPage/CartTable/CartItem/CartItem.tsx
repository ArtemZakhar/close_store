import { CartTableGoodsType } from '@/types/goods/good';
import { SessionType } from '@/types/session/session';
import { UserRole, UserType } from '@/types/users/userType';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

import ChangeQuantityButton from '@/components/common/buttons/ChangeQuantityButton';

import { styles } from './CartItem.styles';
import SoldBySelect from './SoldBySelect';

const MAX_DISCOUNT_AMOUNT = 5;

const CartItem = ({
  cartRow,
  changeQuantity,
  employeeData,
  handleSelectOneSeller,
  session,
  updateDiscount,
}: {
  cartRow: CartTableGoodsType;
  changeQuantity: (id: string, action: 'decrease' | 'increase') => void;
  employeeData: UserType[] | undefined;
  handleSelectOneSeller: (goodsId: string, id: string) => void;
  session: Pick<SessionType, 'id' | 'role' | 'owner'>;
  updateDiscount: (id: string, key: string, discountAmount: number) => void;
}) => {
  const [discount, setDiscount] = useState('');

  const { id, goods, key, color, size, maxCount, count, soldBy } = cartRow;
  const goodsPrice = goods.goodsDetails[key].outcomePrice || 0;

  const price = goodsPrice * count;
  const payablePrice = price - (goods.goodsDetails[key].discount || 0);

  const isDiscountAmountAcceptable =
    (Number(discount) / price) * 100 <= MAX_DISCOUNT_AMOUNT;

  return (
    <TableRow sx={(theme) => styles.row(theme.palette.action.disabled)}>
      <TableCell>{`${goods.code}`}</TableCell>
      <TableCell>{goods.firm.name}</TableCell>
      <TableCell>{goods.model}</TableCell>
      <TableCell>{color}</TableCell>
      <TableCell
        align="center"
        sx={styles.cell(session.role === UserRole.owner)}
      >
        <SoldBySelect
          employeeData={employeeData}
          soldBy={soldBy}
          id={id}
          handleSelectOneSeller={handleSelectOneSeller}
        />
      </TableCell>
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

      <TableCell align="center">{price}</TableCell>
      <TableCell align="center">
        <TextField
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
          onBlur={() => {
            if (!!discount.length && isDiscountAmountAcceptable) {
              updateDiscount(id, key, Number(discount));
            }
          }}
          error={!isDiscountAmountAcceptable}
        />
      </TableCell>
      <TableCell align="center">{payablePrice}</TableCell>
    </TableRow>
  );
};

export default CartItem;
