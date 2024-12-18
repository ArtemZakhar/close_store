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
          '&.Mui-disabled': {
            backgroundColor: '#E1E1E1',
            color: '#000',

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
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
        contained: {
          color: '#FFF',
          fontWeight: '700',
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
          right: '1rem',
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
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: '100%',
          margin: 0,
          '& .Mui-focused': {
            borderRadius: '1.25rem 1.25rem 0 0',
          },
          '& .MuiInputBase-root': {
            '& legend': {
              marginLeft: '0.7rem',
            },
          },
          '& .MuiFormLabel-root': {
            paddingInline: '0.6rem',
          },
          '& .MuiAutocomplete-input': {
            marginLeft: '0.2rem',
          },
          '& .MuiOutlinedInput-root': { paddingLeft: '1rem' },
          '& .Mui-disabled': {
            backgroundColor: 'action.disabled',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'action.disabled',
            },
          },
        },
        listbox: {
          padding: '1rem',
          color: 'common.black',
        },
      },
      defaultProps: {
        disableClearable: true,
        slotProps: {
          popper: {
            modifiers: [
              {
                name: 'flip',
                enabled: false,
              },
              {
                name: 'preventOverflow',
                enabled: false,
              },
            ],
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& > .MuiBox-root': {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '42.25rem',
            backgroundColor: '#FFF',
            boxShadow:
              '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderRadius: '1rem',
            maxHeight: '90vh',
          },
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
