export const styles = {
  blockWrapper: { display: 'flex', gap: '3rem', marginBottom: '2rem' },
  arrow(disabled: boolean | undefined) {
    return {
      color: disabled ? '#909B9F !important' : 'common.black',
    };
  },
  input: {
    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
      padding: 0,
    },
  },
  divider: { marginBottom: '1rem' },
  autocomplete: {
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      padding: '0 2rem 0 1rem',
    },
  },
};
