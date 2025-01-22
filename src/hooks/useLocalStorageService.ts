import { GoodsInCartType } from '@/types/localStorage/goods';

import { useEffect, useState } from 'react';

const goodsInCartLabel = 'goods-in-cart';

const useLocalStorageService = () => {
  const [goodsInCart, setGoodsInCart] = useState<GoodsInCartType[]>([]);

  useEffect(() => {
    if (typeof globalThis !== undefined) {
      const goods: GoodsInCartType[] = JSON.parse(
        localStorage.getItem(goodsInCartLabel) || '[]',
      );

      setGoodsInCart(goods);
    }
  }, [setGoodsInCart]);

  const saveGoodsInCart = (goods: GoodsInCartType) => {
    const newStore = [...goodsInCart, goods];

    localStorage.setItem(goodsInCartLabel, JSON.stringify(newStore));
    setGoodsInCart(newStore);
  };

  const deleteGoodsFromCart = (goods: GoodsInCartType) => {
    const newStore = goodsInCart.filter((item) => {
      return (
        item._id !== goods._id ||
        item.color !== goods.color ||
        (item._id === goods._id &&
          item.size !== goods.size &&
          item.color === goods.color)
      );
    });

    localStorage.setItem(goodsInCartLabel, JSON.stringify(newStore));
    setGoodsInCart(newStore);
  };

  return { goodsInCart, saveGoodsInCart, deleteGoodsFromCart };
};

export default useLocalStorageService;
