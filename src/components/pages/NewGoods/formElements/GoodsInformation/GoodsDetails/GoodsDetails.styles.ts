import { Palette } from '@mui/material';

export const styles = {
  container(palette: Palette, error: boolean) {
    return {
      border: `1px solid ${error ? palette.error.main : palette.action.disabled}`,
      borderRadius: '2rem',
      padding: '1rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1rem',
    };
  },
  arrow(disabled: boolean | undefined) {
    return {
      color: disabled ? '#909B9F !important' : 'common.black',
    };
  },
};
