import { FirmType } from '@/types/goods/firm';
import { GoodsType } from '@/types/goods/good';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { styles } from './TableHeader.styles';

const TableHeader = ({
  item,
  toggleSelectedGoods,
  selectedGoods,
}: {
  toggleSelectedGoods: (goods: GoodsType) => void;
  selectedGoods: GoodsType | null;
  item: GoodsType;
}) => {
  const { _id, firm, model, description, code } = item;
  return (
    <Box sx={styles.titleWrapper}>
      <Typography width="5rem">{code}</Typography>

      <Typography flexGrow={1}>{firm.name}</Typography>

      <Typography align="center" width="15rem">
        {model}
      </Typography>

      <Typography align="center" width="15rem">
        {description ?? ''}
      </Typography>

      <Box width="2rem">
        <Button
          onClick={() => toggleSelectedGoods(item)}
          sx={styles.toggleButton}
        >
          {selectedGoods?._id === _id ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
