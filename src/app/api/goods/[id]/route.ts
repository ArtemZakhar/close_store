import {
  httpDeleteGoods,
  httpGetGoodsById,
  httpUpdateGoods,
} from '../goods.controller';

export const DELETE = httpDeleteGoods;

export const PATCH = httpUpdateGoods;

export const GET = httpGetGoodsById;
