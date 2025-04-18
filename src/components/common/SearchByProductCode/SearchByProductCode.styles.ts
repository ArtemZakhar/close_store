export const styles = {
  inputWidth: { '&.MuiTextField-root': { width: '15rem' } },
  editModeWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
    backgroundColor: 'background.default',
    padding: '2rem',
  },
  resultsWrapper: {
    position: 'absolute',
    right: 0,
    top: '4rem',
    backgroundColor: 'background.paper',
    boxShadow: '0px 0px 10px 0px #00000026',
    borderRadius: '1rem',
    border: '1px solid',
    borderColor: 'action.disabled',
    padding: '2rem',
    zIndex: 1000,
    height: '14rem',
    width: '45.5rem',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
      display: 'none',
    },
  },
};
