import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { SizesAndCountDataType } from '../../sizesData';
import ColorAutocomplete from './ColorAutocomplete';
import { styles } from './GoodsItem.styles';
import GoodsPrice from './GoodsPrice';
import SizesOptionList from './SizesOptionList';

const GoodsItem = ({
  sizeType,
  handleRemoveItem,
  id,
}: {
  sizeType: SizesAndCountDataType;
  handleRemoveItem: (index: string) => void;
  id: string;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Box sx={styles.removeButtonWrapper}>
        <Button onClick={() => handleRemoveItem(id)} sx={styles.removeButton}>
          &times;
        </Button>
      </Box>

      <ColorAutocomplete id={id} />

      <Box sx={styles.sectionWrapper}>
        <GoodsPrice id={id} />
      </Box>

      <SizesOptionList sizeType={sizeType} id={id} />
    </Box>
  );
};

export default GoodsItem;
