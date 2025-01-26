export const styles = {
  container: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sizeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    '& button': {
      minWidth: '0',
      padding: '0',
    },
  },
  input: {
    width: '5rem',
    '& input[type=number]': {
      appearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      appearance: 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      appearance: 'none',
      margin: 0,
    },
  },
};
