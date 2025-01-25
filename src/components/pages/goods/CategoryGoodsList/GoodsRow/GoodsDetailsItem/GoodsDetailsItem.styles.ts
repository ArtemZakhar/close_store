export const styles = {
  container: {
    display: 'flex',
    paddingBlock: '1rem',
    justifyContent: 'end',
  },
  colorWrapper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'end',
    alignItems: 'center',
    marginInline: '1rem',
  },
  dataWrapper: (color: string) => ({
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${color}`,
    borderRadius: '1rem 0 0 1rem',
  }),
  sizeTitle: (color: string) => ({
    textAlign: 'center',
    paddingInline: '1rem',
    borderBottom: `1px solid ${color}`,
  }),
  cartWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  cartTitle: {
    textAlign: 'center',
    paddingInline: '1rem',
  },
  dataContainer: (color: string) => ({
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${color}`,
    '&:last-child': {
      borderRadius: '0  1rem  1rem 0',
    },
  }),
  sizeItem: (color: string) => ({
    textAlign: 'center',
    paddingInline: '1rem',
    borderBottom: `1px solid ${color}`,
  }),
};
