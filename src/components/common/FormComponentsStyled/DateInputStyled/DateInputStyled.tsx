import TextField, { TextFieldProps } from '@mui/material/TextField';

import { forwardRef } from 'react';

import { styles } from './DateInputStyled.styles';

const DateInputStyled = forwardRef<HTMLInputElement, TextFieldProps>(
  function DateInputStyled(
    { helperText, error, disabled, sx, placeholder = '', ...otherProps },
    ref,
  ) {
    return (
      <TextField
        {...otherProps}
        type="date"
        fullWidth
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        disabled={disabled}
        sx={{ ...styles.calendar, ...sx }}
      />
    );
  },
);

export default DateInputStyled;
