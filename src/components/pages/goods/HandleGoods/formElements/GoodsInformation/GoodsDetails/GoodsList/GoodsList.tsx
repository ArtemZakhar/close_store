import { GoodsDetails, GoodsType } from '@/types/goods/good';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormType } from '../../../../HandleGoods';
import { NEW_PROPERTY_IN_GOODS_OBJECT } from '../GoodsDetails';
import { SizesAndCountDataType } from '../sizesData';
import GoodsItem from './GoodsItem';
import { styles } from './GoodsList.styles';

const GoodsList = ({ sizeType }: { sizeType: SizesAndCountDataType }) => {
  const { setValue, getValues, watch } = useFormContext<FormType>();
  const goodsList = watch('goods.goodsDetails');

  const handleAddNewItem = () => {
    const prevState = getValues('goods.goodsDetails');

    if (NEW_PROPERTY_IN_GOODS_OBJECT in prevState) return;

    setValue('goods.goodsDetails', {
      ...prevState,
      [NEW_PROPERTY_IN_GOODS_OBJECT]: {
        color: '',
        countAndSizes: sizeType.sizesAndCount,
      },
    });
  };

  const handleRemoveItem = (id: string) => {
    const prevState = getValues('goods.goodsDetails');

    if (Object.entries(prevState).length === 1) {
      toast.dismiss();
      return toast.error('Останній елемент не може бути видаленим.');
    }

    const newState: GoodsDetails = {};

    for (const [key, value] of Object.entries(prevState)) {
      if (key === id) continue;

      newState[key] = value;
    }

    setValue('goods.goodsDetails', newState);
  };

  // console.log(goodsList);

  return (
    <>
      {goodsList &&
        Object.entries(goodsList)?.map(([key, value]) => (
          <Box key={key}>
            <GoodsItem
              handleRemoveItem={handleRemoveItem}
              id={key}
              sizeType={sizeType}
            />
          </Box>
        ))}

      <Box sx={styles.buttonWrapper}>
        <Button onClick={handleAddNewItem} endIcon={<ControlPointIcon />}>
          Додати позицію
        </Button>
      </Box>
    </>
  );
};

export default GoodsList;
