import { CartTableGoodsType } from '@/types/goods/good';
import { SessionType } from '@/types/session/session';
import { UserRole, UserStatus, UserType } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TableCellHeader from '@/components/common/Table/TableCellHeader';
import TableContainer from '@/components/common/Table/TableContainer';

import { useGetAllUsers } from '@/hooks/api/useUsers';

import CartItem from './CartItem';
import SelectSellPerson from './CartItem/SelectSellPerson';
import { styles } from './CartTable.styles';

const CartTable = ({
  goodsInCartFilled,
  changeQuantity,
  session,
  handleSelectSellerForAllGoods,
  handleSelectOneSeller,
  updateDiscount,
}: {
  goodsInCartFilled: CartTableGoodsType[];
  changeQuantity: (id: string, action: 'decrease' | 'increase') => void;
  session: Pick<SessionType, 'id' | 'role' | 'owner'>;
  handleSelectSellerForAllGoods: (id: string) => void;
  handleSelectOneSeller: (goodsId: string, id: string) => void;
  updateDiscount: (id: string, key: string, discountAmount: number) => void;
}) => {
  const { id: sessionID, owner, role } = session;

  const {
    data: employeeData,
    isLoading: isLoadingEmployeeData,
    isError: isErrorEmployeeData,
  } = useGetAllUsers(
    `role=${role}&id=${sessionID}&owner=${owner}&employee=true`,
    role === UserRole.owner,
  );

  const handleSelectEmployee = (user: UserType) => {
    handleSelectSellerForAllGoods(user._id);
  };

  let sellerExtendedData: UserType[] = [];

  if (!!employeeData?.length) {
    sellerExtendedData = [
      ...employeeData,
      {
        name: 'Власник',
        _id: sessionID,
        role,
        owner,
        email: '',
        status: UserStatus.created,
      },
    ];
  }

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
          <TableCellHeader border key="index" width="5.5rem">
            Код
          </TableCellHeader>,
          <TableCellHeader border key="firm" width="10rem">
            Фірма
          </TableCellHeader>,
          <TableCellHeader border key="model" width="10rem">
            Модель
          </TableCellHeader>,
          <TableCellHeader border key="color" width="10rem">
            Колір
          </TableCellHeader>,
          <TableCellHeader
            align="center"
            key="seller"
            width="17rem"
            border
            sx={styles.headerItem(role === UserRole.owner)}
          >
            Продавець
            <SelectSellPerson
              handleSelectEmployee={handleSelectEmployee}
              sellerExtendedData={sellerExtendedData}
            />
          </TableCellHeader>,
          <TableCellHeader align="center" border key="size" width="5rem">
            Розмір
          </TableCellHeader>,
          <TableCellHeader align="center" border key="quantity" width="6rem">
            Кількість
          </TableCellHeader>,
          <TableCellHeader align="center" border key="price" width="6rem">
            Ціна, грн.
          </TableCellHeader>,
          <TableCellHeader align="center" border key="discount" width="7rem">
            Знижка, грн.
          </TableCellHeader>,
          <TableCellHeader align="center" key="payable" width="7rem">
            До сплати, грн.
          </TableCellHeader>,
        ]}
        footerData={footerData}
        minHeight="1vh"
      >
        {goodsInCartFilled.map((goods) => (
          <CartItem
            cartRow={goods}
            key={goods.id}
            employeeData={sellerExtendedData}
            changeQuantity={changeQuantity}
            handleSelectOneSeller={handleSelectOneSeller}
            session={session}
            updateDiscount={updateDiscount}
          />
        ))}
      </TableContainer>
    </>
  );
};

export default CartTable;
