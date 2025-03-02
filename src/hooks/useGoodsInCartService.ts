import { GoodsInCartType } from '@/types/localStorage/goods';

import { useEffect, useState } from 'react';

import localStorageService from '@/utils/localStorageService';

const goodsInCartLabel = 'goods-in-cart';
export const goodsLocalStorageEvent = 'goodsLocalStorage';

const useGoodsInCartService = () => {
  const [goodsInCart, setGoodsInCart] = useState<GoodsInCartType[]>([]);

  const loadGoods = () => {
    const goods =
      localStorageService.getParsedData<GoodsInCartType[]>(goodsInCartLabel);

    setGoodsInCart(goods ? goods : []);
  };

  useEffect(() => {
    loadGoods();

    window.addEventListener(goodsLocalStorageEvent, loadGoods);

    return () => window.removeEventListener(goodsLocalStorageEvent, loadGoods);
  }, []);

  const saveInCart = (goods: GoodsInCartType) => {
    const newStore = [...goodsInCart, goods];

    localStorageService.set(goodsInCartLabel, newStore);
    setGoodsInCart(newStore);
    window.dispatchEvent(new Event(goodsLocalStorageEvent));
  };

  const removeFromCart = (goods: GoodsInCartType) => {
    const newStore = goodsInCart.filter((item) => {
      return !(
        item._id === goods._id &&
        item.size === goods.size &&
        item.color === goods.color
      );
    });

    localStorageService.set(goodsInCartLabel, newStore);
    setGoodsInCart(newStore);
    window.dispatchEvent(new Event(goodsLocalStorageEvent));
  };

  const clearCart = () => {
    localStorageService.remove(goodsInCartLabel);
    window.dispatchEvent(new Event(goodsLocalStorageEvent));
  };

  return {
    goodsInCart,
    saveInCart,
    removeFromCart,
    clearCart,
  };
};

export default useGoodsInCartService;
