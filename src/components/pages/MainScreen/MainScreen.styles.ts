export const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  iconsWrapper: {
    mt: '4rem',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '71rem',
    gap: '1.5rem',
  },
  button: {
    width: '13rem',
    height: '13rem',
    borderRadius: '1.5rem',
    backgroundColor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    '&:hover': {
      backgroundColor: 'background.paper',
    },
  },
  icon: { fontSize: '6.5rem', color: 'action.disabled' },
};
