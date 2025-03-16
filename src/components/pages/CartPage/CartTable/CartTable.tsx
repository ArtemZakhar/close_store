import { CartTableGoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TableCellHeader from '@/components/common/Table/TableCellHeader';
import TableContainer from '@/components/common/Table/TableContainer';

import CartItem from './CartItem';
import { styles } from './CartTable.styles';

const CartTable = ({
  goodsInCartFilled,
  changeQuantity,
}: {
  goodsInCartFilled: CartTableGoodsType[];
  changeQuantity: (id: string, action: 'decrease' | 'increase') => void;
}) => {
  const footerData = (
    <Box sx={styles.footer}>
      <Typography variant="h4" width="6rem" align="center">
        Всього:
      </Typography>
      <Typography variant="h4" width="6rem" align="center">
        {goodsInCartFilled.reduce(
          (acc, elem) =>
            acc +
            elem.count * (elem.goods.goodsDetails[elem.key].outcomePrice || 0),
          0,
        )}
      </Typography>
    </Box>
  );
  return (
    <>
      <TableContainer
        border
        headerData={[
          <TableCellHeader border key="index">
            Код
          </TableCellHeader>,
          <TableCellHeader border key="firm">
            Фірма
          </TableCellHeader>,
          <TableCellHeader border key="model">
            Модель
          </TableCellHeader>,
          <TableCellHeader border key="color">
            Колір
          </TableCellHeader>,
          <TableCellHeader align="center" border key="size">
            Розмір
          </TableCellHeader>,
          <TableCellHeader align="center" border key="quantity" width="6rem">
            Кількість
          </TableCellHeader>,
          <TableCellHeader align="center" key="price" width="6rem">
            Ціна, грн.
          </TableCellHeader>,
        ]}
        footerData={footerData}
        minHeight="1vh"
      >
        {goodsInCartFilled.map((goods) => (
          <CartItem
            cartRow={goods}
            key={goods.id}
            changeQuantity={changeQuantity}
          />
        ))}
      </TableContainer>
    </>
  );
};

export default CartTable;
