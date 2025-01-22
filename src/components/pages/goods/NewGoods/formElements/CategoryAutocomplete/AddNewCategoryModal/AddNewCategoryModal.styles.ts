export const styles = {
  modalCloseButton: {
    position: 'absolute',
    top: '2.5rem',
    right: '2.5rem',
    padding: '0',
    minWidth: '0',
  },
  modalTitle: { lineHeight: '2.625rem' },
  inputContainer: {
    overflowY: 'scroll',
    maxHeight: '22rem',
    borderRadius: '2rem',
    padding: '2rem',
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#E1E1E1',
      border: '0.3rem solid transparent',
      borderRadius: '1rem',
      backgroundClip: 'padding-box',
    },
    '&::-webkit-scrollbar': {
      width: '1rem',
    },
  },
  inputWrapper: {
    height: '7rem',
    width: '20rem',
  },
  buttonWrapper: {
    marginTop: '1rem',
    display: 'flex',
    gap: '1rem',
    width: '100%',
  },
  buttonBack: { width: '50%', my: '1.5rem', margin: 0 },
};
