export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingBlock: '1rem',
    gap: '1rem',
    overflowX: 'auto',
    width: 'fit-content',
  },
  detailsWrapper: { display: 'flex', overflowX: 'auto' },
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
    paddingInline: '1rem',
    borderBottom: `1px solid ${color}`,
  }),
  cartWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '2.5rem',
  },
  quantityWrapper: {
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid`,
    borderColor: 'action.disabled',
  },
  cartTitle: {
    textAlign: 'center',
    paddingInline: '1rem',
  },
  dataContainer: (color: string) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTop: `1px solid ${color}`,
    borderRight: `1px solid ${color}`,
    borderBottom: `1px solid ${color}`,
    '&:last-child': {
      borderRadius: '0  1rem  1rem 0',
    },
  }),
  sizeItem: (color: string) => ({
    textAlign: 'center',
    paddingInline: '1rem',
    borderBottom: `1px solid ${color}`,
  }),
  countItem: (color: string) => ({
    textAlign: 'center',
    paddingInline: '1rem',
    borderTop: `1px solid ${color}`,
  }),
};
