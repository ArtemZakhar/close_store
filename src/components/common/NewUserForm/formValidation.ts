import { errors } from './formErrors';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validation = {
  name: {
    required: errors.name.required,
    minLength: {
      value: 3,
      message: errors.name.minLength,
    },
  },
  email: {
    required: 'Зазначте електронну адресу',
    pattern: {
      value: emailPattern,
      message: 'Будь ласка, введіть правильну електронну адресу',
    },
  },
};
