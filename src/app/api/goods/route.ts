import {
  httpGetGoods,
  httpGetGoodsForCart,
  httpPatchSellGoods,
  httpPutNewGoods,
} from './goods.controller';

export const GET = httpGetGoods;

export const PUT = httpPutNewGoods;

export const POST = httpGetGoodsForCart;

export const PATCH = httpPatchSellGoods;
