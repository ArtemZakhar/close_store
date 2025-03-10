export const styles = {
  error: {
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
  },
  noDataLink(color: string) {
    return {
      '& a': {
        color: color,
        textDecoration: 'none',
      },
    };
  },
};
