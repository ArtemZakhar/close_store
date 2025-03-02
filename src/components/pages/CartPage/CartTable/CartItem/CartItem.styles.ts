export const styles = {
  row(color: string) {
    return {
      borderBottom: `1px solid ${color}`,
      '& td:not(:last-child)': {
        borderRight: `1px solid ${color}`,
      },
    };
  },
  quantityWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    '& button': {
      padding: 0,
      minWidth: 0,
    },
  },
};
