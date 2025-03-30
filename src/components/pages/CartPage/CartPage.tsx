'use client';

import { routePaths } from '@/constants/routePaths';
import { SessionType } from '@/types/session/session';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import toast from 'react-hot-toast';

import Link from 'next/link';

import Loading from '@/components/common/Loading';
import SectionDescriptionStyled from '@/components/common/SectionDescriptionStyled';
import TitleStyled from '@/components/common/TitleStyled';
import LoadingButton from '@/components/common/buttons/LoadingButton';

import { useSellGoods } from '@/hooks/api/useGoods';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { styles } from './CartPage.styles';
import CartTable from './CartTable';
import { useHandleGoodsInCart } from './hooks/useHandleGoodsInCart';

const CartPage = ({
  session,
}: {
  session: Pick<SessionType, 'id' | 'role' | 'owner'>;
}) => {
  const {
    goodsInCartFilled,
    isError,
    isLoading,
    clearGoodsFromCart,
    changeGoodsQuantity,
    handleSelectOneSeller,
    handleSelectSellerForAllGoods,
    updateDiscount,
  } = useHandleGoodsInCart();

  const {
    mutate: sellGoods,
    isError: isSellGoodsError,
    isSuccess: isSellGoodsSuccess,
    isPending: isSellGoodsPending,
  } = useSellGoods();

  const handleSell = () => {
    if (session.role === UserRole.owner) {
      const emptySeller = goodsInCartFilled.some(
        (item) => item.soldBy.length === 0,
      );
      if (emptySeller) {
        toast.error('Оберіть, будь ласка, продавця');
        return;
      }
      sellGoods(goodsInCartFilled);
    } else {
      const updatedGoodsInCart = goodsInCartFilled.map((item) => ({
        ...item,
        soldBy: session.id,
      }));

      sellGoods(updatedGoodsInCart);
    }
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
              handleSelectSellerForAllGoods={handleSelectSellerForAllGoods}
              handleSelectOneSeller={handleSelectOneSeller}
              goodsInCartFilled={goodsInCartFilled}
              changeQuantity={changeGoodsQuantity}
              session={session}
              updateDiscount={updateDiscount}
            />
          </Box>

          <Box sx={styles.button}>
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

      {!isLoading && !goodsInCartFilled.length && (
        <Box sx={styles.noDataWrapper}>
          <Typography
            variant="h4"
            sx={(theme) => styles.noDataLink(theme.palette.primary.main)}
          >
            Корзина порожня. Спершу додайте
            <Link href={routePaths.goods.root}> товар</Link> до корзини.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
