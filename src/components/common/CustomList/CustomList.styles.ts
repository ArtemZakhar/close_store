import { SxProps, Theme } from '@mui/material';

export const styles = {
  list(): SxProps<Theme> {
    return {
      scrollbarWidth: 'none',
      padding: '0 !important',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    };
  },
};
