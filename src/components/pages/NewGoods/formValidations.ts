import { GoodsDetails } from '@/types/goods/good';
import { SellerType } from '@/types/goods/seller';

import { FormType } from './NewGoods';
import { errorMessages } from './errorMessages';

export const onlyDigitsRegExp = /[-\s\D]+/gi;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+\d{2} \(\d{3}\) \d{3} \d{2} \d{2}$/;
const urlPattern = /^(?![_-])[a-z0-9_-]+(?<![_-])$/;

export const validations = {
  category: { required: errorMessages.required },
  url: {
    required: errorMessages.required,
    pattern: {
      value: urlPattern,
      message: errorMessages.url.valid,
    },
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  subCategory: { required: errorMessages.required },
  name: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  uniqueId: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  icon: { required: errorMessages.required },
  sellerName: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  sellerEmail: {
    pattern: {
      value: emailPattern,
      message: errorMessages.sellerEmail.valid,
    },
    validate: (value: string | undefined, context: FormType) => {
      if (
        !value?.length &&
        !!context.seller &&
        !context.seller?.phone?.length
      ) {
        return errorMessages.sellerEmail.required;
      }
      return true;
    },
  },
  sellerPhone: {
    pattern: {
      value: phonePattern,
      message: errorMessages.sellerPhone.valid,
    },
    validate: (value: string | undefined, context: FormType) => {
      if (
        !value?.length &&
        !!context.seller &&
        !context.seller?.email?.length
      ) {
        return errorMessages.sellerPhone.required;
      }

      return true;
    },
  },
  sellerCountry: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  goodsFirm: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  firmCountry: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  goodsModel: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  goodsDetails: {
    validate: (value: GoodsDetails[]) => {
      if (!value) {
        return "Поле обов'язкове для заповнення.";
      }

      if (value.some((item) => !item.color.length)) {
        return 'Відсутній колір товару. Перевірте внесені дані.';
      }

      if (
        value.some((item) =>
          item.countAndSizes.every(
            (sizeItem) => !sizeItem[sizeItem.size].length,
          ),
        )
      ) {
        return 'Відсутні розміри по товару. Перевірте внесені дані.';
      }
    },
  },
};
