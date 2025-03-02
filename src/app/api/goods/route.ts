import {
  httpDeleteGoods,
  httpGetGoods,
  httpGetGoodsForCart,
  httpPutNewGoods,
  httpUpdateGoods,
} from './goods.controller';

export const GET = httpGetGoods;

export const PUT = httpPutNewGoods;

export const PATCH = httpUpdateGoods;

export const DELETE = httpDeleteGoods;

export const POST = httpGetGoodsForCart;
