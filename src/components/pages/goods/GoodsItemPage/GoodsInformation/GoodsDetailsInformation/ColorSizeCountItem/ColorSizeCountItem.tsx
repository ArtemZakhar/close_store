import { GoodsDetailsItemType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Fragment } from 'react';

import { styles } from './ColorSizeCountItem.styles';

const ColorSizeCountItem = ({ value }: { value: GoodsDetailsItemType }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.colorWrapper}>
        <Typography variant="body1">{value.color.toUpperCase()}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={(theme) => styles.dataWrapper(theme.palette.action.disabled)}>
          <Typography
            variant="body2"
            sx={(theme) => styles.sizeTitle(theme.palette.action.disabled)}
          >
            Розмір
          </Typography>

          <Box sx={styles.cartWrapper}>
            <Typography variant="body2" sx={styles.cartTitle}>
              Кількість
            </Typography>
          </Box>
        </Box>

        {value.countAndSizes.map(({ size, count }) => (
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

                <Typography
                  variant="body2"
                  sx={(theme) => styles.sizeItem(theme.palette.action.disabled)}
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

export default ColorSizeCountItem;
