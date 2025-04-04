import { errorMessages } from './formErrorsMessages';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nonPrintingPattern = /^(?!.*[\s]).*$/;
const specialCharacterPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
const digitPattern = /^(?=.*\d).*$/;
const uppercasePattern = /^(?=.*[A-Z]).*$/;

export const validation = {
  email: {
    required: errorMessages.email.required,
    pattern: {
      value: emailPattern,
      message: errorMessages.email.valid,
    },
  },
  password: {
    required: errorMessages.password.required,
    minLength: {
      value: 8,
      message: errorMessages.password.minLength,
    },
    maxLength: {
      value: 30,
      message: errorMessages.password.maxLength,
    },
    pattern: {
      value: nonPrintingPattern,
      message: errorMessages.password.nonPrintingSymbols,
    },
    validate: {
      specialCharacter: (value: string) =>
        specialCharacterPattern.test(value) ||
        errorMessages.password.specialCharacter,
      digit: (value: string) =>
        digitPattern.test(value) || errorMessages.password.digit,
      uppercase: (value: string) =>
        uppercasePattern.test(value) || errorMessages.password.upperCase,
    },
  },
  repeatPassword: {
    required: "Поле обов'язкове для заповнення",
    validate: (value: string, context: { password: string }) => {
      return (
        value === context.password || errorMessages.repeatPassword.validate
      );
    },
  },
};
