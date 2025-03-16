'use client';

import { routePaths } from '@/constants/routePaths';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import Loading from '@/components/common/Loading';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import LoadingButton from '@/components/common/buttons/LoadingButton';

import { useSellGoods } from '@/hooks/api/useGoods';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { styles } from './CartPage.styles';
import CartTable from './CartTable';
import { useGetGoodsInCartFilled } from './hooks/useGetGoodsInCartFilled';

const CartPage = () => {
  const {
    goodsInCartFilled,
    isError,
    isLoading,
    setGoodsInCartFilled,
    clearGoodsFromCart,
  } = useGetGoodsInCartFilled();

  const {
    mutate: sellGoods,
    isError: isSellGoodsError,
    isSuccess: isSellGoodsSuccess,
    isPending: isSellGoodsPending,
  } = useSellGoods();

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

  const handleSell = () => {
    sellGoods(goodsInCartFilled);
  };

  useShowFetchResultMessage({
    isSuccess: isSellGoodsSuccess,
    isError: isSellGoodsError,
    closeFunction: clearGoodsFromCart,
  });

  return (
    <Box position="relative" marginBottom="2rem">
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
        <>
          <Box>
            <CartTable
              goodsInCartFilled={goodsInCartFilled}
              changeQuantity={changeQuantity}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '2rem',
            }}
          >
            <LoadingButton
              isLoading={isSellGoodsPending}
              label="Реалізація"
              type="button"
              sx={{ width: '15rem' }}
              onClick={handleSell}
            />
          </Box>
        </>
      )}

      {!goodsInCartFilled.length && !isLoading && (
        <Box sx={styles.noDataWrapper}>
          <Typography
            variant="h4"
            sx={(theme) => styles.noDataLink(theme.palette.primary.main)}
          >
            Корзина порожня. Спершу додайте{' '}
            <Link href={routePaths.goods.root}>товар</Link> до корзини.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
