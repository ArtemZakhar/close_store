import { routePaths } from '@/constants/routePaths';
import { GoodsDetails } from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import { styles } from './GoodsDetailsItem.styles';
import HandleCartButton from './HandleCartButton';

const GoodsDetailsItem = ({
  goods,
  canModify,
  goodsInCart,
  addGoodsInCart,
  removeGoodsFromCart,
  showConfirmationRemoveModal,
  selectedGoodsId,
}: {
  goods: GoodsDetails;
  canModify: boolean;
  goodsInCart: GoodsInCartType[] | undefined;
  addGoodsInCart: ({ color, size }: { color: string; size: string }) => void;
  removeGoodsFromCart: ({
    color,
    size,
  }: {
    color: string;
    size: string;
  }) => void;
  showConfirmationRemoveModal: () => void;
  selectedGoodsId: string;
}) => {
  const { color, countAndSizes } = goods;

  return (
    <Box sx={styles.container}>
      {canModify && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Link href={`/${routePaths.goods.edit}/${selectedGoodsId}`}>
              <Button>Редагування</Button>
            </Link>
          </Box>

          <Box>
            <Link href={`/${routePaths.goods.new}?id=${selectedGoodsId}`}>
              <Button>Створити копію</Button>
            </Link>
          </Box>

          <Box>
            <Button onClick={showConfirmationRemoveModal}>Видалення</Button>
          </Box>
        </Box>
      )}

      <Box sx={styles.colorWrapper}>
        <Typography variant="body1">{color.toUpperCase()}</Typography>
      </Box>

      <Box sx={(theme) => styles.dataWrapper(theme.palette.action.disabled)}>
        <Typography
          variant="body2"
          sx={(theme) => styles.sizeTitle(theme.palette.action.disabled)}
        >
          Розмір
        </Typography>

        <Box sx={styles.cartWrapper}>
          <Typography variant="body2" sx={styles.cartTitle}>
            Додати в корзину
          </Typography>
        </Box>
      </Box>

      {countAndSizes.map(({ size, count }) => (
        <Box
          key={size}
          sx={(theme) => styles.dataContainer(theme.palette.action.disabled)}
        >
          <Typography
            variant="body2"
            sx={(theme) => styles.sizeItem(theme.palette.action.disabled)}
          >
            {size}
          </Typography>

          {count === 0 ? null : (
            <HandleCartButton
              goodsInCart={goodsInCart}
              removeGoodsFromCart={removeGoodsFromCart}
              addGoodsInCart={addGoodsInCart}
              color={color}
              size={size}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default GoodsDetailsItem;
