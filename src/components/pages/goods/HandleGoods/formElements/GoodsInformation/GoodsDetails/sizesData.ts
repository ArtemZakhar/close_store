import { GoodsQuantityAndCount } from '@/types/goods/good';

export type SizesAndCountDataType = {
  name: string;
  label: 'clothes' | 'jackets' | 'jeans';
  sizesAndCount: GoodsQuantityAndCount[];
};

export const sizesData: SizesAndCountDataType[] = [
  {
    name: 'Одяг (універсальні розміри)',
    label: 'clothes',
    sizesAndCount: [
      { size: 'XS', count: 0 },
      { size: 'S', count: 0 },
      { size: 'M', count: 0 },
      { size: 'L', count: 0 },
      { size: 'XL', count: 0 },
      { size: 'XXL', count: 0 },
      { size: 'XXXL', count: 0 },
      { size: 'XXXXL', count: 0 },
    ],
  },
  {
    name: 'Куртки (цифрові розміри)',
    label: 'jackets',
    sizesAndCount: [
      { size: '46', count: 0 },
      { size: '48', count: 0 },
      { size: '50', count: 0 },
      { size: '52', count: 0 },
      { size: '54', count: 0 },
      { size: '56', count: 0 },
      { size: '58', count: 0 },
    ],
  },
  {
    name: 'Джинси',
    label: 'jeans',
    sizesAndCount: [
      { size: '28', count: 0 },
      { size: '29', count: 0 },
      { size: '30', count: 0 },
      { size: '31', count: 0 },
      { size: '32', count: 0 },
      { size: '33', count: 0 },
      { size: '34', count: 0 },
      { size: '36', count: 0 },
      { size: '38', count: 0 },
      { size: '40', count: 0 },
      { size: '42', count: 0 },
    ],
  },
];
