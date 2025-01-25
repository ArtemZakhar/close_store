import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AutocompleteProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { forwardRef } from 'react';
import React, { useRef } from 'react';

import CustomList from './CustomList';
import CustomPaper from './CustomPaper';
import { styles } from './StyledAutocomplete.styles';

type SelectStyledProps<
  T,
  Multiple extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Omit<AutocompleteProps<T, Multiple, true, FreeSolo>, 'renderInput'> & {
  placeholder?: string;
  helperText?: string;
  error?: boolean;
};

const StyledAutocomplete = forwardRef<
  HTMLDivElement,
  SelectStyledProps<any, boolean | undefined, boolean | undefined>
>(function StyledAutocomplete(
  { helperText, error, disabled, sx, placeholder = '', ...otherProps },
  ref,
) {
  return (
    <Autocomplete
      {...otherProps}
      ref={ref}
      sx={{
        ...sx,
      }}
      fullWidth
      PaperComponent={CustomPaper}
      ListboxComponent={CustomList}
      disableClearable
      loadingText={
        <Box paddingBlock="1rem" display="flex" justifyContent="center">
          <CircularProgress size="2rem" />
        </Box>
      }
      popupIcon={<KeyboardArrowDownIcon sx={() => styles.arrow(disabled)} />}
      onClose={(e) => {
        e.stopPropagation();
        document.activeElement &&
          (document.activeElement as HTMLElement).blur();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          disabled={disabled}
        />
      )}
    />
  );
});

export default StyledAutocomplete;
