import { GoodsDetails, GoodsQuantityAndCount } from '@/types/goods/good';
import { CountryType } from '@/types/location/location';

import { FormType } from '../HandleGoods';
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
    validate: (value: string | CountryType) => {
      if (typeof value === 'string' && !value?.trim().length) {
        return errorMessages.required;
      }

      if (typeof value !== 'string' && !('name' in value)) {
        return errorMessages.required;
      }

      return true;
    },
  },
  goodsFirm: {
    name: {
      validate: (value: string | undefined) => {
        return !!value?.trim().length || errorMessages.firm.required;
      },
    },

    countryOfOrigin: {
      required: errorMessages.countryOfOrigin.required,
      validate: (value: string | undefined) => {
        return typeof value === 'string' && !value?.trim().length
          ? errorMessages.countryOfOrigin.required
          : true;
      },
    },
  },
  goodsModel: {
    required: errorMessages.required,
    validate: (value: string | undefined) => {
      return !!value?.trim().length || errorMessages.required;
    },
  },
  color: { required: errorMessages.color.required },
  price(id: string) {
    return {
      validate: (value: number | undefined, context: FormType) => {
        const root = context.goods?.goodsDetails;
        if (root) {
          const incomeValue = root[id] && root[id].incomePriceGRN;
          const outcomeValue = root[id] && root[id].outcomePrice;

          if (outcomeValue && incomeValue) {
            if (Number(outcomeValue) < Number(incomeValue)) {
              return errorMessages.price.validate;
            } else {
              return true;
            }
          }
        } else {
          return true;
        }
      },
    };
  },
  sizeAndCounts: {
    validate: (data: GoodsQuantityAndCount[]) => {
      return data.some((item) => item.count !== 0) || 'Зазначте кількість';
    },
  },
};
