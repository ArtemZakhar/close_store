import { GoodsQuantityAndCount } from '@/types/goods/good';

export type SizesAndCountDataType = {
  name: string;
  label: string;
  sizesAndCount: GoodsQuantityAndCount[];
};

export const sizesData: SizesAndCountDataType[] = [
  {
    name: 'Одяг (універсальні розміри)',
    label: 'clothes',
    sizesAndCount: [
      { size: 'XS', XS: '' },
      { size: 'S', S: '' },
      { size: 'M', M: '' },
      { size: 'L', L: '' },
      { size: 'XL', XL: '' },
      { size: 'XXL', XXL: '' },
      { size: 'XXXL', XXXL: '' },
      { size: 'XXXXL', XXXXL: '' },
    ],
  },
  {
    name: 'Куртки (цифрові розміри)',
    label: 'jackets',
    sizesAndCount: [
      { size: '46', '46': '' },
      { size: '48', '48': '' },
      { size: '50', '50': '' },
      { size: '52', '52': '' },
      { size: '54', '54': '' },
      { size: '56', '56': '' },
      { size: '58', '58': '' },
    ],
  },
  {
    name: 'Джинси',
    label: 'jeans',
    sizesAndCount: [
      { size: '28', '28': '' },
      { size: '29', '29': '' },
      { size: '30', '30': '' },
      { size: '31', '31': '' },
      { size: '32', '32': '' },
      { size: '33', '33': '' },
      { size: '34', '34': '' },
      { size: '36', '36': '' },
      { size: '38', '38': '' },
      { size: '40', '40': '' },
      { size: '42', '42': '' },
    ],
  },
];
