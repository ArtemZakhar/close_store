import { GoodsDetails, GoodsType } from '@/types/goods/good';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormType } from '../../../../HandleGoods';
import { validations } from '../../../formValidations';
import { SizesAndCountDataType } from '../sizesData';
import GoodsItem from './GoodsItem';
import { styles } from './GoodsList.styles';

const GoodsList = ({
  form,
  sizeType,
  selectedGoods,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  sizeType: SizesAndCountDataType;
  selectedGoods?: GoodsType | null | undefined;
}) => {
  const initialLastGoodsId = '1';
  const [lastGoodId, setLastGoodId] = useState(initialLastGoodsId);

  const [listOfGoods, setListOfGoods] = useState([lastGoodId]);

  useEffect(() => {
    setLastGoodId(initialLastGoodsId);
    setListOfGoods([initialLastGoodsId]);
    form.resetField('goods.goodsDetails');
  }, [sizeType.label]);

  useEffect(() => {
    if (selectedGoods) {
      const newState: GoodsDetails[] = selectedGoods.goodsDetails.map(
        (goodsDetail) => ({
          color: goodsDetail.color,
          incomePriceGRN: goodsDetail.incomePriceGRN,
          incomePriceUSD: goodsDetail.incomePriceUSD,
          outcomePrice: goodsDetail.outcomePrice,
          countAndSizes: sizeType.sizesAndCount.map((size) => {
            const item = goodsDetail.countAndSizes.find(
              (i) => i.size === size.size,
            );

            return item ? { count: item.count, size: item.size } : size;
          }),
        }),
      );

      setValue('goods.goodsDetails', newState);
    }
  }, []);

  const { control, setValue, getValues } = form;

  const handleAddNewItem = () => {
    const prevState = getValues('goods.goodsDetails');

    setValue('goods.goodsDetails', [
      ...prevState,
      {
        color: '',
        countAndSizes: sizeType.sizesAndCount,
      },
    ]);

    setListOfGoods((prevState) => [
      ...prevState,
      String(Number(lastGoodId) + 1),
    ]);

    setLastGoodId((prevState) => String(Number(prevState) + 1));
  };

  const handleRemoveItem = (id: string, index: number) => {
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
          {selectedGoods &&
            selectedGoods.goodsDetails.map((goodsDetail, index) => (
              <Box key={goodsDetail.color}>
                <GoodsItem
                  form={form}
                  id={goodsDetail.color}
                  handleRemoveItem={handleRemoveItem}
                  index={index}
                  field={field}
                  sizeType={sizeType}
                />
              </Box>
            ))}

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
