import { GlobalStyles } from '@mui/material';

const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
      },
      'html, body': {
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: '#F7F7F7',
      },
      'input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill':
        {
          WebkitBoxShadow: '0 0 0px 1000px white inset !important',
          boxShadow: '0 0 0px 1000px white inset !important',
          WebkitTextFillColor: '#000 !important',
          borderRadius: 'inherit',
          padding: 'inherit',
          margin: 'inherit',
          height: '1.25rem',
          backgroundClip: 'content-box !important',
        },
    }}
  />
);

export default globalStyles;
