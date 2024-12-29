import { useCallback } from 'react';

export const usePhoneMask = () => {
  const setCursorPosition = useCallback(
    (pos: number, elem: HTMLInputElement) => {
      if (document.activeElement === elem) {
        elem.setSelectionRange(pos, pos);
      }
    },
    [],
  );

  const createMask = useCallback(
    (value: string, element: HTMLInputElement | null): string => {
      const matrix = '+__ (___) ___ __ __';
      let i = 0;
      const defaultMaskValue = matrix.replace(/\D/g, '');
      let userInputNumbers = value.replace(/\D/g, '');

      if (defaultMaskValue.length >= userInputNumbers.length) {
        userInputNumbers = defaultMaskValue;
      }

      const maskedValue = matrix.replace(/./g, (a) =>
        /[_\d]/.test(a) && i < userInputNumbers.length
          ? userInputNumbers.charAt(i++)
          : i >= userInputNumbers.length
            ? ''
            : a,
      );

      if (element) {
        setCursorPosition(maskedValue.length, element);
      }

      return maskedValue;
    },
    [setCursorPosition],
  );

  return createMask;
};
