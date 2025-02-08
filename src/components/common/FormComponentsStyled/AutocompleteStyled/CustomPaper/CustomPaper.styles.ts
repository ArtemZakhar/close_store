import { SxProps, Theme } from '@mui/material';

export const styles = {
  autocompletePaper(color: string): SxProps<Theme> {
    return {
      borderRadius: '0 0 1.25rem 1.25rem',
      border: `2px solid ${color}`,
      borderTop: 'none',
      maxHeight: '10.5rem !important',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '& .MuiAutocomplete-groupLabel': {
        backgroundColor: 'action.disabled',
      },
      '&  .MuiAutocomplete-noOptions': {
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
      },
    };
  },
};
