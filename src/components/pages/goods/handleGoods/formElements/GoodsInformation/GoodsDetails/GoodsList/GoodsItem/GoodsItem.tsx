import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import { FormType } from '@/components/pages/goods/HandleGoods/HandleGoods';

import { SizesAndCountDataType } from '../../sizesData';
import SizesOptionList from '../SizesOptionList';
import ColorAutocomplete from './ColorAutocomplete';
import { styles } from './GoodsItem.styles';
import GoodsPrice from './GoodsPrice';

const GoodsItem = ({
  form,
  index,
  field,
  sizeType,
  id,
  handleRemoveItem,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  index: number;
  field: ControllerRenderProps<FormType, 'goods.goodsDetails'>;
  sizeType: SizesAndCountDataType;
  id: string;
  handleRemoveItem: (id: string, index: number) => void;
}) => {
  return (
    <Box sx={(theme) => styles.container(theme.palette.action.disabled)}>
      <Box sx={styles.removeButtonWrapper}>
        <Button
          onClick={() => handleRemoveItem(id, index)}
          sx={styles.removeButton}
        >
          &times;
        </Button>
      </Box>

      <ColorAutocomplete form={form} index={index} field={field} />

      <Box sx={styles.sectionWrapper}>
        <GoodsPrice form={form} />
      </Box>

      <SizesOptionList
        form={form}
        sizeType={sizeType}
        index={index}
        field={field}
      />
    </Box>
  );
};

export default GoodsItem;
