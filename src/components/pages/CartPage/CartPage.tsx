'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Loading from '@/components/common/Loading';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';

import { styles } from './CartPage.styles';
import CartTable from './CartTable';
import { useGetGoodsInCartFilled } from './hooks/useGetGoodsInCartFilled';

const CartPage = () => {
  const { goodsInCartFilled, isError, isLoading, setGoodsInCartFilled } =
    useGetGoodsInCartFilled();

  const changeQuantity = (id: string, action: 'decrease' | 'increase') => {
    setGoodsInCartFilled((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              count: action === 'decrease' ? item.count - 1 : item.count + 1,
            }
          : item,
      ),
    );
  };

  return (
    <Box position="relative">
      <SectionDescriptionStyled>
        <Box width="27.4rem">
          <TitleStyled label="Корзина товарів"> </TitleStyled>
        </Box>
      </SectionDescriptionStyled>

      {isLoading ? <Loading height="50vh" /> : null}

      {isError ? (
        <Box sx={styles.error}>
          <Typography variant="h5">
            Не вдалось завантажити товари, спробуйте пізніше
          </Typography>
        </Box>
      ) : null}

      {!!goodsInCartFilled.length && (
        <Box marginTop="4rem">
          <CartTable
            goodsInCartFilled={goodsInCartFilled}
            changeQuantity={changeQuantity}
          />
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
