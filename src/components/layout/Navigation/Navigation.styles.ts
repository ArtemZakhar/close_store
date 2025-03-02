export const styles = {
  appBar: {
    padding: '0 2.5 0 1.25rem',
    backgroundColor: 'white',
    width: '100vw',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    width: '100vw',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  navlinksContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
  },
  navButton: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  notificationButton: {
    p: 0,
    minWidth: '2rem',
    minHeight: '2rem',
    maxWidth: '2rem',
    maxHeight: '2rem',
    fontSize: '1.95rem',
    position: 'relative',
  },
  icon: {
    color: 'primary.main',
    padding: '0.25rem',
    boxSizing: 'content-box',
  },

  goodsInCart: {
    '& .MuiBadge-badge': {
      marginTop: '0.17rem',
      color: 'white',
      border: '2px solid white',
      fontSize: '0.7rem',
    },
  },
};
