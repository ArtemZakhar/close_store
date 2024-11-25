export const errorMessages = {
  email: {
    required: "Поле обов'язкове для заповнення",
    valid: 'Перевірте правильність введеного паролю.',
  },
  password: {
    required: "Пароль обов'язковий",
    minLength: 'Мінімально 8 символів',
    maxLength: 'Максимально 30 символів',
    nonPrintingSymbols: 'Пробіли заборонені',
    specialCharacter: 'Пароль має містити хоча б один спеціальний символ',
    digit: 'Пароль має містити хоча б одну цифру',
    upperCase: 'Пароль має містити хоча б одну велику літеру',
  },
  repeatPassword: {
    required: "Поле обов'язкове для заповнення",
    validate: 'Паролі не збігаються',
  },
};
