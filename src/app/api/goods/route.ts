import {
  httpDeleteGoods,
  httpGetGoods,
  httpPostNewGoods,
  httpUpdateGoods,
} from './goods.controller';

export const GET = httpGetGoods;

export const POST = httpPostNewGoods;

export const PATCH = httpUpdateGoods;
