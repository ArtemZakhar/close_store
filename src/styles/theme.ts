'use client';

import { createTheme } from '@mui/material/styles';

import localFont from 'next/font/local';

import { palette } from './palette';

const helvetica = localFont({
  src: [
    {
      path: '../../public/fonts/Helvetica.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Helvetica-Bold.woff',
      weight: '700',
      style: 'bold',
    },
  ],
});

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '1.25rem',
          padding: '0.5rem 1rem',
          height: '2.5rem',
          backgroundColor: 'white',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e130e9',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E1E1E1',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingRight: '2rem',
          [theme.breakpoints.up('sm')]: {
            paddingRight: '2.5rem',
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '50%',
          transform: 'translateY(-50%)',
          left: '1rem',
          transition: 'top 0.3s ease, transform 0.3s ease',
          '&.MuiInputLabel-shrink': {
            top: '-0.5rem',
            left: '1rem',
            transform: 'translateY(0)',
            backgroundColor: 'transparent',
            fontSize: '0.75rem',
          },
          '&.Mui-focused': {
            top: '-0.5rem',
            left: '1rem',
            transform: 'translateY(0)',
            backgroundColor: 'transparent',
            fontSize: '0.75rem',
          },
          '&.Mui-error': {
            top: '22px',
          },
          '&.MuiInputLabel-shrink.Mui-error': {
            top: '-0.5rem',
            left: '1rem',
            transform: 'translateY(0)',
            backgroundColor: 'transparent',
            fontSize: '0.75rem',
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'text' },
          style: {
            borderRadius: '1.25rem',
            padding: '0.5rem 1rem',
            textTransform: 'none',
            fontWeight: '400',
            whiteSpace: 'nowrap',
            transition: 'color 0.3s ease',
            '&:hover': {
              backgroundColor: 'transparent',
              opacity: 0.7,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '1.25rem',
          padding: '0.5rem 1rem',
          textTransform: 'none',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: '1.25rem',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
        icon: {
          right: '1rem', // Match the padding of the input
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        select: {
          marginRight: '1rem',
        },
      },
    },
  },

  typography: {
    fontFamily: helvetica.style.fontFamily,

    button: {
      textTransform: 'none',
    },
    h1: {
      fontFamily: 'Helvetica',
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: '2.5rem',
      textAlign: 'center',
      color: palette.common?.black,
    },
    h2: {
      fontFamily: 'Helvetica',
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: '1.875rem',
      color: palette.common?.black,
    },
    h3: {
      fontFamily: 'Helvetica',
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '1.25rem',
      textAlign: 'center',
      color: palette.common?.black,
    },
    h4: {
      fontFamily: 'Helvetica',
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '1rem',
      textAlign: 'left',
      color: palette.common?.black,
    },
    body1: {
      fontFamily: 'Helvetica',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      textAlign: 'left',
      color: palette.text?.secondary,
    },
  },
  palette: palette,
});

export default theme;
