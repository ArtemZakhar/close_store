import { getDataForGoodsFromCart } from '@/services/apiServices/goodsService';
import { CartTableGoodsType, GoodsDetails } from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';

import { useEffect, useState } from 'react';

import useGoodsInCartService from '@/hooks/useGoodsInCartService';

export const useHandleGoodsInCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [goodsInCartFilled, setGoodsInCartFilled] = useState<
    CartTableGoodsType[]
  >([]);

  const { goodsInCart, removeManyFromCart, clearCart } =
    useGoodsInCartService();

  useEffect(() => {
    if (goodsInCart.length) {
      getDataForGoodsFromCart(goodsInCart)
        .then((data) => {
          const shouldBeRemovedFromCart: GoodsInCartType[] = [];
          const cartTableGoods: CartTableGoodsType[] = goodsInCart.reduce(
            (acc, elem) => {
              const existingGoods = data.find(
                (goodsItem) => goodsItem._id === elem._id,
              );

              if (existingGoods) {
                const existingGoodsDetails =
                  existingGoods.goodsDetails[elem.goodsDetailsKey];

                const maxCount = existingGoodsDetails.countAndSizes.find(
                  (i) => i.size === elem.size,
                )?.count;

                if (maxCount) {
                  existingGoodsDetails.payablePrice =
                    existingGoodsDetails.outcomePrice;

                  const newGoodsDetails: GoodsDetails = {
                    [elem.goodsDetailsKey]: existingGoodsDetails,
                  };

                  acc.push({
                    _id: elem._id,
                    id: `${elem._id}${elem.goodsDetailsKey}${elem.size}`,
                    goods: {
                      ...existingGoods,
                      goodsDetails: newGoodsDetails,
                    },
                    count: 1,
                    key: elem.goodsDetailsKey,
                    color: elem.color,
                    size: elem.size,
                    maxCount,
                    itemId: newGoodsDetails[elem.goodsDetailsKey]._id!,
                    soldBy: '',
                  });
                }
              } else {
                shouldBeRemovedFromCart.push(elem);
              }

              return acc;
            },
            [] as CartTableGoodsType[],
          );

          removeManyFromCart(shouldBeRemovedFromCart);
          setGoodsInCartFilled(cartTableGoods);
        })
        .catch((error) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [goodsInCart.length]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isError) {
      timer = setTimeout(() => {
        setIsError(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isError]);

  const clearGoodsFromCart = () => {
    setGoodsInCartFilled([]);
    clearCart();
  };

  const changeGoodsQuantity = (id: string, action: 'decrease' | 'increase') => {
    setGoodsInCartFilled((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              count: action === 'decrease' ? item.count - 1 : item.count + 1,
            }
          : item,
      ),
    );
  };

  const updateDiscount = (id: string, key: string, discountAmount: number) => {
    setGoodsInCartFilled((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              goods: {
                ...item.goods,
                goodsDetails: {
                  ...item.goods.goodsDetails,
                  [key]: {
                    ...item.goods.goodsDetails[key],
                    discount: discountAmount,
                    payablePrice:
                      (item.goods.goodsDetails[key].outcomePrice ?? 0) -
                      discountAmount,
                  },
                },
              },
            }
          : item,
      ),
    );
  };

  const handleSelectOneSeller = (goodsId: string, id: string) => {
    setGoodsInCartFilled((prevState) =>
      prevState.map((item) =>
        item.id === goodsId ? { ...item, soldBy: id } : item,
      ),
    );
  };

  const handleSelectSellerForAllGoods = (id: string) => {
    setGoodsInCartFilled((prevState) =>
      prevState.map((item) => ({ ...item, soldBy: id })),
    );
  };

  return {
    isError,
    isLoading,
    goodsInCartFilled,
    clearGoodsFromCart,
    changeGoodsQuantity,
    handleSelectOneSeller,
    handleSelectSellerForAllGoods,
    updateDiscount,
  };
};
