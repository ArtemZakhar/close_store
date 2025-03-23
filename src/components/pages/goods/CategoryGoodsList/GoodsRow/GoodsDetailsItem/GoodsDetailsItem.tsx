import { GoodsDetailsItemType } from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Fragment } from 'react';

import { styles } from './GoodsDetailsItem.styles';
import HandleCartButton from './HandleCartButton';

const GoodsDetailsItem = ({
  goods,
  goodsInCart,
  id,
  addGoodsInCart,
  removeGoodsFromCart,
}: {
  goods: GoodsDetailsItemType;
  goodsInCart: GoodsInCartType[] | undefined;
  id: string;
  addGoodsInCart: ({
    color,
    size,
    goodsDetailsKey,
    itemId,
  }: {
    itemId: string;
    color: string;
    size: string;
    goodsDetailsKey: string;
  }) => void;
  removeGoodsFromCart: ({
    size,
    goodsDetailsKey,
    itemId,
  }: {
    itemId: string;
    size: string;
    goodsDetailsKey: string;
  }) => void;
}) => {
  const { color, countAndSizes, outcomePrice } = goods;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.colorWrapper}>
        <Typography variant="body1">Колір: {color.toUpperCase()}</Typography>
      </Box>

      <Box sx={styles.colorWrapper}>
        <Typography variant="body1">Вартість: {outcomePrice} ₴</Typography>
      </Box>

      <Box sx={styles.detailsWrapper}>
        <Box sx={(theme) => styles.dataWrapper(theme.palette.action.disabled)}>
          <Typography
            variant="body2"
            sx={(theme) => styles.sizeTitle(theme.palette.action.disabled)}
          >
            Розмір
          </Typography>

          <Box sx={styles.cartWrapper}>
            <Typography variant="body2" sx={styles.cartTitle} noWrap>
              Додати в корзину
            </Typography>
          </Box>

          <Box sx={styles.quantityWrapper}>
            <Typography variant="body2" sx={styles.cartTitle}>
              Залишок
            </Typography>
          </Box>
        </Box>

        {countAndSizes.map(({ size, count }) => (
          <Fragment key={size}>
            {count === 0 ? null : (
              <Box
                sx={(theme) =>
                  styles.dataContainer(theme.palette.action.disabled)
                }
              >
                <Typography
                  variant="body2"
                  sx={(theme) => styles.sizeItem(theme.palette.action.disabled)}
                >
                  {size}
                </Typography>

                <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <HandleCartButton
                    goodsInCart={goodsInCart}
                    removeGoodsFromCart={removeGoodsFromCart}
                    addGoodsInCart={addGoodsInCart}
                    id={id}
                    itemId={goods._id!}
                    color={color}
                    size={size}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={(theme) =>
                    styles.countItem(theme.palette.action.disabled)
                  }
                >
                  {count}
                </Typography>
              </Box>
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default GoodsDetailsItem;
