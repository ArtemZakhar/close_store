import { GoodsDetails } from '@/types/goods/good';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormType } from '@/components/pages/NewGoods/NewGoods';
import { validations } from '@/components/pages/NewGoods/formValidations';

import { SizesAndCountDataType } from '../sizesData';
import GoodsItem from './GoodsItem';
import { styles } from './GoodsList.styles';

const GoodsList = ({
  form,
  sizeType,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  sizeType: SizesAndCountDataType;
}) => {
  const [lastGoodId, setLastGoodId] = useState(1);
  const [listOfGoods, setListOfGoods] = useState([lastGoodId]);

  const { control, setValue, getValues } = form;

  const handleAddNewItem = () => {
    const prevState = getValues('goods.goodsDetails');

    setValue('goods.goodsDetails', [
      ...prevState,
      { color: '', countAndSizes: sizeType.sizesAndCount },
    ]);

    setListOfGoods((prevState) => [...prevState, lastGoodId + 1]);

    setLastGoodId((prevState) => prevState + 1);
  };

  const handleRemoveItem = (id: number, index: number) => {
    const prevState = getValues('goods.goodsDetails');

    if (prevState.length === 1) {
      toast.dismiss();
      return toast.error('Останній елемент не може бути видаленим.');
    }

    setValue(
      'goods.goodsDetails',
      prevState.filter((item, i) => index !== i),
    );

    setListOfGoods((prevState) => prevState.filter((item) => item !== id));
  };

  return (
    <Controller
      control={control}
      name="goods.goodsDetails"
      rules={validations.goodsDetails}
      render={({ field }) => (
        <>
          {listOfGoods.map((id, index) => (
            <Box key={id}>
              <GoodsItem
                form={form}
                id={id}
                handleRemoveItem={handleRemoveItem}
                index={index}
                field={field}
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
      )}
    />
  );
};

export default GoodsList;
