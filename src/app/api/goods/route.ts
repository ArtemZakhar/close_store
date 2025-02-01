import {
  httpDeleteGoods,
  httpGetGoods,
  httpPostNewGoods,
} from './goods.controller';

export const GET = httpGetGoods;

export const POST = httpPostNewGoods;
