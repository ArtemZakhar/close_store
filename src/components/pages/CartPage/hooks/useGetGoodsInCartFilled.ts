import goodsService from '@/app/api/goodsService';
import { CartTableGoodsType, GoodsDetails } from '@/types/goods/good';

import { useEffect, useState } from 'react';

import useGoodsInCartService from '@/hooks/useGoodsInCartService';

export const useGetGoodsInCartFilled = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [goodsInCartFilled, setGoodsInCartFilled] = useState<
    CartTableGoodsType[]
  >([]);

  const { goodsInCart } = useGoodsInCartService();

  useEffect(() => {
    if (goodsInCart.length) {
      goodsService
        .getDataForGoodsFromCart(goodsInCart)
        .then((data) => {
          const cartTableGoods: CartTableGoodsType[] = goodsInCart.reduce(
            (acc, elem) => {
              const existingGoods = data.find(
                (goodsItem) => goodsItem._id === elem._id,
              );

              // todo remove goods from local storage if goods not find

              if (existingGoods) {
                const existingGoodsDetails =
                  existingGoods.goodsDetails[elem.goodsDetailsKey];

                const maxCount = existingGoodsDetails.countAndSizes.find(
                  (i) => i.size === elem.size,
                )?.count;

                if (maxCount) {
                  const newGoodsDetails: GoodsDetails = {
                    [elem.goodsDetailsKey]: existingGoodsDetails,
                  };

                  acc.push({
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
                  });
                }
              }

              return acc;
            },
            [] as CartTableGoodsType[],
          );

          setGoodsInCartFilled(cartTableGoods);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(true);
          setIsLoading(false);
        });
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

  return { isError, isLoading, goodsInCartFilled, setGoodsInCartFilled };
};
